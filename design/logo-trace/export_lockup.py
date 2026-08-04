#!/usr/bin/env python3
"""Recover a true-alpha lockup PNG from a black shot and a white shot.

There is no single image file that is "the Kept logo". The lockup is assembled
at render time by Wordmark.tsx (variant="peek"): the mascot PNG plus "Kept" set
in Bricolage Grotesque 800, positioned by measured constants. So the export is a
photograph of the real component rather than a redraw — which keeps the shipped
logo and the distributed logo from drifting apart.

Screenshots are opaque, so alpha has to be inferred. Compositing the same pixel
over black and over white gives:

    C_black = a*C            C_white = a*C + (1-a)*255

Subtracting: C_white - C_black = (1-a)*255, so a = 1 - (C_white - C_black)/255,
and the unpremultiplied colour is C_black/a. This recovers the anti-aliased rim
and the drop shadow's gradient exactly, not as a threshold.

Inputs are produced by /logo-export (a temporary route) captured at DPR 2 on
both grounds at identical size.

Run from the repo root:  python3 design/logo-trace/export_lockup.py
"""

from __future__ import annotations

import os

from PIL import Image

BLACK = ".mascot-check/lk_black.png"
WHITE = ".mascot-check/lk_white.png"
OUT_DIR = "design/logo-trace/lp-lockup"

# Heights to write alongside the full-resolution file.
SIZES = (1024, 512, 256)
# Ink colour of the wordmark on the LP, and the swap used for light grounds.
INK = (237, 239, 243)
DARK_INK = (10, 12, 16)


def recover(black: Image.Image, white: Image.Image) -> Image.Image:
    if black.size != white.size:
        raise SystemExit(f"size mismatch: {black.size} vs {white.size}")
    w, h = black.size
    out = Image.new("RGBA", (w, h))
    bp, wp, op = black.load(), white.load(), out.load()
    for y in range(h):
        for x in range(w):
            br, bg, bb = bp[x, y]
            wr, wg, wb = wp[x, y]
            # Average the three channels' estimate of (1-a); they agree up to
            # rounding, and averaging keeps the rim from banding.
            a = 255 - round(((wr - br) + (wg - bg) + (wb - bb)) / 3)
            if a <= 0:
                op[x, y] = (0, 0, 0, 0)
            elif a >= 255:
                op[x, y] = (br, bg, bb, 255)
            else:
                f = 255 / a
                op[x, y] = (
                    min(255, round(br * f)),
                    min(255, round(bg * f)),
                    min(255, round(bb * f)),
                    a,
                )
    return out


def swap_ink(im: Image.Image) -> Image.Image:
    """Recolour the wordmark for light grounds, leaving the mascot alone.

    Matched against the ink colour itself, not against "bright and neutral":
    the mascot's eye whites are pure #FFFFFF and pass a neutrality test, which
    turned both eyes into dark holes the first time. --ink is #EDEFF3, a blue
    lean (b > r) that pure white does not have, so the two separate cleanly."""
    out = im.copy()
    px = out.load()
    w, h = out.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if (
                abs(r - INK[0]) <= 12
                and abs(g - INK[1]) <= 12
                and abs(b - INK[2]) <= 12
                and b >= r
            ):
                px[x, y] = (*DARK_INK, a)
    return out


def main() -> None:
    black = Image.open(BLACK).convert("RGB")
    white = Image.open(WHITE).convert("RGB")
    full = recover(black, white)

    bbox = full.getchannel("A").point(lambda v: 255 if v >= 2 else 0).getbbox()
    full = full.crop(bbox)
    os.makedirs(OUT_DIR, exist_ok=True)

    # On-brand ground. The shadow is not baked in — see the export route.
    ground = Image.new("RGBA", full.size, (10, 12, 16, 255))
    Image.alpha_composite(ground, full).convert("RGB").save(
        f"{OUT_DIR}/kept-lockup-on-black.png"
    )
    full.save(f"{OUT_DIR}/kept-lockup-transparent.png")

    dark = swap_ink(full)
    dark.save(f"{OUT_DIR}/kept-lockup-transparent-darkink.png")

    for hgt in SIZES:
        s = full.copy()
        s.thumbnail((10_000, hgt), Image.LANCZOS)
        s.save(f"{OUT_DIR}/kept-lockup-transparent-{hgt}h.png")
    d = dark.copy()
    d.thumbnail((10_000, 512), Image.LANCZOS)
    d.save(f"{OUT_DIR}/kept-lockup-transparent-darkink-512h.png")

    print(f"trimmed to {full.size}")
    for f in sorted(os.listdir(OUT_DIR)):
        if f.endswith(".png"):
            print(f"  {f:48} {os.path.getsize(OUT_DIR+'/'+f)/1e3:7.0f}K")


if __name__ == "__main__":
    main()
