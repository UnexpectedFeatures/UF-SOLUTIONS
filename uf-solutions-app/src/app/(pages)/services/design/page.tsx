import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Palette,
  Megaphone,
  Layout,
  BookOpen,
  Shirt,
  Presentation,
  Search,
  PenTool,
  Rocket,
  Wrench,
  ShieldCheck,
  Zap,
  Layers,
  Gauge,
  Image as ImageIcon,
  TrendingUp,
} from "lucide-react";

/**
 * SEO NOTES (same conventions as the homepage / about page / /services/mobile page)
 * -----------------------------------------------------------
 * - No "use client": this is a static informational page, so it stays a
 *   Server Component and can export `metadata` + render JSON-LD directly.
 * - Unique `metadata` for this exact URL (/services/graphic-design) — never
 *   copy the homepage's or another service page's title/description.
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
const OG_IMAGE = `${SITE_URL}/og-services-graphic-design.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Graphic Design Services (Adobe & Canva) | ${SITE_NAME}`,
  description:
    "Custom graphic design for posters, logos, business cards, social media posts, website banners, infographics, brochures, flyers, book covers, t-shirt designs, icons, product packaging, magazines, menu cards, advertisements, presentations, and newsletters — designed in Adobe or Canva.",
  keywords: [
    "graphic design services",
    "logo design",
    "business card design",
    "social media graphics",
    "brochure and flyer design",
    "book cover design",
    "product packaging design",
    "presentation design",
    "canva design services",
    "adobe illustrator design services",
  ],
  alternates: {
    canonical: "/services/graphic-design",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services/graphic-design`,
    siteName: SITE_NAME,
    title: `Graphic Design Services (Adobe & Canva) | ${SITE_NAME}`,
    description:
      "From logos and packaging to social posts and full brand systems — custom graphic design work delivered in Adobe or Canva, print- and web-ready.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Graphic design services at ${SITE_NAME}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Graphic Design Services (Adobe & Canva) | ${SITE_NAME}`,
    description:
      "Custom graphic design — logos, packaging, social posts, print, and presentations — delivered in Adobe or Canva, print- and web-ready.",
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

export default function GraphicDesignServicesPage() {
  const offerings: OfferingCardProps[] = [
    {
      title: "Brand Identity Design",
      desc: "Logos and marks that give a business a consistent visual identity across everything it touches.",
      icon: Palette,
      bullets: [
        "Logo design & brand marks",
        "Business card design",
        "Custom icon sets",
        "Style guide for consistent use",
      ],
    },
    {
      title: "Social & Digital Marketing",
      desc: "Scroll-stopping visuals sized correctly for every feed, banner slot, and ad placement you run.",
      icon: Megaphone,
      bullets: [
        "Social media post templates",
        "Website banners",
        "Digital advertisements",
        "Sized for every platform",
      ],
    },
    {
      title: "Print & Promotional Materials",
      desc: "Posters, flyers, and brochures built print-ready from the first draft, not fixed up after the fact.",
      icon: Layout,
      bullets: [
        "Posters & flyers",
        "Brochures & trifolds",
        "Menu card design",
        "Print-ready, correct color profiles",
      ],
    },
    {
      title: "Publications & Editorial",
      desc: "Multi-page layouts for books, magazines, and newsletters that stay consistent from cover to back page.",
      icon: BookOpen,
      bullets: [
        "Book cover design",
        "Magazine layouts",
        "Newsletter design",
        "Reusable multi-page templates",
      ],
    },
    {
      title: "Apparel & Packaging",
      desc: "Designs built to survive the jump from screen to physical product, with mockups before anything prints.",
      icon: Shirt,
      bullets: [
        "T-shirt & merch designs",
        "Product packaging",
        "Die-line & print setup",
        "Mockups for sign-off before print",
      ],
    },
    {
      title: "Presentations & Infographics",
      desc: "Decks and data visuals that make complex information easy to follow at a glance.",
      icon: Presentation,
      bullets: [
        "Presentation deck design",
        "Infographics & data visuals",
        "Reusable slide templates",
        "Consistent brand application",
      ],
    },
  ];

  const designTools = [
    {
      icon: PenTool,
      title: "Adobe Creative Cloud",
      desc: "Illustrator, Photoshop, and InDesign for vector work, image editing, and multi-page layouts that need full production control.",
    },
    {
      icon: Layers,
      title: "Canva Pro",
      desc: "Fast, collaborative design for social content and templates your own team can reuse and edit after handoff.",
    },
    {
      icon: ImageIcon,
      title: "Print- & Web-Ready Exports",
      desc: "Every file delivered in the right format and resolution — CMYK-ready PDFs for print, optimized assets for web and social.",
    },
  ];

  const whyCustom = [
    {
      icon: ShieldCheck,
      title: "On-Brand, Every Time",
      desc: "Consistent color, type, and style across every deliverable, not a new look each time you order something.",
    },
    {
      icon: Layers,
      title: "Scales With Your Brand",
      desc: "Starts with one design, grows into a full reusable system as your marketing needs expand.",
    },
    {
      icon: Gauge,
      title: "Built for Every Platform",
      desc: "Sized and optimized correctly whether it's headed to print, a social feed, or a website banner.",
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      desc: "Most single designs are delivered in days, with clear timelines given upfront for larger projects.",
    },
  ];

  const process = [
    {
      icon: Search,
      title: "Discovery",
      desc: "We learn your brand, audience, and the goal of this specific design before sketching anything.",
    },
    {
      icon: PenTool,
      title: "Concept & Moodboard",
      desc: "Quick concepts and mood boards so direction is agreed on before full design work begins.",
    },
    {
      icon: Palette,
      title: "Design",
      desc: "The design is built out in full using Adobe or Canva, whichever fits the deliverable best.",
    },
    {
      icon: CheckCircle2,
      title: "Review & Revisions",
      desc: "You review drafts and request changes; revisions are built into every project scope.",
    },
    {
      icon: Rocket,
      title: "Finalization & Export",
      desc: "Final files are exported in every format you need — print, web, and editable source files.",
    },
    {
      icon: Wrench,
      title: "Support",
      desc: "Ongoing design support for future updates, resizes, or new pieces as your needs grow.",
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: "Do you design in Adobe or Canva?",
      answer:
        "Both. We choose whichever tool fits the deliverable and how you plan to use it afterward — Adobe Illustrator, Photoshop, or InDesign for logos, packaging, and multi-page layouts, or Canva when you want editable templates your own team can update without design software.",
    },
    {
      question: "How many revisions are included?",
      answer:
        "Every project includes a set number of revision rounds agreed on upfront during scoping, so feedback has a clear place to go before final files are exported. Larger projects like brand identities or full publications typically include more rounds than a single social graphic.",
    },
    {
      question: "What file formats will I receive?",
      answer:
        "You'll get the right format for how the design is used — print-ready PDFs with correct color profiles for anything going to a printer, PNG or JPG exports sized for web and social, and editable source files (AI, PSD, INDD, or a Canva template link) so future edits don't require starting over.",
    },
    {
      question: "Who owns the final design files?",
      answer:
        "You do. There's no licensing fee or lock-in — once a project is complete, you receive full ownership of the final files and any source files agreed on in scope.",
    },
    {
      question: "How long does a typical design take?",
      answer:
        "A single graphic — a poster, flyer, or social post — is usually delivered within a few days. Larger projects such as a full brand identity, packaging system, or a multi-page magazine or brochure typically run one to three weeks depending on scope and revision rounds.",
    },
    {
      question: "Can you match my existing brand guidelines?",
      answer:
        "Yes. If you already have brand colors, fonts, or a style guide, every new design is built to match it. If you don't have one yet, we can establish those foundations as part of a brand identity project.",
    },
    {
      question: "Do you provide print-ready files for professional printers?",
      answer:
        "Yes. Anything intended for print — posters, brochures, packaging, menu cards — is delivered with correct bleed, resolution, and CMYK color profiles so it's ready to hand directly to a print shop.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Graphic Design Services",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/graphic-design`,
        description:
          "Custom graphic design services including logos, business cards, posters, social media posts, website banners, infographics, brochures, flyers, book covers, t-shirt designs, icons, product packaging, magazines, menu cards, advertisements, presentations, and newsletters, delivered in Adobe or Canva.",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Graphic Design Services",
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
          aria-labelledby="design-hero-heading"
          className="relative min-h-[70vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Graphic Design
            </span>
            <h1
              id="design-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Design work built around your brand, not a stock template.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-10">
              Logos, packaging, social content, print, and publications —
              designed in Adobe or Canva and delivered ready for print or the
              web.
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
                What We Design
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                From a single social post to a full brand system, every
                deliverable is designed around your brand&apos;s colors,
                type, and voice — not squeezed into a template.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map((o) => (
                <OfferingCard key={o.title} {...o} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. OUR DESIGN TOOLS */}
        <section
          aria-labelledby="tools-heading"
          className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="tools-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Our Design Tools
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                Every project is made in whichever tool actually fits the
                deliverable — full production software or fast, editable
                templates.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {designTools.map((item) => (
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
                  One Design, or a Whole System
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  Start with a single piece — a logo, a poster, a set of
                  social templates — and build outward from there. As your
                  brand grows, we extend the same visual system into
                  packaging, publications, and presentations, so everything
                  stays consistent instead of looking like it came from
                  different designers.
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
                Why Businesses Choose Custom Over Stock Templates
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                Free templates are fine until your brand needs to look
                consistent everywhere it shows up. Here&apos;s what custom
                design gets you instead.
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
                How a Design Project Runs With Us
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                A transparent, six-stage process from first conversation to
                final files.
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

        {/* 6. FAQ — genuinely helpful for clients, and eligible for FAQ rich results */}
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
                Common questions from clients scoping a design project.
              </p>
            </div>

            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* 7. CLOSING CTA */}
        <section
          aria-labelledby="design-cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="design-cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Have a design project in mind?
            </h2>
            <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
              Tell us what you need designed and we&apos;ll map out an honest
              scope, timeline, and quote — free of cost.
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