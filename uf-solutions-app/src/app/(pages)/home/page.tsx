import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Monitor,
  Smartphone,
  Settings,
  Workflow,
  ArrowRight,
  CheckCircle2,
  FileText,
  Code,
  Rocket,
  Wrench,
  Search,
  MessageSquare,
  ThumbsUp,
  XCircle,
  Quote,
  Star,
  Mail,
} from "lucide-react";

/**
 * SEO NOTES
 * ---------
 * 1. This file no longer has "use client" at the top. Nothing in the original
 *    component actually needed client-side interactivity (no useState,
 *    useEffect, or event handlers) — it only used <Link> and icon
 *    components, both of which work fine as a Server Component. Removing
 *    "use client" is what unlocks metadata export below, lets Next.js
 *    render this page's HTML on the server (much better for crawlers and
 *    Core Web Vitals), and reduces client JS shipped to the browser.
 * 2. `metadata` (title, description, canonical, Open Graph, Twitter card)
 *    is exported directly from the page, which is the standard Next.js App
 *    Router pattern for per-page SEO tags.
 * 3. JSON-LD structured data (Organization + Service + Review schema) is
 *    injected via a <script type="application/ld+json"> tag so search
 *    engines can understand your business, services, and testimonials
 *    (this can help unlock rich results like star ratings).
 * 4. Heading hierarchy is kept clean: exactly one <h1>, then <h2> for each
 *    major section, <h3> for cards/steps within a section — good for both
 *    accessibility and how search engines outline your page.
 * 5. Decorative icons get aria-hidden="true" so screen readers (and
 *    crawlers building an accessibility tree) skip over pure decoration
 *    instead of announcing meaningless icon labels.
 * 6. "Read More" links now carry a visible "Read More" plus a `sr-only`
 *    span with the descriptive part ("about {title}"). This matters
 *    because some link-text audits (Lighthouse/SEO crawlers included)
 *    check a link's *visible text content*, not its computed aria-label —
 *    so a bare "Read More" with only an aria-label can still get flagged
 *    as non-descriptive even though screen readers handle it correctly.
 *    Putting the description in the text content (visually hidden via
 *    sr-only) satisfies both real assistive tech and content-scanning
 *    audit tools at once.
 * 7. Testimonials now use semantic <figure>/<blockquote>/<figcaption>
 *    markup instead of a plain <div>+<p>, which better matches how search
 *    engines and rich-result parsers expect quoted testimonial content to
 *    be marked up.
 * 8. Update the placeholder values below (SITE_URL, business name, social
 *    links, image paths) with your real domain/assets before deploying.
 * 9. Graphics & Design has been removed from the core services grid and
 *    replaced with Workflow Automation, pointing at
 *    /services/workflow-automation — matches the current service lineup.
 */

const SITE_URL = "https://www.example.com"; // TODO: replace with your real domain
const SITE_NAME = "Your Company Name"; // TODO: replace with your real business name
const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} | Custom Web, Mobile & Software Development`,
  description:
    "We engineer custom web applications, cross-platform mobile apps, bespoke software, and workflow automation to eliminate your business bottlenecks. Get a free project quote today.",
  keywords: [
    "custom software development",
    "web application development",
    "mobile app development",
    "custom POS systems",
    "clinic management systems",
    "workflow automation services",
    "software consulting",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Custom Web, Mobile & Software Development`,
    description:
      "Custom web architectures, cross-platform mobile systems, and enterprise business tooling mapped to your concrete operations.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — engineering digital transformation`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Custom Web, Mobile & Software Development`,
    description:
      "Custom web architectures, cross-platform mobile systems, and enterprise business tooling mapped to your concrete operations.",
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

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number; "aria-hidden"?: boolean }>;
  href: string;
}

function ServiceCard({ title, desc, icon: Icon, href }: ServiceCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div
          className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        >
          <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6">{desc}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-white transition-colors group/btn"
      >
        Read More <span className="sr-only">about {title}</span>
        <ArrowRight size={16} aria-hidden="true" className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
  email: string;
  avatar: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-white/20"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  t,
  decorative = false,
}: {
  t: Testimonial;
  /** Set true for duplicated marquee copies so assistive tech and keyboard
   *  focus skip the repeated content entirely. */
  decorative?: boolean;
}) {
  return (
    <figure
      aria-hidden={decorative || undefined}
      className="w-[320px] sm:w-[380px] shrink-0 bg-white/[0.02] border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <Quote size={28} aria-hidden="true" className="text-[var(--accent)]/20" />
          <StarRating rating={t.rating} />
        </div>
        <blockquote className="text-white/80 text-sm leading-relaxed italic">
          <p>&ldquo;{t.quote}&rdquo;</p>
        </blockquote>
      </div>
      <figcaption className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.avatar}
          alt=""
          aria-hidden="true"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full border border-white/10 shrink-0"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold text-white truncate">{t.author}</p>
          <p className="text-xs text-white/40 mt-0.5 truncate">{t.role}</p>
          <a
            href={`mailto:${t.email}`}
            tabIndex={decorative ? -1 : 0}
            className="text-xs text-[var(--accent)]/80 hover:text-[var(--accent)] mt-1 flex items-center gap-1 truncate transition-colors"
          >
            <Mail size={11} aria-hidden="true" className="shrink-0" />
            <span className="truncate">{t.email}</span>
          </a>
        </div>
      </figcaption>
    </figure>
  );
}

export default function HomePage() {
  const services: ServiceCardProps[] = [
    {
      title: "Website Design & Application",
      desc: "From sleek brochure sites that capture your brand identity to high-performance, complex full-stack web systems like e-commerce, clinic management, and custom booking platforms.",
      icon: Monitor,
      href: "/services/web",
    },
    {
      title: "Mobile Application",
      desc: "Native-quality cross-platform mobile apps tailored to your business rules, ensuring a seamless user experience across both iOS and Android platforms from a single clean codebase.",
      icon: Smartphone,
      href: "/services/mobile",
    },
    {
      title: "Custom Software",
      desc: "Bespoke software solutions built exactly around your business bottlenecks. We construct everything from robust terminal point-of-sale systems to specialized internal desktop tooling.",
      icon: Settings,
      href: "/services/custom",
    },
    {
      title: "Workflow Automation",
      desc: "Stop wasting hours on manual data entry and repetitive operations. We build reliable automation pipelines that connect your tools, extract data from documents, and never lose a transaction.",
      icon: Workflow,
      href: "/services/workflow-automation",
    },
  ];

  // TODO: Replace with real client reviews, emails, and headshots before
  // publishing. Avatars currently use ui-avatars.com to auto-generate an
  // initials-based placeholder from each name — swap the `avatar` URL for a
  // real photo whenever you have one.
  const testimonials: {
    quote: string;
    author: string;
    role: string;
    rating: number;
    email: string;
    avatar: string;
  }[] = [
    {
      quote:
        "The clinic management system completely streamlined our daily checkout flow. Speed and communication throughout the project were exceptional.",
      author: "Leonardo Medical Services",
      role: "Operations Management",
      rating: 5,
      email: "ops@leonardomedical.example.com",
      avatar: "https://ui-avatars.com/api/?name=Leonardo+Medical&background=1e293b&color=fff",
    },
    {
      quote:
        "They took a highly chaotic legacy internal business logic process and consolidated it into a clean terminal POS app. Maintenance support has been outstanding.",
      author: "Retail Nexus Corp",
      role: "Founder & CEO",
      rating: 5,
      email: "founder@retailnexus.example.com",
      avatar: "https://ui-avatars.com/api/?name=Retail+Nexus&background=1e293b&color=fff",
    },
    {
      quote:
        "Our internal invoice processing used to take a full day every week. Now it happens automatically the moment the email lands.",
      author: "Vanguard Media Group",
      role: "Operations Director",
      rating: 5,
      email: "operations@vanguardmedia.example.com",
      avatar: "https://ui-avatars.com/api/?name=Vanguard+Media&background=1e293b&color=fff",
    },
    {
      quote:
        "Our booking platform went from spreadsheets to a fully automated system in six weeks. No downtime, no drama.",
      author: "Aurora Wellness Spa",
      role: "General Manager",
      rating: 5,
      email: "gm@aurorawellness.example.com",
      avatar: "https://ui-avatars.com/api/?name=Aurora+Wellness&background=1e293b&color=fff",
    },
    {
      quote:
        "The mobile app they built handles both our driver and customer side flawlessly. Support after launch has been quick and thorough.",
      author: "Metro Logistics Co.",
      role: "Head of Operations",
      rating: 4,
      email: "operations@metrologistics.example.com",
      avatar: "https://ui-avatars.com/api/?name=Metro+Logistics&background=1e293b&color=fff",
    },
    {
      quote:
        "We came in with a vague problem and left with a precise technical roadmap. The discovery phase alone was worth the engagement.",
      author: "Bright Path Consulting",
      role: "Managing Partner",
      rating: 5,
      email: "partner@brightpath.example.com",
      avatar: "https://ui-avatars.com/api/?name=Bright+Path&background=1e293b&color=fff",
    },
    {
      quote:
        "Our internal inventory tool used to take two people a full day to reconcile. Now it takes ten minutes.",
      author: "Coastal Hardware Supply",
      role: "Warehouse Director",
      rating: 5,
      email: "warehouse@coastalhardware.example.com",
      avatar: "https://ui-avatars.com/api/?name=Coastal+Hardware&background=1e293b&color=fff",
    },
    {
      quote:
        "They connected our CRM and payment provider so leads stop falling through the cracks. Genuinely changed how our sales team works.",
      author: "Nimbus Fitness Studio",
      role: "Owner",
      rating: 4,
      email: "owner@nimbusfitness.example.com",
      avatar: "https://ui-avatars.com/api/?name=Nimbus+Fitness&background=1e293b&color=fff",
    },
    {
      quote:
        "Communication was constant and honest, even when a milestone slipped. That transparency is rare and appreciated.",
      author: "Harbor Point Realty",
      role: "Broker of Record",
      rating: 5,
      email: "broker@harborpointrealty.example.com",
      avatar: "https://ui-avatars.com/api/?name=Harbor+Point&background=1e293b&color=fff",
    },
    {
      quote:
        "They rebuilt our checkout flow and conversions went up within the first week of launch. Genuinely impressive turnaround.",
      author: "Lumen Skincare Co.",
      role: "E-commerce Lead",
      rating: 5,
      email: "ecommerce@lumenskincare.example.com",
      avatar: "https://ui-avatars.com/api/?name=Lumen+Skincare&background=1e293b&color=fff",
    },
  ];

  // Structured data: describes the business and its services/reviews to
  // search engines. Update sameAs/telephone/address with real values.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    description:
      "Custom web architectures, cross-platform mobile systems, and enterprise business tooling engineered to eliminate operational bottlenecks.",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.desc,
        },
      })),
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewBody: t.quote,
      author: {
        "@type": "Organization",
        name: t.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
      },
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      ).toFixed(1),
      reviewCount: testimonials.length,
      bestRating: "5",
    },
  };

  return (
    <div className="bg-[#0b1120] text-white min-h-screen font-sans antialiased overflow-x-hidden">
      {/* Structured data for search engines (Organization / Services / Reviews) */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* 1. HERO SECTION */}
        <section
          aria-labelledby="hero-heading"
          className="relative min-h-[90vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="flex flex-col space-y-6">
              <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit">
                Engineering Digital Transformation
              </span>
              {/* Single, keyword-rich h1 for the page */}
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
              >
                We engineer clean systems to eliminate your business bottlenecks.
              </h1>
              <p className="text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
                We specialize in custom web architectures, cross-platform
                mobile systems, and targeted enterprise business tooling. No
                boilerplate solutions, just high-performance code mapped to
                your concrete operations.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
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
                  href="#services"
                  className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition"
                >
                  Explore Services
                </Link>
              </div>

              {/* Trust Indicators */}
              <dl className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 mt-12">
                <div>
                  <dt className="sr-only">Years of experience</dt>
                  <dd className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    4+
                  </dd>
                  <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">
                    Years Experience
                  </p>
                </div>
                <div>
                  <dt className="sr-only">Projects completed</dt>
                  <dd className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    20+
                  </dd>
                  <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">
                    Projects Done
                  </p>
                </div>
                <div>
                  <dt className="sr-only">Happy clients</dt>
                  <dd className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    30+
                  </dd>
                  <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">
                    Happy Clients
                  </p>
                </div>
                <div>
                  <dt className="sr-only">Client satisfaction rate</dt>
                  <dd className="text-3xl sm:text-4xl font-extrabold text-[var(--accent)] tracking-tight">
                    100%
                  </dd>
                  <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">
                    Satisfaction Rate
                  </p>
                </div>
              </dl>
            </div>

            <div className="relative flex justify-center items-center w-full h-[350px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#0d1527] shadow-[0_30px_60px_rgba(0,0,0,0.5)] group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 z-10" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="relative z-20 p-8 text-center max-w-sm flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4 group-hover:scale-105 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <Code size={24} />
                </div>
                <p className="text-sm font-medium text-white/70 tracking-wide">
                  Interactive Dashboard & Application Visual Container
                </p>
                <p className="text-xs text-white/40 mt-2">
                  Production-grade layout architectures optimized for
                  low-latency client performance.
                </p>
                {/*
                  TODO: Replace this decorative box with a real optimized
                  <Image> (next/image) of an actual product screenshot.
                  A real image with a descriptive `alt` attribute gives
                  search engines (and Google Images) something concrete to
                  index and improves perceived credibility for visitors.
                */}
              </div>
            </div>
          </div>
        </section>

        {/* 2. BRIEF INTRODUCTION OF SERVICES */}
        <section
          id="services"
          aria-labelledby="services-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="services-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Core Capabilities Engineered for Scale
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                We convert technical requirements into high-availability
                digital solutions optimized for specific production
                challenges.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* 3. HOW IT WORKS */}
        <section
          aria-labelledby="workflow-heading"
          className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2
                id="workflow-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Our Structural Workflow Engine
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                Two precise pipeline methodologies adapted strictly to your
                current conceptual readiness and operational clarity.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Pipeline Alpha: Clear Objectives */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 relative">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Defined Strategy Path
                  </h3>
                </div>
                <p className="text-sm text-white/45 mb-8">
                  Ideal if your team already has a consolidated product
                  requirement matrix, technical specifications, or distinct
                  workflows that require programmatic execution.
                </p>

                <ol className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  <li className="flex gap-4 relative">
                    <div
                      className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0"
                      aria-hidden="true"
                    >
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        Proposal Draft{" "}
                        <FileText size={14} aria-hidden="true" className="text-white/45" />
                      </h4>
                      <p className="text-xs text-white/50 mt-1">
                        We formalize a rigorous architectural strategy,
                        timeline milestones, and system boundaries.
                      </p>

                      {/* Inner feedback loop container */}
                      <div className="mt-3 bg-white/[0.03] border border-white/10 rounded-xl p-3 flex flex-col gap-2.5">
                        <div className="flex items-start gap-2 text-xs">
                          <XCircle
                            size={14}
                            aria-hidden="true"
                            className="text-rose-400 mt-0.5 shrink-0"
                          />
                          <div>
                            <span className="text-rose-400 font-semibold">
                              If Declined:
                            </span>{" "}
                            We process structural feedback immediately,
                            refactor parameters, and generate an updated
                            specification package.
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-xs">
                          <ThumbsUp
                            size={14}
                            aria-hidden="true"
                            className="text-emerald-400 mt-0.5 shrink-0"
                          />
                          <div>
                            <span className="text-emerald-400 font-semibold">
                              If Approved:
                            </span>{" "}
                            Direct advancement into high-velocity production
                            cycles.
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="flex gap-4 relative">
                    <div
                      className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0"
                      aria-hidden="true"
                    >
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        Development Matrix{" "}
                        <Code size={14} aria-hidden="true" className="text-white/45" />
                      </h4>
                      <p className="text-xs text-white/50 mt-1">
                        Clean modular engineering begins. Code changes are
                        verified and continuously integrated against defined
                        scope criteria.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4 relative">
                    <div
                      className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0"
                      aria-hidden="true"
                    >
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        Incremental Updates{" "}
                        <MessageSquare size={14} aria-hidden="true" className="text-white/45" />
                      </h4>
                      <p className="text-xs text-white/50 mt-1">
                        We maintain real-time transparent reporting,
                        dispatching ongoing progression metrics and feature
                        demonstrations for validation.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4 relative">
                    <div
                      className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 z-10 shrink-0"
                      aria-hidden="true"
                    >
                      4
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                        System Deployment <Rocket size={14} aria-hidden="true" />
                      </h4>
                      <p className="text-xs text-white/50 mt-1">
                        Once all criteria pass integration smoke tests, the
                        completed platform is safely staged and shifted into
                        production environment infrastructure.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              {/* Pipeline Beta: Complex / Unmapped Operations */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 relative">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <Search size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Discovery & Consultative Path
                  </h3>
                </div>
                <p className="text-sm text-white/45 mb-8">
                  Ideal if you are encountering process inefficiencies, high
                  drop-off metrics, or manual scaling blocks, but are
                  uncertain of the precise software architecture needed.
                </p>

                <ol className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                  <li className="flex gap-4 relative">
                    <div
                      className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0"
                      aria-hidden="true"
                    >
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        Deep Flow Analysis & Diagnostics{" "}
                        <Search size={14} aria-hidden="true" className="text-white/45" />
                      </h4>
                      <p className="text-xs text-white/50 mt-1">
                        We execute deep-dive logic research directly into
                        your active business mechanics, mapping rules, choke
                        points, and internal system interactions.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4 relative">
                    <div
                      className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0"
                      aria-hidden="true"
                    >
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        Problem Isolation & Architecture Design{" "}
                        <FileText size={14} aria-hidden="true" className="text-white/45" />
                      </h4>
                      <p className="text-xs text-white/50 mt-1">
                        Our engineering team explicitly isolates the true
                        technical barrier, outlines a custom solution
                        framework, and delivers an exact deployment
                        blueprint.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-4 relative">
                    <div
                      className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center text-xs font-bold text-blue-400 z-10 shrink-0"
                      aria-hidden="true"
                    >
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                        1-Month Active Hypercare Maintenance{" "}
                        <Wrench size={14} aria-hidden="true" />
                      </h4>
                      <p className="text-xs text-white/50 mt-1">
                        To secure your launch, we package an absolute 1-month
                        window of completely free, active post-deployment
                        system optimization and monitoring.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 4. WHAT CLIENTS SAY ABOUT US — infinite marquee carousel */}
        <section
          aria-labelledby="testimonials-heading"
          className="py-24 relative border-t border-white/5 overflow-hidden"
        >
          {/*
            Pure-CSS infinite marquee: no client JS needed, so this section
            stays server-rendered. The track is duplicated once so the loop
            is seamless; the duplicate is aria-hidden so screen readers only
            encounter each review a single time. Hover/focus pauses the
            animation, and prefers-reduced-motion disables it entirely.
          */}
          <style>{`
            @keyframes testimonial-scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .testimonial-track {
              animation: testimonial-scroll 60s linear infinite;
            }
            .testimonial-marquee:hover .testimonial-track,
            .testimonial-marquee:focus-within .testimonial-track {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .testimonial-track {
                animation: none;
              }
            }
          `}</style>

          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="testimonials-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Evaluations From Production Environments
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                Read feedback received directly from businesses operating our
                engineered solutions.
              </p>
            </div>
          </div>

          <div
            className="testimonial-marquee relative w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
            aria-label="Client testimonials"
          >
            <div className="testimonial-track flex gap-6 w-max px-6 md:px-8">
              {testimonials.map((t, idx) => (
                <TestimonialCard key={`a-${idx}`} t={t} />
              ))}
              {/* Duplicate set creates the seamless loop; hidden from assistive tech */}
              {testimonials.map((t, idx) => (
                <TestimonialCard key={`b-${idx}`} t={t} decorative />
              ))}
            </div>
          </div>
        </section>

        {/* 5. CLOSING CTA */}
        <section
          aria-labelledby="cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Ready to refactor your operational architecture?
            </h2>
            <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
              Let&apos;s dissect your workflow bottlenecks. Schedule a direct
              engineering consultation and obtain a comprehensive project
              specification breakdown, free of cost.
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 transition flex items-center gap-2 shadow-xl shadow-[var(--accent)]/10 group text-sm sm:text-base"
              >
                Initiate Project Analysis
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