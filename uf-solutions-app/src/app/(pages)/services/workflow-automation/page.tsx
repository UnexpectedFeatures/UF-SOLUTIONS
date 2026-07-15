import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  Workflow,
  Plug,
  RefreshCw,
  BrainCircuit,
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
  Server,
  Database,
  Bot,
  TrendingUp,
} from "lucide-react";

/**
 * SEO NOTES (same conventions as /services/web, /services/mobile)
 * -----------------------------------------------------------
 * - No "use client": static informational page, stays a Server Component
 *   so it can export `metadata` and render JSON-LD directly.
 * - Unique `metadata` for this exact URL (/services/workflow-automation).
 * - Two JSON-LD blocks: a `Service` graph describing the sub-services
 *   offered, and a `FAQPage` graph built from the same questions
 *   rendered on the page.
 * - FAQ uses native <details>/<summary> — indexable, zero client JS.
 * - One <h1>, one <h2> per section, <h3> for cards within a section.
 * - Copy is written business-first: every offering leads with the
 *   outcome ("stop re-typing invoices"), then backs it up with the
 *   technical detail in the bullets underneath, rather than opening
 *   with implementation jargon.
 */

const SITE_URL = "https://www.example.com"; // TODO: replace with your real domain
const SITE_NAME = "UF Software Solutions PH";
const OG_IMAGE = `${SITE_URL}/og-services-workflow-automation.jpg`; // TODO: add a real 1200x630 social preview image

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Workflow Automation Systems | ${SITE_NAME}`,
  description:
    "Custom workflow automation: document and data extraction, system integrations, reliable retry-safe processing, and internal knowledge search — built to remove manual, repetitive work from your business.",
  keywords: [
    "workflow automation services",
    "business process automation",
    "document data extraction",
    "invoice automation",
    "crm integration development",
    "api integration services",
    "internal knowledge search",
    "retrieval augmented generation for business",
  ],
  alternates: {
    canonical: "/services/workflow-automation",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/services/workflow-automation`,
    siteName: SITE_NAME,
    title: `Workflow Automation Systems | ${SITE_NAME}`,
    description:
      "Stop paying people to do a computer's job. Custom automation that extracts data, connects your tools, and never loses a transaction.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Workflow automation services at ${SITE_NAME}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Workflow Automation Systems | ${SITE_NAME}`,
    description:
      "Document extraction, system integrations, and retry-safe automation pipelines — built around how your business actually operates.",
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

export default function WorkflowAutomationServicesPage() {
  const offerings: OfferingCardProps[] = [
    {
      title: "Document & Data Extraction",
      desc: "Say goodbye to manual data entry. We turn your PDFs, invoices, contracts, and emails into clean data automatically.",
      icon: FileSearch,
      bullets: [
        "Pulls exact data points from invoices, contracts, and receipts",
        "Writes straight into your database, ERP, or spreadsheet",
        "No manual re-typing, no copy-paste errors",
        "Built on structured AI parsing tuned for accuracy, not guesswork",
      ],
    },
    {
      title: "Reliable, Predictable Automation",
      desc: "Your workflows run the same way every single time — no surprises, no AI improvising on its own.",
      icon: Workflow,
      bullets: [
        "Every step follows a fixed, code-controlled process",
        "AI is only used to read and classify data, never to make decisions",
        "No hallucinated actions — the system does exactly what it's told",
        "Fully auditable, so you can trace exactly what happened and why",
      ],
    },
    {
      title: "Connecting Your Existing Tools",
      desc: "Your CRM, payment provider, legacy database, and internal tools — working together instead of in silos.",
      icon: Plug,
      bullets: [
        "Integrates with CRMs like HubSpot and Salesforce",
        "Connects legacy systems that don't naturally talk to modern tools",
        "Keeps customer and transaction data in sync everywhere it needs to be",
        "Custom-built connectors for whatever your business already runs on",
      ],
    },
    {
      title: "Never Lose a Lead or a Transaction",
      desc: "If a payment gateway, API, or third-party service goes down, your business doesn't lose data because of it.",
      icon: RefreshCw,
      bullets: [
        "Automatically retries failed requests instead of dropping them",
        "Built to handle high volume without slowing down",
        "Every transaction is tracked until it's confirmed complete",
        "Designed to stay reliable exactly when things go wrong elsewhere",
      ],
    },
    {
      title: "Instant Answers From Your Own Data",
      desc: "Turn your company's documents, wikis, and historical records into something your team can actually search.",
      icon: BrainCircuit,
      bullets: [
        "Makes internal knowledge searchable in plain language",
        "Surfaces answers from your own documentation instantly",
        "Keeps sensitive company data private and local to your systems",
        "Cuts down time spent hunting through old files and folders",
      ],
    },
  ];

  const techStack = [
    {
      icon: Server,
      title: "Backend & Orchestration",
      desc: "A structured, code-controlled execution layer — AI reads and classifies, your backend decides what happens next.",
      items: ["NestJS (Fastify adapter)", "TypeScript"],
    },
    {
      icon: RefreshCw,
      title: "Queuing & Reliability",
      desc: "High-performance job queues that catch failures and retry automatically, so nothing gets silently dropped.",
      items: ["BullMQ", "Redis"],
    },
    {
      icon: Database,
      title: "Database & Retrieval",
      desc: "Structured storage plus vector search, so both transactional data and internal knowledge are queryable.",
      items: ["PostgreSQL", "pgvector"],
    },
    {
      icon: Bot,
      title: "AI & Data Extraction",
      desc: "Structured LLM parsing used specifically for reading and classifying data, never for controlling logic.",
      items: ["Structured LLM parsing", "RAG (Retrieval-Augmented Generation)"],
    },
  ];

  const whyCustom = [
    {
      icon: ShieldCheck,
      title: "Deterministic by Design",
      desc: "Your business logic runs in code, not in an AI's judgment call — the same input always produces the same result.",
    },
    {
      icon: Zap,
      title: "No Lost Transactions",
      desc: "Automatic retries and failure handling mean a downed third-party API never means lost data or lost revenue.",
    },
    {
      icon: Layers,
      title: "Fits What You Already Use",
      desc: "Built around your existing CRM, database, and tools — not a separate system you have to migrate into.",
    },
    {
      icon: Gauge,
      title: "Scales With Volume",
      desc: "Queue-based architecture handles traffic spikes without falling over or losing requests.",
    },
  ];

  const process = [
    {
      icon: Search,
      title: "Discovery",
      desc: "We map your current manual process end-to-end — where the data comes from, where it needs to go, and what breaks today.",
    },
    {
      icon: PenTool,
      title: "Workflow Design",
      desc: "We design the automated version of that process as a clear, auditable state machine before any code is written.",
    },
    {
      icon: Code,
      title: "Development",
      desc: "Clean, tested code built against the agreed workflow, with visible progress throughout.",
    },
    {
      icon: TestTube2,
      title: "QA & Validation",
      desc: "We test against real documents, real API failures, and edge cases — not just the happy path.",
    },
    {
      icon: Rocket,
      title: "Launch",
      desc: "Staged rollout alongside your existing process, with a fallback plan until the automation is fully trusted.",
    },
    {
      icon: Wrench,
      title: "Support",
      desc: "A free hypercare window after launch, followed by ongoing monitoring or new workflows as your needs grow.",
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: "How is this different from a no-code tool like Zapier or Make?",
      answer:
        "No-code tools are great for simple, low-volume tasks, but they hit real limits fast: unpredictable pricing at scale, weak error handling, and no room for custom logic. We build your automation as real, owned software — deterministic execution, proper retry handling, and logic tailored to exactly how your business works, without a per-task pricing ceiling.",
    },
    {
      question: "Will AI make mistakes with our data?",
      answer:
        "The AI in your system is only used for reading and classifying data — extracting a total from an invoice, for example — never for deciding what action to take. All business logic and decision-making run in code we control, which means the same input always produces the same, predictable result. This is deliberate: it's what keeps automation from becoming a black box.",
    },
    {
      question: "How long does it take to build a workflow automation system?",
      answer:
        "A focused automation — say, extracting data from one document type into one system — typically takes 4–6 weeks. Larger projects involving multiple integrations, queuing infrastructure, or internal knowledge search usually run 8–14 weeks depending on scope. You'll get a firm timeline after the discovery phase, once we've mapped your actual process.",
    },
    {
      question: "Can this work with tools we already use?",
      answer:
        "Yes — that's the point. We build integrations around your existing CRM, database, payment provider, or internal tools rather than asking you to migrate to something new. If a tool has an API or a webhook, we can very likely connect to it; legacy systems without modern APIs can usually still be integrated with custom middleware.",
    },
    {
      question: "What happens if a third-party service we depend on goes down?",
      answer:
        "Your automation doesn't lose the transaction. Failed requests go into a queue and retry automatically with increasing delays between attempts, so a temporary outage on a payment gateway or API doesn't mean a lost lead or a dropped order. You can see exactly what's pending and what's failed at any point.",
    },
    {
      question: "Is our data secure?",
      answer:
        "Yes. Document extraction pipelines and internal knowledge search are both built to keep your data within systems you control, with role-based access where relevant. If your business has specific compliance requirements, we scope those explicitly during discovery rather than assuming a one-size-fits-all setup.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Workflow Automation & Systems Integration",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
        areaServed: "Worldwide",
        url: `${SITE_URL}/services/workflow-automation`,
        description:
          "Custom workflow automation systems, including document and data extraction, deterministic state-machine orchestration, CRM and legacy system integration, resilient job queuing, and internal knowledge retrieval (RAG).",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Workflow Automation Services",
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
          aria-labelledby="workflow-hero-heading"
          className="relative min-h-[70vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Workflow Automation Systems
            </span>
            <h1
              id="workflow-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
            >
              Stop paying people to do a computer&apos;s job.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed mb-10">
              We connect the tools you already use, pull the data buried in
              your PDFs, invoices, and emails, and turn slow manual processes
              into automated pipelines that run with 100% reliability — so
              your team spends time growing the business, not re-typing it
              into a spreadsheet.
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
                Every automation is built around the manual process actually
                slowing your team down today — not a generic template bolted
                onto your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerings.map((o) => (
                <OfferingCard key={o.title} {...o} />
              ))}
            </div>

            <div className="mt-10 bg-[var(--accent)]/[0.06] border border-[var(--accent)]/20 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Workflow size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    Not sure what to automate first?
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed max-w-xl">
                    Most businesses have three or four repetitive processes
                    quietly costing hours every week. Tell us what your team
                    does manually — we&apos;ll tell you honestly whether
                    automation is worth it.
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 transition flex items-center gap-2 group shadow-lg shadow-[var(--accent)]/20 shrink-0 w-fit"
              >
                Talk to Us About Your Workflow
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
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
                Built for reliability first — AI handles reading and
                classifying data, code controls everything that happens next.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {techStack.map((item) => (
                <div
                  key={item.title}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 flex flex-col"
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
                  <p className="text-sm text-white/55 leading-relaxed mb-5">
                    {item.desc}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {item.items.map((tech) => (
                      <li
                        key={tech}
                        className="flex items-center gap-2 text-xs text-white/60"
                      >
                        <CheckCircle2
                          size={13}
                          aria-hidden="true"
                          className="text-[var(--accent)]/70 shrink-0"
                        />
                        <span className="truncate">{tech}</span>
                      </li>
                    ))}
                  </ul>
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
                  Start With One Workflow, Expand When It Proves Itself
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  We typically start by automating a single high-friction
                  process so you can see the time and cost saved firsthand.
                  Once it&apos;s proven, we extend the same infrastructure to
                  additional workflows — an expansion, not a rebuild.
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
                Why Businesses Choose Custom Over No-Code
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                No-code automation tools are fine for simple tasks — until
                volume, reliability, or custom logic outgrows what they can
                do. Here&apos;s what custom automation gets you instead.
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
                How an Automation Project Runs With Us
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

        {/* 6. FAQ */}
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
                Common questions from clients scoping a workflow automation
                project.
              </p>
            </div>

            <FaqAccordion faqs={faqs} />
          </div>
        </section>

        {/* 7. CLOSING CTA */}
        <section
          aria-labelledby="workflow-cta-heading"
          className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
            <h2
              id="workflow-cta-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
            >
              Have a manual process you&apos;re tired of?
            </h2>
            <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
              Tell us what your team does by hand today and we&apos;ll map out
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