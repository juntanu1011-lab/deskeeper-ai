import type { HTMLAttributes, ReactNode } from "react";
import { Mascot } from "./Mascot";

/* The meerkat as a character, not an icon: a pose plus one short line in its own voice.
   Voice rule (design.md §13): strict, but never looking down on you — it notices, it
   doesn't nag, it is never sarcastic. One line only; if it needs two, it isn't the
   mascot's line, it's body copy. */
export interface MascotAsideProps extends HTMLAttributes<HTMLDivElement> {
  /** Pose that matches the moment: 'think' for the problem, 'side' for instructions, 'cheer' for success. */
  pose?: "front" | "side" | "back" | "wave" | "think" | "cheer" | "watch";
  /** Mascot height in px. Default 108. */
  size?: number;
  /** Which side the mascot stands on. Default 'left'. */
  side?: "left" | "right";
  /** One sentence, in the mascot's voice. */
  children?: ReactNode;
}

export function MascotAside({
  pose = "front",
  size = 108,
  side = "left",
  children,
  style,
  ...rest
}: MascotAsideProps) {
  const bubble = (
    <div
      style={{
        position: "relative",
        maxWidth: 320,
        background: "var(--panel)",
        border: "1px solid var(--divider)",
        borderRadius: "var(--radius-l)",
        padding: "16px 20px",
        font: "500 var(--body-s-size)/var(--body-s-lh) var(--font-body)",
        color: "var(--ink)",
        textWrap: "pretty",
      }}
    >
      {children}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          marginTop: -7,
          [side === "left" ? "left" : "right"]: -7,
          width: 12,
          height: 12,
          background: "var(--panel)",
          borderLeft: "1px solid var(--divider)",
          borderBottom: "1px solid var(--divider)",
          transform: side === "left" ? "rotate(45deg)" : "rotate(-135deg)",
        }}
      />
    </div>
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)",
        flexDirection: side === "left" ? "row" : "row-reverse",
        ...style,
      }}
      {...rest}
    >
      <Mascot pose={pose} size={size} />
      {bubble}
    </div>
  );
}
