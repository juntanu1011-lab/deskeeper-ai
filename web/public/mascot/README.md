# public/mascot/ — drop the meerkat PNGs here

`components/brand/Mascot.tsx` reads `${assetBase}mascot-${pose}.png` with
`assetBase` defaulting to `/mascot/`, so every file below must sit directly in
this folder (same level as this README), already background-transparent with
no baked-in ground shadow (the shadow is applied in code via `filter:
drop-shadow(...)` in `Mascot.tsx` — do not re-add it to the art).

Required (used on the page today):

| File               | Used for                                                    |
| ------------------ | ------------------------------------------------------------ |
| `mascot-front.png` | Nav lockup (38px), Hero badge icon (20px), ScoreCard label (20px), Footer lockup (30px) — auto-swapped to `mascot-flat.png` at ≤44px |
| `mascot-flat.png`  | Flat silhouette used automatically for `front`/`watch` at ≤44px |
| `mascot-watch.png` | "How it works" speech-bubble aside (150px) — also auto-swaps to `flat` at ≤44px if used small |
| `mascot-slump.png` | "The problem" section, right side (340px, wide desk scene)   |
| `mascot-proud.png` | Waitlist success state after submit (84px)                   |
| `mascot-face.png`  | Head crop — reserved for OG image / round avatar use          |

Not referenced by the current page but supported by the `Mascot` component's
`pose` prop (`side`, `back`, `wave`, `think`, `cheer`, `desk`) — include them
too if you have them, so the full pose set is available for future sections:

- `mascot-side.png`
- `mascot-back.png`
- `mascot-wave.png`
- `mascot-think.png`
- `mascot-cheer.png`
- `mascot-desk.png`

Delete this README (or leave it — it's not imported by any code) once the
PNGs are in place.
