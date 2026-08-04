#!/usr/bin/env python3
"""Re-cut peek-master.png from the original, without eating the dark fur.

The first cut keyed the black background with a rule on luminance and hue, and
it punched holes straight through the artwork: most of the gripping paw and
notches out of both ear outlines. Those are alpha=0 holes, not white paint —
the paw is rgb(57,43,25) and the ear inner shadow is rgb(24,15,6), which the
luminance test could not tell apart from the near-black ground.

Connectivity is what actually separates them. The background is one region
reachable from the canvas border; every dark pixel the old rule destroyed is
enclosed by artwork and unreachable from outside. So: flood the border, and
trust nothing else.

Anti-aliasing is then rebuilt by un-premultiplying against black. A pixel on the
edge holds `coverage * C` for some artwork colour C, so alpha is recoverable as
maxch/maxch(C) once C is known — and C is taken from the nearest solid pixel.
Only pixels adjacent to the flooded background get this treatment, which is why
the ear's interior shadow survives: it is dark, but it is nowhere near the edge.

Geometry is preserved exactly. peek-master.png was verified to be the original
cropped at (227,106) at 1:1 with zero pixel difference, and this writes the same
window back, so Wordmark.tsx's PEEK_AR and PEEK_CUT stay valid.

Run from the repo root:  python3 design/logo-trace/recut_peek.py
"""

from __future__ import annotations

import os
from collections import deque

from PIL import Image

SRC = "design/logo-trace/ChatGPT Image 2026年8月4日 09_09_44.png"
OUT_MASTER = "design/logo-trace/peek-master.png"
OUT_LP = "web/public/mascot/mascot-peek.png"

# Verified crop of the original that produced the current peek-master.png.
CROP = (227, 106, 227 + 549, 106 + 920)
LP_SIZE = (286, 480)

# A pixel belongs to the background only if it is this dark *and* reachable from
# the canvas border. The ground is pure black; the darkest artwork adjacent to
# it is the ear outline at maxch 73, so there is a wide margin here.
BG_MAX = 12
# Treated as full artwork colour when sampling C for un-premultiplication.
SOLID_MAX = 40
# How far the anti-aliased band can reach in from the flooded edge.
BAND = 3


def maxch(p) -> int:
    return p[0] if p[0] >= p[1] and p[0] >= p[2] else (p[1] if p[1] >= p[2] else p[2])


def flood_background(px, w: int, h: int) -> bytearray:
    seen = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        i = y * w + x
        if not seen[i] and maxch(px[x, y]) <= BG_MAX:
            seen[i] = 1
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)
    while q:
        x, y = q.popleft()
        if x > 0:
            push(x - 1, y)
        if x < w - 1:
            push(x + 1, y)
        if y > 0:
            push(x, y - 1)
        if y < h - 1:
            push(x, y + 1)
    return seen


def nearest_solid(px, w: int, h: int, x: int, y: int):
    """Colour of the closest pixel that is unambiguously artwork."""
    for r in range(1, BAND + 3):
        best = None
        for dy in range(-r, r + 1):
            for dx in range(-r, r + 1):
                if max(abs(dx), abs(dy)) != r:
                    continue
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h:
                    c = px[nx, ny]
                    if maxch(c) >= SOLID_MAX and (best is None or maxch(c) > maxch(best)):
                        best = c
        if best:
            return best
    return None


def main() -> None:
    src = Image.open(SRC).convert("RGB").crop(CROP)
    w, h = src.size
    px = src.load()

    bg = flood_background(px, w, h)

    out = Image.new("RGBA", (w, h))
    op = out.load()
    holes = band = 0

    for y in range(h):
        row = y * w
        for x in range(w):
            c = px[x, y]
            if bg[row + x]:
                op[x, y] = (0, 0, 0, 0)
                continue
            m = maxch(c)
            if m >= SOLID_MAX:
                op[x, y] = (c[0], c[1], c[2], 255)
                continue
            # Dark, but kept: it is enclosed by artwork. Only fade it if it sits
            # against the flooded background — otherwise it is a real shadow.
            touching = any(
                bg[(y + dy) * w + (x + dx)]
                for dy in range(-BAND, BAND + 1)
                for dx in range(-BAND, BAND + 1)
                if 0 <= x + dx < w and 0 <= y + dy < h
            )
            if not touching:
                op[x, y] = (c[0], c[1], c[2], 255)
                holes += 1
                continue
            ref = nearest_solid(px, w, h, x, y)
            if ref is None:
                op[x, y] = (c[0], c[1], c[2], 255)
                continue
            a = min(255, round(255 * m / maxch(ref)))
            op[x, y] = (ref[0], ref[1], ref[2], a)
            band += 1

    before = os.path.getsize(OUT_MASTER)
    out.save(OUT_MASTER)
    lp = out.resize(LP_SIZE, Image.LANCZOS).quantize(
        colors=255, method=Image.Quantize.FASTOCTREE
    )
    lp.save(OUT_LP, optimize=True)

    print(f"peek-master.png  {before/1e3:.0f}K -> {os.path.getsize(OUT_MASTER)/1e3:.0f}K  {out.size}")
    print(f"mascot-peek.png  {os.path.getsize(OUT_LP)/1e3:.0f}K  {LP_SIZE}")
    print(f"dark interior pixels kept: {holes:,}   anti-aliased edge pixels: {band:,}")


if __name__ == "__main__":
    main()
