"use client";

import { useState } from "react";

export interface FaqItem {
  q: string;
  a: string;
}

/* design.md §11 — divider-ruled list; the "+" rotates 45° into an "×". 300ms ease. */
function Row({
  q,
  a,
  open,
  onToggle,
  id,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  id: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--divider)" }}>
      <button
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "20px 0",
          textAlign: "left",
          font: "800 var(--display-s-size)/var(--display-s-lh) var(--font-display)",
          color: hover || open ? "var(--bright)" : "var(--ink)",
          transition: "color var(--dur-hover) var(--ease-hover)",
        }}
      >
        <span>{q}</span>
        <span
          style={{
            flex: "0 0 auto",
            width: 24,
            height: 24,
            display: "grid",
            placeItems: "center",
            font: "400 22px/1 var(--font-body)",
            color: open ? "var(--bright)" : "var(--sub)",
            transform: open ? "rotate(45deg)" : "none",
            transition:
              "transform var(--dur-accordion) var(--ease-accordion), color var(--dur-hover) var(--ease-hover)",
          }}
        >
          +
        </span>
      </button>
      <div
        id={id}
        role="region"
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows var(--dur-accordion) var(--ease-accordion)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              margin: 0,
              paddingBottom: open ? 20 : 0,
              maxWidth: 640,
              font: "500 var(--body-s-size)/var(--body-s-lh) var(--font-body)",
              color: "var(--sub)",
              textWrap: "pretty",
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion({
  items = [],
  defaultOpen = -1,
}: {
  items?: FaqItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: "1px solid var(--divider)" }}>
      {items.map((it, i) => (
        <Row
          key={i}
          id={`faq-panel-${i}`}
          q={it.q}
          a={it.a}
          open={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
