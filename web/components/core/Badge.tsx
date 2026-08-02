import type { HTMLAttributes, ReactNode } from "react";

/* design.md §11 — Vanilla Custard badge. --warm is the rarest colour in the system:
   3–4 appearances per page, maximum. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  icon?: ReactNode;
}

export function Badge({ children, icon, style, ...rest }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        background: "var(--badge-bg)",
        border: "1px solid var(--badge-border)",
        color: "var(--warm)",
        borderRadius: "var(--radius-pill)",
        padding: "6px 14px",
        font: "700 var(--badge-size)/var(--badge-lh) var(--font-body)",
        letterSpacing: "var(--badge-ls)",
        textTransform: "uppercase",
        ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
