import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Smartphone,
  ShoppingBag,
  HeartPulse,
  Wallet,
  Truck,
  LayoutGrid,
  Search,
  PenTool,
  Code,
  TestTube2,
  Rocket,
  Wrench,
  ShieldCheck,
  Zap,
  Layers,
  Gauge,
  Apple,
  Bot,
  Server,
  Database,
  TrendingUp,
} from "lucide-react";

/**
 * SEO NOTES (same conventions as the homepage / about page / /services/web page)
 * -----------------------------------------------------------
 * - No "use client": this is a static informational page, so it stays a
 *   Server Component and can export `metadata` + render JSON-LD directly.
 * - Unique `metadata` for this exact URL (/services/mobile) — never copy the
 *   homepage's or another service page's title/description.
 * - Two JSON-LD blocks: a `Service` graph describing the sub-services you
 *   offer (helps Google understand what's actually for sale here), and a
 *   `FAQPage` graph built from the same questions rendered on the page
 *   (can unlock FAQ rich results in search).
 * - FAQ uses native <details>/<summary> — fully indexable content, zero
 *   client JS, and free keyboard/screen-reader support.
 * - One <h1>, one <h2> per section, <h3> for cards within a section.
 */

const SITE_URL = "https://www.example.com"; // TODO: replace with your real domain
const SITE_NAME = "Your Company Name"; // TODO: replace with your real business name
const OG_IMAGE = `${SITE_URL}/og-services-mobile.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Mobile App Development (iOS & Android, Flutter) | ${SITE_NAME}`,
  description:
    "Custom cross-platform mobile app development with Flutter: e-commerce apps, clinic and healthcare apps, fintech and finance trackers, on-demand and delivery apps, and internal business tooling — one codebase, native performance on iOS and Android.",
  keywords: [
    "mobile app development services",
    "cross-platform app development",
    "flutter app development",
    "ios and android app development",
    "custom e-commerce mobile app",
    "clinic management mobile app",
    "on-demand delivery app development",
    "internal business mobile app",
  ],
  alternates: {
    canonical: "/services/mobile",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services/mobile`,
    siteName: SITE_NAME,
    title: `Mobile App Development (iOS & Android, Flutter) | ${SITE_NAME}`,
    description:
      "From e-commerce and healthcare apps to fintech, on-demand, and internal tooling — custom cross-platform mobile apps built with Flutter for iOS and Android from a single codebase.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Mobile app development services at ${SITE_NAME}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Mobile App Development (iOS & Android, Flutter) | ${SITE_NAME}`,
    description:
      "Custom cross-platform mobile apps — e-commerce, healthcare, fintech, on-demand, and internal tooling — built with Flutter for iOS and Android.",
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
};

/* -------------------------------------------------------------------- */
/* Shared sub-components                                                 */
/* -------------------------------------------------------------------- */

interface OfferingCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  bullets: string[];
}

function OfferingCard({ title, desc, icon: Icon, bullets }: OfferingCardProps) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col">
      <div
        className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-5"
        aria-hidden="true"
      >
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/55 leading-relaxed mb-5">{desc}</p>
      <ul className="space-y-2.5 mt-auto">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-xs text-white/50">
            <CheckCircle2
              size={14}
              aria-hidden="true"
              className="text-[var(--accent)]/70 mt-0.5 shrink-0"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details
          key={faq.question}
          className="group bg-white/[0.02] border border-white/10 rounded-2xl p-6 open:bg-white/[0.04]"
        >
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-sm sm:text-base font-semibold text-white">
            {faq.question}
            <span
              aria-hidden="true"
              className="shrink-0 text-white/40 group-open:rotate-45 transition-transform text-xl leading-none"
            >
              +
            </span>
          </summary>
          <p className="text-sm text-white/55 leading-relaxed mt-4">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Page                                                                   */
/* -------------------------------------------------------------------- */

export default function MobileServicesPage() {
  const offerings: OfferingCardProps[] = [
    {
      title: "Cross-Platform Mobile Apps",
      desc: "One Flutter codebase, shipped natively to both iOS and Android — without the cost of building two separate apps.",
      icon: Smartphone,
      bullets: [
        "Single codebase for iOS and Android",
        "Native look, feel, and performance",
        "Faster time-to-market than two native builds",
        "You own the codebase outright — no platform lock-in",
      ],
    },
    {
      title: "E-Commerce & Retail Apps",
      desc: "Mobile storefronts built around your catalog, promotions, and checkout — not a generic template.",
      icon: ShoppingBag,
      bullets: [
        "Custom product, variant, and inventory logic",
        "Secure in-app payments and order tracking",
        "Push notifications for offers and order updates",
        "Admin dashboard for orders and stock",
      ],
    },
    {
      title: "Clinic & Healthcare Apps",
      desc: "Patient-facing and staff-facing apps for booking, records, and care coordination on the go.",
      icon: HeartPulse,
      bullets: [
        "Appointment booking and reminders",
        "Patient records and visit history on mobile",
        "Role-based access for staff vs. patients",
        "Built with data privacy in mind from day one",
      ],
    },
    {
      title: "Fintech & Financial Tracker Apps",
      desc: "Custom apps for tracking spend, revenue, or portfolios with real-time data in your pocket.",
      icon: Wallet,
      bullets: [
        "Real-time dashboards and reports",
        "Biometric login and secure data handling",
        "Integrations with your existing data sources",
        "Export to CSV/PDF for accounting and audits",
      ],
    },
    {
      title: "On-Demand & Delivery Apps",
      desc: "Marketplace-style apps connecting customers, drivers or providers, and your back office.",
      icon: Truck,
      bullets: [
        "Live order and location tracking",
        "Separate customer, provider, and admin apps",
        "In-app messaging and status updates",
        "Built to handle demand spikes at peak hours",
      ],
    },
    {
      title: "Internal Business & Field Apps",
      desc: "Purpose-built mobile tools for field teams and operations that off-the-shelf apps can't handle.",
      icon: LayoutGrid,
      bullets: [
        "Custom workflows mapped to your team's process",
        "Offline support for low-connectivity environments",
        "Automates manual, repetitive data entry",
        "Built to be maintained by your team long-term",
      ],
    },
  ];

  const techStack = [
    {
      icon: Bot,
      title: "Frontend — Flutter & Dart",
      desc: "A single, high-performance codebase compiled natively for both iOS and Android — no compromise on speed or feel.",
    },
    {
      icon: Server,
      title: "Backend — NestJS + Fastify (TypeScript)",
      desc: "A structured, fully type-safe API layer that stays maintainable as your app's logic and user base grow.",
    },
    {
      icon: Database,
      title: "Database — Supabase",
      desc: "A managed Postgres database that gets your app to launch without upfront infrastructure spend or a dedicated DevOps hire.",
    },
  ];

  const whyCustom = [
    {
      icon: Apple,
      title: "Truly Cross-Platform",
      desc: "One build, one team, one codebase — shipped to both the App Store and Google Play without duplicating work.",
    },
    {
      icon: ShieldCheck,
      title: "Secure by Default",
      desc: "Modern authentication, data handling, and API security baked in from the first commit.",
    },
    {
      icon: Layers,
      title: "Scales With You",
      desc: "Clean, modular architecture that can grow from an MVP into a full platform without a rebuild.",
    },
    {
      icon: Gauge,
      title: "Built for Speed",
      desc: "Smooth 60fps interactions and fast startup times, tuned to feel native on every device.",
    },
  ];

  const process = [
    {
      icon: Search,
      title: "Discovery",
      desc: "We map your goals, users, and any existing systems the app needs to work with.",
    },
    {
      icon: PenTool,
      title: "UX / UI Design",
      desc: "Wireframes and clickable prototypes so you can see and adjust the experience before development starts.",
    },
    {
      icon: Code,
      title: "Development",
      desc: "Clean, tested Flutter code built against the agreed scope, with visible progress throughout.",
    },
    {
      icon: TestTube2,
      title: "QA & Testing",
      desc: "Real-device testing across iOS and Android, plus performance and accessibility checks before launch.",
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "App Store and Google Play submission, staged rollout, and a smoke-tested go-live with minimal downtime.",
    },
    {
      icon: Wrench,
      title: "Support",
      desc: "A free hypercare window after launch, followed by ongoing maintenance or feature work as needed.",
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: "Why build with Flutter instead of separate native apps?",
      answer:
        "Flutter lets us build one codebase that compiles to genuinely native performance on both iOS and Android. That typically means a faster build, a lower cost than maintaining two separate native apps, and a single team that can ship updates to both platforms at once — without sacrificing the native feel your users expect.",
    },
    {
      question: "How long does it take to build a mobile app?",
      answer:
        "A focused, single-purpose app typically takes 6–10 weeks from kickoff to app store submission. Larger apps — marketplaces, clinic systems, fintech dashboards — usually run 10–16 weeks depending on scope, integrations, and how much custom logic is involved. You'll get a firm timeline after the discovery phase.",
    },
    {
      question: "Will the app work on both iPhone and Android devices?",
      answer:
        "Yes. Building with Flutter means a single codebase ships to both the App Store and Google Play, with a native look and feel tuned for each platform's design conventions.",
    },
    {
      question: "Do you handle App Store and Google Play submission?",
      answer:
        "Yes. We handle store listing setup, submission, and review requirements for both platforms as part of the launch phase, and can manage your developer accounts or work within existing ones.",
    },
    {
      question: "Who owns the code and the app store listing after the project is done?",
      answer:
        "You do. There's no proprietary lock-in — you receive full ownership of the codebase and app store listings, and can host, extend, or hand the project to another team at any point.",
    },
    {
      question: "Is my data secure in a healthcare or fintech mobile app?",
      answer:
        "Security and access control are built in from the design phase, not bolted on afterward — role-based permissions, encrypted data handling, and secure authentication are standard on any app handling patient or financial data. If your project has specific compliance requirements, we scope those explicitly during discovery.",
    },
    {
      question: "Can you add features to or take over an existing mobile app?",
      answer:
        "Yes. We regularly take over existing Flutter apps, or rebuild apps originally built natively or on another framework, migrating data and functionality onto a modern, maintainable codebase.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Cross-Platform Mobile App Development",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/mobile`,
        description:
          "Custom cross-platform mobile app development with Flutter, including e-commerce apps, clinic and healthcare apps, fintech trackers, on-demand and delivery apps, and internal business tooling.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mobile App Development Services",
          itemListElement: offerings.map((o) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: o.title,
              description: o.desc,
            },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-[#0b1120] text-white min-h-screen font-sans antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* 1. HERO */}
        <section
          aria-labelledby="mobile-hero-heading"
          className="relative min-h-[70vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Mobile App Development
            </span>
            <h1
              id="mobile-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Cross-platform mobile apps built around how your business
              actually runs.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-10">
              One Flutter codebase, native performance on iOS and Android —
              for e-commerce, healthcare, fintech, on-demand, and internal
              business apps of any size.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 transition flex items-center gap-2 group shadow-lg shadow-[var(--accent)]/20"
              >
                Get a Free Quote
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/portfolio"
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>

        {/* 2. WHAT WE BUILD */}
        <section
          aria-labelledby="offerings-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="offerings-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                What We Build
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                Whether you need a focused customer-facing app or a full
                platform running core parts of your business, it&apos;s built
                custom around your requirements — not squeezed into a
                template.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map((o) => (
                <OfferingCard key={o.title} {...o} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. OUR TECH STACK */}
        <section
          aria-labelledby="stack-heading"
          className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="stack-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Our Tech Stack
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                A modern, fully custom-coded stack built on Flutter — one
                codebase, native performance, no per-platform rebuild.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {techStack.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
                >
                  <div
                    className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-4"
                    aria-hidden="true"
                  >
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-[var(--accent)]/[0.06] border border-[var(--accent)]/20 rounded-3xl p-8 flex flex-col sm:flex-row gap-5 items-start">
              <div
                className="w-11 h-11 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">
                  Start Small, Scale When It&apos;s Proven
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  We build on Supabase by default so you can launch and
                  validate real ROI without committing to heavy
                  infrastructure spend upfront. Once your app proves itself
                  and needs to handle more scale, traffic, or custom backend
                  logic, we migrate you onto a dedicated VPS or cloud setup —
                  an infrastructure upgrade, not a rebuild from scratch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHY CUSTOM (benefits) */}
        <section
          aria-labelledby="why-custom-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="why-custom-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Why Businesses Choose Custom Over Off-the-Shelf
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                No-code app builders are fine until your business outgrows
                what they can do. Here&apos;s what custom Flutter development
                gets you instead.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyCustom.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
                >
                  <div
                    className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-4"
                    aria-hidden="true"
                  >
                    <item.icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/55 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. OUR PROCESS */}
        <section
          aria-labelledby="process-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2
                id="process-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                How a Mobile Project Runs With Us
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                A transparent, six-stage process from first conversation to
                long-term support.
              </p>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {process.map((step, idx) => (
                <li
                  key={step.title}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <step.icon size={18} />
                    </div>
                    <span
                      className="text-xs font-bold text-white/30"
                      aria-hidden="true"
                    >
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. FAQ — genuinely helpful for clients, and eligible for FAQ rich results */}
        <section
          aria-labelledby="faq-heading"
          className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5"
        >
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
              <h2
                id="faq-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Frequently Asked Questions
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                Common questions from clients scoping a mobile app project.
              </p>
            </div>

            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* 6. CLOSING CTA */}
        <section
          aria-labelledby="mobile-cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="mobile-cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Have a mobile app idea for your business in mind?
            </h2>
            <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
              Tell us what you&apos;re trying to build and we&apos;ll map out an
              honest scope, timeline, and quote — free of cost.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 transition flex items-center gap-2 shadow-xl shadow-[var(--accent)]/10 group text-sm sm:text-base"
              >
                Get a Free Quote
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}