import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Wrench,
  Terminal,
  MonitorSmartphone,
  Puzzle,
  Workflow,
  Cpu,
  Search,
  PenTool,
  Code,
  TestTube2,
  Rocket,
  ShieldCheck,
  Zap,
  Layers,
  Gauge,
  HardDrive,
  Server,
  Database,
  TrendingUp,
} from "lucide-react";

/**
 * SEO NOTES (same conventions as the homepage / about page / other service pages)
 * -----------------------------------------------------------
 * - No "use client": this is a static informational page, so it stays a
 *   Server Component and can export `metadata` + render JSON-LD directly.
 * - Unique `metadata` for this exact URL (/services/custom) — never copy
 *   another service page's title/description.
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
const OG_IMAGE = `${SITE_URL}/og-services-custom.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Custom Software Development | ${SITE_NAME}`,
  description:
    "Bespoke software for internal tooling and niche business problems that off-the-shelf systems can't solve — offline-first desktop apps, terminal and CLI tools, automation scripts, and purpose-built systems of any shape.",
  keywords: [
    "custom software development",
    "internal tooling development",
    "bespoke software solutions",
    "offline-first desktop app development",
    "terminal app development",
    "cli tool development",
    "business automation software",
    "niche software solutions",
  ],
  alternates: {
    canonical: "/services/custom",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services/custom`,
    siteName: SITE_NAME,
    title: `Custom Software Development | ${SITE_NAME}`,
    description:
      "Internal tooling, offline-first desktop apps, terminal tools, and purpose-built systems for the niche problems generic software can't solve.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Custom software development services at ${SITE_NAME}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Custom Software Development | ${SITE_NAME}`,
    description:
      "Internal tooling, offline-first desktop apps, terminal tools, and purpose-built systems for the niche problems generic software can't solve.",
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

export default function CustomServicesPage() {
  const offerings: OfferingCardProps[] = [
    {
      title: "Internal Business Tooling",
      desc: "Software built around how your team actually works, replacing spreadsheets, manual steps, and workarounds.",
      icon: Wrench,
      bullets: [
        "Custom workflows mapped to your team's process",
        "Automates manual, repetitive data entry",
        "Role-based access for different teams",
        "Built to be maintained by your team long-term",
      ],
    },
    {
      title: "Offline-First Desktop Apps",
      desc: "Native or cross-platform desktop software that keeps working with no or unreliable internet.",
      icon: MonitorSmartphone,
      bullets: [
        "Local-first data storage with optional sync",
        "Works on Windows, macOS, and Linux",
        "No dependency on a live connection to function",
        "Packaged and distributed for easy installation",
      ],
    },
    {
      title: "Terminal & CLI Tools",
      desc: "Fast, scriptable command-line tools for developers, ops teams, or power users who live in the terminal.",
      icon: Terminal,
      bullets: [
        "Scriptable and pipeable, built for automation",
        "Cross-platform binaries, no runtime hassle",
        "Config-driven for repeatable workflows",
        "Integrates with your existing scripts and CI",
      ],
    },
    {
      title: "Niche & Bespoke Solutions",
      desc: "When there's no off-the-shelf product for the problem, we build software shaped around exactly what you need.",
      icon: Puzzle,
      bullets: [
        "Built from your actual process, not a template",
        "Handles edge cases generic software ignores",
        "No paying for features you'll never use",
        "Grows and adapts as your requirements change",
      ],
    },
    {
      title: "Process Automation",
      desc: "Scripts and systems that take repetitive, error-prone manual work off your team's plate.",
      icon: Workflow,
      bullets: [
        "Scheduled jobs, batch processing, and pipelines",
        "Integrations between tools that don't talk to each other",
        "Alerting and logging so you know what happened",
        "Designed to run unattended and reliably",
      ],
    },
    {
      title: "Systems Integration & Modernization",
      desc: "Connecting or replacing legacy systems so your tools work together instead of around each other.",
      icon: Cpu,
      bullets: [
        "Bridges between legacy and modern systems",
        "Data migration without losing history",
        "APIs built around your existing infrastructure",
        "Incremental rollout to avoid disrupting operations",
      ],
    },
  ];

  const techStack = [
    {
      icon: HardDrive,
      title: "Desktop & CLI — Native & Cross-Platform Toolchains",
      desc: "The right tool for the job — from cross-platform desktop frameworks to compiled, single-binary CLI tools — chosen based on your performance and distribution needs.",
    },
    {
      icon: Server,
      title: "Backend — NestJS + Fastify (TypeScript)",
      desc: "A structured, fully type-safe API layer for any tool that needs a server, sync, or multi-user access.",
    },
    {
      icon: Database,
      title: "Database — Supabase or Local-First Storage",
      desc: "A managed Postgres database for connected tools, or embedded local storage for fully offline software — matched to how the tool is actually used.",
    },
  ];

  const whyCustom = [
    {
      icon: Zap,
      title: "Solves the Actual Problem",
      desc: "Built around your specific workflow and edge cases, not the generic 80% a mass-market tool covers.",
    },
    {
      icon: ShieldCheck,
      title: "Secure by Default",
      desc: "Modern authentication, data handling, and access control baked in from the first commit.",
    },
    {
      icon: Layers,
      title: "Scales With You",
      desc: "Clean, modular architecture that can grow from a single script into a full internal platform.",
    },
    {
      icon: Gauge,
      title: "No Subscription Bloat",
      desc: "You own the software outright — no per-seat SaaS pricing for a tool built just for you.",
    },
  ];

  const process = [
    {
      icon: Search,
      title: "Discovery",
      desc: "We map the actual problem, workflow, and any existing systems or data the tool needs to work with.",
    },
    {
      icon: PenTool,
      title: "Solution Design",
      desc: "We sketch out how the tool should work — interface, data flow, and edge cases — before writing code.",
    },
    {
      icon: Code,
      title: "Development",
      desc: "Clean, tested code built against the agreed scope, with visible progress throughout.",
    },
    {
      icon: TestTube2,
      title: "QA & Testing",
      desc: "Testing against real workflows and edge cases, including offline and failure scenarios where relevant.",
    },
    {
      icon: Rocket,
      title: "Deployment",
      desc: "Packaging and rollout to your team's machines, servers, or environment with minimal disruption.",
    },
    {
      icon: Wrench,
      title: "Support",
      desc: "A free hypercare window after launch, followed by ongoing maintenance or feature work as needed.",
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: "What counts as \"custom software\" here?",
      answer:
        "Anything that doesn't fit neatly into a website, mobile app, or off-the-shelf SaaS product. That includes internal tools, offline-first desktop apps, terminal and CLI utilities, automation scripts, and one-off systems built around a specific business problem — if a generic tool doesn't solve it well, this is the service that does.",
    },
    {
      question: "We don't have internet access where this tool needs to run — is that a problem?",
      answer:
        "No — offline-first is one of our core use cases. We build software that stores and works with data locally, with syncing added only where and if it's actually needed, so the tool keeps working regardless of connectivity.",
    },
    {
      question: "Do you build terminal or command-line tools, not just apps with a UI?",
      answer:
        "Yes. CLI tools are a common request from technical teams — for automation, CI pipelines, or internal scripts — and we build them to be scriptable, config-driven, and easy to distribute as a single binary.",
    },
    {
      question: "How do you scope a project when the problem is unusual or hard to describe?",
      answer:
        "That's exactly what the discovery phase is for. We sit down with whoever actually deals with the problem day-to-day, map out the real workflow and edge cases, and turn that into a concrete scope and timeline before any code is written.",
    },
    {
      question: "Who owns the software once it's built?",
      answer:
        "You do. There's no proprietary lock-in — you receive full ownership of the codebase and can host it, extend it, or hand it to another team at any point.",
    },
    {
      question: "Can you take over or extend an existing internal tool or legacy system?",
      answer:
        "Yes. We regularly take over undocumented or aging internal tools, understand what they actually do, and either extend them safely or rebuild them on a more maintainable foundation without disrupting the team relying on them.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Custom Software Development",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/custom`,
        description:
          "Bespoke software development for internal business tooling and niche problems, including offline-first desktop apps, terminal and CLI tools, process automation, and systems integration.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Custom Software Development Services",
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
          aria-labelledby="custom-hero-heading"
          className="relative min-h-[70vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Custom Software Development
            </span>
            <h1
              id="custom-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Software built for the problems off-the-shelf tools can&apos;t
              solve.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-10">
              Internal tooling, offline-first desktop apps, terminal and CLI
              tools, automation, and anything else your business needs that
              doesn&apos;t fit into a box.
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
                If it doesn&apos;t fit neatly into a website or mobile app, it
                fits here — software shaped entirely around your process, not
                the other way around.
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
                Custom software means the stack is chosen to fit the problem —
                not the other way around. Here&apos;s the foundation we usually
                build on.
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
                  Right-Sized From Day One
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  A single-user CLI tool doesn&apos;t need a cloud database, and
                  a company-wide internal platform can&apos;t run on a script on
                  someone&apos;s laptop. We match the architecture to the actual
                  scale of the problem, then build in room to grow if the
                  tool&apos;s usage expands beyond its original scope.
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
                Generic tools are fine until your problem is the one they
                weren&apos;t built for. Here&apos;s what purpose-built software
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
                How a Custom Project Runs With Us
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
                Common questions from clients scoping a custom software
                project.
              </p>
            </div>

            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* 6. CLOSING CTA */}
        <section
          aria-labelledby="custom-cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="custom-cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Have a problem no off-the-shelf tool solves?
            </h2>
            <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
              Tell us what you&apos;re dealing with and we&apos;ll map out an
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