import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

/**
 * NOTES
 * -----------------------------------------------------------
 * - Plain Server Component — no "use client" needed since nothing here
 *   uses hooks or event handlers.
 * - Internal links use next/link (Link) for client-side navigation;
 *   external/social links and contact links use plain <a> tags.
 * - Every link uses descriptive text (service names, page names) instead
 *   of generic text like "Read More" or "Click Here" — this is what
 *   search engines and screen readers use to understand where a link
 *   goes, and was flagged as a fix in a prior SEO audit.
 * - Social icons (LinkedIn, Twitter/X, GitHub) are hand-rolled inline SVGs
 *   rather than lucide-react imports — recent lucide-react versions
 *   dropped brand/logo icons, so importing them by name breaks the build.
 * - TODO: replace the placeholder logo mark below with your real logo
 *   (an <Image> from next/image, or an inline SVG).
 * - TODO: replace EMAIL / PHONE / ADDRESS and the social URLs with your
 *   real values.
 */

function LinkedinIcon({ size = 16, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function TwitterIcon({ size = 16, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <path d="M18.9 3H22l-7.6 8.7L23.3 21H16.7l-5.2-6.4L5.6 21H2.5l8.1-9.3L1.7 3h6.8l4.7 5.9L18.9 3zm-1.2 16.2h1.7L7.4 4.7H5.6l12.1 14.5z" />
    </svg>
  );
}

function GithubIcon({ size = 16, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.31.1-2.72 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 5 0c1.9-1.32 2.74-1.05 2.74-1.05.55 1.41.2 2.46.1 2.72.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2z"
      />
    </svg>
  );
}

const SITE_NAME = "UF Software Solutions PH";
const EMAIL = "ufsoftwaresolutions@gmail.com"; 
const PHONE = "+1 (555) 123-4567"; 
const ADDRESS = "Bagumbong, Caloocan City, Casa Asuncion brgy 171";

const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/your-company", icon: LinkedinIcon },
  { name: "Twitter", href: "https://twitter.com/yourcompany", icon: TwitterIcon },
  { name: "GitHub", href: "https://github.com/yourcompany", icon: GithubIcon },
];

const SERVICE_LINKS = [
  { name: "Website Design & Application Development", href: "/services/web" },
  { name: "Mobile Application Development", href: "/services/mobile" },
  { name: "Custom Software Development", href: "/services/custom" },
  { name: "Workflow Automation", href: "/services/workflow-automation" },
];

const RESOURCE_LINKS = [
  { name: "Blog", href: "/blog" },
  { name: "Case Studies", href: "/case-studies" },
];

const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Security & Trust Center", href: "/security" },
];

function FooterHeading({ children }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
      {children}
    </h2>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1120] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* COLUMN 1 — Logo, description, contact, social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label={`${SITE_NAME} home`}
              className="inline-flex items-center gap-2 mb-4"
            >
              {/* Placeholder logo mark — swap for a real logo/SVG */}
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-lg bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-extrabold text-sm"
              >
                {SITE_NAME.charAt(0)}
              </span>
              <span className="font-bold text-white text-lg tracking-tight">
                {SITE_NAME}
              </span>
            </Link>

            <p className="text-sm text-white/55 leading-relaxed mb-6 max-w-xs">
              Enterprise software development and IT solutions.
            </p>

            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-[var(--accent)] transition-colors"
                >
                  <Mail size={15} aria-hidden="true" className="shrink-0 text-white/40" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${PHONE.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2.5 text-sm text-white/60 hover:text-[var(--accent)] transition-colors"
                >
                  <Phone size={15} aria-hidden="true" className="shrink-0 text-white/40" />
                  <span>{PHONE}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin size={15} aria-hidden="true" className="shrink-0 text-white/40 mt-0.5" />
                <span>{ADDRESS}</span>
              </li>
            </ul>

            <ul className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${SITE_NAME} on ${social.name}`}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors"
                  >
                    <social.icon size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2 — Services */}
          <nav aria-label="Services">
            <FooterHeading>Services</FooterHeading>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* COLUMN 3 — Resources */}
          <nav aria-label="Resources">
            <FooterHeading>Resources</FooterHeading>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* COLUMN 4 — Legal */}
          <nav aria-label="Legal">
            <FooterHeading>Legal</FooterHeading>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[var(--accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* BOTTOM ROW — Copyright & disclaimer */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-white/40">
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Information subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  );
}