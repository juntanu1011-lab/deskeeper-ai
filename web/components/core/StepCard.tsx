"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/* design.md §11 Card/Step — --panel fill, 1px --divider (decorative edge, this card
   is not pressable), --radius-l, 24px padding. Numeral → heading → body. */
export interface StepCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  number?: string;
  title?: ReactNode;
}

export function StepCard({ number, title, children, style, ...rest }: StepCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "var(--panel2)" : "var(--panel)",
        border: "1px solid var(--divider)",
        borderRadius: "var(--radius-l)",
        padding: "var(--card-pad)",
        display: "grid",
        gap: "var(--space-3)",
        alignContent: "start",
        transition: "background var(--dur-hover) var(--ease-hover)",
        ...style,
      }}
      {...rest}
    >
      {number && <Eyebrow tone="warm">{number}</Eyebrow>}
      <h3
        style={{
          margin: 0,
          font: "800 var(--display-s-size)/var(--display-s-lh) var(--font-display)",
          color: "var(--ink)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          font: "500 var(--body-s-size)/var(--body-s-lh) var(--font-body)",
          color: "var(--sub)",
          textWrap: "pretty",
        }}
      >
        {children}
      </p>
    </div>
  );
}
