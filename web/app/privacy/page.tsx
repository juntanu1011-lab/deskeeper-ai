import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import { Nav } from "@/components/navigation/Nav";
import { Footer } from "@/components/navigation/Footer";

/* Privacy policy. Reachable from the footer, and the address of record for
   deletion requests — so the contact here has to stay a live inbox.

   Keep this page boring and specific. Everything below is a statement about
   what the code actually does (web/app/api/waitlist/route.ts and
   supabase/migrations/), not boilerplate. If the LP ever gains analytics, a
   cookie, or a second field on the form, this page is wrong until it is
   updated in the same commit. */

const CONTACT = "hello@kept.study";
const UPDATED = "4 August 2026";

export const metadata: Metadata = {
  title: "Privacy — Kept",
  description: "What Kept collects when you join the waitlist, and what it does not.",
  robots: { index: true, follow: true },
};

const CONTENT: CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "0 var(--page-margin)",
};

function H2({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        font: "800 var(--display-s-size)/1.3 var(--font-display)",
        color: "var(--ink)",
        margin: "var(--space-8) 0 var(--space-3)",
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        font: "500 var(--body-m-size)/var(--body-m-lh) var(--font-body)",
        color: "var(--sub)",
        margin: "0 0 var(--space-4)",
      }}
    >
      {children}
    </p>
  );
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul
      style={{
        margin: "0 0 var(--space-4)",
        paddingLeft: "1.2em",
        font: "500 var(--body-m-size)/var(--body-m-lh) var(--font-body)",
        color: "var(--sub)",
      }}
    >
      {items.map((it, i) => (
        <li key={i} style={{ marginBottom: "var(--space-2)" }}>
          {it}
        </li>
      ))}
    </ul>
  );
}

function Mail() {
  return (
    <a href={`mailto:${CONTACT}`} style={{ color: "var(--bright)", textDecoration: "none" }}>
      {CONTACT}
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Nav ctaHref="/#waitlist" />
      <main style={{ padding: "var(--section-gap) 0" }}>
        <div style={CONTENT}>
          <h1
            style={{
              font: "900 var(--display-l-size)/1.1 var(--font-display)",
              color: "var(--ink)",
              letterSpacing: "-0.015em",
              margin: "0 0 var(--space-4)",
            }}
          >
            Privacy
          </h1>
          <P>
            Kept is a product in development. Right now the only thing this site does is take an
            email address for the launch waitlist. This page says exactly what happens to it.
          </P>
          <P>
            <strong style={{ color: "var(--ink)" }}>Last updated: {UPDATED}.</strong>
          </P>

          <H2>What we collect</H2>
          <P>When you join the waitlist, three things are stored:</P>
          <Bullets
            items={[
              <>
                <strong style={{ color: "var(--ink)" }}>Your email address.</strong> Lowercased
                before it is saved.
              </>,
              <>
                <strong style={{ color: "var(--ink)" }}>Where you came from.</strong> A short text
                label — which link or campaign brought you to the page. Not your browsing history.
              </>,
              <>
                <strong style={{ color: "var(--ink)" }}>The time you signed up.</strong>
              </>,
            ]}
          />
          <P>That is the whole record. There is no name field, and nothing else is asked for.</P>

          <H2>What we do not collect</H2>
          <Bullets
            items={[
              "No analytics. This site has no analytics tool, no tracking pixel and no third-party scripts.",
              "No cookies. The site sets none.",
              "No advertising, and no ad networks.",
              "No profiles. Your email is not enriched, cross-referenced or matched against anything.",
            ]}
          />

          <H2>What it is used for</H2>
          <P>
            One email, when Kept launches. That is the only reason the list exists. We do not send
            newsletters, and we do not email you about anything else.
          </P>
          <P>
            Your email address is never sold, rented or shared with anyone for their own purposes.
          </P>

          <H2>Where it is stored</H2>
          <P>
            The waitlist is stored in a Supabase database hosted in Tokyo, Japan. The site itself
            runs on Vercel. Both act only as infrastructure providers — they hold the data on our
            behalf and do not use it for their own purposes.
          </P>
          <P>
            The database is closed to public access; the only thing that can write to it is this
            site&apos;s own signup endpoint.
          </P>

          <H2>How long it is kept</H2>
          <P>
            Until launch, plus a reasonable period afterwards so we can tell who was on the list. If
            Kept is never released, the list is deleted. You can ask us to remove you at any point
            before that.
          </P>

          <H2>Your choices</H2>
          <P>
            Email <Mail /> and we will:
          </P>
          <Bullets
            items={[
              "tell you what we hold for your address,",
              "correct it, or",
              "delete it entirely.",
            ]}
          />
          <P>
            No account or verification hoops — just write from the address you signed up with, or
            tell us which address to look for. Deletion is permanent and means you will not get the
            launch email.
          </P>

          <H2>Children</H2>
          <P>
            Kept is built for students, and some of them are young. We do not knowingly keep waitlist
            entries from children under 13. If you are a parent or guardian and your child has signed
            up, email <Mail /> and we will delete the entry.
          </P>

          <H2>Changes</H2>
          <P>
            If what we collect changes, this page changes with it and the date at the top moves. If
            the change is significant and you are on the list, we will tell you by email.
          </P>

          <H2>Contact</H2>
          <P>
            Kept is an independent project, not a company. For anything on this page, including
            deletion requests, write to <Mail />.
          </P>
        </div>
      </main>
      <Footer />
    </>
  );
}
