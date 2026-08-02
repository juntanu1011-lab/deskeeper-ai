import type { HTMLAttributes } from "react";

/* design.md §6.2 'label' scale — Inter Tight 900, 0.08em, uppercase, --sub. */
export interface EyebrowProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "sub" | "warm" | "bright";
}

export function Eyebrow({ children, tone = "sub", style, ...rest }: EyebrowProps) {
  return (
    <div
      style={{
        font: "900 var(--label-size)/var(--label-lh) var(--font-num)",
        letterSpacing: "var(--label-ls)",
        textTransform: "uppercase",
        color: tone === "warm" ? "var(--warm)" : tone === "bright" ? "var(--bright)" : "var(--sub)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
