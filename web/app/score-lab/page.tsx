/* TEMPORARY exploration route — /score-lab
   Four score-screen layouts at true iPhone logical size (390 x 844), plus a
   feed-thumbnail row to test the "burned into a share video" requirement.
   Delete this route once a direction is chosen. */
import type { CSSProperties, ReactNode } from "react";
import { notFound } from "next/navigation";
import { Mascot } from "../../components/brand/Mascot";

/* iPhone 14/15/16 logical viewport. 19.5:9 — much taller than the 9:16 the
   first pass used, which is why the earlier mocks read as a squat old phone. */
const SCREEN_W = 390;
const SCREEN_H = 844;
const BEZEL = 11;

const SCORE = 87;
const DURATION = "2h 14m";
const SUBJECT = "Math";

/* 24 slices of the session; the dim ones are where focus broke. Never red,
   never called a failure — just the shape of the two hours. */
const SLICES = [3, 3, 3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 1, 3, 3];

/* Continuous focus trace for the line variant. Same session as SLICES: a high
   baseline with four dips where attention broke. Built from gaussians so the
   curve reads as a real signal rather than a zigzag. */
/* Irregular on purpose. Evenly spaced dips of equal depth read as decoration —
   a sine wave — not as a record of a session. Depths and spacing differ, and
   the baseline drifts down over the two hours the way attention actually does. */
const DIPS = [
  { at: 5, depth: 54, width: 1.1 },
  { at: 13, depth: 74, width: 2.0 },
  { at: 28, depth: 44, width: 0.9 },
  { at: 35, depth: 63, width: 1.4 },
];
const POINTS = 44;
const TRACE = Array.from({ length: POINTS }, (_, i) => {
  const t = i / (POINTS - 1);
  let v = 97 - 15 * t + 3.2 * Math.sin(i * 0.47) + 1.6 * Math.sin(i * 1.31);
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

const pill: CSSProperties = {
  marginTop: "auto",
  background: "linear-gradient(100deg,var(--app-warm-1),var(--app-warm-2))",
  color: "var(--cta-ink)",
  font: "700 17px/1 var(--font-body)",
  textAlign: "center",
  padding: "19px 0",
  borderRadius: 999,
};

function Phone({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <figure style={{ margin: 0, display: "grid", gap: 12, justifyItems: "center" }}>
      <div
        style={{
          padding: BEZEL,
          borderRadius: 58,
          background: "linear-gradient(160deg,var(--device-bezel),var(--device-bezel-2))",
          boxShadow: "var(--shadow-device)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: SCREEN_W,
            height: SCREEN_H,
            background: "var(--device-screen)",
            borderRadius: 47,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            padding: "14px 24px 12px",
          }}
        >
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
              font: "700 15px/1 var(--font-num)",
              color: "var(--app-ink)",
              padding: "0 6px",
            }}
          >
            <span>9:41</span>
            <span style={{ position: "absolute", left: "50%", top: -4, transform: "translateX(-50%)", width: 92, height: 30, borderRadius: 999, background: "#000" }} />
            <span style={{ display: "flex", alignItems: "flex-end", gap: 2.5 }}>
              {[5, 8, 11, 14].map((h) => (
                <span key={h} style={{ width: 3.5, height: h, background: "rgba(237,239,243,.9)", borderRadius: 1 }} />
              ))}
              <span style={{ width: 22, height: 12, marginLeft: 4, borderRadius: 3, background: "rgba(237,239,243,.9)" }} />
            </span>
          </div>
          {/* app label */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 7, paddingTop: 26 }}>
            <Mascot pose="front" size={22} />
            <span style={{ font: "700 15px/1 var(--font-body)", color: "var(--app-ink)" }}>Kept</span>
          </div>
          {/* body */}
          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", paddingTop: 18 }}>
            {children}
          </div>
          {/* home indicator */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", paddingTop: 14 }}>
            <span style={{ width: 140, height: 5, borderRadius: 999, background: "rgba(237,239,243,.35)" }} />
          </div>
        </div>
      </div>
      {label && <figcaption style={{ font: "600 13px/1.4 var(--font-body)", color: "var(--sub)" }}>{label}</figcaption>}
    </figure>
  );
}

const eyebrow: CSSProperties = {
  font: "700 12px/1 var(--font-num)",
  letterSpacing: ".18em",
  textTransform: "uppercase",
  color: "rgba(255,176,46,.75)",
  textAlign: "center",
};
const meta: CSSProperties = {
  font: "600 17px/1 var(--font-num)",
  color: "rgba(237,239,243,.85)",
  textAlign: "center",
};
const amberText: CSSProperties = {
  background: "linear-gradient(160deg,var(--app-warm-1),var(--app-warm-2))",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  fontVariantNumeric: "tabular-nums",
};

/* A — the number carries the whole screen. */
function BigNumber() {
  return (
    <>
      <div style={{ display: "grid", justifyItems: "center", gap: 16, marginTop: 92 }}>
        <div style={eyebrow}>Focus score</div>
        <div style={{ ...amberText, font: "800 168px/0.86 var(--font-num)", letterSpacing: "-0.045em" }}>{SCORE}</div>
        <div style={{ width: 56, height: 1, background: "rgba(255,176,46,.35)" }} />
      </div>
      <div style={{ ...meta, marginTop: 44 }}>
        {DURATION} · {SUBJECT}
      </div>
      <div style={pill}>Make it a video →</div>
    </>
  );
}

/* B — ring. Distinctive silhouette even when shrunk. */
function Gauge() {
  const r = 108;
  const c = 2 * Math.PI * r;
  const S = 250;
  return (
    <>
      <div style={{ display: "grid", justifyItems: "center", marginTop: 72 }}>
        <div style={{ position: "relative", width: S, height: S }}>
          <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFB02E" />
                <stop offset="100%" stopColor="#FF7A45" />
              </linearGradient>
            </defs>
            <circle cx={S / 2} cy={S / 2} r={r} fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="14" />
            <circle
              cx={S / 2}
              cy={S / 2}
              r={r}
              fill="none"
              stroke="url(#g)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${(c * SCORE) / 100} ${c}`}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeContent: "center", justifyItems: "center", gap: 8 }}>
            <div style={{ ...amberText, font: "800 92px/1 var(--font-num)", letterSpacing: "-0.035em" }}>{SCORE}</div>
            <div style={eyebrow}>Focus</div>
          </div>
        </div>
      </div>
      <div style={{ ...meta, marginTop: 44 }}>
        {DURATION} · {SUBJECT}
      </div>
      <div style={pill}>Make it a video →</div>
    </>
  );
}

/* C — letter rank. Grades the person, which the product said it would not do.
   Kept so the trade-off is visible side by side. */
function Rank() {
  return (
    <>
      <div style={{ display: "grid", justifyItems: "center", gap: 10, marginTop: 84 }}>
        <div style={eyebrow}>Rank</div>
        <div style={{ ...amberText, font: "800 210px/0.82 var(--font-display)", letterSpacing: "-0.05em" }}>A</div>
        <div style={{ font: "600 18px/1 var(--font-num)", color: "rgba(237,239,243,.6)", fontVariantNumeric: "tabular-nums", marginTop: 6 }}>
          {SCORE} / 100
        </div>
      </div>
      <div style={{ ...meta, marginTop: 44 }}>
        {DURATION} · {SUBJECT}
      </div>
      <div style={pill}>Make it a video →</div>
    </>
  );
}

/* D — the session's shape. Breaks are dimmer slices and a plain count. */
function Waveform() {
  const breaks = SLICES.filter((s) => s === 1).length;
  return (
    <>
      <div style={{ display: "grid", justifyItems: "center", gap: 14, marginTop: 56 }}>
        <div style={eyebrow}>Focus score</div>
        <div style={{ ...amberText, font: "800 132px/0.88 var(--font-num)", letterSpacing: "-0.04em" }}>{SCORE}</div>
      </div>
      <div style={{ marginTop: 48 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 92 }}>
          {SLICES.map((s, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: s === 1 ? "34%" : "100%",
                borderRadius: 2.5,
                background:
                  s === 1
                    ? "rgba(237,239,243,.16)"
                    : "linear-gradient(180deg,var(--app-warm-1),rgba(255,122,69,.75))",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, font: "500 13px/1 var(--font-num)", color: "rgba(237,239,243,.45)" }}>
          <span>19:50</span>
          <span>{breaks} breaks</span>
          <span>22:04</span>
        </div>
      </div>
      <div style={{ ...meta, marginTop: 40 }}>
        {DURATION} · {SUBJECT}
      </div>
      <div style={pill}>Make it a video →</div>
    </>
  );
}

/* D2 — the same session as a continuous line instead of discrete bars.
   Stroke is deliberately heavy (4.5): at feed-thumbnail scale a 3px line
   collapses to under a pixel and the chart stops registering. */
/* Observational, not evaluative. Derived from the session's own shape — the
   rendered trace really does start high and drift down — so it says something
   only this product can say. Never praise, never scold, never compare.
   Deliberately NOT amber: that is reserved for the score and for tap targets. */
const COMMENT = "Deepest in the first 40 minutes.";

const commentStyle: CSSProperties = {
  font: "500 15px/1.45 var(--font-body)",
  color: "rgba(237,239,243,.62)",
  textAlign: "center",
};

function LineTrace({
  mascot = "none",
  comment = "none",
}: {
  mascot?: "none" | "center" | "right";
  comment?: "none" | "above" | "below" | "bubble";
}) {
  const W = 342;
  const H = 104;
  const { d, pts } = smoothPath(TRACE, W, H);
  const area = `${d} L ${W} ${H} L 0 ${H} Z`;
  const breaks = DIPS.length;
  const hasMascot = mascot !== "none";
  return (
    <>
      <div style={{ display: "grid", justifyItems: "center", gap: 14, marginTop: hasMascot ? 34 : 56 }}>
        <div style={eyebrow}>Focus score</div>
        <div style={{ ...amberText, font: "800 132px/0.88 var(--font-num)", letterSpacing: "-0.04em" }}>{SCORE}</div>
      </div>
      <div style={{ marginTop: hasMascot ? 34 : 48 }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
          <defs>
            <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFB02E" />
              <stop offset="100%" stopColor="#FF7A45" />
            </linearGradient>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,176,46,.34)" />
              <stop offset="100%" stopColor="rgba(255,176,46,0)" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#fill)" />
          <path d={d} fill="none" stroke="url(#stroke)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* the dips, marked quietly — a fact, not a scolding */}
          {DIPS.map((dp) => {
            const p = pts[Math.round(dp.at)];
            return <circle key={dp.at} cx={p[0]} cy={p[1]} r="3.4" fill="var(--device-screen)" stroke="rgba(237,239,243,.5)" strokeWidth="1.6" />;
          })}
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, font: "500 13px/1 var(--font-num)", color: "rgba(237,239,243,.45)" }}>
          <span>19:50</span>
          <span>{breaks} breaks</span>
          <span>22:04</span>
        </div>
      </div>
      <div style={{ ...meta, marginTop: hasMascot ? 30 : 40 }}>
        {DURATION} · {SUBJECT}
      </div>

      {/* The meerkat lives in the space the 19.5:9 screen leaves under the chart.
         Pose is `watch` because `proud` is not in public/mascot/ yet, and `slump`
         would be wrong for a good session. Swap to `proud` once the art lands. */}
      {mascot === "center" && comment !== "bubble" && (
        <div style={{ marginTop: "auto", display: "grid", justifyItems: "center", gap: 10, paddingBottom: 2 }}>
          {comment === "above" && <div style={{ ...commentStyle, maxWidth: 260 }}>{COMMENT}</div>}
          <Mascot pose="proud" size={comment === "none" ? 172 : 152} />
          {comment === "below" && <div style={{ ...commentStyle, maxWidth: 260 }}>{COMMENT}</div>}
        </div>
      )}
      {mascot === "center" && comment === "bubble" && (
        <div style={{ marginTop: "auto", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 4, paddingBottom: 2 }}>
          <Mascot pose="proud" size={146} style={{ flex: "0 0 auto" }} />
          <div
            style={{
              position: "relative",
              background: "var(--panel2)",
              border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 16,
              borderBottomLeftRadius: 4,
              padding: "12px 14px",
              marginBottom: 26,
              font: "500 14px/1.4 var(--font-body)",
              color: "rgba(237,239,243,.78)",
              maxWidth: 178,
            }}
          >
            {COMMENT}
          </div>
        </div>
      )}
      {mascot === "right" && (
        <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end", paddingRight: 2, marginBottom: -4 }}>
          <Mascot pose="proud" size={196} />
        </div>
      )}

      <div style={hasMascot ? { ...pill, marginTop: 14 } : pill}>Make it a video →</div>
    </>
  );
}

const PRIMARY = [
  { key: "D2c", name: "D2c — コメント無し(現状)", node: <LineTrace mascot="center" /> },
  { key: "D2c-a", name: "D2c-a — コメントをマスコットの上", node: <LineTrace mascot="center" comment="above" /> },
  { key: "D2c-b", name: "D2c-b — コメントをマスコットの下", node: <LineTrace mascot="center" comment="below" /> },
  { key: "D2c-s", name: "D2c-s — 吹き出し", node: <LineTrace mascot="center" comment="bubble" /> },
];

const OTHERS = [
  { key: "D2r", name: "D2r — マスコット右寄せ", node: <LineTrace mascot="right" /> },
  { key: "D2", name: "D2 — マスコット無し", node: <LineTrace /> },
  { key: "D", name: "D — 波形(バー)", node: <Waveform /> },
  { key: "A", name: "A — 数字ドーン", node: <BigNumber /> },
  { key: "B", name: "B — 円形ゲージ", node: <Gauge /> },
  { key: "C", name: "C — ランク", node: <Rank /> },
];

const VARIANTS = [...PRIMARY, ...OTHERS];

const THUMB = 0.3;

export default function ScoreLab() {
  // Internal design-exploration route. 404 in production so it never ships
  // with the public LP; keep it reachable in dev sessions.
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <main style={{ padding: "32px 28px 70px", background: "var(--base)", minHeight: "100vh" }}>
      <h1 style={{ font: "800 21px/1.3 var(--font-display)", color: "var(--ink)", margin: "0 0 4px" }}>
        スコア画面 — レイアウト4案
      </h1>
      <p style={{ font: "500 13px/1.6 var(--font-body)", color: "var(--sub)", margin: "0 0 30px", maxWidth: 760 }}>
        実寸 390 × 844(iPhone 14/15/16 の論理解像度、19.5:9)。ブラウザを等倍で見ていれば、
        実際のスマホとほぼ同じ大きさで表示されています。
      </p>

      <h2 style={{ font: "800 16px/1.3 var(--font-display)", color: "var(--ink)", margin: "0 0 16px" }}>
        コメントの置き場所
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,max-content)", gap: "40px 44px" }}>
        {PRIMARY.map((v) => (
          <Phone key={v.key} label={v.name}>
            {v.node}
          </Phone>
        ))}
      </div>

      <h2 style={{ font: "800 16px/1.3 var(--font-display)", color: "var(--ink)", margin: "56px 0 16px" }}>
        その他の案
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,max-content)", gap: "40px 44px" }}>
        {OTHERS.map((v) => (
          <Phone key={v.key} label={v.name}>
            {v.node}
          </Phone>
        ))}
      </div>

      <h2 style={{ font: "800 16px/1.3 var(--font-display)", color: "var(--ink)", margin: "56px 0 4px" }}>
        フィード上のサムネイル(実寸の30% ≈ 幅120px)
      </h2>
      <p style={{ font: "500 12px/1.6 var(--font-body)", color: "var(--sub)", margin: "0 0 20px" }}>
        この大きさで「何のアプリか」が伝わるかどうか。
      </p>
      <div style={{ display: "flex", gap: 30, alignItems: "flex-start" }}>
        {VARIANTS.map((v) => (
          <div key={v.key} style={{ display: "grid", gap: 8, justifyItems: "center" }}>
            <div style={{ width: (SCREEN_W + BEZEL * 2) * THUMB, height: (SCREEN_H + BEZEL * 2) * THUMB, overflow: "hidden" }}>
              <div style={{ transform: `scale(${THUMB})`, transformOrigin: "top left" }}>
                <Phone>{v.node}</Phone>
              </div>
            </div>
            <span style={{ font: "600 12px/1 var(--font-body)", color: "var(--sub)" }}>{v.key}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
