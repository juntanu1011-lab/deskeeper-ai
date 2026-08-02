"use client";

import { useState, type InputHTMLAttributes } from "react";

/* design.md §11 — email input: --panel fill, MEANINGFUL 1px --border (never --divider),
   pill radius, 14px 20px padding, --glow-focus ring on focus. */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({
  type = "email",
  placeholder = "your@email.com",
  invalid,
  style,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      onFocus={(e) => {
        setFocus(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocus(false);
        onBlur?.(e);
      }}
      style={{
        background: "var(--panel)",
        color: "var(--ink)",
        border: `1px solid ${invalid ? "var(--cta-border)" : "var(--border)"}`,
        borderRadius: "var(--radius-pill)",
        padding: "14px 20px",
        font: "500 var(--body-s-size)/1.2 var(--font-body)",
        outline: "none",
        width: "100%",
        minWidth: 0,
        boxShadow: focus ? "var(--glow-focus)" : "none",
        transition: "box-shadow var(--dur-hover) var(--ease-hover)",
        ...style,
      }}
      {...rest}
    />
  );
}
