import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, ExternalLink, Quote, Star } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

/**
 * Minimal structural type for a Sanity image field — avoids depending on
 * @sanity/image-url's internal type path (which varies between versions
 * and isn't always exported). If you already have an `Image`/`SanityImage`
 * type in "@/sanity/lib/types", feel free to swap this out for that.
 */
interface SanityImageObject {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: unknown;
  crop?: unknown;
}

/**
 * SEO / DATA NOTES
 * ----------------
 * - Server Component (no "use client") so `metadata` export and the direct
 *   Sanity fetch both work — same convention as /blog and /blog/[slug].
 * - The GROQ query and `TestimonialItem` type are defined right here for
 *   portability. If you'd rather centralize them like the blog pages do,
 *   move `testimonialsQuery` into "@/sanity/lib/queries" and
 *   `TestimonialItem` into "@/sanity/lib/types" — nothing else needs to
 *   change.
 * - The `testimonial` schema has no `slug` field, so this is a single
 *   listing page with no per-testimonial detail route.
 * - Review + AggregateRating JSON-LD is generated from the live Sanity
 *   data, so it always matches what's actually rendered on the page.
 * - Accent text uses `color-mix(...)` to lighten `var(--accent)` for
 *   small text on the dark background, matching the contrast fix already
 *   applied on the homepage's "Read More" links.
 */

const SITE_URL = "https://ufsoftwaresolutionsph.vercel.app/";
const SITE_NAME = "UF Software Solutions PH"; 
const OG_IMAGE = `${SITE_URL}/og-testimonials.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Client Testimonials | ${SITE_NAME}`,
  description:
    "Real feedback from businesses we've built custom web, mobile, and software systems for.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/testimonials`,
    siteName: SITE_NAME,
    title: `Client Testimonials | ${SITE_NAME}`,
    description:
      "Real feedback from businesses we've built custom web, mobile, and software systems for.",
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} Client Testimonials` },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Client Testimonials | ${SITE_NAME}`,
    description:
      "Real feedback from businesses we've built custom web, mobile, and software systems for.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// GROQ query — move to "@/sanity/lib/queries" if you want to centralize it.
const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc){
  _id,
  clientName,
  email,
  emailAvatar,
  companyName,
  companyImage,
  projectName,
  imageCover,
  rating,
  shortFeedback,
  liveUrl
}`;

// Type — move to "@/sanity/lib/types" if you want to centralize it.
export interface TestimonialItem {
  _id: string;
  clientName: string;
  email: string;
  emailAvatar?: SanityImageObject;
  companyName: string;
  companyImage?: SanityImageObject;
  projectName: string;
  imageCover: SanityImageObject;
  rating: number;
  shortFeedback: string;
  liveUrl: string;
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
            i < rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-white/20"
          }
        />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: TestimonialItem }) {
  return (
    <figure className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-colors duration-300 flex flex-col">
      {/* Showcase cover image (required in the schema) */}
      <div className="relative aspect-[16/9] w-full bg-[var(--accent)]/[0.08] overflow-hidden">
        <Image
          src={urlFor(t.imageCover).width(800).height(450).fit("crop").url()}
          alt={`${t.projectName} showcase`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/10 to-transparent" />
        <span className="absolute bottom-3 left-4 text-[11px] font-semibold uppercase tracking-wide text-white bg-black/40 backdrop-blur px-2.5 py-1 rounded-full">
          {t.projectName}
        </span>
      </div>

      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <Quote size={26} aria-hidden="true" className="text-[var(--accent)]/30" />
          <StarRating rating={t.rating} />
        </div>

        <blockquote className="text-white/80 text-sm leading-relaxed italic flex-1">
          <p>&ldquo;{t.shortFeedback}&rdquo;</p>
        </blockquote>

        <figcaption className="mt-6 pt-5 border-t border-white/5 flex items-center gap-3">
          {t.emailAvatar ? (
            <Image
              src={urlFor(t.emailAvatar).width(80).height(80).fit("crop").url()}
              alt={t.clientName}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 shrink-0"
              aria-hidden="true"
            >
              <Building2 size={18} />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">{t.clientName}</p>
            <p className="text-xs text-white/40 mt-0.5 truncate">{t.companyName}</p>
          </div>

          {t.companyImage && (
            <Image
              src={urlFor(t.companyImage).width(64).height(64).fit("crop").url()}
              alt={`${t.companyName} logo`}
              width={28}
              height={28}
              className="w-7 h-7 rounded-md object-contain bg-white/5 border border-white/10 p-1 shrink-0"
            />
          )}
        </figcaption>

        <a
          href={t.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[color-mix(in_srgb,var(--accent)_100%,white_25%)] hover:text-white transition-colors group/link"
        >
          View Live Project
          <span className="sr-only"> for {t.projectName}, opens in a new tab</span>
          <ExternalLink
            size={14}
            aria-hidden="true"
            className="group-hover/link:translate-x-0.5 transition-transform"
          />
        </a>
      </div>
    </figure>
  );
}

export default async function TestimonialsPage() {
  const testimonials: TestimonialItem[] = await client.fetch(
    testimonialsQuery,
    {},
    { next: { revalidate: 60 } }
  );

  const hasTestimonials = testimonials.length > 0;

  const jsonLd = hasTestimonials
    ? {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: SITE_URL,
        review: testimonials.map((t) => ({
          "@type": "Review",
          reviewBody: t.shortFeedback,
          author: { "@type": "Person", name: t.clientName },
          itemReviewed: {
            "@type": "Organization",
            name: t.companyName,
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
      }
    : null;

  return (
    <div className="bg-[#0b1120] text-white min-h-screen font-sans antialiased overflow-x-hidden">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <main>
        {/* 1. HERO */}
        <section
          aria-labelledby="testimonials-hero-heading"
          className="relative min-h-[50vh] pt-32 pb-16 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[color-mix(in_srgb,var(--accent)_100%,white_25%)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Testimonials
            </span>
            <h1
              id="testimonials-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              What clients say after we ship.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
              Direct feedback from the businesses running the systems we
              engineered for them.
            </p>
          </div>
        </section>

        {/* 2. TESTIMONIAL GRID */}
        <section className="py-24 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {hasTestimonials ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <TestimonialCard key={t._id} t={t} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <Quote
                  size={40}
                  className="text-[var(--accent)]/40 mx-auto mb-4"
                  aria-hidden="true"
                />
                <h2 className="text-xl font-bold text-white mb-2">
                  No testimonials published yet
                </h2>
                <p className="text-white/50 text-sm">
                  Check back soon — client reviews are on the way.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 3. CLOSING CTA */}
        <section
          aria-labelledby="testimonials-cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="testimonials-cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Ready to become our next testimonial?
            </h2>
            <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
              Tell us what you&apos;re trying to build and we&apos;ll map out
              an honest scope, timeline, and quote — free of cost.
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