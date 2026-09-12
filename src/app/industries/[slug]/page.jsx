"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import industriesData from "../../Data/industries.json";

// ─── Reusable fade-in wrapper ──────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function IndustryPage({ params }) {
  // ── Data wiring (unchanged logic) ────────────────────────────────────────
  const { slug } = React.use ? React.use(params) : params;
  const industryName = industriesData.industrySlugMap[slug];

  if (!industryName) {
    return (
      <div className="min-h-screen bg-[#08001a] flex items-center justify-center">
        <div className="text-center border border-white/10 px-16 py-20">
          <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 mb-6">
            Error 404
          </p>
          <h1 className="text-7xl font-black text-white mb-4">Not Found</h1>
          <p className="text-gray-500 text-lg">Industry page does not exist.</p>
        </div>
      </div>
    );
  }

  const industryData = industriesData.industries[industryName];
  const heroContent = industryData.hero;
  const warningSigns = industryData.warningSigns || [];
  const approachHighlights = industryData.approachHighlights || [];
  const ctaText = industryData.cta || "Get Started";
  const stats = industryData.stats || [
    "500+ Clients",
    "2.5M+ Leads",
    "98% Satisfaction",
    "4.9 Rating",
  ];

  const plans = (
    Array.isArray(industryData.plans)
      ? industryData.plans
      : typeof industryData.plans === "object" && industryData.plans !== null
      ? Object.values(industryData.plans)
      : []
  ).sort((a, b) => {
    const order = { Starter: 0, Growth: 1, Premium: 2 };
    return (order[a.name] ?? 999) - (order[b.name] ?? 999);
  });

  return (
    <div className="min-h-screen bg-[#08001a] text-white overflow-hidden font-sans">

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-5 pb-28 px-6 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[140px]" />
        </div>

        {/* Decorative grid lines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          <FadeIn delay={0}>
              <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 px-5 py-1.5 mb-8">
                {industryName}
              </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight text-white mb-6">
              {heroContent.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl font-semibold text-purple-300 mb-5">
              {heroContent.subtitle}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-10">
                {heroContent.description}
              </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-300 group"
            >
              {ctaText}
              <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </FadeIn>
        </div>

        {/* Bottom rule */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS — horizontal scrolling ticker
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-0 overflow-hidden border-b border-white/[0.06]">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .ticker-track { animation: ticker 30s linear infinite; }
          .ticker-track:hover { animation-play-state: paused; }
        ` }} />

        <div className="flex ticker-track whitespace-nowrap">
          {[...stats, ...stats].map((item, i) => (
            <div key={i} className="inline-flex items-center shrink-0 px-12 py-5 border-r border-white/[0.06] gap-4">
              <span className="text-2xl font-black text-white">{item.split(" ")[0]}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-500">
                {item.split(" ").slice(1).join(" ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          WHY CHOOSE US — warning signs / feature grid
      ══════════════════════════════════════════════════════════════ */}
      {warningSigns.length > 0 && (
        <section className="relative py-28 px-6 bg-[#08001a]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] -translate-y-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto">

            {/* Header */}
            <FadeIn className="text-center mb-16">
              <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 px-5 py-1.5 mb-6">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                Premium. Powerful.
                <br />
                <span className="text-purple-300">AI + Digital Marketing.</span>
              </h2>
              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="h-px w-16 bg-purple-600/40" />
                <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
                <div className="h-px w-16 bg-purple-600/40" />
              </div>
            </FadeIn>

            {/* Cards grid — editorial ruled lines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {warningSigns.map((sign, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.08}>
                  <div className="group relative p-8 sm:p-10 bg-[#08001a] hover:bg-white/[0.03] transition-colors duration-300 h-full overflow-hidden">
                    {/* Left accent */}
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-purple-700/50 group-hover:bg-purple-400 transition-colors duration-300" />

                    {/* Watermark number */}
                    <span className="absolute top-6 right-7 text-6xl font-black text-white/[0.03] select-none leading-none group-hover:text-white/[0.05] transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300 leading-snug">
                      {sign.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {sign.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          WHY OUR APPROACH WORKS
      ══════════════════════════════════════════════════════════════ */}
      {approachHighlights.length > 0 && (
        <section className="relative py-28 px-6 bg-[#060012] border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto">

            <FadeIn className="mb-16">
              <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 px-5 py-1.5 mb-6">
                Our Methodology
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Why Our Approach Works
              </h2>
            </FadeIn>

            <div className="space-y-px border border-white/[0.06] bg-white/[0.06]">
              {approachHighlights.map((item, i) => (
                <FadeIn key={i} delay={0.1 + i * 0.09}>
                  <div className="group flex items-start gap-8 p-8 sm:p-10 bg-[#060012] hover:bg-white/[0.03] transition-colors duration-300 relative overflow-hidden">
                    {/* Step number */}
                    <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 group-hover:text-purple-400 transition-colors pt-1 w-8 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-400/50 group-hover:text-purple-300 transition-all duration-300 text-2xl">
                      {item.icon}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                        {item.description}
                      </p>
                    </div>

                    {/* Right arrow */}
                    <svg viewBox="0 0 16 16" fill="none" className="shrink-0 w-4 h-4 text-purple-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300 mt-1">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 bg-[#08001a] border-t border-white/[0.06]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-purple-900/12 rounded-full blur-[160px]" />
        </div>

        <div className="relative max-w-7xl mx-auto">

          <FadeIn className="text-center mb-16">
            <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 px-5 py-1.5 mb-6">
              Pricing
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Choose Your Growth Plan
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
            {plans.map((plan, i) => {
              const isPremium = plan.name === "Premium";
              return (
                <FadeIn key={i} delay={0.1 + i * 0.1} className="flex">
                  <div
                    className={`group relative flex flex-col w-full p-8 sm:p-10 transition-colors duration-300 overflow-hidden
                      ${isPremium
                        ? "bg-purple-600/10 hover:bg-purple-600/15"
                        : "bg-[#08001a] hover:bg-white/[0.03]"
                      }`}
                  >
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-8 right-8 h-[3px] transition-colors duration-300
                      ${isPremium ? "bg-purple-400" : "bg-purple-700/50 group-hover:bg-purple-500"}`} />

                    {/* Badge */}
                    {plan.badge && (
                      <span className="inline-block self-start mb-6 text-[10px] font-black uppercase tracking-[0.25em] text-amber-400 border border-amber-500/40 bg-amber-500/10 px-4 py-1.5">
                        {plan.badge}
                      </span>
                    )}

                    {/* Plan name */}
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-purple-400 mb-2">
                      {plan.name}
                    </p>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-6xl font-black text-white leading-none">
                        {plan.term.replace(" Months", "")}
                      </span>
                      <span className="text-gray-500 text-sm font-semibold uppercase tracking-widest ml-2">
                        Months
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 min-h-[48px]">
                      {plan.description}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-white/[0.06] mb-8" />

                    {/* Features */}
                    <ul className="space-y-3 flex-1 mb-10">
                      {plan.features.map((f, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          <span className="shrink-0 w-4 h-4 mt-0.5 flex items-center justify-center border border-purple-500/40 bg-purple-500/10 text-purple-400 text-[10px]">
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href="/contact"
                      className={`mt-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-300 group/btn
                        ${isPremium
                          ? "bg-purple-600 hover:bg-purple-500 text-white"
                          : "bg-white/5 hover:bg-purple-600 text-gray-300 hover:text-white border border-white/10 hover:border-purple-500"
                        }`}
                    >
                      Start Your Success
                      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 border-t border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-900/20 rounded-full blur-[160px]" />
        </div>

        <FadeIn className="relative max-w-5xl mx-auto border border-white/[0.06] bg-white/[0.02] px-8 sm:px-14 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">

          <div className="flex items-start gap-5 max-w-2xl">
            <svg viewBox="0 0 32 28" fill="none" className="w-10 h-10 flex-shrink-0 text-purple-600/60 mt-0.5">
              <path d="M0 28V17.333C0 7.778 4.444 2.222 13.333 0L15.556 3.556C11.556 4.889 9.111 7.333 8.222 10.889H13.333V28H0ZM18.667 28V17.333C18.667 7.778 23.111 2.222 32 0L34.222 3.556C30.222 4.889 27.778 7.333 26.889 10.889H32V28H18.667Z" fill="currentColor" />
            </svg>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                Ready to Grow <span className="text-purple-300">{industryName}</span>?
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Let's build something powerful — and built to last.
              </p>
            </div>
          </div>

          <a
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-[0.18em] transition-colors duration-300 group"
          >
            {ctaText}
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </FadeIn>
      </section>

    </div>
  );
}

