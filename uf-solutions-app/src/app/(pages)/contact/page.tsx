import React from "react";
import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Search,
  Rocket,
  Zap,
  ShieldCheck,
  Layers,
  HeartHandshake,
} from "lucide-react";
import ContactForm from "../../components/contact-form/form"

/**
 * SEO NOTES (same conventions as the homepage / about page / /services pages)
 * -----------------------------------------------------------
 * - No "use client" here: this stays a Server Component so it can export
 *   `metadata` and render JSON-LD directly. The interactive form lives in
 *   its own client component (ContactForm.tsx) so the rest of the page
 *   stays server-rendered.
 * - `ContactPage` + `Organization` + `FAQPage` JSON-LD, same graph pattern
 *   as the service pages.
 * - FAQ uses native <details>/<summary> — fully indexable, zero client JS.
 * - One <h1>, one <h2> per section, <h3> for cards within a section —
 *   matching the heading hierarchy used across every other page.
 */

const SITE_URL = "https://www.example.com"; // TODO: replace with your real domain
const SITE_NAME = "UF Software Solutions";
const OG_IMAGE = `${SITE_URL}/og-contact.jpg`; // TODO: add a real 1200x630 social preview image

const CONTACT_EMAIL = "ufsoftwaresolutions@gmail.com";
const CONTACT_PHONE_DISPLAY = "+1 (555) 123-4567"; // TODO: confirm this is a real, monitored number
const CONTACT_PHONE_HREF = "+15551234567";
const OFFICE_ADDRESS = "Bagumbong, Caloocan City, Casa Asuncion Brgy. 171";
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  OFFICE_ADDRESS
)}&output=embed`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Contact Us | ${SITE_NAME}`,
  description:
    "Tell us about your project and get a free quote. We reply to every inquiry within one business day.",
  keywords: [
    "contact us",
    "get a quote",
    "software development inquiry",
    "start a project",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    siteName: SITE_NAME,
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Tell us about your project and get a free quote. We reply to every inquiry within one business day.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `Contact ${SITE_NAME}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${SITE_NAME}`,
    description:
      "Tell us about your project and get a free quote. We reply to every inquiry within one business day.",
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
/* Shared sub-components (same pattern as the service pages)             */
/* -------------------------------------------------------------------- */

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

interface ContactDetail {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  label: string;
  value: string;
  href: string | null;
}

const CONTACT_DETAILS: ContactDetail[] = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT_PHONE_DISPLAY,
    href: `tel:${CONTACT_PHONE_HREF}`,
  },
  {
    icon: MapPin,
    label: "Studio",
    value: OFFICE_ADDRESS,
    href: null,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 1 business day",
    href: null,
  },
];

const NEXT_STEPS = [
  {
    icon: MessageCircle,
    title: "You Reach Out",
    desc: "Fill in the form with a few details about your project and how to reach you.",
  },
  {
    icon: Search,
    title: "We Review Your Request",
    desc: "We read every inquiry ourselves and reply within one business day — no auto-responder loop.",
  },
  {
    icon: Rocket,
    title: "We Scope It Together",
    desc: "A short call to align on timeline, budget, and next steps, and a free quote to go with it.",
  },
];

const WHY_REACH_OUT = [
  {
    icon: Zap,
    title: "Fast, Human Response",
    desc: "A real reply within one business day — not a ticket number.",
  },
  {
    icon: ShieldCheck,
    title: "No-Obligation Quote",
    desc: "A clear scope and quote before anything is agreed to. No pressure.",
  },
  {
    icon: Layers,
    title: "Scoped to Your Project",
    desc: "Every quote is built around what you're actually trying to do.",
  },
  {
    icon: HeartHandshake,
    title: "Support Past Launch",
    desc: "The relationship doesn't end at delivery — we're here after, too.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "How quickly will I hear back?",
    answer:
      "We reply to every inquiry within one business day, and often sooner. If your project is time-sensitive, mention that in your message and we'll prioritize it.",
  },
  {
    question: "Is the quote actually free, with no obligation?",
    answer:
      "Yes. After your initial message, we'll set up a short call to understand your project, then send over a scope and quote at no cost. You're free to take that scope elsewhere or come back to us whenever you're ready.",
  },
  {
    question: "I'm not sure which service I need — can I still reach out?",
    answer:
      "Definitely. The service dropdown in the form is optional for exactly this reason. Describe what you're trying to build in the message field, and we'll help figure out the right fit during the discovery call.",
  },
  {
    question: "Do you work with businesses outside the Philippines?",
    answer:
      "Yes, we work with clients worldwide and run most projects remotely, with calls scheduled to fit your timezone.",
  },
  {
    question: "What information should I include to get an accurate quote?",
    answer:
      "Rough budget range, timeline, and what problem you're trying to solve are the most useful details. Exact specs aren't necessary at this stage — that's what the scoping call is for.",
  },
];

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        url: `${SITE_URL}/contact`,
        name: `Contact ${SITE_NAME}`,
      },
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        telephone: CONTACT_PHONE_DISPLAY,
        address: {
          "@type": "PostalAddress",
          streetAddress: OFFICE_ADDRESS,
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
          aria-labelledby="contact-hero-heading"
          className="relative min-h-[55vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />

          <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10 text-center flex flex-col items-center">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit mb-6">
              Get in Touch
            </span>
            <h1
              id="contact-hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6 max-w-3xl"
            >
              Tell us what you&apos;re building.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl leading-relaxed">
              Share a few details about your project and we&apos;ll get back
              to you within one business day with next steps — free of
              cost, no obligation.
            </p>
          </div>
        </section>

        {/* 2. CONTACT DETAILS + FORM */}
        <section
          aria-labelledby="contact-form-heading"
          className="py-24 relative border-t border-white/5"
        >
          <h2 id="contact-form-heading" className="sr-only">
            Contact form
          </h2>

          <div className="max-w-5xl mx-auto px-6 md:px-8 grid gap-8 lg:grid-cols-[1fr_1.4fr] items-start">
            {/* Contact details */}
            <div className="space-y-3">
              {CONTACT_DETAILS.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <div className="flex gap-4 rounded-2xl p-5 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                    <div
                      className="w-11 h-11 shrink-0 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">
                        {detail.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white leading-snug">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                );

                return detail.href ? (
                  <a key={detail.label} href={detail.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={detail.label}>{content}</div>
                );
              })}
            </div>

            {/* Form (client component) */}
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* 3. WHAT HAPPENS NEXT (process) */}
        <section
          aria-labelledby="next-steps-heading"
          className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="next-steps-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                What Happens After You Reach Out
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                A short, transparent process — no long sales cycle before you
                get a straight answer.
              </p>
            </div>

            <ol className="grid sm:grid-cols-3 gap-6">
              {NEXT_STEPS.map((step, idx) => (
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

        {/* 4. WHY REACH OUT (benefits) */}
        <section
          aria-labelledby="why-reach-out-heading"
          className="py-24 relative border-t border-white/5"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2
                id="why-reach-out-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4"
              >
                What You Can Expect From Us
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                The same standard we hold ourselves to on every project,
                starting with the first message.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_REACH_OUT.map((item) => (
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

        {/* 5. LOCATION */}
        <section
          aria-labelledby="contact-location-heading"
          className="py-24 relative border-t border-white/5 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120]"
        >
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="mb-10 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                Find Us
              </h2>
              <p className="text-white/60 text-base sm:text-lg">
                {OFFICE_ADDRESS}
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10">
              <iframe
                title={`${SITE_NAME} location on Google Maps`}
                src={MAPS_EMBED_SRC}
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full grayscale-[15%]"
              />
            </div>
          </div>
        </section>

        {/* 6. FAQ */}
        <section
          aria-labelledby="faq-heading"
          className="py-24 relative border-t border-white/5"
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
                Common questions from people reaching out for the first time.
              </p>
            </div>

            <FaqAccordion faqs={faqs} />
          </div>
        </section>
      </main>
    </div>
  );
}