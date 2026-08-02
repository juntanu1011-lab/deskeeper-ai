import type { HTMLAttributes, ReactNode, MouseEventHandler } from "react";
import { Wordmark } from "../brand/Wordmark";
import { Button } from "../core/Button";
import { Mascot } from "../brand/Mascot";

/* design.md §11 Nav — sticky, backdrop blur 10px, rgba(4,42,43,.75), --divider underline.
   Mascot + wordmark left, single primary CTA right. Nothing else. */
export interface NavProps extends HTMLAttributes<HTMLElement> {
  ctaLabel?: string;
  onCta?: MouseEventHandler<HTMLButtonElement>;
  mascot?: ReactNode;
}

export function Nav({
  ctaLabel = "Join the Waitlist",
  onCta,
  mascot = <Mascot pose="front" size={38} />,
  style,
  ...rest
}: NavProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "var(--nav-bg)",
        backdropFilter: "var(--nav-blur)",
        WebkitBackdropFilter: "var(--nav-blur)",
        borderBottom: "1px solid var(--divider)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          padding: "16px var(--page-margin)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
        }}
      >
        <Wordmark slot={mascot} />
        <Button size="s" onClick={onCta}>
          {ctaLabel}
        </Button>
      </div>
    </header>
  );
}
