"use client";

import React from "react";
import Link from "next/link";
import {
  Monitor,
  Smartphone,
  Settings,
  Palette,
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
  Quote
} from "lucide-react";

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  href: string;
}

function ServiceCard({ title, desc, icon: Icon, href }: ServiceCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-6">{desc}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-white transition-colors group/btn"
      >
        Read More
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
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
      title: "Graphics & Design",
      desc: "High-impact digital marketing assets, posters, presentation materials, and complete publication layouts meticulously crafted to command attention and scale your brand's digital presence.",
      icon: Palette,
      href: "/services/design",
    },
  ];

  const testimonials = [
    {
      quote: "The clinic management system completely streamlined our daily checkout flow. Speed and communication throughout the project were exceptional.",
      author: "Leonardo Medical Services",
      role: "Operations Management",
    },
    {
      quote: "They took a highly chaotic legacy internal business logic process and consolidated it into a clean terminal POS app. Maintenance support has been outstanding.",
      author: "Retail Nexus Corp",
      role: "Founder & CEO",
    },
    {
      quote: "Our dynamic digital marketing campaign pubmats and platform interface redesign brought immediate conversions. Highly analytical layout execution.",
      author: "Vanguard Media Group",
      role: "Creative Director",
    },
  ];

  return (
    <div className="bg-[#0b1120] text-white min-h-screen font-sans antialiased overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] pt-32 pb-20 flex items-center bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#1e1b4b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="flex flex-col space-y-6">
            <span className="text-[var(--accent)] font-semibold uppercase tracking-[0.25em] text-xs bg-[var(--accent)]/10 px-4 py-1.5 rounded-full w-fit">
              Engineering Digital Transformation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              We engineer clean systems to eliminate your business bottlenecks.
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              We specialize in custom web architectures, cross-platform mobile systems, and targeted enterprise business tooling. No boilerplate solutions, just high-performance code mapped to your concrete operations.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 transition flex items-center gap-2 group shadow-lg shadow-[var(--accent)]/20"
              >
                Get a Free Quote
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#services"
                className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 mt-12">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">4+</p>
                <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">20+</p>
                <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">Projects Done</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">30+</p>
                <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[var(--accent)] tracking-tight">100%</p>
                <p className="text-[11px] text-white/40 uppercase tracking-widest font-medium mt-1">Satisfaction Rate</p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center items-center w-full h-[350px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#0d1527] shadow-[0_30px_60px_rgba(0,0,0,0.5)] group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative z-20 p-8 text-center max-w-sm flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4 group-hover:scale-105 transition-transform duration-300">
                <Code size={24} />
              </div>
              <p className="text-sm font-medium text-white/70 tracking-wide">
                Interactive Dashboard & Application Visual Container
              </p>
              <p className="text-xs text-white/40 mt-2">
                Production-grade layout architectures optimized for low-latency client performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRIEF INTRODUCTION OF SERVICES */}
      <section id="services" className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Core Capabilities Engineered for Scale
            </h2>
            <p className="text-white/60 text-base sm:text-lg">
              We convert technical requirements into high-availability digital solutions optimized for specific production challenges.
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
      <section className="py-24 bg-gradient-to-b from-[#0b1120] via-[#090d1a] to-[#0b1120] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Our Structural Workflow Engine
            </h2>
            <p className="text-white/60 text-base sm:text-lg">
              Two precise pipeline methodologies adapted strictly to your current conceptual readiness and operational clarity.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Pipeline Alpha: Clear Objectives */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Defined Strategy Path</h3>
              </div>
              <p className="text-sm text-white/45 mb-8">
                Ideal if your team already has a consolidated product requirement matrix, technical specifications, or distinct workflows that require programmatic execution.
              </p>

              <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0">1</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      Proposal Draft <FileText size={14} className="text-white/45" />
                    </h4>
                    <p className="text-xs text-white/50 mt-1">We formalize a rigorous architectural strategy, timeline milestones, and system boundaries.</p>
                    
                    {/* Inner feedback loop container */}
                    <div className="mt-3 bg-white/[0.03] border border-white/10 rounded-xl p-3 flex flex-col gap-2.5">
                      <div className="flex items-start gap-2 text-xs">
                        <XCircle size={14} className="text-rose-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-rose-400 font-semibold">If Declined:</span> We process structural feedback immediately, refactor parameters, and generate an updated specification package.
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <ThumbsUp size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-emerald-400 font-semibold">If Approved:</span> Direct advancement into high-velocity production cycles.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0">2</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      Development Matrix <Code size={14} className="text-white/45" />
                    </h4>
                    <p className="text-xs text-white/50 mt-1">Clean modular engineering begins. Code changes are verified and continuously integrated against defined scope criteria.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0">3</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      Incremental Updates <MessageSquare size={14} className="text-white/45" />
                    </h4>
                    <p className="text-xs text-white/50 mt-1">We maintain real-time transparent reporting, dispatching ongoing progression metrics and feature demonstrations for validation.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 z-10 shrink-0">4</div>
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                      System Deployment <Rocket size={14} />
                    </h4>
                    <p className="text-xs text-white/50 mt-1">Once all criteria pass integration smoke tests, the completed platform is safely staged and shifted into production environment infrastructure.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pipeline Beta: Complex / Unmapped Operations */}
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Search size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">Discovery & Consultative Path</h3>
              </div>
              <p className="text-sm text-white/45 mb-8">
                Ideal if you are encountering process inefficiencies, high drop-off metrics, or manual scaling blocks, but are uncertain of the precise software architecture needed.
              </p>

              <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0">1</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      Deep Flow Analysis & Diagnostics <Search size={14} className="text-white/45" />
                    </h4>
                    <p className="text-xs text-white/50 mt-1">We execute deep-dive logic research directly into your active business mechanics, mapping rules, choke points, and internal system interactions.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-[#0b1120] border-2 border-white/20 flex items-center justify-center text-xs font-bold text-white z-10 shrink-0">2</div>
                  <div>
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      Problem Isolation & Architecture Design <FileText size={14} className="text-white/45" />
                    </h4>
                    <p className="text-xs text-white/50 mt-1">Our engineering team explicitly isolates the true technical barrier, outlines a custom solution framework, and delivers an exact deployment blueprint.</p>
                  </div>
                </div>

                <div className="flex gap-4 relative">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center text-xs font-bold text-blue-400 z-10 shrink-0">3</div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                      1-Month Active Hypercare Maintenance <Wrench size={14} />
                    </h4>
                    <p className="text-xs text-white/50 mt-1">To secure your launch, we package an absolute 1-month window of completely free, active post-deployment system optimization and monitoring.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHAT CLIENTS SAY ABOUT US */}
      <section className="py-24 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Evaluations From Production Environments
            </h2>
            <p className="text-white/60 text-base sm:text-lg">
              Read feedback received directly from businesses operating our engineered solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 relative flex flex-col justify-between"
              >
                <div>
                  <Quote size={32} className="text-[var(--accent)]/20 mb-4" />
                  <p className="text-white/80 text-sm leading-relaxed italic">
                    {"\""}{t.quote}{"\""}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5">
                  <p className="text-sm font-bold text-white">{t.author}</p>
                  <p className="text-xs text-white/40 mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLOSING CTA */}
      <section className="py-20 relative bg-gradient-to-t from-[#090d1a] via-[#0b1120] to-[#0f172a] border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(99,102,241,0.06),transparent_45%)]" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to refactor your operational architecture?
          </h2>
          <p className="text-white/60 max-w-xl text-sm sm:text-base leading-relaxed">
            Let{"'"}s dissect your workflow bottlenecks. Schedule a direct engineering consultation and obtain a comprehensive project specification breakdown, free of cost.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 transition flex items-center gap-2 shadow-xl shadow-[var(--accent)]/10 group text-sm sm:text-base"
            >
              Initiate Project Analysis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}