import type { Metadata } from "next";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}