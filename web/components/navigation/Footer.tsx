import type { HTMLAttributes, ReactNode } from "react";
import { Wordmark } from "../brand/Wordmark";
import { Mascot } from "../brand/Mascot";

export interface FooterLink {
  label: string;
  href: string;
}

/* design.md §14.8 — mascot + wordmark, and two links. Nothing more. */
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  links?: FooterLink[];
  mascot?: ReactNode;
  note?: ReactNode;
}

export function Footer({
  links = [
    { label: "X / Twitter", href: "#" },
    { label: "Privacy", href: "#" },
  ],
  mascot = <Mascot pose="front" size={30} />,
  note,
  style,
  ...rest
}: FooterProps) {
  return (
    <footer style={{ borderTop: "1px solid var(--divider)", ...style }} {...rest}>
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "var(--space-8) var(--page-margin)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
        }}
      >
        <Wordmark slot={mascot} />
        <nav style={{ display: "flex", gap: "var(--space-6)" }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                font: "500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)",
                color: "var(--sub)",
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      {note && (
        <div
          style={{
            maxWidth: "var(--content-max)",
            margin: "0 auto",
            padding: "0 var(--page-margin) var(--space-8)",
            font: "500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)",
            color: "var(--sub)",
            opacity: 0.7,
          }}
        >
          {note}
        </div>
      )}
    </footer>
  );
}
