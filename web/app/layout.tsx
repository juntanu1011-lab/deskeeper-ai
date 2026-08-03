import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

// design.md §6.1 — display / body / numerals-and-labels, loaded via next/font/google
// (not a manual <link> or @import) and exposed as CSS variables that globals.css maps
// onto the design system's --font-display / --font-body / --font-num tokens.
const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter-tight",
  display: "swap",
});

/* Absolute URL base for OG/Twitter images. NEXT_PUBLIC_SITE_URL wins (set it
   when the real domain lands); falls back to the Vercel production URL, then
   localhost for dev. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Kept — Put your phone down. Get watched. Get proof.";
const description =
  "Kept turns your phone into a camera that watches you study — then hands you back a video worth posting. Join the waitlist.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Kept",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Kept — focus score 87" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

/* The site is dark-only. Without `colorScheme`, the browser renders its own UA
   surfaces in light mode over a near-black page — most visibly Chrome/Safari
   autofill, which paints the waitlist input pale blue-on-white. That input is
   the only conversion element on the page, so this one line matters more than
   it looks. It also gives the page a dark scrollbar.
   Next 14+ requires these in `viewport`, not `metadata`. */
export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0A0C10", // --dk-black
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${inter.variable} ${interTight.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
