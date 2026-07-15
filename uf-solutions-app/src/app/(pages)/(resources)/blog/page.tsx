import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Newspaper, User } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { allPostsQuery } from "@/sanity/lib/queries";
import type { PostListItem } from "@/sanity/lib/types";

/**
 * SEO NOTES (same conventions as /services/web, /services/mobile)
 * -----------------------------------------------------------
 * - Server Component: no "use client", so `metadata` export and direct
 *   Sanity fetch both work without a client/server split.
 * - Unique metadata for this exact URL (/blog).
 * - Cards use descriptive anchor text implicitly via the post title itself
 *   wrapping the whole card — screen readers get "Read: {title}" via the
 *   card's aria-label, not "Read More".
 */

const SITE_URL = "https://www.example.com"; // TODO: replace with your real domain
const SITE_NAME = "Your Company Name"; // TODO: replace with your real business name
const OG_IMAGE = `${SITE_URL}/og-blog.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Blog | ${SITE_NAME}`,
  description:
    "Engineering notes, backend best practices, and lessons from building web and mobile products — written by the team at " +
    SITE_NAME +
    ".",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    title: `Blog | ${SITE_NAME}`,
    description:
      "Engineering notes, backend best practices, and lessons from building web and mobile products.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} Blog` }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description:
      "Engineering notes, backend best practices, and lessons from building web and mobile products.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post }: { post: PostListItem }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Read: ${post.title}`}
      className="group bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[16/10] w-full bg-[var(--accent)]/[0.06] overflow-hidden">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(800).height(500).fit("crop").url()}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
            <Newspaper size={32} className="text-[var(--accent)]/40" />
          </div>
        )}
      </div>

      <div className="p-7 flex flex-col flex-1">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-lg font-bold text-white mb-2.5 leading-snug group-hover:text-[var(--accent)] transition-colors">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-sm text-white/55 leading-relaxed mb-6 line-clamp-3">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center gap-4 text-xs text-white/40 pt-4 border-t border-white/5">
          {post.author?.name && (
            <span className="flex items-center gap-1.5">
              {post.author.image ? (
                <Image
                  src={urlFor(post.author.image).width(40).height(40).fit("crop").url()}
                  alt={post.author.name}
                  width={18}
                  height={18}
                  className="rounded-full object-cover"
                />
              ) : (
                <User size={13} aria-hidden="true" />
              )}
              {post.author.name}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar size={13} aria-hidden="true" />
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts: PostListItem[] = await client.fetch(
    allPostsQuery,
    {},
    { next: { revalidate: 60 } }
  );

  return (
    <div className="bg-[#0b1120] text-white min-h-screen font-sans antialiased overflow-x-hidden">
      <main>
        {/* 1. HERO */}
        <section
          aria-labelledby="blog-hero-heading"
          className="relative min-h-[50vh] pt-32 pb-16 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Blog
            </span>
            <h1
              id="blog-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Notes on building web and mobile products.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
              Engineering practices, architecture decisions, and lessons from
              projects we&apos;ve shipped.
            </p>
          </div>
        </section>

        {/* 2. POST GRID */}
        <section className="py-24 relative border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <Newspaper
                  size={40}
                  className="text-[var(--accent)]/40 mx-auto mb-4"
                  aria-hidden="true"
                />
                <h2 className="text-xl font-bold text-white mb-2">
                  No posts published yet
                </h2>
                <p className="text-white/50 text-sm">
                  Check back soon — we&apos;re working on our first article.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 3. CLOSING CTA */}
        <section
          aria-labelledby="blog-cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="blog-cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Have a project in mind?
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