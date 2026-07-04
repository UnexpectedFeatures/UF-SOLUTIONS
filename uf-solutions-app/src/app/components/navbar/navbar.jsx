"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Monitor, 
  Smartphone, 
  Palette, 
  Settings, 
  RefreshCw, 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight 
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#",
    children: [
      {
        label: "Website Application & Design",
        desc: "From brochure sites to full-stack web apps",
        icon: Monitor,
        href: "/services/web",
      },
      {
        label: "Mobile Application",
        desc: "iOS & Android apps for any business need",
        icon: Smartphone,
        href: "/services/mobile",
      },
      {
        label: "Graphics & Design",
        desc: "Branding, UI/UX, and visual identity",
        icon: Palette,
        href: "/services/design",
      },
      {
        label: "Custom Software",
        desc: "POS terminals, financial systems, offline-first apps",
        icon: Settings,
        href: "/services/custom",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  {
    label: "Projects",
    href: "#",
    children: [
      {
        label: "Ongoing",
        desc: "Projects currently in active development",
        icon: RefreshCw,
        href: "/projects/ongoing",
      },
      {
        label: "Finished",
        desc: "Completed and shipped work",
        icon: CheckCircle2,
        href: "/projects/finished",
      },
    ],
  },
];

function DropdownMenu({ items, title, isOpen }) {
  const isTwoCol = items.length > 2;

  return (
    <div
      className={`
        absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50
        transition-all duration-200
        ${
          isOpen
            ? "opacity-100 visible scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 invisible scale-95 translate-y-1 pointer-events-none"
        }
        ${isTwoCol ? "w-[580px]" : "w-[340px]"}
      `}
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0b1120]/95 backdrop-blur-xl shadow-[0_40px_90px_rgba(0,0,0,.45)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-white/5" />
        <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-[#0b1120] border-l border-t border-white/10" />
        <div className="px-6 pt-6 pb-4 border-b border-white/10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/35">
            {title}
          </p>
        </div>
        <div
          className={`
            relative p-3
            ${
              isTwoCol
                ? "grid grid-cols-2 gap-2"
                : "flex flex-col gap-2"
            }
          `}
        >
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="group/item flex gap-4 rounded-2xl p-4 hover:bg-white/6 hover:translate-x-[2px] transition"
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-white/8 flex items-center justify-center text-white/80 group-hover/item:text-white transition-colors">
                  <IconComponent size={20} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-white">
                      {item.label}
                    </span>
                    <ArrowRight 
                      size={16} 
                      className="opacity-0 -translate-x-2 text-blue-400 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" 
                    />
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/45">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="border-t border-white/10 px-6 py-4 flex justify-between items-center bg-white/[0.03]">
          <span className="text-xs text-white/35">
            Need help choosing?
          </span>
          <Link
            href="/contact"
            className="text-xs font-semibold text-[var(--accent)] hover:text-white flex items-center gap-1 group"
          >
            Talk to us 
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({ items, title, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-4 text-white/80 font-medium"
      >
        {title}
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[600px] pb-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1">
          {items.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex gap-3 rounded-xl p-3 hover:bg-white/6"
              >
                <div className="w-9 h-9 shrink-0 rounded-lg bg-white/8 flex items-center justify-center text-white/80">
                  <IconComponent size={16} strokeWidth={2} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {item.label}
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-white/45">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDesktopMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpenDesktopMenu(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setOpenMobileAccordion(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((open) => {
      const next = !open;
      if (!next) setOpenMobileAccordion(null);
      return next;
    });
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${
          scrolled
            ? "bg-[var(--secondary)]/95 backdrop-blur-md"
            : "bg-[var(--secondary)]"
        }
      `}
    >
      <nav
        ref={navRef}
        className="max-w-7xl mx-auto h-[72px] px-6 md:px-8 flex items-center"
      >
        <Link href="/" className="shrink-0">
          <div className="flex items-baseline">
            <span className="text-white font-bold text-lg">UF</span>
            <span className="text-[var(--accent)] font-bold text-lg">.</span>
            <span className="text-white/80 ml-1">Software</span>
          </div>
        </Link>

        <ul className="hidden lg:flex flex-1 justify-center h-full">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative h-full flex items-center"
            >
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDesktopMenu((current) =>
                        current === item.label ? null : item.label
                      )
                    }
                    aria-expanded={openDesktopMenu === item.label}
                    aria-haspopup="true"
                    className="px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 flex gap-2 items-center"
                  >
                    {item.label}
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-200 ${openDesktopMenu === item.label ? "rotate-180" : ""}`} 
                    />
                  </button>

                  <DropdownMenu
                    items={item.children}
                    title={item.label}
                    isOpen={openDesktopMenu === item.label}
                  />
                </>
              ) : (
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden lg:block px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-semibold"
        >
          Get a Free Quote
        </Link>

        <button
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden ml-auto relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10"
        >
          <span className="sr-only">
            {mobileMenuOpen ? "Close menu" : "Open menu"}
          </span>
          <div className="w-5 h-4 relative flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full bg-white transition-transform duration-200 ${
                mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-transform duration-200 ${
                mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      <div
        className={`
          lg:hidden overflow-y-auto
          transition-all duration-300 ease-in-out
          bg-[var(--secondary)] border-t border-white/10
          ${
            mobileMenuOpen
              ? "max-h-[calc(100vh-72px)] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-6 py-2">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <MobileAccordion
                key={item.label}
                items={item.children}
                title={item.label}
                isOpen={openMobileAccordion === item.label}
                onToggle={() =>
                  setOpenMobileAccordion((current) =>
                    current === item.label ? null : item.label
                  )
                }
              />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="block py-4 border-b border-white/10 text-white/80 font-medium"
              >
                {item.label}
              </Link>
            )
          )}

          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="block mt-6 mb-6 px-5 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-center"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}