import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries";
import { getReadingTime } from "@/sanity/lib/readingTime";
import type { PostDetail } from "@/sanity/lib/types";

const SITE_URL = "https://www.example.com"; // TODO: replace with your real domain
const SITE_NAME = "Your Company Name"; // TODO: replace with your real business name

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: PostDetail | null = await client.fetch(postBySlugQuery, { slug });

  if (!post) {
    return { title: `Post Not Found | ${SITE_NAME}` };
  }

  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : `${SITE_URL}/og-blog.jpg`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${post.title} | ${SITE_NAME} Blog`,
    description: post.excerpt || `Read ${post.title} on the ${SITE_NAME} blog.`,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: SITE_NAME,
      title: post.title,
      description: post.excerpt,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold text-white mt-10 mb-3 leading-snug">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-white/70 text-base leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[var(--accent)] pl-5 my-6 text-white/60 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 mb-6 ml-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 mb-6 ml-1 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2.5 text-white/70 text-base leading-relaxed">
        <span className="text-[var(--accent)] mt-1.5 shrink-0" aria-hidden="true">
          &bull;
        </span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-white/70 text-base leading-relaxed">{children}</li>
    ),
  },
 marks: {
  strong: ({ children }) => (
    <strong className="text-white font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  code: ({ children }) => (
    <code className="text-[var(--accent)] bg-white/5 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  link: ({ value, children }) => {
    const href: string = value?.href || "";
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-[var(--accent)] underline underline-offset-2 hover:text-white transition-colors"
      >
        {children}
      </a>
    );
  },
},
  types: {
    image: ({ value }) => (
      <div className="relative w-full aspect-video my-8 rounded-2xl overflow-hidden border border-white/10">
        <Image
          src={urlFor(value).width(1400).url()}
          alt={value.alt || ""}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
        />
      </div>
    ),
  },
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post: PostDetail | null = await client.fetch(
    postBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.body);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage ? urlFor(post.mainImage).width(1200).url() : undefined,
    datePublished: post.publishedAt,
    author: post.author?.name
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <div className="bg-[#0b1120] text-white min-h-screen font-sans antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* HEADER */}
        <section
          aria-labelledby="post-title"
          className="relative pt-32 pb-16 bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-3xl mx-auto px-6 md:px-8 relative z-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to Blog
            </Link>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold uppercase tracking-wide text-[var(--accent)] bg-[var(--accent)]/10 px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1
              id="post-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-6"
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5 text-sm text-white/50 pt-6 border-t border-white/10">
              {post.author?.name && (
                <span className="flex items-center gap-2">
                  {post.author.image ? (
                    <Image
                      src={urlFor(post.author.image).width(64).height(64).fit("crop").url()}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User size={15} aria-hidden="true" />
                  )}
                  {post.author.name}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Calendar size={15} aria-hidden="true" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={15} aria-hidden="true" />
                {readingTime} min read
              </span>
            </div>
          </div>
        </section>

        {/* COVER IMAGE */}
        {post.mainImage && (
          <div className="max-w-4xl mx-auto px-6 md:px-8 -mt-6 relative z-10">
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10">
              <Image
                src={urlFor(post.mainImage).width(1600).url()}
                alt={post.title}
                fill
                sizes="(max-width: 900px) 100vw, 900px"
                priority
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* BODY */}
        <section className="py-16 border-t border-white/5 mt-16">
          <article className="max-w-2xl mx-auto px-6 md:px-8">
            <PortableText value={post.body} components={portableTextComponents} />
          </article>
        </section>

        {/* CLOSING CTA */}
        <section
          aria-labelledby="post-cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="post-cta-heading"
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