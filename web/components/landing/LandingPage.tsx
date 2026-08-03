"use client";

/* Kept waitlist LP — section composition (design.md §14).
   Copy is verbatim from the confirmed English draft; do not paraphrase. */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { Nav } from "../navigation/Nav";
import { Footer } from "../navigation/Footer";
import { Badge } from "../core/Badge";
import { Eyebrow } from "../core/Eyebrow";
import { StepCard } from "../core/StepCard";
import { FaqAccordion, type FaqItem } from "../core/FaqAccordion";
import { WaitlistForm } from "../core/WaitlistForm";
import { ScoreCard } from "../product/ScoreCard";
import { Mascot } from "../brand/Mascot";
import { MascotAside } from "../brand/MascotAside";

const CONTENT: CSSProperties = {
  maxWidth: "var(--content-max)",
  margin: "0 auto",
  padding: "0 var(--page-margin)",
};

function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    // Safety net: never leave content invisible if the observer never fires.
    const t = setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(16px)",
        transition: `opacity var(--dur-reveal) var(--ease-reveal) ${delay}ms, transform var(--dur-reveal) var(--ease-reveal) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Section({ id, children, style }: { id?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <section id={id} style={{ padding: "var(--section-gap) 0", ...style }}>
      <div style={CONTENT}>{children}</div>
    </section>
  );
}

function Hero({ onJoin }: { onJoin: (email: string) => void }) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "calc(100svh - 62px)",
        display: "grid",
        alignItems: "center",
        paddingTop: "clamp(48px,5vw,88px)",
        paddingBottom: "clamp(56px,6vw,104px)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -340,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1500,
          height: 1060,
          background: "var(--glow-hero)",
          opacity: "var(--glow-hero-opacity)",
          pointerEvents: "none",
        }}
      />
      {/* Centred: the hero is one column of copy leading into one form, so a left-aligned
          stack leaves the right half of wide screens empty for no reason. */}
      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          width: "100%",
          padding: "0 var(--page-margin)",
          display: "grid",
          gap: "var(--space-6)",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        <Reveal>
          <Badge icon={<Mascot pose="front" size={20} />}>Launching soon — iOS first</Badge>
        </Reveal>
        <Reveal delay={70}>
          <h1
            className="dk-hero-title"
            style={{
              margin: "4px 0 0",
              font: "900 var(--display-xl-size)/1.02 var(--font-display)",
              letterSpacing: "-0.035em",
              color: "var(--ink)",
            }}
          >
            <span className="dk-hero-line">Put your phone down.</span>
            <span className="dk-hero-line">
              Get <span style={{ color: "var(--bright)" }}>watched</span>. Get proof.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={140}>
          <p
            style={{
              margin: "8px auto 0",
              maxWidth: "52ch",
              font: "500 var(--body-l-size)/1.55 var(--font-body)",
              color: "var(--sub)",
              textWrap: "balance",
            }}
          >
            Kept turns your phone into a camera that watches you study — then hands you back a video worth
            posting.
          </p>
        </Reveal>
        <Reveal delay={210} style={{ marginTop: "var(--space-4)", width: "100%", display: "flex", justifyContent: "center" }}>
          <WaitlistForm buttonLabel="Notify me" source="hero" microcopy="No spam. One email when we launch. That's it." onSubmit={onJoin} />
        </Reveal>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <Section id="problem">
      <div className="dk-problem" style={{ display: "grid", gap: "var(--block-gap-lg)", alignItems: "center" }}>
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: 560 }}>
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              style={{
                margin: 0,
                font: "800 var(--display-m-size)/var(--display-m-lh) var(--font-display)",
                letterSpacing: "var(--display-m-ls)",
                color: "var(--ink)",
              }}
            >
              You know the feeling.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                margin: 0,
                font: "500 var(--body-m-size)/var(--body-m-lh) var(--font-body)",
                color: "var(--sub)",
                textWrap: "pretty",
              }}
            >
              You sit down to study. Ten minutes later you&apos;re back on your phone. Not because you don&apos;t
              care — you just... slip. Every focus app tells you a number. None of them give you something
              you&apos;d actually want to show someone.
            </p>
          </Reveal>
        </div>
        {/* The mascot is the reader here, not a commentator — no speech bubble. */}
        <Reveal delay={140} style={{ justifySelf: "center" }}>
          <Mascot
            pose="slump"
            size={340}
            style={{
              height: "auto",
              width: "100%",
              maxWidth: 460,
              WebkitMaskImage:
                "linear-gradient(to bottom, #000 60%, rgba(0,0,0,.85) 88%, transparent 100%), linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, #000 60%, rgba(0,0,0,.85) 88%, transparent 100%), linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%)",
              WebkitMaskComposite: "source-in",
              maskComposite: "intersect",
            }}
          />
        </Reveal>
      </div>
    </Section>
  );
}

const STEPS: [string, string, string][] = [
  ["01", "Prop it up", "Lean your phone against something on your desk, facing you."],
  ["02", "Get locked in", "The camera watches. Reach for your phone and it notices — you can't hide it from yourself anymore."],
  ["03", "Get proof", "When you're done, a video appears: your focus score, your time, stitched into 15 seconds."],
  ["04", "Post it", "Share it like any other study-with-me video. Except this one's real."],
];

function HowItWorks() {
  return (
    <Section id="how">
      <div style={{ display: "grid", gap: "var(--block-gap-lg)" }}>
        <div style={{ display: "grid", gap: "var(--space-4)" }}>
          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              style={{
                margin: 0,
                font: "800 var(--display-m-size)/var(--display-m-lh) var(--font-display)",
                letterSpacing: "var(--display-m-ls)",
                color: "var(--ink)",
              }}
            >
              Prop it up, and it starts.
            </h2>
          </Reveal>
        </div>
        <div className="dk-steps" style={{ display: "grid", gap: "var(--space-4)" }}>
          {STEPS.map(([n, t, b], i) => (
            <Reveal key={n} delay={i * 70}>
              <StepCard number={n} title={t} style={{ height: "100%" }}>
                {b}
              </StepCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={280}>
          <MascotAside pose="watch" size={150}>
            Reach for it and I&apos;ll notice. That&apos;s the whole deal.
          </MascotAside>
        </Reveal>
      </div>
    </Section>
  );
}

function Showcase() {
  return (
    <Section id="output">
      <div className="dk-showcase" style={{ display: "grid", gap: "var(--block-gap-lg)", alignItems: "center" }}>
        <div style={{ display: "grid", gap: "var(--space-6)", maxWidth: 520 }}>
          <Reveal>
            <Eyebrow>What comes out</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2
              style={{
                margin: 0,
                font: "800 var(--display-m-size)/var(--display-m-lh) var(--font-display)",
                letterSpacing: "var(--display-m-ls)",
                color: "var(--ink)",
              }}
            >
              See what you get at the end.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p
              style={{
                margin: 0,
                font: "500 var(--body-m-size)/var(--body-m-lh) var(--font-body)",
                color: "var(--sub)",
                textWrap: "pretty",
              }}
            >
              What&apos;s left is a score, a time, and proof you sat there and did it.
            </p>
          </Reveal>
          <Reveal delay={210}>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 0, borderTop: "1px solid var(--divider)" }}>
              <li style={{ borderBottom: "1px solid var(--divider)", padding: "14px 0", display: "grid", gap: "var(--space-1)" }}>
                <span style={{ font: "800 var(--display-s-size)/var(--display-s-lh) var(--font-display)", color: "var(--ink)" }}>
                  On-device only
                </span>
                <span style={{ font: "500 var(--body-s-size)/var(--body-s-lh) var(--font-body)", color: "var(--sub)" }}>
                  Detection runs on your phone. Nothing is ever uploaded.
                </span>
              </li>
              <li style={{ borderBottom: "1px solid var(--divider)", padding: "14px 0", display: "grid", gap: "var(--space-1)" }}>
                <span style={{ font: "800 var(--display-s-size)/var(--display-s-lh) var(--font-display)", color: "var(--ink)" }}>
                  Faces covered by default
                </span>
                <span style={{ font: "500 var(--body-s-size)/var(--body-s-lh) var(--font-body)", color: "var(--sub)" }}>
                  Blurred, or replaced with an emoji, in every video.
                </span>
              </li>
              <li style={{ borderBottom: "1px solid var(--divider)", padding: "14px 0", display: "grid", gap: "var(--space-1)" }}>
                <span style={{ font: "800 var(--display-s-size)/var(--display-s-lh) var(--font-display)", color: "var(--ink)" }}>
                  No camera? Simple Mode
                </span>
                <span style={{ font: "500 var(--body-s-size)/var(--body-s-lh) var(--font-body)", color: "var(--sub)" }}>
                  Just a timer. You still get a video — a focus graph instead.
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
        <Reveal delay={140} style={{ justifySelf: "center" }}>
          <ScoreCard score={87} duration="2h 14m" subject="Math" />
        </Reveal>
      </div>
    </Section>
  );
}

function WaitlistCta({
  onJoin,
  refEl,
}: {
  onJoin: (email: string) => void;
  refEl: RefObject<HTMLElement | null>;
}) {
  return (
    <section
      id="waitlist"
      ref={refEl}
      style={{
        padding: "var(--section-gap) 0",
        borderTop: "1px solid var(--divider)",
        borderBottom: "1px solid var(--divider)",
        background: "linear-gradient(180deg,var(--panel),var(--base))",
      }}
    >
      <div style={{ ...CONTENT, display: "grid", gap: "var(--space-6)", justifyItems: "center", textAlign: "center" }}>
        <Reveal>
          <Eyebrow tone="warm">Get in early</Eyebrow>
        </Reveal>
        <Reveal delay={70}>
          <h2
            style={{
              margin: 0,
              font: "800 var(--display-l-size)/var(--display-l-lh) var(--font-display)",
              letterSpacing: "var(--display-l-ls)",
              color: "var(--ink)",
            }}
          >
            Be one of the first to try it.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p style={{ margin: 0, maxWidth: 560, font: "500 var(--body-m-size)/var(--body-m-lh) var(--font-body)", color: "var(--sub)" }}>
            We&apos;re finishing up before launch. Join the waitlist and we&apos;ll email you the moment it&apos;s
            ready.
          </p>
        </Reveal>
        <Reveal delay={210} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <WaitlistForm buttonLabel="Join the Waitlist" source="cta" onSubmit={onJoin} />
        </Reveal>
      </div>
    </section>
  );
}

const FAQ: FaqItem[] = [
  { q: "When does it launch?", a: "We're targeting mid-August 2026. iOS first — Android after that." },
  {
    q: "Do I have to show my face?",
    a: "No. By default, faces are blurred or replaced with an emoji in every video. All detection happens on your device — nothing is ever uploaded anywhere.",
  },
  {
    q: "Is it free?",
    a: "Yes — one session a day, with a watermark on the video. Pro removes the daily limit and shrinks the watermark.",
  },
  {
    q: "What if I can't prop my phone up somewhere?",
    a: "There's a Simple Mode — no camera, just a timer. You still get a video, just without the footage: a focus graph instead.",
  },
];

function Faq() {
  return (
    <Section id="faq">
      <div style={{ display: "grid", gap: "var(--block-gap)", maxWidth: 760 }}>
        <Reveal>
          <h2
            style={{
              margin: 0,
              font: "800 var(--display-m-size)/var(--display-m-lh) var(--font-display)",
              letterSpacing: "var(--display-m-ls)",
              color: "var(--ink)",
            }}
          >
            Questions.
          </h2>
        </Reveal>
        <Reveal delay={70}>
          <FaqAccordion items={FAQ} />
        </Reveal>
      </div>
    </Section>
  );
}

export function LandingPage() {
  const ctaRef = useRef<HTMLElement>(null);
  const [joined, setJoined] = useState(false);
  const scrollToCta = () =>
    ctaRef.current && window.scrollTo({ top: ctaRef.current.offsetTop - 60, behavior: "smooth" });

  return (
    <div style={{ background: "var(--base)", minHeight: "100vh" }}>
      <Nav onCta={scrollToCta} />
      <Hero onJoin={() => setJoined(true)} />
      <Problem />
      <HowItWorks />
      <Showcase />
      <WaitlistCta refEl={ctaRef} onJoin={() => setJoined(true)} />
      <Faq />
      <Footer note={joined ? "Thanks — you'll hear from us once." : null} />
    </div>
  );
}
