# public/mascot/ — the meerkat PNGs

`components/brand/Mascot.tsx` reads `${assetBase}mascot-${pose}.png` with
`assetBase` defaulting to `/mascot/`, so every file below sits directly in this
folder. All of them are background-transparent with **no baked-in ground
shadow** — the shadow is applied in code via `filter: drop-shadow(...)` in
`Mascot.tsx`. Do not re-add it to the art.

The art is flat 2D (design.md §13). Source frames and the prompts that made
them live in `design/mascot-2d-trials/`; `clean_mascot.py` there is the
green-screen/white-background keying + trim + downscale pipeline that produced
everything in this folder. Re-run it rather than hand-editing these PNGs.

| File               | Used for                                                    |
| ------------------ | ----------------------------------------------------------- |
| `mascot-flat.png`  | Nav lockup (38px), Hero badge (20px), ScoreCard label (20–22px), Footer lockup (30px) |
| `mascot-watch.png` | "How it works" speech-bubble aside (150px) — hand-to-brow lookout, direct eye contact |
| `mascot-slump.png` | "The problem" section (340px, wide desk scene)              |
| `mascot-proud.png` | Waitlist success state (84px) and Score Lab result card     |
| `mascot-face.png`  | Head crop — reserved for OG image / round avatar use         |

Supported by the `pose` prop and present here, but not on the page today:
`side`, `back`, `wave`, `think`, `cheer`, `desk`.

Note on `front`: there is no `mascot-front.png`. Every `pose="front"` call site
renders at ≤44px, and `Mascot.tsx` swaps `front`/`watch` to `flat` at that size,
so the file is never requested. Add one only if `front` is ever used larger.
