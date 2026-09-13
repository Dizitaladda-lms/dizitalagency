"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, ShieldCheck, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const brands = [
  { id: 1,  name: "Blumera",                     src: "/brands/1.png",  category: "E-Commerce & Retail", metrics: "3.2x ROAS Growth" },
  { id: 2,  name: "CUET-Adda",                   src: "/brands/2.png",  category: "EdTech & Learning", metrics: "150k+ Students Reached" },
  { id: 3,  name: "DesigningVidya",              src: "/brands/3.png",  category: "Creative Academy", metrics: "4.8/5 Brand Rating" },
  { id: 4,  name: "DigitalAdda",                 src: "/brands/4.png",  category: "Digital Growth", metrics: "500k+ Monthly Visits" },
  { id: 5,  name: "Digiwarms",                   src: "/brands/5.png",  category: "Tech & Solutions", metrics: "88% Lead Conversion" },
  { id: 6,  name: "DigitalAdda II",              src: "/brands/6.png",  category: "Agency Network", metrics: "Multi-Channel Scale" },
  { id: 7,  name: "Economics With Gulshan Sir",  src: "/brands/7.png",  category: "Education & Coaching", metrics: "10x Organic Reach" },
  { id: 8,  name: "FACT Education",              src: "/brands/8.png",  category: "Higher Education", metrics: "Top Institutional Reach" },
  { id: 9,  name: "Hacking Vidya",               src: "/brands/9.png",  category: "Cybersecurity & IT", metrics: "20k+ Community" },
  { id: 10, name: "IIDAD",                       src: "/brands/10.png", category: "Design Institute", metrics: "#1 Creative Enrolments" },
  { id: 11, name: "LawPrep",                     src: "/brands/11.png", category: "Legal Entrance Prep", metrics: "94% Admission Rank" },
  { id: 12, name: "Legal Adda",                  src: "/brands/12.png", category: "Legal Tech & Advisory", metrics: "2.4x Inbound Leads" },
  { id: 13, name: "NIDADS",                      src: "/brands/13.png", category: "Animation & Design", metrics: "Pan-India Expansion" },
  { id: 14, name: "NIFASE",                      src: "/brands/14.png", category: "Skill Training Academy", metrics: "Top Job Placement Rate" },
  { id: 15, name: "NIGAPE",                      src: "/brands/15.png", category: "Professional Studies", metrics: "Compounding ROI" },
  { id: 16, name: "NIHACS",                      src: "/brands/16.png", category: "Healthcare Academy", metrics: "High-Trust Campaigns" },
  { id: 17, name: "NIMLACC",                     src: "/brands/17.png", category: "Management Institute", metrics: "Executive Leadership" },
  { id: 18, name: "Shalini Vashisht",            src: "/brands/18.png", category: "Personal Brand & Coach", metrics: "6-Figure Authority" },
];

const rowOne = brands.slice(0, 9);
const rowTwo = brands.slice(9);

/* ── Individual Logo Card ── */
function LogoCard({ brand, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group relative flex-shrink-0 w-[150px] sm:w-[175px] md:w-[200px] h-[78px] sm:h-[88px] rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-center p-3 sm:p-4 select-none ${
        isSelected
          ? "bg-purple-600/20 border-2 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.35)] scale-105"
          : "bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 hover:border-purple-400/60 shadow-lg shadow-black/40 hover:scale-105"
      }`}
    >
      {/* Light radial backdrop pill so black/dark logo typography pops crisply */}
      <div className="absolute inset-2 bg-gradient-to-br from-white/10 to-white/5 rounded-xl pointer-events-none group-hover:from-white/15 group-hover:to-white/10 transition-colors" />

      <img
        src={brand.src}
        alt={brand.name}
        className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)] group-hover:brightness-110 group-hover:scale-105 transition-all duration-300"
        loading="lazy"
      />

      {/* Subtle brand name tooltip on hover */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#0d0022] text-[10px] font-semibold text-purple-200 px-2.5 py-1 rounded-md border border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30 shadow-lg">
        {brand.name}
      </div>
    </div>
  );
}

/* ── Continuous Marquee Ribbon ── */
function MarqueeRow({ items, reverse = false, duration = 30, selectedId, onSelect }) {
  // Triplicate so the continuous scroll animation is seamless without gaps
  const track = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden w-full relative py-2">
      {/* Edge gradient masks for smooth fade in & out */}
      <div
        className="absolute inset-y-0 left-0 w-16 sm:w-28 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to right, #08001a, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 sm:w-28 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to left, #08001a, transparent)" }}
      />

      <div
        className="flex gap-4 sm:gap-6 w-max items-center"
        style={{
          animation: `${reverse ? "da-marquee-reverse" : "da-marquee"} ${duration}s linear infinite`,
        }}
      >
        {track.map((brand, i) => (
          <LogoCard
            key={`${brand.id}-${i}`}
            brand={brand}
            isSelected={selectedId === brand.id}
            onClick={() => onSelect(brand.id - 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default function BrandShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-rotate the featured brand spotlight every 3.2 seconds
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % brands.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const activeBrand = brands[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % brands.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + brands.length) % brands.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-[#08001a]"
    >
      {/* CSS keyframes for seamless dual-direction marquee scrolling */}
      <style>{`
        @keyframes da-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes da-marquee-reverse {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .marquee-container:hover .flex {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[420px] h-[420px] bg-indigo-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-5 text-[11px] font-bold tracking-[0.25em] uppercase text-purple-300 border border-purple-500/40 px-5 py-2 rounded-full bg-purple-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Client Ecosystem & Partnerships</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-5 tracking-tight">
            Brands That<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300">
              Chose to Grow With Us
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            From high-growth education leaders and legal pioneers to modern enterprise brands — these are the industry frontrunners scaling with our performance engines.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-7">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
            <div className="w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_8px_#c084fc]" />
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </motion.div>

        {/* ── Featured Sequential Spotlight (Bari-Bari Animated Showcase) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="max-w-3xl mx-auto mb-14"
        >
          <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-white/[0.08] to-purple-950/20 border border-purple-500/30 backdrop-blur-xl shadow-2xl shadow-purple-950/40 overflow-hidden">
            
            {/* Top Bar with Status & Navigation */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-purple-200 tracking-wider uppercase">
                  Featured Client Spotlight ({currentIndex + 1}/{brands.length})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause rotation" : "Play rotation"}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-purple-300 hover:text-white border border-white/10 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={handlePrev}
                  aria-label="Previous client"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-purple-300 hover:text-white border border-white/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next client"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-purple-300 hover:text-white border border-white/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Brand Main Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrand.id}
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.96 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8"
              >
                {/* Logo Display Card with Bright Glass Backing for Crystal Clarity */}
                <div className="relative w-44 sm:w-52 h-24 sm:h-28 rounded-2xl bg-white/95 p-4 flex items-center justify-center shadow-xl shadow-purple-900/30 border border-white flex-shrink-0 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-transparent rounded-2xl pointer-events-none" />
                  <img
                    src={activeBrand.src}
                    alt={activeBrand.name}
                    className="w-full h-full object-contain filter contrast-105"
                  />
                </div>

                {/* Brand Details */}
                <div className="text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-400/30 text-purple-300 text-xs font-semibold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
                    <span>Verified Growth Partner</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight">
                    {activeBrand.name}
                  </h3>

                  <p className="text-sm text-gray-300 mb-3 font-medium">
                    Industry Sector: <span className="text-purple-300 font-semibold">{activeBrand.category}</span>
                  </p>

                  <div className="inline-block bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-purple-200">
                    Key Milestone: <span className="text-white font-bold">{activeBrand.metrics}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Smooth animated progress line */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  key={`prog-${currentIndex}-${isPlaying}`}
                  initial={{ width: "0%" }}
                  animate={isPlaying ? { width: "100%" } : { width: "100%" }}
                  transition={{ duration: isPlaying ? 3.2 : 0, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-400 rounded-full"
                />
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* ── Marquee Ribbons (Dual Opposing Infinite Scroll) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.7 }}
        className="marquee-container flex flex-col gap-4 sm:gap-6 mt-4"
      >
        {/* Row 1 — Left Scroll */}
        <MarqueeRow
          items={rowOne}
          reverse={false}
          duration={32}
          selectedId={activeBrand.id}
          onSelect={(idx) => setCurrentIndex(idx)}
        />

        {/* Row 2 — Right Scroll (Opposite direction for dynamic visual appeal) */}
        <MarqueeRow
          items={rowTwo}
          reverse={true}
          duration={28}
          selectedId={activeBrand.id}
          onSelect={(idx) => setCurrentIndex(idx + 9)}
        />
      </motion.div>

      {/* ── Footer Trust Statement ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6, duration: 0.55 }}
        className="mt-12 sm:mt-14 text-center px-4"
      >
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-purple-300/80">
          200+ Brands Scaled &nbsp;&bull;&nbsp; 8+ Years of Impact &nbsp;&bull;&nbsp; 95% Partner Retention
        </p>
      </motion.div>
    </section>
  );
}