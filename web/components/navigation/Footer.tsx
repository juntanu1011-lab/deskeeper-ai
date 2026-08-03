import type { HTMLAttributes, ReactNode } from "react";
import { Wordmark } from "../brand/Wordmark";
import { Mascot } from "../brand/Mascot";

export interface FooterLink {
  label: string;
  href: string;
}

/* design.md §14.8 — mascot + wordmark, and the links. Nothing more.
   Every entry here must go somewhere real. There is deliberately no X link:
   the account it should point at (@santo_builds) does not exist yet, and a
   footer link that goes nowhere is worse than no link. Add it when the handle
   is live — sns/strategy.md §2 tracks that migration. */
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  links?: FooterLink[];
  mascot?: ReactNode;
  note?: ReactNode;
}

export function Footer({
  links = [
    { label: "Instagram", href: "https://www.instagram.com/kept.study/" },
    { label: "TikTok", href: "https://www.tiktok.com/@kept.study" },
    { label: "Privacy", href: "/privacy" },
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
          {links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <a
                key={l.label}
                href={l.href}
                // Social links leave the site; keep the LP in its own tab and
                // deny the opener handle to the destination.
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                style={{
                  font: "500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)",
                  color: "var(--sub)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            );
          })}
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
