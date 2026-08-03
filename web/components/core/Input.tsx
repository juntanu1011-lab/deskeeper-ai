"use client";

import { useState, type InputHTMLAttributes } from "react";

/* design.md §11 — email input: --panel fill, MEANINGFUL 1px --border (never --divider),
   pill radius, 14px 20px padding, --glow-focus ring on focus.

   The font-size floor of 16px is load-bearing, not a style choice. iOS Safari
   zooms the viewport in when a focused input renders below 16px, and the page
   does not zoom back out on blur — so tapping the email field threw the layout
   off for the rest of the visit. --body-s-size bottoms out at 14.5px on a phone
   (its 1.05vw term is ~4px at 390px wide), which is under that threshold.
   max() keeps the desktop size intact and only lifts the small end.

   Do NOT "fix" this with maximum-scale=1 / user-scalable=no on the viewport.
   That stops the zoom by taking pinch-zoom away from everyone, which is an
   accessibility failure — and this input is on the one screen that has to work. */
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
        fontFamily: "var(--font-body)",
        fontWeight: 500,
        fontSize: "max(16px, var(--body-s-size))",
        lineHeight: 1.2,
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
