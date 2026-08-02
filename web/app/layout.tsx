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

export const metadata: Metadata = {
  title: "Deskeeper AI — Put your phone down. Get watched. Get proof.",
  description:
    "Deskeeper AI turns your phone into a camera that watches you study — then hands you back a video worth posting. Join the waitlist.",
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
