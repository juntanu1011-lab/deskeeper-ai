import type { ImgHTMLAttributes } from "react";

/* The Kept meerkat (design.md §13). Six supplied poses, soft 3D-render style,
   transparent PNG. Colours are baked into the artwork and are never recoloured by the
   LP palette. Appears 3–4 times per page, maximum — nav, hero badge, footer.

   'desk' is a scene, not a bare pose: the meerkat at a desk watching a propped-up phone —
   the product in one image. Give it width, not a small mark slot.

   assetBase defaults to '/mascot/' — the files live in public/mascot/ in this Next.js
   app (NOT the design system's relative '../../assets/', which only resolved inside the
   Claude Design preview). Pass assetBase to override for other locations. */
/* 'flat' is the small-size silhouette (design.md §13) — use it at ~20px, where the 3D
   render's eyes and patches collapse into mud. 'watch' is the direct-eye-contact pose:
   the character noticing you. 'face' is the head crop for OG images and round avatars. */
const POSES = [
  "front",
  "side",
  "back",
  "wave",
  "think",
  "cheer",
  "desk",
  "watch",
  "flat",
  "face",
  "slump",
  "proud",
] as const;

export type MascotPose = (typeof POSES)[number];

export interface MascotProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * front (default), side, back, wave, think, cheer; 'watch' = direct eye contact with
   * the reader; 'flat' = flat silhouette for ~20px marks; 'face' = head crop for OG
   * images and round avatars; 'desk' = wide scene of the meerkat at a desk with a
   * propped-up phone; 'slump' = scene of the meerkat slumped at a desk, the reader's own
   * feeling; 'proud' = quiet thumbs-up for a real success moment.
   * At size <= 44, 'front' and 'watch' render 'flat' automatically.
   */
  pose?: MascotPose;
  /** Rendered height in px; width follows the artwork. Default 40. */
  size?: number;
  /** Path prefix to the mascot PNGs. Default '/mascot/' (public/mascot/ in this app). */
  assetBase?: string;
  /** Leave empty for decorative use — the image is then aria-hidden. */
  alt?: string;
}

export function Mascot({
  pose = "front",
  size = 40,
  assetBase = "/mascot/",
  alt = "",
  style,
  ...rest
}: MascotProps) {
  // Up to ~44px the flat silhouette reads better than the shrunken 3D render — keep
  // this branch; do not remove it even once next/image is wired up.
  const wanted = size <= 44 && (pose === "front" || pose === "watch") ? "flat" : pose;
  const p = POSES.includes(wanted as MascotPose) ? wanted : "front";
  return (
    // eslint-disable-next-line @next/next/no-img-element -- intrinsic size varies with
    // the `size` prop and the drop-shadow filter below is computed from it; a plain
    // <img> keeps that logic simple. Swap for next/image later if optimization matters.
    <img
      src={`${assetBase}mascot-${p}.png`}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      style={{
        height: size,
        width: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        display: "block",
        objectFit: "contain",
        // The artwork ships without its original white cast shadow; depth comes back as
        // a soft shadow in the page's own ground, so the character sits in the room
        // instead of looking pasted on. Do not bake a shadow into the PNGs themselves.
        filter: `drop-shadow(0 ${Math.round(size * 0.05)}px ${Math.round(size * 0.09)}px rgba(0,0,0,.6))`,
        ...style,
      }}
      {...rest}
    />
  );
}
