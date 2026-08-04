import type { HTMLAttributes, ReactNode } from "react";
import { Wordmark } from "../brand/Wordmark";

export interface FooterLink {
  label: string;
  href: string;
}

/* design.md §14.8 — mascot + wordmark, and the links. Nothing more.
   Every entry here must go somewhere real; these were all href="#" until the
   accounts behind them existed.

   Order is audience-first, not importance-first. A visitor here is a student
   who just read the page — Instagram and TikTok are where they can see the
   product (sns/strategy.md §1 puts TikTok as the acquisition ground). X is the
   build-in-public account, which serves a different reader, so it sits after
   them. Privacy stays last: it is an obligation, not an invitation. */
export interface FooterProps extends HTMLAttributes<HTMLElement> {
  links?: FooterLink[];
  mascot?: ReactNode;
  note?: ReactNode;
}

export function Footer({
  links = [
    { label: "Instagram", href: "https://www.instagram.com/kept.study/" },
    { label: "TikTok", href: "https://www.tiktok.com/@kept.study" },
    { label: "X", href: "https://x.com/santo_builds" },
    { label: "Privacy", href: "/privacy" },
  ],
  mascot,
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
        <Wordmark variant={mascot ? "slot" : "peek"} slot={mascot} />
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
