import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Search,
  PenTool,
  Code,
  Rocket,
  Wrench,
  Users,
  TrendingUp,
  Award,
  Layers,
  ShieldCheck,
  Lightbulb,
  Handshake,
  Zap,
  BookOpen,
  Newspaper,
  Mail,
  Star,
  Quote,
} from "lucide-react";

/**
 * SEO NOTES (same conventions as the homepage)
 * ---------------------------------------------
 * - No "use client": nothing here needs hooks or event handlers, so this
 *   stays a Server Component and can export `metadata` directly.
 * - `metadata` sets a unique title/description/canonical for /about — never
 *   reuse the homepage's exact metadata on this route.
 * - JSON-LD describes this as an AboutPage tied to the Organization, plus
 *   Person entries for the team, which can help search engines associate
 *   named staff with your company (useful for E-E-A-T signals).
 * - One <h1>, one <h2> per section, <h3> for cards within a section.
 * - Decorative icons/images get aria-hidden; interactive elements get
 *   descriptive aria-labels instead of generic "Read More" style text.
 */

const SITE_URL = "https://www.example.com"; // TODO: replace with your real domain
const SITE_NAME = "Your Company Name"; // TODO: replace with your real business name
const OG_IMAGE = `${SITE_URL}/og-about.jpg`; // TODO: add a real 1200x630 social preview image for this page

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `About Us | ${SITE_NAME} — Custom Software Engineering Team`,
  description:
    "Meet the engineers, designers, and strategists behind our custom web, mobile, and software solutions. Learn our process, our values, and why B2B teams trust us to eliminate operational bottlenecks.",
  keywords: [
    "about us",
    "software development agency",
    "custom software team",
    "web development company",
    "product engineering partner",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    title: `About Us | ${SITE_NAME}`,
    description:
      "Meet the team engineering clean, custom systems for growing businesses — our story, our process, and our values.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `The ${SITE_NAME} team`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${SITE_NAME}`,
    description:
      "Meet the team engineering clean, custom systems for growing businesses — our story, our process, and our values.",
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

interface StatProps {
  value: string;
  label: string;
  accent?: boolean;
}

function Stat({ value, label, accent }: StatProps) {
  return (
    <div>
      <p
        className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
          accent ? "text-[var(--accent)]" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">
        {label}
      </p>
    </div>
  );
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={member.avatar}
        alt=""
        aria-hidden="true"
        width={88}
        height={88}
        loading="lazy"
        className="w-22 h-22 rounded-full border border-white/10 mb-5"
      />
      <h3 className="text-lg font-bold text-white">{member.name}</h3>
      <p className="text-xs text-[var(--accent)] uppercase tracking-widest font-semibold mt-1 mb-4">
        {member.role}
      </p>
      <p className="text-sm text-white/55 leading-relaxed mb-5">{member.bio}</p>
      <a
        href={`mailto:${member.email}`}
        aria-label={`Email ${member.name}`}
        className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-[var(--accent)] transition-colors"
      >
        <Mail size={13} aria-hidden="true" />
        {member.email}
      </a>
    </div>
  );
}

interface ValueCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

function ValueCard({ title, desc, icon: Icon }: ValueCardProps) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
      <div
        className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-4"
        aria-hidden="true"
      >
        <Icon size={20} />
      </div>
      <h3 className="text-base font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/* Page                                                                   */
/* -------------------------------------------------------------------- */

export default function AboutPage() {
  const painPoints = [
    "Disjointed user journeys across web, mobile, and internal tools",
    "Low lead conversion rates from templated, one-size-fits-all sites",
    "Manual processes that don't scale past a handful of staff",
    "Legacy systems nobody on the team fully understands anymore",
  ];

  const solutions = [
    "Unified, purpose-built experiences designed around your actual funnel",
    "Conversion-focused architecture, not recycled templates",
    "Custom automation and tooling that scales with headcount, not against it",
    "Clean, documented systems your team can actually maintain",
  ];

  const proofStats: StatProps[] = [
    { value: "4+", label: "Years in Business" },
    { value: "20+", label: "Projects Launched" },
    { value: "38%", label: "Avg. Conversion Lift", accent: true },
    { value: "100%", label: "Client Satisfaction" },
  ];

  const partnerLogos = [
    "Leonardo Medical Services",
    "Retail Nexus Corp",
    "Vanguard Media Group",
    "Metro Logistics Co.",
    "Coastal Hardware Supply",
    "Harbor Point Realty",
  ];

  const processSteps = [
    {
      icon: Search,
      title: "Discovery",
      desc: "We map your current workflows, tech stack, and business goals before a single line of code is written.",
    },
    {
      icon: PenTool,
      title: "UX / UI Design",
      desc: "Wireframes and interactive prototypes let you validate the experience before development begins.",
    },
    {
      icon: Code,
      title: "Custom Development",
      desc: "Clean, modular code built against the agreed scope, with continuous integration and regular check-ins.",
    },
    {
      icon: Rocket,
      title: "Deployment",
      desc: "Staged rollouts and smoke-tested releases so launch day is uneventful in the best possible way.",
    },
    {
      icon: Wrench,
      title: "Support & Iteration",
      desc: "A dedicated hypercare window post-launch, followed by ongoing maintenance and feature iteration.",
    },
  ];

  const team: TeamMember[] = [
    {
      name: "Alex Rivera",
      role: "Founder & Lead Engineer",
      bio: "12 years building production systems across fintech and healthcare before founding the studio.",
      avatar: "https://ui-avatars.com/api/?name=Alex+Rivera&background=1e293b&color=fff",
      email: "alex@example.com",
    },
    {
      name: "Priya Shah",
      role: "Head of Product Design",
      bio: "Leads UX strategy and interface design, translating complex workflows into simple screens.",
      avatar: "https://ui-avatars.com/api/?name=Priya+Shah&background=1e293b&color=fff",
      email: "priya@example.com",
    },
    {
      name: "Marcus Chen",
      role: "Lead Full-Stack Developer",
      bio: "Specializes in scalable backend architecture and clean API design for high-traffic platforms.",
      avatar: "https://ui-avatars.com/api/?name=Marcus+Chen&background=1e293b&color=fff",
      email: "marcus@example.com",
    },
    {
      name: "Dana Okafor",
      role: "Mobile Engineering Lead",
      bio: "Ships native-quality cross-platform apps and owns the QA process from prototype to app store.",
      avatar: "https://ui-avatars.com/api/?name=Dana+Okafor&background=1e293b&color=fff",
      email: "dana@example.com",
    },
  ];

  const values: ValueCardProps[] = [
    {
      icon: ShieldCheck,
      title: "Radical Transparency",
      desc: "You see the same project board we do. No black-box timelines, no surprise invoices.",
    },
    {
      icon: Lightbulb,
      title: "Engineering-First",
      desc: "We solve the root technical problem, not just the symptom in front of us.",
    },
    {
      icon: Zap,
      title: "Agile by Default",
      desc: "Short iteration cycles mean you see real, working software early and often.",
    },
    {
      icon: Handshake,
      title: "Long-Term Partnership",
      desc: "We build systems we're proud to still be maintaining three years from now.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: `${SITE_URL}/about`,
    mainEntity: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      image: OG_IMAGE,
      description:
        "Custom web, mobile, and software engineering studio helping B2B teams eliminate operational bottlenecks.",
      employee: team.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
        email: m.email,
      })),
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
        {/* 1. HERO — the hook */}
        <section
          aria-labelledby="about-hero-heading"
          className="relative min-h-[70vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              About Us
            </span>
            <h1
              id="about-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              We&apos;re the engineering partner behind systems your business
              actually depends on.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-10">
              Not a template shop, not a freelancer roulette wheel — a small,
              senior team that designs and builds custom web, mobile, and
              software systems for companies that have outgrown
              off-the-shelf tools.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 transition flex items-center gap-2 group shadow-lg shadow-[var(--accent)]/20"
              >
                Schedule a Consultation
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
                View Our Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM WE SOLVE */}
        <section
          aria-labelledby="problem-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="problem-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                We&apos;re a Strategic Partner, Not Just a Vendor
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                Most of the teams we work with come to us stuck behind the
                same handful of walls.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <XCircle size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Where Most Teams Get Stuck
                  </h3>
                </div>
                <ul className="space-y-4">
                  {painPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-white/60">
                      <XCircle
                        size={16}
                        aria-hidden="true"
                        className="text-rose-400/70 mt-0.5 shrink-0"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    How We Eliminate the Bottleneck
                  </h3>
                </div>
                <ul className="space-y-4">
                  {solutions.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-white/60">
                      <CheckCircle2
                        size={16}
                        aria-hidden="true"
                        className="text-emerald-400/70 mt-0.5 shrink-0"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROOF POINTS & IMPACT */}
        <section
          aria-labelledby="proof-heading"
          className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="proof-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Proof Points & Impact
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                Numbers and voices from the teams who&apos;ve trusted us with
                their operations.
              </p>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto text-center">
              {proofStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <Stat {...s} />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="grid md:grid-cols-2 gap-6 mb-16">
              <figure className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <Quote size={24} aria-hidden="true" className="text-[var(--accent)]/20" />
                  <div
                    className="flex items-center gap-0.5"
                    role="img"
                    aria-label="Rated 5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        aria-hidden="true"
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <blockquote className="text-white/80 text-sm leading-relaxed italic">
                  <p>
                    &ldquo;The clinic management system completely
                    streamlined our daily checkout flow. Speed and
                    communication throughout the project were
                    exceptional.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-white/5">
                  <p className="text-sm font-bold text-white">
                    Leonardo Medical Services
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">
                    Operations Management
                  </p>
                </figcaption>
              </figure>

              <figure className="bg-white/[0.02] border border-white/10 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <Quote size={24} aria-hidden="true" className="text-[var(--accent)]/20" />
                  <div
                    className="flex items-center gap-0.5"
                    role="img"
                    aria-label="Rated 5 out of 5 stars"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        aria-hidden="true"
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
                <blockquote className="text-white/80 text-sm leading-relaxed italic">
                  <p>
                    &ldquo;They took a highly chaotic legacy process and
                    consolidated it into a clean terminal POS app.
                    Maintenance support has been outstanding.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-white/5">
                  <p className="text-sm font-bold text-white">Retail Nexus Corp</p>
                  <p className="text-xs text-white/40 mt-0.5">Founder & CEO</p>
                </figcaption>
              </figure>
            </div>

            <div>
              <p className="text-center text-xs uppercase tracking-widest text-white/30 font-semibold mb-6">
                Trusted by teams at
              </p>
              <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                {partnerLogos.map((name) => (
                  <li
                    key={name}
                    className="text-sm font-semibold text-white/35 hover:text-white/60 transition-colors"
                  >
                    {name}
                  </li>
                ))}
              </ul>
              {/* TODO: swap this text list for real partner/client logo
                  images (with descriptive alt text) once you have
                  permission to display them. */}
            </div>
          </div>
        </section>

        {/* 4. OUR DEVELOPMENT METHODOLOGY */}
        <section
          aria-labelledby="methodology-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2
                id="methodology-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Our Development Methodology
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                A transparent, five-stage process from first conversation to
                long-term support.
              </p>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, idx) => (
                <li
                  key={step.title}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative"
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

        {/* 5. MEET THE TEAM */}
        <section
          aria-labelledby="team-heading"
          className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="team-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Meet the Team
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                The people behind the code — you&apos;ll be working directly
                with this team, not a rotating cast of account managers.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
            {/* TODO: replace ui-avatars placeholders with real professional
                headshots — B2B buyers trust faces they can actually see. */}
          </div>
        </section>

        {/* 6. COMPANY CULTURE & CORE VALUES */}
        <section
          aria-labelledby="values-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="values-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Company Culture & Core Values
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                The principles that shape how we scope, build, and support
                every engagement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <ValueCard key={v.title} {...v} />
              ))}
            </div>
          </div>
        </section>

        {/* 7. SECONDARY CTA & RESOURCES */}
        <section
          aria-labelledby="resources-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2
                id="resources-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                Not Ready to Talk Yet? Take a Look Around.
              </h2>
              <p className="text-white/60 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
                Explore how we&apos;ve solved these problems for other teams
                before you reach out.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-14">
              <Link
                href="/portfolio"
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all group flex flex-col"
              >
                <Layers
                  size={22}
                  aria-hidden="true"
                  className="text-[var(--accent)] mb-4"
                />
                <h3 className="text-sm font-bold text-white mb-1">
                  Case Studies & Portfolio
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1">
                  See the systems we&apos;ve shipped and the results they
                  drove.
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)] group-hover:text-white transition-colors">
                  Browse work
                  <ArrowRight size={14} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/blog"
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all group flex flex-col"
              >
                <Newspaper
                  size={22}
                  aria-hidden="true"
                  className="text-[var(--accent)] mb-4"
                />
                <h3 className="text-sm font-bold text-white mb-1">
                  Engineering Blog
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1">
                  Notes on architecture, process, and lessons from real
                  projects.
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)] group-hover:text-white transition-colors">
                  Read the blog
                  <ArrowRight size={14} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>

              <Link
                href="/newsletter"
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] hover:border-white/20 transition-all group flex flex-col"
              >
                <BookOpen
                  size={22}
                  aria-hidden="true"
                  className="text-[var(--accent)] mb-4"
                />
                <h3 className="text-sm font-bold text-white mb-1">
                  Newsletter
                </h3>
                <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1">
                  Occasional, useful notes on shipping software — no spam.
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent)] group-hover:text-white transition-colors">
                  Subscribe
                  <ArrowRight size={14} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            <div className="flex flex-col items-center gap-6 text-center border-t border-white/5 pt-12">
              <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
                Ready to talk specifics instead? Let&apos;s scope your
                project.
              </p>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 transition flex items-center gap-2 shadow-xl shadow-[var(--accent)]/10 group text-sm sm:text-base"
              >
                Schedule a Consultation
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