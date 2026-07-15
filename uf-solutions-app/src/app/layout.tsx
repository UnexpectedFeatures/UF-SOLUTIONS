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

const SITE_URL = "https://www.example.com"; // TODO: replace with your real domain
const SITE_NAME = "UF Software Solutions PH";
const OG_IMAGE = `${SITE_URL}/og-default.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Custom Web & Mobile App Development`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "We engineer clean systems to eliminate your business bottlenecks — custom websites, web applications, and cross-platform mobile apps built around how your business actually runs.",
  keywords: [
    "web development philippines",
    "mobile app development philippines",
    "custom software development",
    "web application development",
    "flutter app development",
    "next.js development agency",
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
    title: `${SITE_NAME} | Custom Web & Mobile App Development`,
    description:
      "Custom websites, web applications, and cross-platform mobile apps built around how your business actually runs.",
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
    title: `${SITE_NAME} | Custom Web & Mobile App Development`,
    description:
      "Custom websites, web applications, and cross-platform mobile apps built around how your business actually runs.",
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