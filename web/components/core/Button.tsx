"use client";

import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from "react";

/* Primary CTA: amber fill, near-black label (--cta-ink). The label must NOT be
   --ink — cream on bright amber fails contrast. The 1px --cta-border keeps the
   pill's top edge from melting into the glow on hover. */
export interface ButtonProps {
  variant?: "primary" | "ghost" | "quiet";
  size?: "s" | "m" | "l";
  /** Renders a <button> (default) or an <a> — pass `href` when using "a". */
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  children?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "m",
  as = "button",
  href,
  disabled,
  children,
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const pad = size === "l" ? "15px 28px" : size === "s" ? "9px 18px" : "13px 24px";
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    font: `${size === "s" ? "700 13px" : "700 var(--body-s-size)"}/1.2 var(--font-body)`,
    padding: pad,
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid transparent",
    whiteSpace: "nowrap",
    textDecoration: "none",
    opacity: disabled ? 0.45 : 1,
    transition:
      "background var(--dur-hover) var(--ease-hover), box-shadow var(--dur-hover) var(--ease-hover), color var(--dur-hover) var(--ease-hover), border-color var(--dur-hover) var(--ease-hover), transform var(--dur-press) var(--ease-press)",
    transform: press && !disabled ? "scale(.97)" : "none",
  };
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: hover && !disabled ? "var(--cta-hover)" : "var(--cta)",
      borderColor: "var(--cta-border)",
      color: "var(--cta-ink,var(--ink))",
      boxShadow: hover && !disabled ? "var(--glow-hover)" : "none",
    },
    ghost: {
      background: "transparent",
      borderColor: hover && !disabled ? "var(--bright)" : "var(--border)",
      color: hover && !disabled ? "var(--bright)" : "var(--ink)",
    },
    quiet: {
      background: "transparent",
      borderColor: "transparent",
      color: hover ? "var(--ink)" : "var(--sub)",
    },
  };
  // `as` picks between two intrinsic elements with non-overlapping prop sets (only
  // <button> takes `disabled`, only <a> takes `href`); typing that precisely isn't worth
  // the complexity for a two-way toggle, so this one spot is intentionally loose.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as === "a" ? "a" : "button") as any;
  return (
    <Tag
      href={as === "a" ? href : undefined}
      disabled={as === "button" ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
