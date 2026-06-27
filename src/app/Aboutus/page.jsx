"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import {
  Brain, Sparkles, Zap, Target, Shield, Rocket, Atom, Palette,
  BarChart3, Users, Globe, Lightbulb, ArrowRight, Quote, Award,
  TrendingUp, CheckCircle2, Mail, Phone, MapPin, Calendar, Eye,
  GraduationCap, Building2, Heart, ShoppingCart, Store,
  Star, Send, ArrowUpRight, Circle, Diamond, Crown, Gem,
  Code2, Megaphone, LineChart, Handshake, Trophy, Coffee
} from "lucide-react";

// ─── Reusable fade-in wrapper ──────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ──────────────────────────────────────────────────────
function Counter({ value, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      const unsubscribe = rounded.on("change", (v) => setDisplay(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [inView, value, duration, count, rounded]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Arrow icon ────────────────────────────────────────────────────────────
function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <span className="inline-block text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 px-5 py-1.5 mb-6">
      ✦ {children}
    </span>
  );
}

// ─── Section divider ───────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="flex items-center gap-3 mt-6 mb-10">
      <div className="h-px w-16 bg-purple-600/40" />
      <div className="w-1.5 h-1.5 bg-purple-500 rotate-45" />
      <div className="h-px w-16 bg-purple-600/40" />
    </div>
  );
}

// ─── Floating orbs CSS ─────────────────────────────────────────────────────
const orbStyles = `
  @keyframes orbFloat {
    0%   { transform: translate(0, 0) rotate(0deg); }
    50%  { transform: translate(40px, -40px) rotate(180deg); }
    100% { transform: translate(0, 0) rotate(360deg); }
  }
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.5;
    animation: orbFloat 25s infinite ease-in-out;
    pointer-events: none;
  }
  .orb-purple {
    width: 600px; height: 600px;
    background: #9d4edd;
    top: -10%; left: -10%;
  }
  .orb-cyan {
    width: 500px; height: 500px;
    background: #00f5ff;
    bottom: -15%; right: -5%;
    animation-delay: -8s;
  }
  .orb-pink {
    width: 400px; height: 400px;
    background: #ff2bff;
    top: 20%; right: 10%;
    animation-delay: -16s;
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
    50%      { box-shadow: 0 0 40px rgba(168, 85, 247, 0.6); }
  }
  .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
`;

export default function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: orbStyles }} />

      {/* Full-page dark background */}
      <div className="fixed inset-0 -z-10 bg-[#08001a]" />

      <main className="min-h-screen text-white overflow-hidden">

        {/* ══════════════════════════════════════════════════════════════
            SECTION 1 — HERO / PAGE BANNER
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative pt-20 pb-28 px-6 overflow-hidden">
          {/* Floating orbs */}
          <div className="orb orb-purple" />
          <div className="orb orb-cyan" />
          <div className="orb orb-pink" />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative max-w-5xl mx-auto text-center">
            <FadeIn delay={0}>
              <nav className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-8">
                <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
                <span className="text-purple-600">/</span>
                <span className="text-purple-400">About Us</span>
              </nav>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.0] tracking-tight text-white mb-6">
                We Are <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">DizitalAdda</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl font-semibold text-purple-300 mb-5">
                Your Growth Partner Since 2009
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-400 leading-relaxed mb-10">
                DizitalAdda is India's next-generation digital growth agency. We blend data-driven strategy, creative excellence, and cutting-edge technology to build brands that dominate their markets.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <a
                href="#story"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
              >
                Discover Our Story
                <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </FadeIn>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 2 — WHO WE ARE
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-purple-500 via-fuchsia-500 to-cyan-400 rounded-full" />
                <SectionLabel>Who We Are</SectionLabel>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                  We don't just market brands.
                  <br />
                  <span className="text-purple-300">We engineer growth.</span>
                </h2>
                <p className="text-gray-400 text-base leading-relaxed mb-4">
                  For over 15 years, we've partnered with ambitious businesses to transform their digital presence into a measurable growth engine. Our team of strategists, creatives, and technologists work as one unit to deliver campaigns that don't just look good — they perform.
                </p>
                <p className="text-gray-400 text-base leading-relaxed">
                  From AI-powered strategy to immersive brand experiences, we build marketing systems that scale with your ambitions.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06]">
                {[
                  { icon: Rocket, title: "What We Do", desc: "Full-funnel digital marketing — SEO, Ads, Social, Web, Content." },
                  { icon: Brain, title: "Our Expertise", desc: "15+ years across 200+ brands in 20+ industries." },
                  { icon: Target, title: "Our Focus", desc: "ROI-first campaigns that turn spend into revenue." },
                  { icon: Sparkles, title: "Our Edge", desc: "AI + human creativity for smarter, faster results." },
                ].map((item, i) => (
                  <div key={i} className="group bg-[#060012] p-8 hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-purple-700/50 group-hover:bg-purple-400 transition-colors" />
                    <item.icon className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 3 — OUR STORY
        ══════════════════════════════════════════════════════════════ */}
        <section id="story" className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="mb-16 text-center">
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                From a small idea to a <span className="text-purple-300">leading agency</span>
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600/60 via-fuchsia-500/40 to-transparent md:-translate-x-px" />

              {[
                { year: "2009", title: "The Beginning", desc: "Founded in New Delhi with a vision to make digital marketing accessible to growing Indian businesses." },
                { year: "2013", title: "First Major Milestone", desc: "Crossed 50 active clients and expanded our team to 10 specialists across SEO, Ads, and development." },
                { year: "2017", title: "National Expansion", desc: "Opened our second office and began serving enterprise clients across 8 Indian cities." },
                { year: "2021", title: "AI Integration", desc: "Pioneered AI-driven marketing strategies, becoming one of India's first agencies to adopt predictive analytics at scale." },
                { year: "2026", title: "Today", desc: "200+ brands served, 95% client retention, and a team of 40+ specialists driving measurable growth every day." },
              ].map((milestone, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className={`relative flex items-start gap-8 mb-12 md:mb-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-[#08001a] -translate-x-1/2 glow-pulse z-10" />

                    {/* Content */}
                    <div className={`flex-1 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <div className="inline-block bg-[#08001a] border border-white/[0.06] p-6 sm:p-8 hover:border-purple-500/40 hover:bg-white/[0.02] transition-all duration-300 group">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-3">
                          {milestone.year}
                        </p>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                          {milestone.desc}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block flex-1" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 4 — MISSION, VISION & VALUES
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[160px]" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <FadeIn className="mb-16 text-center">
              <SectionLabel>Our Purpose</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Mission, Vision & Values
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  desc: "To empower businesses with data-driven, creative, and technology-forward marketing that delivers measurable growth — not just vanity metrics.",
                  accent: "from-purple-500 to-fuchsia-500"
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  desc: "To become India's most trusted digital growth partner — known for integrity, innovation, and results that transform businesses.",
                  accent: "from-cyan-400 to-blue-500"
                },
                {
                  icon: Gem,
                  title: "Core Values",
                  desc: "Transparency. Accountability. Innovation. Client-first thinking. We treat every client's business as our own — because your growth is our reputation.",
                  accent: "from-fuchsia-500 to-pink-500"
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="group relative bg-[#060012] p-10 hover:bg-white/[0.03] transition-all duration-300 h-full overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />
                    <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${item.accent} bg-opacity-20 rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 5 — ACHIEVEMENTS
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16 text-center">
              <SectionLabel>Our Impact</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Numbers That Speak
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                { value: 200, suffix: "+", label: "Projects Completed", icon: Rocket },
                { value: 180, suffix: "+", label: "Happy Clients", icon: Users },
                { value: 15, suffix: "+", label: "Years Experience", icon: Trophy },
                { value: 500, suffix: "+", label: "Campaigns Managed", icon: Megaphone },
                { value: 50, suffix: "K+", label: "Leads Generated", icon: TrendingUp },
              ].map((stat, i) => (
                <FadeIn key={i} delay={0.08 * i}>
                  <div className="group bg-[#08001a] p-8 hover:bg-white/[0.03] transition-all duration-300 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-fuchsia-600/0 group-hover:from-purple-600/5 group-hover:to-fuchsia-600/5 transition-all duration-500" />
                    <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300" />
                    <p className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-purple-300 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 group-hover:text-purple-400 transition-colors">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 6 — WHY CHOOSE US
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Why Us</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Why Choose <span className="text-purple-300">DizitalAdda</span>
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                {
                  category: "Our Strengths",
                  items: [
                    { title: "Experienced Team", desc: "15+ years of collective industry expertise." },
                    { title: "Proven Results", desc: "200+ successful projects with measurable ROI." },
                    { title: "Latest Tools", desc: "Premium AI, SEO, and analytics stack." },
                  ]
                },
                {
                  category: "Our Approach",
                  items: [
                    { title: "Data-First Strategy", desc: "Every decision backed by real data." },
                    { title: "Transparent Reporting", desc: "Weekly dashboards, no hidden metrics." },
                    { title: "Agile Execution", desc: "Fast pivots based on performance signals." },
                  ]
                },
                {
                  category: "Our Commitment",
                  items: [
                    { title: "Dedicated Manager", desc: "A single point of contact for your account." },
                    { title: "Affordable Pricing", desc: "Premium service without enterprise pricing." },
                    { title: "Long-term Partnership", desc: "95% client retention — we grow with you." },
                  ]
                },
              ].map((group, gi) => (
                <FadeIn key={gi} delay={0.1 * gi}>
                  <div className="bg-[#060012] p-8 sm:p-10 h-full">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-8">
                      {group.category}
                    </p>
                    <div className="space-y-6">
                      {group.items.map((item, i) => (
                        <div key={i} className="group/item flex items-start gap-4 pb-6 border-b border-white/[0.06] last:border-b-0 last:pb-0">
                          <div className="w-8 h-8 flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover/item:bg-purple-500/20 group-hover/item:border-purple-400/50 transition-all flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-white mb-1 group-hover/item:text-purple-100 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-gray-500 text-sm leading-relaxed group-hover/item:text-gray-400 transition-colors">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 7 — MEET OUR TEAM
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16 text-center">
              <SectionLabel>Our Team</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Meet The Minds Behind The Magic
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                { name: "Dr Gulsan Kumar", role: "Founder & CEO", initials: "RS", color: "from-purple-500 to-fuchsia-500" },
                { name: "Mr. Deepak Kumar", role: "Strategy Head", initials: "PV", color: "from-cyan-400 to-blue-500" },
                { name: "Mr Ravi Verma", role: "SEO Lead", initials: "AM", color: "from-fuchsia-500 to-pink-500" },
                { name: "Saurav Kumar ", role: "Ads Specialist", initials: "NK", color: "from-amber-500 to-orange-500" },
                { name: "Vikram Singh", role: "Tech Lead", initials: "VS", color: "from-emerald-500 to-teal-500" },
              ].map((member, i) => (
                <FadeIn key={i} delay={0.08 * i}>
                  <div className="group relative bg-[#08001a] p-8 hover:bg-white/[0.03] transition-all duration-300 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-fuchsia-600/0 group-hover:from-purple-600/10 group-hover:to-fuchsia-600/10 transition-all duration-500" />
                    <div className={`relative w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-xl font-black group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300`}>
                      {member.initials}
                    </div>
                    <h3 className="relative text-base font-bold text-white mb-1 group-hover:text-purple-100 transition-colors">
                      {member.name}
                    </h3>
                    <p className="relative text-[10px] font-bold uppercase tracking-[0.25em] text-purple-500 group-hover:text-purple-400 transition-colors">
                      {member.role}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 8 — FOUNDER MESSAGE
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[160px]" />
          </div>

          <div className="relative max-w-5xl mx-auto grid md:grid-cols-5 gap-12 items-center">
            <FadeIn className="md:col-span-2">
              <div className="relative">
                <div className="w-48 h-48 mx-auto md:mx-0 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center text-white text-5xl font-black glow-pulse">
                  RS
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#060012] border border-purple-500/40 px-4 py-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-400">
                    Founder
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="md:col-span-3">
              <SectionLabel>Founder's Note</SectionLabel>
              <div className="relative pl-6 border-l-2 border-purple-500/40">
                <Quote className="absolute -left-5 -top-2 w-8 h-8 text-purple-500/60 bg-[#060012] p-1" />
                <p className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-6">
                  "We started DizitalAdda with one belief — that every business, no matter its size, deserves world-class marketing. 15 years later, that belief still drives everything we do."
                </p>
              </div>
              <p className="text-gray-400 text-base leading-relaxed mb-4">
                Our philosophy is simple: <span className="text-purple-300 font-semibold">results over rhetoric</span>. We don't sell dreams — we build systems. Every campaign we run is measured, every strategy we craft is data-backed, and every client we serve gets our full commitment.
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Our goal? To be the agency you recommend to your best friend's business — because the results speak for themselves.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-12 bg-purple-500/40" />
                <p className="text-sm font-bold text-white">Dr Gulsan Kumar</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-purple-500">Founder & CEO</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 9 — CERTIFICATIONS & PARTNERS
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16 text-center">
              <SectionLabel>Trust & Credibility</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Certifications & Partners
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                { name: "Google Partner", icon: Award },
                { name: "Meta Certified", icon: Award },
                { name: "SEMrush", icon: Shield },
                { name: "Ahrefs", icon: Shield },
                { name: "HubSpot", icon: Handshake },
                { name: "Shopify", icon: Handshake },
                { name: "AWS", icon: Shield },
              ].map((cert, i) => (
                <FadeIn key={i} delay={0.04 * i}>
                  <div className="group bg-[#08001a] p-6 hover:bg-white/[0.03] transition-all duration-300 text-center">
                    <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center border border-purple-500/25 bg-purple-500/10 text-purple-400 group-hover:border-purple-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                      <cert.icon className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
                      {cert.name}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 10 — WORK PROCESS
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Our Process</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                How We Work
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="space-y-px border border-white/[0.06] bg-white/[0.06]">
              {[
                { label: "Research", body: "Deep-dive into your business, audience, competitors, and market to uncover the highest-leverage opportunities." },
                { label: "Strategy", body: "A tailored roadmap built around your goals, budget, and timeline — no cookie-cutter templates." },
                { label: "Execution", body: "Our specialists execute every deliverable with precision, keeping you informed at every milestone." },
                { label: "Optimization", body: "Continuous A/B testing, data analysis, and refinement to compound results over time." },
                { label: "Reporting", body: "Real-time dashboards and detailed monthly reports give you full visibility into performance and ROI." },
              ].map((step, i) => (
                <FadeIn key={i} delay={0.08 * i}>
                  <div className="group flex items-start gap-8 p-8 sm:p-10 bg-[#060012] hover:bg-white/[0.03] transition-colors duration-300 relative overflow-hidden">
                    <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 group-hover:text-purple-400 transition-colors pt-1 w-8 text-right">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                        {step.label}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                        {step.body}
                      </p>
                    </div>
                    <Arrow className="shrink-0 w-4 h-4 text-purple-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300 mt-1" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 11 — INDUSTRIES WE SERVE
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16 text-center">
              <SectionLabel>Industries</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Industries We Serve
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                { icon: GraduationCap, name: "Education" },
                { icon: Building2, name: "Real Estate" },
                { icon: Heart, name: "Healthcare" },
                { icon: ShoppingCart, name: "Ecommerce" },
                { icon: Store, name: "Local Business" },
                { icon: Rocket, name: "Startups" },
              ].map((ind, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="group bg-[#08001a] p-8 hover:bg-white/[0.03] transition-all duration-300 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-purple-500/25 bg-purple-500/10 text-purple-400 group-hover:border-purple-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300">
                      <ind.icon className="w-7 h-7" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                      {ind.name}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 12 — TESTIMONIALS
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16 text-center">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                What Our Clients Say
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                { name: "Rajesh Kumar", role: "CEO, TechStart", text: "DizitalAdda transformed our online presence. We went from page 5 to page 1 in just 3 months. Their team is exceptional.", rating: 5 },
                { name: "Priya Sharma", role: "Head of Marketing, EduCorp", text: "The ROI we've seen from their services is incredible. Our leads increased by 300% in the first quarter alone.", rating: 5 },
                { name: "Amit Patel", role: "Founder, HealthPlus", text: "Professional, transparent, and results-driven. They delivered exactly what they promised — and then some.", rating: 5 },
              ].map((t, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="relative bg-[#060012] p-8 sm:p-10 h-full group hover:bg-white/[0.03] transition-all duration-300">
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-purple-600/60 mb-4" />
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06]">
                      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white font-black text-sm">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{t.name}</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-purple-500">
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 13 — OUR CULTURE
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-900/20 rounded-full blur-[160px]" />
          </div>

          <div className="relative max-w-7xl mx-auto">
            <FadeIn className="mb-16 text-center">
              <SectionLabel>Our Culture</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Where Great Work Happens
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {[
                {
                  icon: Coffee,
                  title: "Work Environment",
                  desc: "A collaborative, ego-free space where ideas flow freely. We believe the best work happens when talented people feel trusted and supported.",
                  gradient: "from-purple-500 to-fuchsia-500"
                },
                {
                  icon: Lightbulb,
                  title: "Learning Culture",
                  desc: "Weekly knowledge shares, conference sponsorships, and a dedicated learning budget for every team member. We grow so our clients grow.",
                  gradient: "from-cyan-400 to-blue-500"
                },
                {
                  icon: Zap,
                  title: "Innovation First",
                  desc: "We experiment relentlessly. From AI-driven campaigns to VR brand experiences, we're always testing what's next — so our clients are always ahead.",
                  gradient: "from-fuchsia-500 to-pink-500"
                },
              ].map((item, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="group relative bg-[#08001a] p-10 hover:bg-white/[0.03] transition-all duration-300 h-full overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
                    <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${item.gradient} rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SECTION 14 — CALL TO ACTION
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 px-6 border-b border-white/[0.06] overflow-hidden bg-[#060012]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-900/30 rounded-full blur-[160px]" />
          </div>

          <FadeIn className="relative max-w-5xl mx-auto border border-white/[0.06] bg-white/[0.02] px-8 sm:px-14 py-12 sm:py-16 text-center">
            <SectionLabel>Let's Talk</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Ready to grow with <span className="text-purple-300">DizitalAdda</span>?
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10">
              Let's build a strategy tailored to your goals — and built to deliver results from day one.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
              >
                Book Consultation
                <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/[0.1] hover:border-purple-400 hover:bg-purple-500/10 text-white text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105"
              >
                Request Proposal
                <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/careers"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/[0.1] hover:border-cyan-400 hover:bg-cyan-500/10 text-white text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105"
              >
                Work With Us
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </FadeIn>
        </section>



      </main>
    </>
  );
}