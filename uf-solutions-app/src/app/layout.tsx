import type { Metadata } from "next";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update this once your domain goes live
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ufsoftwaresolutionsph.vercel.app";
const SITE_NAME = "UF Software Solutions PH";
const OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Custom Software & Workflow Automation Systems`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "We build deterministic custom web apps, cross-platform mobile software, and high-reliability AI workflow automation systems that eliminate operational bottlenecks.",
  keywords: [
    // 1. Workflow Automation & AI Systems (New Service Tier)
    "workflow automation systems",
    "ai workflow automation philippines",
    "business process automation software",
    "custom ai integration services",
    "document data extraction pipeline",

    // 2. High-Intent Commercial & Agency Terms
    "custom web application development",
    "software development agency philippines",
    "b2b custom software solutions",
    "full stack engineering company philippines",

    // 3. Tech-Stack Specifics (Attracts High-Quality Clients)
    "next.js development agency",
    "nest.js backend development",
    "flutter mobile app development",
    "postgresql enterprise solutions",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Custom Software & Workflow Automation Systems`,
    description:
      "Engineered software solutions: Next.js web applications, Flutter mobile apps, and enterprise-grade workflow automation systems.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Custom Software & Workflow Automation Systems`,
    description:
      "Engineered software solutions: Next.js web applications, Flutter mobile apps, and enterprise-grade workflow automation systems.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();

  // Read back the nonce set by middleware for this request. Not consumed
  // anywhere yet — application-level JSON-LD <script> tags don't need it,
  // since CSP's script-src only governs executable script (JS/module/
  // importmap), not application/ld+json. This becomes required the moment
  // you add a next/script component or a hand-written *executable* inline
  // <script>: pass it as `nonce={nonce}` on that element so it's allowed
  // to run under the CSP set in middleware.ts.
  const nonce = headerList.get("x-nonce") || undefined;
  void nonce; // silence no-unused-vars until the above applies

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Perf audit flagged a ~1,200ms critical path partly caused by the
          browser not knowing to connect to Sanity's asset CDN until it
          parses the first <img> tag pointing there. preconnect starts the
          DNS + TLS handshake immediately, in parallel with everything
          else, rather than waiting to discover the need for it later.
          dns-prefetch is a lightweight fallback for browsers that don't
          support preconnect.
        */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}