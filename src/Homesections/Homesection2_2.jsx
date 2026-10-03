"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Pause, Play, Tag, Layers, CheckCircle2 } from "lucide-react";

const BRANDS_DATA = [
  {
    id: 1,
    name: "CUET-Adda",
    src: "/brands/1.png",
    category: "EdTech & Education",
    tag: "University Entrance",
    stat: "150k+ Students Trained",
  },
  {
    id: 2,
    name: "DesigningVidya",
    src: "/brands/2.png",
    category: "EdTech & Education",
    tag: "Design Academy",
    stat: "4.9/5 Student Rating",
  },
  {
    id: 3,
    name: "Digiwarms",
    src: "/brands/3.png",
    category: "Tech, AI & IT",
    tag: "IT & Digital Solutions",
    stat: "3.5x Client ROI",
  },
  {
    id: 4,
    name: "DigitalAdda Agency",
    src: "/brands/4.png",
    category: "Tech, AI & IT",
    tag: "Performance Marketing",
    stat: "500k+ Monthly Visits",
  },
  {
    id: 5,
    name: "DizitalAdda Institute",
    src: "/brands/5.png",
    category: "EdTech & Education",
    tag: "Digital Marketing Prep",
    stat: "10k+ Alumni Network",
  },
  {
    id: 6,
    name: "Economics With Gulshan Sir",
    src: "/brands/6.png",
    category: "EdTech & Education",
    tag: "Commerce & Economics",
    stat: "10x Organic Reach",
  },
  {
    id: 7,
    name: "FACT Education",
    src: "/brands/7.png",
    category: "EdTech & Education",
    tag: "Professional Studies",
    stat: "15+ Years Track Record",
  },
  {
    id: 8,
    name: "Hacking Vidya",
    src: "/brands/8.png",
    category: "Tech, AI & IT",
    tag: "Cybersecurity Training",
    stat: "25k+ Security Aspirants",
  },
  {
    id: 9,
    name: "IIDAD",
    src: "/brands/9.png",
    category: "EdTech & Education",
    tag: "Design & Tech Institute",
    stat: "Top Placement Rate",
  },
  {
    id: 10,
    name: "LawPrep Coaching",
    src: "/brands/10.png",
    category: "EdTech & Education",
    tag: "CLAT & Law Entrance",
    stat: "Top National Ranks",
  },
  {
    id: 11,
    name: "Legal Adda",
    src: "/brands/11.png",
    category: "Finance & Legal",
    tag: "Legal Tech Advisory",
    stat: "100% Compliance Success",
  },
  {
    id: 12,
    name: "NIDADS",
    src: "/brands/12.png",
    category: "Tech, AI & IT",
    tag: "Data Science & Analytics",
    stat: "Industry Certified",
  },
  {
    id: 13,
    name: "NIFASE",
    src: "/brands/13.png",
    category: "Finance & Legal",
    tag: "Stock Market Academy",
    stat: "High Accuracy Training",
  },
  {
    id: 14,
    name: "NIGAPE",
    src: "/brands/14.png",
    category: "Tech, AI & IT",
    tag: "Gen AI & Prompting",
    stat: "Next-Gen AI Skills",
  },
  {
    id: 15,
    name: "NIHACS",
    src: "/brands/15.png",
    category: "Tech, AI & IT",
    tag: "Cyber Security & Defense",
    stat: "Elite Security Track",
  },
  {
    id: 16,
    name: "NIMLACC",
    src: "/brands/16.png",
    category: "Tech, AI & IT",
    tag: "Machine Learning & Cloud",
    stat: "Advanced Tech Programs",
  },
  {
    id: 17,
    name: "Blumera",
    src: "/brands/17.png",
    category: "Clothes & Fashion",
    tag: "Luxury Apparel & Aesthetics",
    stat: "3.2x Revenue Scale",
  },
  {
    id: 18,
    name: "Shalini Vasisht",
    src: "/brands/18.png",
    category: "Clothes & Fashion",
    tag: "Celebrity Fashion & Styling",
    stat: "High-Authority Personal Brand",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Sectors", icon: "✦" },
  { id: "Clothes & Fashion", label: "Clothes & Fashion", icon: "👗" },
  { id: "EdTech & Education", label: "EdTech & Education", icon: "🎓" },
  { id: "Tech, AI & IT", label: "Tech, AI & IT", icon: "💻" },
  { id: "Finance & Legal", label: "Finance & Legal", icon: "⚖️" },
];

export default function BrandShowcase() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filter brands based on selected category
  const filteredBrands =
    selectedCategory === "all"
      ? BRANDS_DATA
      : BRANDS_DATA.filter((b) => b.category === selectedCategory);

  // Reset index when category changes
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentIndex(0);
    setIsPlaying(true);
  };

  // Continuous auto-rotate stack
  useEffect(() => {
    if (!isPlaying || filteredBrands.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredBrands.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying, filteredBrands]);

  const handleNext = () => {
    if (filteredBrands.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredBrands.length);
  };

  const handlePrev = () => {
    if (filteredBrands.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredBrands.length) % filteredBrands.length);
  };

  const activeBrand = filteredBrands[currentIndex] || filteredBrands[0];
  const nextBrand = filteredBrands[(currentIndex + 1) % filteredBrands.length] || activeBrand;
  const thirdBrand = filteredBrands[(currentIndex + 2) % filteredBrands.length] || activeBrand;

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 overflow-hidden bg-[#070716] text-white border-t border-purple-900/30"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[-10%] w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-[-10%] w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT SIDE — Title, Description & Category Filter Buttons
          ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Industry Filtered Portfolio</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4"
            >
              Brands That{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                Chose to Grow With Us
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl"
            >
              Filter by industry to explore our verified brand record — from high-growth fashion & clothes labels to leading EdTech academies, legal advisory, and AI platforms.
            </motion.p>

            {/* Category Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2.5 mb-8 w-full"
            >
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count =
                  cat.id === "all"
                    ? BRANDS_DATA.length
                    : BRANDS_DATA.filter((b) => b.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/50 border border-purple-400/50 scale-105"
                        : "bg-slate-900/80 text-slate-300 hover:bg-purple-900/40 hover:text-white border border-purple-500/20"
                    }`}
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-purple-950/60 text-purple-300 border border-purple-500/30"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Rotation & Navigation Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 bg-slate-900/80 p-2.5 rounded-2xl border border-purple-500/30 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/30 transition-colors"
                  aria-label={isPlaying ? "Pause Rotation" : "Play Rotation"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-purple-300" /> : <Play className="w-4 h-4 text-purple-300 fill-purple-300" />}
                </button>
                <span className="text-xs font-semibold text-slate-300 pr-2">
                  Showing {currentIndex + 1} of {filteredBrands.length}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/10 transition-colors"
                  aria-label="Previous Brand"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white border border-white/10 transition-colors"
                  aria-label="Next Brand"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT SIDE — Continuous Animated 3D Card Stack (One After Another)
          ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex items-center justify-center min-h-[380px] sm:min-h-[420px] relative">
            
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/3] flex items-center justify-center">
              
              {/* Back Card 2 (Bottom layer) */}
              {thirdBrand && (
                <div className="absolute inset-0 rounded-3xl bg-slate-900/60 border border-purple-900/30 shadow-lg transform translate-y-6 scale-[0.88] z-0 opacity-40 pointer-events-none transition-all duration-500" />
              )}

              {/* Back Card 1 (Middle layer) */}
              {nextBrand && (
                <div className="absolute inset-0 rounded-3xl bg-slate-900/90 border border-purple-500/20 shadow-xl transform translate-y-3 scale-[0.94] z-10 opacity-70 pointer-events-none transition-all duration-500" />
              )}

              {/* Front Active Card — Animated Fly-away & Replacement */}
              <AnimatePresence mode="popLayout">
                {activeBrand && (
                  <motion.div
                    key={`${selectedCategory}-${activeBrand.id}`}
                    initial={{ opacity: 0, x: -100, scale: 0.9, rotate: -6 }}
                    animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, x: 260, scale: 0.85, rotate: 12 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-950/95 to-[#0b0520] border border-purple-500/40 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-purple-950/80 flex flex-col justify-between z-20 group"
                  >
                    {/* Card Top Pill Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-purple-900/40">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/15 px-3 py-1 rounded-lg border border-purple-400/30">
                        <Tag className="w-3.5 h-3.5 text-purple-300" />
                        {activeBrand.category}
                      </span>

                      <span className="text-[11px] font-extrabold text-cyan-300 bg-cyan-500/15 px-2.5 py-1 rounded-lg border border-cyan-400/30">
                        {activeBrand.tag}
                      </span>
                    </div>

                    {/* Logo Box Center Display */}
                    <div className="my-5 w-full h-32 sm:h-36 bg-white rounded-2xl p-4 flex items-center justify-center shadow-xl border-2 border-purple-300/40 overflow-hidden relative group/img">
                      <img
                        src={activeBrand.src}
                        alt={activeBrand.name}
                        className="w-full h-full object-contain filter contrast-105 transform scale-140 group-hover/img:scale-155 transition-transform duration-300"
                      />
                    </div>

                    {/* Card Footer Info */}
                    <div className="pt-3 border-t border-purple-900/40 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {activeBrand.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Growth Partner
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Impact</span>
                        <span className="text-xs font-extrabold text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-500/30 block mt-0.5">
                          {activeBrand.stat}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

