import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

/* "Kept" set in Bricolage Grotesque 800 — pairs with whatever mascot asset is
   passed via `slot` (design.md §13 — 3D render at large sizes, flat silhouette at ~20px). */
export interface WordmarkProps extends Omit<HTMLAttributes<HTMLSpanElement>, "slot"> {
  size?: "s" | "m" | "l";
  /** Mascot artwork node, rendered to the left of the wordmark. Nothing is drawn if omitted. */
  slot?: ReactNode;
  color?: string;
}

export function Wordmark({
  size = "m",
  slot,
  color = "var(--ink)",
  style,
  ...rest
}: WordmarkProps) {
  const px = size === "l" ? 30 : size === "s" ? 17 : 22;
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
      <span
        style={
          {
            font: `800 ${px}px/1 var(--font-display)`,
            letterSpacing: "-0.015em",
            color,
          } as CSSProperties
        }
      >
        Kept
      </span>
    </span>
  );
}
