import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Mascot } from "../brand/Mascot";

/* The score card is the app's real screen, shown on the LP.
   CRITICAL: the page ground and the app screen are now the same near-black, so
   without the bezel this dissolves into the background and the score reads as
   loose text floating on the page rather than something on a phone. The bezel,
   status bar and home indicator are what supply the edge. Don't strip them for
   tidiness while the page is dark.
   The amber wash behind the score is the single light source (a desk lamp), and
   is what gives the screen depth without a drop shadow. */
export interface ScoreCardProps extends HTMLAttributes<HTMLElement> {
  score?: number;
  duration?: string;
  subject?: string;
  label?: string;
  mascot?: ReactNode;
  footnote?: ReactNode;
}

const statusIcon: CSSProperties = { background: "rgba(237,239,243,.9)", borderRadius: 1 };

export function ScoreCard({
  score = 87,
  duration = "2h 14m",
  subject = "Math",
  label = "Deskeeper",
  mascot = <Mascot pose="front" size={18} />,
  footnote = "This card gets burned into your video.",
  style,
  ...rest
}: ScoreCardProps) {
  return (
    <figure style={{ margin: 0, display: "grid", gap: "var(--space-4)", justifyItems: "center", ...style }}>
      {/* bezel */}
      <div
        style={{
          padding: 9,
          borderRadius: 46,
          background: "linear-gradient(160deg,var(--device-bezel),var(--device-bezel-2))",
          boxShadow: "var(--shadow-device,var(--shadow-card))",
        }}
        {...rest}
      >
        {/* screen */}
        <div
          style={{
            position: "relative",
            width: 270,
            aspectRatio: "9 / 16",
            background: "var(--device-screen,var(--app-base))",
            borderRadius: 38,
            overflow: "hidden",
            display: "grid",
            gridTemplateRows: "auto auto 1fr auto auto",
          }}
        >
          {/* one light source — the desk lamp from 2a */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(120% 55% at 50% 18%,rgba(255,176,46,.20),rgba(255,176,46,.05) 45%,transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* status bar */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px 0",
              font: "700 12px/1 var(--font-num)",
              color: "var(--app-ink)",
            }}
          >
            <span style={{ fontVariantNumeric: "tabular-nums" }}>9:41</span>
            <span style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)", width: 62, height: 18, borderRadius: 999, background: "#000" }} />
            <span style={{ display: "flex", alignItems: "flex-end", gap: 3 }}>
              {[5, 7, 9, 11].map((h) => (
                <span key={h} style={{ ...statusIcon, width: 3, height: h }} />
              ))}
              <span style={{ ...statusIcon, width: 16, height: 9, marginLeft: 3, borderRadius: 2 }} />
            </span>
          </div>

          {/* app label */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 6, padding: "16px 20px 0" }}>
            {mascot}
            <span style={{ font: "700 12px/1 var(--font-body)", color: "var(--app-ink)", letterSpacing: "-0.01em" }}>
              {label}
            </span>
          </div>

          {/* score */}
          <div style={{ position: "relative", display: "grid", alignContent: "center", justifyItems: "center", gap: "var(--space-3)", padding: "0 24px" }}>
            <div
              style={{
                font: "700 11px/1 var(--font-num)",
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "rgba(255,176,46,.75)",
              }}
            >
              Focus score
            </div>
            <div
              style={{
                font: "800 76px/1 var(--font-num)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.04em",
                background: "linear-gradient(160deg,var(--app-warm-1),var(--app-warm-2))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {score}
            </div>
            <div style={{ width: 44, height: 1, background: "rgba(255,176,46,.35)" }} />
          </div>

          {/* duration */}
          <div
            style={{
              position: "relative",
              font: "600 14px/1 var(--font-num)",
              fontVariantNumeric: "tabular-nums",
              color: "rgba(237,239,243,.85)",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            {duration} · {subject}
          </div>

          {/* home indicator */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", padding: "22px 0 9px" }}>
            <span style={{ width: 108, height: 4, borderRadius: 999, background: "rgba(237,239,243,.35)" }} />
          </div>
        </div>
      </div>

      {footnote && (
        <figcaption
          style={{
            font: "500 var(--body-xs-size)/var(--body-xs-lh) var(--font-body)",
            color: "var(--sub)",
          }}
        >
          {footnote}
        </figcaption>
      )}
    </figure>
  );
}
