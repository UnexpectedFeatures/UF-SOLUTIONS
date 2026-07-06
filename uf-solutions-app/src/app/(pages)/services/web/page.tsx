import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  Newspaper,
  ShoppingCart,
  HeartPulse,
  Wallet,
  LayoutDashboard,
  Search,
  PenTool,
  Code,
  TestTube2,
  Rocket,
  Wrench,
  ShieldCheck,
  Zap,
  Gauge,
  Layers,
} from "lucide-react";

/**
 * SEO NOTES (same conventions as the homepage / about page)
 * -----------------------------------------------------------
 * - No "use client": this is a static informational page, so it stays a
 *   Server Component and can export `metadata` + render JSON-LD directly.
 * - Unique `metadata` for this exact URL (/services/web) — never copy the
 *   homepage's title/description onto a service page.
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
const OG_IMAGE = `${SITE_URL}/og-services-web.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Website Design & Web Application Development | ${SITE_NAME}`,
  description:
    "Custom website design and web application development: brochure sites, blogs, e-commerce, clinic management systems, financial trackers, and internal business tooling — built to fit your operations, not a template.",
  keywords: [
    "website design services",
    "web application development",
    "custom e-commerce development",
    "clinic management system development",
    "financial tracker web app",
    "internal tooling development",
    "business website development",
  ],
  alternates: {
    canonical: "/services/web",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services/web`,
    siteName: SITE_NAME,
    title: `Website Design & Web Application Development | ${SITE_NAME}`,
    description:
      "From brochure sites and blogs to e-commerce, clinic management systems, financial trackers, and internal tooling — custom-built web solutions for your business.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Web design and development services at ${SITE_NAME}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Website Design & Web Application Development | ${SITE_NAME}`,
    description:
      "Custom brochure sites, blogs, e-commerce, clinic management systems, financial trackers, and internal tooling — built around your business.",
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

export default function WebServicesPage() {
  const offerings: OfferingCardProps[] = [
    {
      title: "Brochure & Marketing Websites",
      desc: "Fast, on-brand sites that clearly explain who you are and turn visitors into inquiries.",
      icon: Globe,
      bullets: [
        "Custom design, not a recycled template",
        "Mobile-first, fast-loading pages",
        "Built-in on-page SEO foundations",
        "Simple content updates without a developer",
      ],
    },
    {
      title: "Blogs & Content Platforms",
      desc: "A publishing setup that makes it easy to put out content and actually rank for it.",
      icon: Newspaper,
      bullets: [
        "Clean author and editor workflow",
        "SEO-friendly URLs, metadata, and sitemaps",
        "Categories, tags, and related-post logic",
        "Fast page loads that hold onto readers",
      ],
    },
    {
      title: "E-Commerce Applications",
      desc: "Storefronts built around your actual catalog, pricing rules, and checkout flow.",
      icon: ShoppingCart,
      bullets: [
        "Custom product, variant, and inventory logic",
        "Secure payment and order processing",
        "Admin dashboard for orders and stock",
        "Built to handle traffic spikes at launch or sale time",
      ],
    },
    {
      title: "Clinic & Healthcare Management Systems",
      desc: "Scheduling, patient records, and checkout flows tailored to how your clinic actually runs.",
      icon: HeartPulse,
      bullets: [
        "Appointment scheduling and reminders",
        "Patient records and visit history",
        "Role-based access for staff vs. providers",
        "Built with data privacy in mind from day one",
      ],
    },
    {
      title: "Financial Trackers & Dashboards",
      desc: "Custom tools for tracking revenue, expenses, or portfolio data in real time.",
      icon: Wallet,
      bullets: [
        "Live dashboards and custom reports",
        "Integrations with your existing data sources",
        "Role-based permissions for sensitive data",
        "Export to CSV/PDF for accounting and audits",
      ],
    },
    {
      title: "Internal Tooling & Admin Panels",
      desc: "Purpose-built software for the operational workflows generic tools can't handle.",
      icon: LayoutDashboard,
      bullets: [
        "Custom workflows mapped to your team's process",
        "Automates manual, repetitive data entry",
        "Scales as headcount and complexity grow",
        "Built to be maintained by your team long-term",
      ],
    },
  ];

  const whyCustom = [
    {
      icon: Gauge,
      title: "Built for Speed",
      desc: "Optimized for Core Web Vitals — fast load times that keep visitors around and support your search rankings.",
    },
    {
      icon: ShieldCheck,
      title: "Secure by Default",
      desc: "Modern authentication, data handling, and hosting practices baked in from the first commit.",
    },
    {
      icon: Layers,
      title: "Scales With You",
      desc: "Clean, modular architecture that can grow from an MVP into a full platform without a rebuild.",
    },
    {
      icon: Zap,
      title: "No Template Lock-In",
      desc: "You own the codebase outright — no proprietary page builder holding your site hostage.",
    },
  ];

  const process = [
    {
      icon: Search,
      title: "Discovery",
      desc: "We map your goals, users, and any existing systems the new site or app needs to work with.",
    },
    {
      icon: PenTool,
      title: "UX / UI Design",
      desc: "Wireframes and clickable prototypes so you can see and adjust the experience before development starts.",
    },
    {
      icon: Code,
      title: "Development",
      desc: "Clean, tested code built against the agreed scope, with visible progress throughout.",
    },
    {
      icon: TestTube2,
      title: "QA & Testing",
      desc: "Cross-browser, cross-device testing plus performance and accessibility checks before launch.",
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "Staged deployment, DNS/hosting setup, and a smoke-tested go-live with minimal downtime.",
    },
    {
      icon: Wrench,
      title: "Support",
      desc: "A free hypercare window after launch, followed by ongoing maintenance or feature work as needed.",
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: "How long does it take to build a website or web application?",
      answer:
        "A brochure or blog site typically takes 2–4 weeks from kickoff to launch. Custom web applications — e-commerce, clinic management systems, financial trackers, or internal tools — usually run 6–12 weeks depending on scope, integrations, and how much custom logic is involved. You'll get a firm timeline after the discovery phase.",
    },
    {
      question: "Do you build on a page builder or platform like WordPress or Shopify?",
      answer:
        "It depends on the project. Simple brochure sites can sometimes be well served by a managed platform, and we'll say so if that's the better fit for your budget. For anything with custom business logic — e-commerce with non-standard rules, clinic scheduling, financial dashboards, internal tools — we build custom so the software matches your process instead of forcing your process to match the software.",
    },
    {
      question: "Can you redesign or rebuild an existing website?",
      answer:
        "Yes. We regularly take over aging or slow sites, migrate the content, and rebuild on a modern, faster stack — usually without losing your existing search rankings if redirects and URL structure are handled correctly, which we account for during planning.",
    },
    {
      question: "Who owns the code after the project is done?",
      answer:
        "You do. There's no proprietary lock-in — you receive full ownership of the codebase and can host it, extend it, or hand it to another team at any point.",
    },
    {
      question: "Do you handle hosting and ongoing maintenance?",
      answer:
        "We can set up and manage hosting for you, or hand off deployment credentials if you'd rather run it in-house. Every project includes a free post-launch hypercare window, after which ongoing maintenance and feature work are available on a retainer or as-needed basis.",
    },
    {
      question: "Is my data secure in a clinic management system or financial tracker?",
      answer:
        "Security and access control are built in from the design phase, not bolted on afterward — role-based permissions, encrypted data handling, and secure authentication are standard on any system handling patient or financial data. If your project has specific compliance requirements (e.g. HIPAA-adjacent handling), we scope those requirements explicitly during discovery.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Web Design and Web Application Development",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/web`,
        description:
          "Custom website design and web application development, including brochure websites, blogs, e-commerce, clinic management systems, financial trackers, and internal business tooling.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Design & Development Services",
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
          aria-labelledby="web-hero-heading"
          className="relative min-h-[70vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Website & Web Application Development
            </span>
            <h1
              id="web-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Websites and web applications built around how your business
              actually runs.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-10">
              From brochure sites and blogs that build your brand, to
              full-stack applications — e-commerce, clinic management,
              financial tracking, internal tooling — that run your
              day-to-day operations.
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
                Whether you need a simple online presence or a system that
                runs core parts of your business, it&apos;s built custom around
                your requirements — not squeezed into a template.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map((o) => (
                <OfferingCard key={o.title} {...o} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. WHY CUSTOM (benefits) */}
        <section
          aria-labelledby="why-custom-heading"
          className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5"
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
                Templates and page builders are fine until your business
                outgrows what they can do. Here&apos;s what custom development
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

        {/* 4. OUR PROCESS */}
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
                How a Web Project Runs With Us
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
                Common questions from clients scoping a website or web
                application project.
              </p>
            </div>

            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* 6. CLOSING CTA */}
        <section
          aria-labelledby="web-cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="web-cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Have a brochure site, blog, or business application in mind?
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