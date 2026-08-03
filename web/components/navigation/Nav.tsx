import type { HTMLAttributes, ReactNode, MouseEventHandler } from "react";
import { Wordmark } from "../brand/Wordmark";
import { Button } from "../core/Button";
import { Mascot } from "../brand/Mascot";

/* design.md §11 Nav — sticky, backdrop blur 10px, rgba(4,42,43,.75), --divider underline.
   Mascot + wordmark left, single primary CTA right. Nothing else. */
export interface NavProps extends HTMLAttributes<HTMLElement> {
  ctaLabel?: string;
  onCta?: MouseEventHandler<HTMLButtonElement>;
  /** Link target for the CTA instead of a click handler. Use on pages that are
   *  not the LP (e.g. /privacy), which are server components and cannot pass a
   *  handler down. Takes precedence over onCta. */
  ctaHref?: string;
  /** Where the wordmark goes. The nav carries no links besides the CTA, so on
   *  any page that is not the LP this is the only way back — leaving it inert
   *  strands the reader on /privacy. */
  homeHref?: string;
  mascot?: ReactNode;
}

export function Nav({
  ctaLabel = "Join the Waitlist",
  onCta,
  ctaHref,
  homeHref = "/",
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
        {/* base.css gives every <a> an amber, underlined hover — right for body
            copy, wrong for a lockup. Only the opacity shift is kept, so the
            wordmark reads as a link without changing colour. */}
        <a
          href={homeHref}
          aria-label="Kept — home"
          style={{ color: "inherit", textDecoration: "none", display: "inline-flex" }}
        >
          <Wordmark size="l" slot={mascot} />
        </a>
        {ctaHref ? (
          <Button size="s" as="a" href={ctaHref}>
            {ctaLabel}
          </Button>
        ) : (
          <Button size="s" onClick={onCta}>
            {ctaLabel}
          </Button>
        )}
      </div>
    </header>
  );
}
