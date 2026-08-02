import type { Metadata } from "next";
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

const title = "Deskeeper — Put your phone down. Get watched. Get proof.";
const description =
  "Deskeeper turns your phone into a camera that watches you study — then hands you back a video worth posting. Join the waitlist.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Deskeeper",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Deskeeper — focus score 87" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
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
