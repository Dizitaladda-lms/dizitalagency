"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Eye, Shield, BarChart2, Target, Link2 } from "lucide-react";

const REASONS = [
  {
    Icon: TrendingUp,
    title: "Proven Track Record",
    description:
      "Over 200 brands — from early-stage startups to established enterprises — have achieved measurable revenue growth through our campaigns. Every strategy is backed by documented, verifiable results.",
  },
  {
    Icon: Eye,
    title: "Complete Transparency",
    description:
      "No hidden fees, no ambiguous reports. Real-time dashboards and detailed monthly performance breakdowns give you full visibility into where every rupee of your investment is working.",
  },
  {
    Icon: Shield,
    title: "Certified Expert Team",
    description:
      "Our specialists hold certifications across SEO, paid media, performance marketing, content strategy, and creative design — operating as a dedicated, seamless extension of your business.",
  },
  {
    Icon: BarChart2,
    title: "Data-Driven Execution",
    description:
      "Every decision — from audience targeting to creative direction and copy — is grounded in real-time analytics, deep market research, and continuous A/B testing. We eliminate guesswork.",
  },
  {
    Icon: Target,
    title: "Revenue-Focused Strategy",
    description:
      "We measure success by your bottom line, not follower counts or impressions. Every campaign is built around your actual objectives: qualified leads, compounding revenue, and durable brand authority.",
  },
  {
    Icon: Link2,
    title: "Built for the Long Term",
    description:
      "Our 90%+ client retention rate reflects partnerships rooted in consistent performance and genuine accountability — not short-term engagements. We grow as your business grows.",
  },
];

const STATS = [
  { value: "200+", label: "Brands Served" },
  { value: "95%", label: "Client Retention" },
  { value: "8+", label: "Years of Excellence" },
  { value: "24/7", label: "Dedicated Support" },
];

export default function WhyTrustUs() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative px-4 sm:px-6 overflow-hidden bg-[#08001a]"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-800/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-800/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center"
        >
          <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-purple-400 border border-purple-500/40 px-5 py-1.5 bg-purple-500/10">
            Why Clients Choose Us
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
            Built on Results.
            <br />
            <span className="text-purple-300">Rooted in Trust.</span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We don't ask for your trust — we earn it. Everything we do is
            engineered around one outcome: sustainable, compounding growth for
            your business.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-purple-600/40" />
            <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
            <div className="h-px w-16 bg-purple-600/40" />
          </div>
        </motion.div>

        {/* ── Feature Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] mb-px">
          {REASONS.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.15 + i * 0.1,
                duration: 0.55,
                ease: "easeOut",
              }}
              className="group relative p-8 sm:p-10 bg-[#08001a] hover:bg-white/[0.03] transition-colors duration-300 overflow-hidden"
            >
              {/* Left accent bar */}
              <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-purple-700/50 group-hover:bg-purple-400 transition-colors duration-400" />

              {/* Card number — watermark */}
              <span className="absolute top-6 right-7 text-6xl font-black text-white/[0.03] select-none leading-none group-hover:text-white/[0.05] transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icon container */}
              <div className="mb-6 w-12 h-12 flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-400/50 group-hover:text-purple-300 transition-all duration-300">
                <Icon className="w-5 h-5" strokeWidth={1.75} />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300 leading-snug">
                {title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                {description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-2 lg:grid-cols-4 bg-white/[0.02] border border-white/[0.06] divide-x divide-y lg:divide-y-0 divide-white/[0.06]"
        >
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.85 + i * 0.08, duration: 0.45 }}
              className="group px-8 py-8 text-center hover:bg-white/[0.03] transition-colors duration-300"
            >
              <p className="text-3xl sm:text-4xl font-black text-white mb-1.5 group-hover:text-purple-200 transition-colors duration-300">
                {value}
              </p>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 group-hover:text-purple-400 transition-colors duration-300">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Closing Statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.1, duration: 0.55, ease: "easeOut" }}
          className="mt-12 sm:mt-14 border border-white/[0.06] bg-white/[0.02] px-8 sm:px-14 py-10 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          {/* Left — quote block */}
          <div className="flex items-start gap-5 max-w-2xl">
            {/* Large quotation mark (SVG) */}
            <svg
              viewBox="0 0 32 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 flex-shrink-0 text-purple-600/60 mt-0.5"
              aria-hidden="true"
            >
              <path
                d="M0 28V17.333C0 7.778 4.444 2.222 13.333 0L15.556 3.556C11.556 4.889 9.111 7.333 8.222 10.889H13.333V28H0ZM18.667 28V17.333C18.667 7.778 23.111 2.222 32 0L34.222 3.556C30.222 4.889 27.778 7.333 26.889 10.889H32V28H18.667Z"
                fill="currentColor"
              />
            </svg>
            <div>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed font-medium italic">
                We don't just run campaigns. We take ownership of your growth,
                your brand reputation, and your competitive position — every
                single day.
              </p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500">
                — DigitalAdda Agency
              </p>
            </div>
          </div>

          {/* Right — CTA */}
          <a
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-3 px-7 py-3.5 bg-purple-600 text-white text-sm font-bold uppercase tracking-[0.15em] hover:bg-purple-500 transition-colors duration-300 group"
          >
            Start a Conversation
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
