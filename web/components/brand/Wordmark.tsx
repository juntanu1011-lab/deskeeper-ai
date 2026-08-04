import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/* Geometry of mascot-peek.png (549x920), the meerkat leaning out from behind a
   vertical edge. The artwork already ends in that straight edge: everything left of
   PEEK_CUT is its body, and the head and gripping hand stick out to the right of it.
   Line that edge up with the left stem of the "K" and the character reads as hiding
   behind the wordmark. All three numbers are measured, not tuned by eye — re-measure
   if the artwork is ever re-exported. */
const PEEK_AR = 549 / 920; // width / height of the trimmed artwork
const PEEK_CUT = 0.832; // the implied edge, as a fraction of the artwork's width
const K_BEARING = 0.055; // left side bearing of Bricolage Grotesque 800 "K", in em
const PEEK_HEIGHT = 1.3; // mascot height, in em of the wordmark
/* Distance from the bottom of the slot box to the mascot's feet, in em. The mascot is
   taller than the box and deliberately overflows it: the box keeps the lockup's layout
   height identical to the older mascot-beside-wordmark version, so the nav does not grow
   and LandingPage's `100svh - 68px` hero still fits. */
const PEEK_FEET = 0.14;

/* Pull the wordmark left so the "K" stem lands exactly on the artwork's edge:
   the image occupies [0, w], the edge sits at PEEK_CUT * w, and the text then has to
   start K_BEARING before it. */
const PEEK_WIDTH = PEEK_HEIGHT * PEEK_AR;
const PEEK_PULL = -((1 - PEEK_CUT) * PEEK_WIDTH) - K_BEARING;

/* "Kept" set in Bricolage Grotesque 800.
   - variant="peek" (nav, footer): the meerkat leans out from behind the K. One lockup,
     not two elements side by side.
   - variant="slot": the older layout — whatever mascot node is passed sits to the left
     of the wordmark with a gap. Kept for callers that want a different pose. */
export interface WordmarkProps extends Omit<HTMLAttributes<HTMLSpanElement>, "slot"> {
  size?: "s" | "m" | "l";
  variant?: "peek" | "slot";
  /** Mascot artwork node, rendered to the left of the wordmark. variant="slot" only. */
  slot?: ReactNode;
  color?: string;
  /** Path prefix to the mascot PNGs. Default '/mascot/' (public/mascot/ in this app). */
  assetBase?: string;
}

export function Wordmark({
  size = "m",
  variant = "slot",
  slot,
  color = "var(--ink)",
  assetBase = "/mascot/",
  style,
  ...rest
}: WordmarkProps) {
  const px = size === "l" ? 30 : size === "s" ? 17 : 22;
  const type = {
    font: `800 ${px}px/1 var(--font-display)`,
    letterSpacing: "-0.015em",
    color,
  } as CSSProperties;

  if (variant === "peek") {
    return (
      <span
        style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", ...style }}
        {...rest}
      >
        <span
          style={{
            position: "relative",
            display: "inline-block",
            flex: "none",
            width: PEEK_WIDTH * px,
            height: px + 4,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- sized in em of the
              wordmark and overflowing its box on purpose; next/image cannot express
              either without hard-coding pixels per call site. */}
          <img
            src={`${assetBase}mascot-peek.png`}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              bottom: PEEK_FEET * px,
              height: PEEK_HEIGHT * px,
              width: "auto",
              maxWidth: "none",
              /* Paints over the K's stem so the hand grips it instead of disappearing
                 behind it. The shadow is what makes that overlap read as depth. */
              filter: `drop-shadow(0 ${Math.round(px * 0.04)}px ${Math.round(px * 0.08)}px rgba(0,0,0,.55))`,
            }}
          />
        </span>
        <span style={{ ...type, marginLeft: PEEK_PULL * px }}>Kept</span>
      </span>
    );
  }

  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)", ...style }}
      {...rest}
    >
      {slot ? (
        <span
          style={{
            display: "inline-flex",
            width: px + 4,
            height: px + 4,
            alignItems: "center",
          }}
        >
          {slot}
        </span>
      ) : null}
      <span style={type}>Kept</span>
    </span>
  );
}
