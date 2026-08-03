import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { Mascot } from "../brand/Mascot";

/* The score card is the app's real screen, shown on the LP.
   CRITICAL: the page ground and the app screen are the same near-black, so
   without the device frame this dissolves into the background and the score
   reads as loose text floating on the page rather than something on a phone.
   The frame, status bar and home indicator are what supply the edge. Don't
   strip them for tidiness while the page is dark.

   The screen contents mirror the leading direction from /score-lab (D2c:
   score + continuous focus trace + mascot). If that lab picks a different
   variant, update this to match — the LP must show the real screen.

   Rendered at true iPhone logical size (390 x 844, 19.5:9) and scaled down
   with a transform, so proportions stay identical to the lab and the phone
   never reads as a squat 9:16 slab again. */

const SCREEN_W = 390;
const SCREEN_H = 844;
const BEZEL = 10; // black glass border between metal rim and pixels
const RIM = 5; // titanium band
const DEVICE_W = SCREEN_W + 2 * (BEZEL + RIM);
const DEVICE_H = SCREEN_H + 2 * (BEZEL + RIM);

/* --- session data burned into the demo screen (same session as /score-lab) --- */
const DIPS = [
  { at: 5, depth: 54, width: 1.1 },
  { at: 13, depth: 74, width: 2.0 },
  { at: 28, depth: 44, width: 0.9 },
  { at: 35, depth: 63, width: 1.4 },
];
const POINTS = 44;
const TRACE = Array.from({ length: POINTS }, (_, i) => {
  let v = 97 - 15 * (i / (POINTS - 1)) + 3.2 * Math.sin(i * 0.47) + 1.6 * Math.sin(i * 1.31);
  for (const d of DIPS) v -= d.depth * Math.exp(-((i - d.at) ** 2) / (2 * d.width ** 2));
  return Math.max(6, Math.min(100, v));
});

/* Catmull-Rom → cubic bezier, so the trace is smooth without a chart library. */
function smoothPath(values: number[], w: number, h: number) {
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - (v / 100) * h] as const);
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return { d, pts };
}

/* Physical side buttons. Positions are logical pts eyeballed from an iPhone 15;
   they sit at zIndex 0 so the rim (zIndex 1) covers all but the protruding lip. */
function sideButton(side: "left" | "right", top: number, height: number): CSSProperties {
  return {
    position: "absolute",
    [side]: -2.5,
    top,
    width: 5,
    height,
    borderRadius: 2.5,
    background:
      side === "left"
        ? "linear-gradient(90deg,#3A3E48,#20242C)"
        : "linear-gradient(90deg,#20242C,#3A3E48)",
    zIndex: 0,
  };
}

export interface ScoreCardProps extends HTMLAttributes<HTMLElement> {
  score?: number;
  duration?: string;
  subject?: string;
  label?: string;
  mascot?: ReactNode;
  footnote?: ReactNode;
  /** Rendered device width in px (frame included). Default 300. */
  width?: number;
}

const statusIcon: CSSProperties = { background: "rgba(237,239,243,.9)", borderRadius: 1 };

export function ScoreCard({
  score = 87,
  duration = "2h 14m",
  subject = "Math",
  label = "Kept",
  mascot = <Mascot pose="front" size={22} />,
  footnote = "This card gets burned into your video.",
  width = 300,
  style,
  ...rest
}: ScoreCardProps) {
  const s = width / DEVICE_W;
  const { d, pts } = smoothPath(TRACE, 342, 104);
  return (
    <figure style={{ margin: 0, display: "grid", gap: "var(--space-4)", justifyItems: "center", ...style }}>
      {/* scaled stage — reserves the on-page footprint */}
      <div style={{ width: DEVICE_W * s, height: DEVICE_H * s }}>
        <div
          style={{
            width: DEVICE_W,
            height: DEVICE_H,
            position: "relative",
            transform: `scale(${s})`,
            transformOrigin: "top left",
          }}
          {...rest}
        >
          {/* physical buttons — action, volume up/down (left), power (right) */}
          <span aria-hidden style={sideButton("left", 210, 34)} />
          <span aria-hidden style={sideButton("left", 274, 64)} />
          <span aria-hidden style={sideButton("left", 350, 64)} />
          <span aria-hidden style={sideButton("right", 306, 102)} />

          {/* titanium rim */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              padding: RIM,
              borderRadius: 62,
              background:
                "linear-gradient(160deg,#4C515C 0%,var(--device-bezel) 24%,var(--device-bezel-2) 58%,#383D47 100%)",
              boxShadow:
                "var(--shadow-device,var(--shadow-card)), inset 0 1px 1px rgba(255,255,255,.28), inset 0 -1px 1px rgba(255,255,255,.10)",
            }}
          >
            {/* black glass border */}
            <div style={{ height: "100%", padding: BEZEL, borderRadius: 57, background: "#050608" }}>
              {/* screen */}
              <div
                style={{
                  position: "relative",
                  width: SCREEN_W,
                  height: SCREEN_H,
                  background: "var(--device-screen,var(--app-base))",
                  borderRadius: 47,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  padding: "14px 24px 12px",
                }}
              >
                {/* one light source — the desk lamp */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(110% 42% at 50% 14%,rgba(255,176,46,.20),rgba(255,176,46,.05) 45%,transparent 70%)",
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
                    padding: "0 6px",
                    font: "700 15px/1 var(--font-num)",
                    color: "var(--app-ink)",
                  }}
                >
                  <span style={{ fontVariantNumeric: "tabular-nums" }}>9:41</span>
                  <span style={{ display: "flex", alignItems: "flex-end", gap: 2.5 }}>
                    {[5, 8, 11, 14].map((h) => (
                      <span key={h} style={{ ...statusIcon, width: 3.5, height: h }} />
                    ))}
                    <span style={{ ...statusIcon, width: 22, height: 12, marginLeft: 4, borderRadius: 3 }} />
                  </span>
                </div>

                {/* Dynamic Island, with the front camera's lens glint */}
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 11,
                    transform: "translateX(-50%)",
                    width: 122,
                    height: 36,
                    borderRadius: 999,
                    background: "#000",
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      right: 11,
                      top: 11,
                      width: 14,
                      height: 14,
                      borderRadius: 999,
                      background: "radial-gradient(circle at 35% 32%,#233240,#060B11 68%)",
                    }}
                  />
                </span>

                {/* app label */}
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 7, paddingTop: 26 }}>
                  {mascot}
                  <span style={{ font: "700 15px/1 var(--font-body)", color: "var(--app-ink)", letterSpacing: "-0.01em" }}>
                    {label}
                  </span>
                </div>

                {/* score, with the session's headline facts directly under it.
                    Duration and subject used to sit below the trace at 17px,
                    which at the LP's 300px render is ~12px — unreadable, and it
                    read as a chart footnote rather than as half of what the user
                    came to see. They belong in the same stack as the number. */}
                <div style={{ position: "relative", display: "grid", justifyItems: "center", gap: 14, marginTop: 48 }}>
                  <div
                    style={{
                      font: "700 12px/1 var(--font-num)",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "rgba(255,176,46,.75)",
                    }}
                  >
                    Focus score
                  </div>
                  <div
                    style={{
                      font: "800 132px/0.88 var(--font-num)",
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "center",
                      flexWrap: "wrap",
                      gap: 10,
                      maxWidth: "100%",
                      marginTop: 4,
                      font: "500 29px/1.15 var(--font-num)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    <span style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums", color: "var(--app-ink)" }}>
                      {duration}
                    </span>
                    <span aria-hidden style={{ color: "rgba(237,239,243,.35)" }}>
                      ·
                    </span>
                    <span style={{ color: "rgba(237,239,243,.72)" }}>{subject}</span>
                  </div>
                </div>

                {/* focus trace — the session's shape; dips marked quietly, never red */}
                <div style={{ position: "relative", marginTop: 40 }}>
                  <svg width={342} height={104} viewBox="0 0 342 104" style={{ display: "block", overflow: "visible" }}>
                    <defs>
                      <linearGradient id="sc-stroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#FFB02E" />
                        <stop offset="100%" stopColor="#FF7A45" />
                      </linearGradient>
                      <linearGradient id="sc-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,176,46,.34)" />
                        <stop offset="100%" stopColor="rgba(255,176,46,0)" />
                      </linearGradient>
                    </defs>
                    <path d={`${d} L 342 104 L 0 104 Z`} fill="url(#sc-fill)" />
                    <path d={d} fill="none" stroke="url(#sc-stroke)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                    {DIPS.map((dp) => {
                      const p = pts[Math.round(dp.at)];
                      return (
                        <circle
                          key={dp.at}
                          cx={p[0]}
                          cy={p[1]}
                          r="3.4"
                          fill="var(--device-screen)"
                          stroke="rgba(237,239,243,.5)"
                          strokeWidth="1.6"
                        />
                      );
                    })}
                  </svg>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 14,
                      font: "500 15px/1 var(--font-num)",
                      color: "rgba(237,239,243,.5)",
                    }}
                  >
                    <span>19:50</span>
                    <span>{DIPS.length} breaks</span>
                    <span>22:04</span>
                  </div>
                </div>

                {/* the meerkat lives in the space the 19.5:9 screen leaves under the chart */}
                <div style={{ position: "relative", marginTop: "auto", display: "grid", justifyItems: "center", paddingBottom: 2 }}>
                  <Mascot pose="proud" size={168} />
                </div>

                {/* Share pill — the app's real CTA on this screen, so it uses the
                    same flat --cta amber as every button on the page. It was an
                    amber→orange gradient, which made the one CTA in the mock the
                    only button on the LP that wasn't a solid fill. */}
                <div
                  style={{
                    position: "relative",
                    marginTop: 14,
                    background: "var(--cta)",
                    color: "var(--cta-ink)",
                    font: "700 17px/1 var(--font-body)",
                    textAlign: "center",
                    padding: "19px 0",
                    borderRadius: 999,
                  }}
                >
                  Make it a video →
                </div>

                {/* home indicator */}
                <div style={{ position: "relative", display: "flex", justifyContent: "center", paddingTop: 14 }}>
                  <span style={{ width: 140, height: 5, borderRadius: 999, background: "rgba(237,239,243,.35)" }} />
                </div>

                {/* glass sheen — kept faint so it reads as glass, not gloss */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(118deg,rgba(255,255,255,.05) 0%,rgba(255,255,255,.015) 26%,transparent 40%)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />
              </div>
            </div>
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
