#!/usr/bin/env python3
"""Green-screen cleanup + crop + downscale for the 2D mascot PNGs.

Source art was generated on a green background and only partially keyed out:
the background survives as low-alpha green (a=4..48, g clearly > r,b) which
composites to a dirty green-grey haze on the LP's light sections.

Pipeline per file:
  1. flood-fill from the canvas border through "background candidate" pixels
     (low alpha AND green-dominant) -> hard alpha 0.
     Flood fill (not a global colour test) so genuinely green *artwork*
     -- e.g. the notebook cover in `slump` -- is never touched.
  2. despill the remaining edge fringe: pull green back to the r/b average.
  3. crop to the alpha bbox (matches the existing mascot-*.png assets, which
     are cropped tight so the component's `size` prop scales consistently).
  4. downscale to MAX_EDGE and quantize to 255 colours (flat art, no loss
     that reads at LP sizes) to get the files from ~26MB down to web weight.

Later batches came back on a *white* background instead (fully opaque, no
alpha at all), so `key_out_white` handles that case: same border flood fill,
but the background test is "bright AND neutral". The cream belly (246,226,199)
is bright but far from neutral, and the eye whites are enclosed by the dark
eye patch, so neither can be reached from the border.

Run from the repo root:  python3 design/mascot-2d-trials/clean_mascot.py
"""

from __future__ import annotations

import os
from collections import deque

from PIL import Image

SRC_DIR = "design/mascot-2d-trials/raw"
OUT_DIR = "web/public/mascot"

# Longest edge after downscale. The largest on-page use is the 340px-wide
# `slump`/`desk` scene, so 1200 still leaves >3x headroom for retina.
MAX_EDGE = 1200

# A pixel is a background candidate when it is not solid artwork (alpha below
# ALPHA_CEIL) and its green channel dominates by GREEN_MARGIN.
ALPHA_CEIL = 250
GREEN_MARGIN = 12

# White-background key: a pixel is background when every channel is at or above
# WHITE_FLOOR and the channel spread is at most WHITE_NEUTRAL (i.e. it is white,
# not cream). The 2px rim between that flood and the artwork is ramped down to
# transparent across WHITE_FLOOR..WHITE_EDGE so no light halo survives on the
# LP's dark sections.
WHITE_FLOOR = 240
WHITE_NEUTRAL = 6
WHITE_EDGE = 200

# Leftover frame/vignette noise: very dark (max channel < FAINT_VALUE) and
# translucent (alpha < FAINT_CEIL). Character rim pixels blend the tan/cream
# body colours, so the brightness test keeps them out of the sweep.
FAINT_CEIL = 110
FAINT_VALUE = 80

# pose -> (source stem, background type)
POSES = [
    "back",
    "cheer",
    "desk",
    "face",
    "proud",
    "side",
    "slump",
    "think",
    "watch",
    "wave",
]

# Poses whose source frame is a plain white background rather than green.
WHITE_BG = {"watch"}

# pose -> source file stem, when it differs from the pose name.
SRC_STEM = {"watch": "lookout"}


def key_out_background(im: Image.Image) -> Image.Image:
    """Flood-fill the green screen away from the canvas border."""
    w, h = im.size
    px = im.load()

    def is_candidate(x: int, y: int) -> bool:
        r, g, b, a = px[x, y]
        if a == 0:
            return True
        return a < ALPHA_CEIL and g - max(r, b) > GREEN_MARGIN

    seen = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        i = y * w + x
        if not seen[i] and is_candidate(x, y):
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

    cleared = 0
    for y in range(h):
        row = y * w
        for x in range(w):
            if seen[row + x]:
                if px[x, y][3]:
                    cleared += 1
                px[x, y] = (0, 0, 0, 0)
    return im, cleared


def key_out_white(im: Image.Image) -> tuple[Image.Image, int]:
    """Flood-fill a plain white background away from the canvas border."""
    w, h = im.size
    px = im.load()

    def is_white(x: int, y: int) -> bool:
        r, g, b, a = px[x, y]
        if a == 0:
            return True
        return min(r, g, b) >= WHITE_FLOOR and max(r, g, b) - min(r, g, b) <= WHITE_NEUTRAL

    seen = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        i = y * w + x
        if not seen[i] and is_white(x, y):
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

    cleared = 0
    for y in range(h):
        row = y * w
        for x in range(w):
            if seen[row + x]:
                if px[x, y][3]:
                    cleared += 1
                px[x, y] = (0, 0, 0, 0)

    # Ramp the anti-aliased rim the flood stopped against, so the white the
    # renderer blended into those pixels does not read as a bright outline.
    span = WHITE_FLOOR - WHITE_EDGE
    for y in range(h):
        row = y * w
        for x in range(w):
            if seen[row + x]:
                continue
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            neighbour_clear = (
                (x > 0 and seen[row + x - 1])
                or (x < w - 1 and seen[row + x + 1])
                or (y > 0 and seen[row - w + x])
                or (y < h - 1 and seen[row + w + x])
            )
            if not neighbour_clear:
                continue
            m = min(r, g, b)
            if m <= WHITE_EDGE:
                continue
            px[x, y] = (r, g, b, int(a * (WHITE_FLOOR - m) / span))
            cleared += 1
    return im, cleared


def sweep_faint_border(im: Image.Image) -> int:
    """Second pass: clear the faint neutral frame/vignette baked into the edges.

    The source frames carry a dark blue-grey border vignette (~rgb(21,35,38))
    that is *not* green, so the chroma flood-fill leaves it behind and it keeps
    the alpha bbox pinned to the full canvas. Flood again from the border
    through pixels that are both translucent and very dark. Only the outer
    sub-pixel of the character's dark outline can qualify, and that is lost in
    the downscale.
    """
    w, h = im.size
    px = im.load()
    seen = bytearray(w * h)
    q: deque[tuple[int, int]] = deque()

    def push(x: int, y: int) -> None:
        i = y * w + x
        r, g, b, a = px[x, y]
        if not seen[i] and a < FAINT_CEIL and max(r, g, b) < FAINT_VALUE:
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

    cleared = 0
    for y in range(h):
        row = y * w
        for x in range(w):
            if seen[row + x] and px[x, y][3]:
                px[x, y] = (0, 0, 0, 0)
                cleared += 1
    return cleared


def alpha_bbox(im: Image.Image, threshold: int = 8):
    """Bounding box of pixels at or above `threshold` alpha."""
    alpha = im.getchannel("A").point(lambda v: 255 if v >= threshold else 0)
    return alpha.getbbox()


def despill(im: Image.Image) -> int:
    """Neutralise the green cast left on the anti-aliased character edge."""
    w, h = im.size
    px = im.load()
    touched = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            limit = (r + b) // 2
            if g - limit > GREEN_MARGIN:
                px[x, y] = (r, limit, b, a)
                touched += 1
    return touched


def main() -> None:
    print(f"{'file':16} {'before':>9} {'after':>9} {'size':>13}  cleared/despilled")
    for pose in POSES:
        src = os.path.join(SRC_DIR, f"mascot_{SRC_STEM.get(pose, pose)}.png")
        dst = os.path.join(OUT_DIR, f"mascot-{pose}.png")
        before = os.path.getsize(src)

        im = Image.open(src).convert("RGBA")
        if pose in WHITE_BG:
            im, cleared = key_out_white(im)
            spilled = 0
        else:
            im, cleared = key_out_background(im)
            cleared += sweep_faint_border(im)
            spilled = despill(im)

        bbox = alpha_bbox(im)
        if bbox:
            im = im.crop(bbox)
        im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
        im = im.quantize(colors=255, method=Image.Quantize.FASTOCTREE)
        im.save(dst, optimize=True)

        after = os.path.getsize(dst)
        print(
            f"mascot-{pose+'.png':10} {before/1e6:8.1f}M {after/1e3:8.0f}K "
            f"{str(im.size):>13}  {cleared:>9,} / {spilled:,}"
        )


if __name__ == "__main__":
    main()
