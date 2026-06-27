"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import servicesData from "../../Data/services.json";

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

// ─── Section label badge ───────────────────────────────────────────────────
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

// ─── Global ticker stats ───────────────────────────────────────────────────
const GLOBAL_STATS = [
  "200+ Brands Served",
  "95% Client Retention",
  "8+ Years of Excellence",
  "24/7 Dedicated Support",
  "500+ Campaigns Launched",
  "4.9 Average Rating",
];

export default function ServicePage({ params }) {
  const { slug } = React.use ? React.use(params) : params;
  const serviceName = servicesData.serviceSlugMap[slug];

  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    service: "",
  });

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will contact you soon.");
  };

  // ── 404 ───────────────────────────────────────────────────────────────────
  if (!serviceName) {
    return (
      <div className="min-h-screen bg-[#08001a] flex items-center justify-center">
        <div className="text-center border border-white/10 px-16 py-20">
          <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-purple-400 mb-6">
            Error 404
          </p>
          <h1 className="text-7xl font-black text-white mb-4">Not Found</h1>
          <p className="text-gray-500 text-lg">Service page does not exist.</p>
        </div>
      </div>
    );
  }

  const serviceData = servicesData.services[serviceName];
  const heroContent = serviceData.hero;
  const features = serviceData.features || [];
  const ctaText = serviceData.cta || "Get Started";

  // ── Dynamic content from JSON ─────────────────────────────────────────────
  const problems = serviceData.problems || [];
  const solutions = serviceData.solutions || [];
  const benefits = serviceData.benefits || [];
  const whatYouGet = serviceData.includes || [];
  const processSteps = [
    { label: "Analysis & Audit", body: "We audit your current presence, study your competitors, and identify the highest-leverage opportunities specific to your business." },
    { label: "Strategy Creation", body: "A tailored action plan is built around your goals, timeline, and budget — no cookie-cutter templates." },
    { label: "Implementation", body: "Our certified specialists execute every deliverable with precision, keeping you informed at every milestone." },
    { label: "Optimization", body: "We continuously A/B test, analyse data, and refine to compound results over time." },
    { label: "Reporting", body: "Real-time dashboards and detailed monthly reports give you full visibility into performance and ROI." },
  ];
  const caseStudies = serviceData.caseStudies || [];
  const whyChooseUs = serviceData.whyChooseUs || [];
  const tools = serviceData.tools || [];
  const industries = serviceData.industries || [];
  const packages = serviceData.packages || [];
  const testimonials = serviceData.testimonials || [];
  const faqs = serviceData.faqs || [];

  // ── Related services (dynamic based on current service) ───────────────────
  const allServices = Object.keys(servicesData.serviceSlugMap);
  const currentSlug = slug;
  const relatedServices = allServices
    .filter(s => s !== currentSlug)
    .slice(0, 5)
    .map(s => ({
      title: servicesData.serviceSlugMap[s],
      desc: servicesData.services[servicesData.serviceSlugMap[s]]?.hero?.subtitle || "Professional service",
      slug: s
    }));

  const blogs = [
    { title: "10 SEO Trends to Watch in 2026", category: "SEO", date: "Jun 25, 2026" },
    { title: "How to Reduce Google Ads Cost", category: "PPC", date: "Jun 22, 2026" },
    { title: "Social Media Marketing Guide", category: "Social", date: "Jun 20, 2026" },
  ];

  return (
    <div className="min-h-screen bg-[#08001a] text-white overflow-hidden font-sans">

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-5 pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[140px]" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3">
            <FadeIn delay={0}>
              <SectionLabel>{serviceName}</SectionLabel>
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
              <div className="flex flex-wrap gap-4">
                <a
                  href="/Contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 group hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                >
                  Get Free Consultation
                  <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a
                  href="/Contact"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-purple-500/40 hover:border-purple-400 hover:bg-purple-500/10 text-white text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 group hover:scale-105"
                >
                  Get Free Audit
                  <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Hero side illustration / dashboard */}
          <FadeIn delay={0.5} className="lg:col-span-2">
            <div className="relative border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400">
                  Dashboard
                </span>
                <span className="text-[10px] font-bold text-green-400">+247%</span>
              </div>
              <div className="h-40 flex items-end justify-around gap-2 mb-4">
                {[40, 60, 45, 80, 65, 90, 75, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
                {[
                  { value: "10K+", label: "Visitors" },
                  { value: "500+", label: "Leads" },
                  { value: "85%", label: "Growth" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#08001a] p-3 text-center">
                    <p className="text-lg font-black text-white">{s.value}</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-purple-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-purple-600 border border-purple-400 flex items-center justify-center text-white text-xl">
                ✦
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.06]" />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS TICKER
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .ticker-track { animation: ticker 30s linear infinite; }
            .ticker-track:hover { animation-play-state: paused; }
          `,
          }}
        />
        <div className="flex ticker-track whitespace-nowrap">
          {[...GLOBAL_STATS, ...GLOBAL_STATS].map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center shrink-0 px-12 py-5 border-r border-white/[0.06] gap-4"
            >
              <span className="text-2xl font-black text-white">
                {item.split(" ")[0]}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-500">
                {item.split(" ").slice(1).join(" ")}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — PROBLEMS (PAIN POINTS)
      ══════════════════════════════════════════════════════════════ */}
      {problems.length > 0 && (
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Pain Points</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Are You Facing These Problems?
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {problems.map((p, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="group relative p-8 sm:p-10 bg-[#060012] hover:bg-white/[0.03] transition-colors duration-300 h-full overflow-hidden">
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-red-700/50 group-hover:bg-red-400 transition-colors duration-300" />
                    <span className="absolute top-6 right-7 text-6xl font-black text-white/[0.03] select-none leading-none group-hover:text-white/[0.05] transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mb-6 w-12 h-12 flex items-center justify-center bg-red-500/10 border border-red-500/25 text-red-400 group-hover:bg-red-500/20 group-hover:border-red-400/50 transition-all duration-300">
                      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" strokeWidth={1.5}>
                        <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeLinecap="round" />
                        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-red-100 transition-colors duration-300 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {p.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — SOLUTIONS
      ══════════════════════════════════════════════════════════════ */}
      {solutions.length > 0 && (
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Solutions</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                How Our {serviceName} Helps You
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {solutions.map((s, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="group relative p-8 sm:p-10 bg-[#08001a] hover:bg-white/[0.03] transition-colors duration-300 h-full overflow-hidden">
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-purple-700/50 group-hover:bg-purple-400 transition-colors duration-300" />
                    <span className="absolute top-6 right-7 text-6xl font-black text-white/[0.03] select-none leading-none group-hover:text-white/[0.05] transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mb-6 w-12 h-12 flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-400/50 transition-all duration-300">
                      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" strokeWidth={1.5}>
                        <path d="M4 10h12M10 4v12" stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300 leading-snug">
                      {s.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {s.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — SERVICE BENEFITS
      ══════════════════════════════════════════════════════════════ */}
      {benefits.length > 0 && (
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06] overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[160px] -translate-y-1/2" />
          </div>
          <div className="relative max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Benefits</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Benefits of Our {serviceName}
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06]">
              {benefits.map((b, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="group relative p-8 bg-[#060012] hover:bg-white/[0.03] transition-colors duration-300 h-full text-center overflow-hidden">
                    <div className="mb-6 w-14 h-14 mx-auto flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-500/30 text-purple-400 group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300">
                      <span className="text-xl font-black">✦</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-100 transition-colors duration-300">
                      {b.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mt-2 group-hover:text-gray-400 transition-colors duration-300">
                      {b.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 5 — WHAT WE INCLUDE
      ══════════════════════════════════════════════════════════════ */}
      {whatYouGet.length > 0 && (
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>What's Included</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                What You Get In Our Service
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="max-w-3xl mx-auto">
              <FadeIn delay={0.1}>
                <div className="bg-[#08001a] p-8 sm:p-10 border border-white/[0.06]">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400">
                      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" strokeWidth={1.5}>
                        <circle cx="9" cy="9" r="6" stroke="currentColor" />
                        <path d="M13 13l4 4" stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">{serviceName}</h3>
                  </div>
                  <ul className="space-y-3">
                    {whatYouGet.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 group">
                        <div className="w-6 h-6 flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 6 — OUR PROCESS
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Our Working Process
            </h2>
            <SectionDivider />
          </FadeIn>

          <div className="space-y-px border border-white/[0.06] bg-white/[0.06]">
            {processSteps.map((step, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div className="group flex items-start gap-8 p-8 sm:p-10 bg-[#060012] hover:bg-white/[0.03] transition-colors duration-300 relative overflow-hidden">
                  <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 group-hover:text-purple-400 transition-colors pt-1 w-8 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-purple-100 transition-colors duration-300">
                      {step.label}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
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
          SECTION 7 — CASE STUDIES / RESULTS
      ══════════════════════════════════════════════════════════════ */}
      {caseStudies.length > 0 && (
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Case Studies</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Results We Achieved
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06]">
              {caseStudies.map((r, i) => (
                <FadeIn key={i} delay={0.08 * i}>
                  <div className="group bg-[#08001a] p-8 hover:bg-white/[0.03] transition-colors duration-300 text-center">
                    <p className="text-4xl sm:text-5xl font-black bg-gradient-to-br from-purple-300 to-purple-600 bg-clip-text text-transparent mb-2">
                      {r.metric}
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-purple-500 mb-3">
                      {r.label}
                    </p>
                    <p className="text-green-400 text-sm font-bold mb-1">↑ {r.growth}</p>
                    <p className="text-gray-500 text-xs">{r.client}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 8 — WHY CHOOSE US
      ══════════════════════════════════════════════════════════════ */}
      {whyChooseUs.length > 0 && (
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Why Us</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Why Choose Our Agency
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {whyChooseUs.map((w, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="group relative p-8 sm:p-10 bg-[#060012] hover:bg-white/[0.03] transition-colors duration-300 h-full overflow-hidden">
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-purple-700/50 group-hover:bg-purple-400 transition-colors duration-300" />
                    <span className="absolute top-6 right-7 text-6xl font-black text-white/[0.03] select-none leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-purple-100 transition-colors duration-300">
                      {w.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
                      {w.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 9 — TOOLS WE USE
      ══════════════════════════════════════════════════════════════ */}
      {tools.length > 0 && (
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Our Stack</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Tools We Use
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-px bg-white/[0.06] border border-white/[0.06]">
              {tools.map((tool, i) => (
                <FadeIn key={i} delay={0.04 * i}>
                  <div className="group bg-[#08001a] p-6 hover:bg-white/[0.03] transition-colors duration-300 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center border border-purple-500/25 bg-purple-500/10 text-purple-400 group-hover:border-purple-400 group-hover:scale-110 transition-all duration-300">
                      <span className="text-xs font-black">✦</span>
                    </div>
                    <p className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                      {tool}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 10 — INDUSTRIES WE SERVE
      ══════════════════════════════════════════════════════════════ */}
      {industries.length > 0 && (
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Industries</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Industries We Work With
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.06] border border-white/[0.06]">
              {industries.map((ind, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="group bg-[#060012] p-8 hover:bg-white/[0.03] transition-colors duration-300 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center border border-purple-500/25 bg-purple-500/10 text-purple-400 group-hover:border-purple-400 group-hover:scale-110 transition-all duration-300">
                      <span className="text-lg">✦</span>
                    </div>
                    <p className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors">
                      {ind}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 11 — PACKAGES / PRICING
      ══════════════════════════════════════════════════════════════ */}
      {packages.length > 0 && (
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Our Packages
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {packages.map((pkg, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div
                    className={`relative bg-[#08001a] p-8 sm:p-10 h-full group hover:bg-white/[0.03] transition-colors duration-300 ${pkg.popular ? "border-t-2 border-t-purple-500" : ""
                      }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-purple-400 mb-4">
                      {pkg.name}
                    </h3>
                    <div className="mb-8">
                      <span className="text-4xl font-black text-white">{pkg.price}</span>
                      <span className="text-gray-500 text-sm ml-1">{pkg.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="text-purple-400">✦</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/Contact"
                      className={`inline-flex items-center gap-3 px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 group/btn w-full justify-center ${pkg.popular
                        ? "bg-purple-600 hover:bg-purple-500 text-white hover:scale-105"
                        : "border border-white/[0.1] hover:border-purple-400 text-white hover:bg-purple-500/10"
                        }`}
                    >
                      Get Started
                      <Arrow className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 12 — TESTIMONIALS
      ══════════════════════════════════════════════════════════════ */}
      {testimonials.length > 0 && (
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Client Success Stories
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={0.1 * i}>
                  <div className="relative bg-[#060012] p-8 sm:p-10 h-full group hover:bg-white/[0.03] transition-colors duration-300">
                    <div className="flex gap-1 mb-6">
                      {[...Array(t.rating)].map((_, j) => (
                        <span key={j} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>
                    <svg viewBox="0 0 32 28" fill="none" className="w-8 h-8 text-purple-600/60 mb-4" aria-hidden="true">
                      <path
                        d="M0 28V17.333C0 7.778 4.444 2.222 13.333 0L15.556 3.556C11.556 4.889 9.111 7.333 8.222 10.889H13.333V28H0ZM18.667 28V17.333C18.667 7.778 23.111 2.222 32 0L34.222 3.556C30.222 4.889 27.778 7.333 26.889 10.889H32V28H18.667Z"
                        fill="currentColor"
                      />
                    </svg>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06]">
                      <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 border border-purple-500/40 text-purple-300 font-black text-sm">
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
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 13 — FAQ
      ══════════════════════════════════════════════════════════════ */}
      {faqs.length > 0 && (
        <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Frequently Asked Questions
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="border border-white/[0.06] bg-white/[0.02]">
              {faqs.map((faq, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <div className="border-b border-white/[0.06] last:border-b-0">
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-white/[0.03] transition-colors duration-300 group"
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-purple-600 group-hover:text-purple-400 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm sm:text-base font-bold text-white group-hover:text-purple-100 transition-colors">
                          {faq.q}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 w-8 h-8 flex items-center justify-center border border-purple-500/30 text-purple-400 transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""
                          }`}
                      >
                        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 2v12M2 8h12" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    {openFaq === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-6 sm:px-8 pb-6 sm:pb-8 pl-16 sm:pl-20"
                      >
                        <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 14 — LEAD FORM
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-purple-900/20 rounded-full blur-[160px]" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <FadeIn className="mb-12 text-center">
            <SectionLabel>Get In Touch</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Get Free Consultation
            </h2>
            <SectionDivider />
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {[
                  { name: "name", label: "Full Name", type: "text", placeholder: "Your name", required: true },
                  { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXXXXXXX", required: true },
                  { name: "email", label: "Email Address", type: "email", placeholder: "your@email.com", required: true },
                  { name: "website", label: "Website URL", type: "url", placeholder: "https://yourwebsite.com", required: false },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400 mb-3">
                      {field.label} {field.required && "*"}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-[#08001a] border border-white/[0.08] text-white placeholder-gray-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.25em] text-purple-400 mb-3">
                    Service Required *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#08001a] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="" className="text-gray-900">Select a service</option>
                    {Object.entries(servicesData.serviceSlugMap).map(([slug, name]) => (
                      <option key={slug} value={slug} className="text-gray-900">{name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white text-sm font-bold uppercase tracking-[0.18em] transition-all duration-300 group hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] w-full justify-center"
              >
                Get Proposal
                <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 15 — FINAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 border-b border-white/[0.06] overflow-hidden bg-[#08001a]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-900/20 rounded-full blur-[160px]" />
        </div>

        <FadeIn className="relative max-w-5xl mx-auto border border-white/[0.06] bg-white/[0.02] px-8 sm:px-14 py-12 sm:py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5 max-w-2xl">
            <svg
              viewBox="0 0 32 28"
              fill="none"
              className="w-10 h-10 flex-shrink-0 text-purple-600/60 mt-0.5"
              aria-hidden="true"
            >
              <path
                d="M0 28V17.333C0 7.778 4.444 2.222 13.333 0L15.556 3.556C11.556 4.889 9.111 7.333 8.222 10.889H13.333V28H0ZM18.667 28V17.333C18.667 7.778 23.111 2.222 32 0L34.222 3.556C30.222 4.889 27.778 7.333 26.889 10.889H32V28H18.667Z"
                fill="currentColor"
              />
            </svg>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
                Ready To Grow Your Business?
              </h2>
              <p className="text-gray-500 text-base leading-relaxed">
                Let's discuss how we can help you achieve your goals. Get in touch today.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <a
              href="/Contact"
              className="inline-flex items-center gap-3 px-6 py-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 group hover:scale-105"
            >
              Book Consultation
              <Arrow className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+918810606010"
              className="inline-flex items-center gap-3 px-6 py-4 border border-white/[0.1] hover:border-purple-400 hover:bg-purple-500/10 text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 group hover:scale-105"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/918810606010"
              className="inline-flex items-center gap-3 px-6 py-4 border border-white/[0.1] hover:border-green-400 hover:bg-green-500/10 text-white text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 group hover:scale-105"
            >
              WhatsApp
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 16 — RELATED SERVICES
      ══════════════════════════════════════════════════════════════ */}
      {relatedServices.length > 0 && (
        <section className="relative py-28 px-6 bg-[#060012] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <SectionLabel>Related</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                Other Services You May Need
              </h2>
              <SectionDivider />
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06]">
              {relatedServices.map((s, i) => (
                <FadeIn key={i} delay={0.05 * i}>
                  <a
                    href={`/services/${s.slug}`}
                    className="group relative bg-[#060012] p-8 hover:bg-white/[0.03] transition-colors duration-300 h-full block overflow-hidden"
                  >
                    <div className="absolute left-0 top-8 bottom-8 w-[3px] bg-purple-700/50 group-hover:bg-purple-400 transition-colors duration-300" />
                    <div className="mb-6 w-12 h-12 flex items-center justify-center bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover:bg-purple-500/20 group-hover:border-purple-400/50 transition-all duration-300">
                      <span className="text-sm font-black">✦</span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 group-hover:text-gray-400 transition-colors">
                      {s.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-purple-500 group-hover:text-purple-300 transition-colors">
                      Learn More
                      <Arrow className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SECTION 17 — RELATED BLOG
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 px-6 bg-[#08001a] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="mb-16">
            <SectionLabel>Blog</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Latest From Our Blog
            </h2>
            <SectionDivider />
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06]">
            {blogs.map((b, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <a
                  href="#"
                  className="group bg-[#08001a] hover:bg-white/[0.03] transition-colors duration-300 block"
                >
                  <div className="h-48 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-b border-white/[0.06] flex items-center justify-center relative overflow-hidden">
                    <span className="text-6xl font-black text-white/[0.05] group-hover:text-white/[0.1] transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute top-4 left-4 bg-purple-600/80 backdrop-blur-sm px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white">
                      {b.category}
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-purple-500 mb-3">
                      {b.date}
                    </p>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-4 group-hover:text-purple-100 transition-colors leading-snug">
                      {b.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-purple-500 group-hover:text-purple-300 transition-colors">
                      Read More
                      <Arrow className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}