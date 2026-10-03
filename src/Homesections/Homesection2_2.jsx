"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
    category: "Tech & IT",
    tag: "IT & Digital Solutions",
    stat: "3.5x Client ROI",
  },
  {
    id: 4,
    name: "DigitalAdda Agency",
    src: "/brands/4.png",
    category: "Tech & IT",
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
    category: "Tech & IT",
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
    category: "Tech & IT",
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
    category: "Tech & IT",
    tag: "Gen AI & Prompting",
    stat: "Next-Gen AI Skills",
  },
  {
    id: 15,
    name: "NIHACS",
    src: "/brands/15.png",
    category: "Tech & IT",
    tag: "Cyber Security & Defense",
    stat: "Elite Security Track",
  },
  {
    id: 16,
    name: "NIMLACC",
    src: "/brands/16.png",
    category: "Tech & IT",
    tag: "Machine Learning & Cloud",
    stat: "Advanced Tech Programs",
  },
  {
    id: 17,
    name: "Blumera",
    src: "/brands/17.png",
    category: "Fashion & Clothes",
    tag: "Luxury Apparel & Aesthetics",
    stat: "3.2x Revenue Scale",
  },
  {
    id: 18,
    name: "Shalini Vasisht",
    src: "/brands/18.png",
    category: "Fashion & Clothes",
    tag: "Celebrity Fashion & Styling",
    stat: "High-Authority Personal Brand",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Sectors" },
  { id: "Fashion & Clothes", label: "Fashion & Clothes" },
  { id: "EdTech & Education", label: "EdTech & Education" },
  { id: "Tech & IT", label: "Tech & IT" },
  { id: "Finance & Legal", label: "Finance & Legal" },
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
      className="relative py-14 sm:py-20 overflow-hidden bg-[#070716] text-white border-t border-purple-900/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT SIDE — Title, Description & Text-Based Category Filters
          ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Top Text Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-widest mb-4"
            >
              CLIENT PARTNERSHIPS
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
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
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl"
            >
              Filter by industry to explore our verified brand track record — from high-growth fashion & apparel labels to leading EdTech academies, legal advisory, and AI platforms.
            </motion.p>

            {/* Category Filter Buttons — Icon-Free Pure Typography */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
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
                        ? "bg-purple-600 text-white shadow-md border border-purple-400/50 scale-105"
                        : "bg-slate-900/90 text-slate-300 hover:bg-purple-900/40 hover:text-white border border-purple-500/20"
                    }`}
                  >
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

            {/* Navigation Controls — Clean Text Arrows */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-purple-500/30"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1 rounded-lg bg-purple-950 text-purple-200 text-xs font-bold border border-purple-500/30 transition-colors"
                >
                  {isPlaying ? "Pause Auto Play" : "Play Auto Play"}
                </button>
                <span className="text-xs font-medium text-slate-400 pl-1">
                  {currentIndex + 1} / {filteredBrands.length}
                </span>
              </div>

              <div className="flex items-center gap-2 border-l border-purple-900/50 pl-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white text-xs font-bold border border-white/10 transition-colors"
                >
                  Next →
                </button>
              </div>
            </motion.div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT SIDE — Icon-Free Clean 3D Single Surface Brand Card
          ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex items-center justify-center min-h-[360px] sm:min-h-[400px] relative">
            
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/3.2] flex items-center justify-center">
              
              {/* Back Card 2 */}
              {thirdBrand && (
                <div className="absolute inset-0 rounded-3xl bg-white/70 border border-purple-300/40 shadow-md transform translate-y-5 scale-[0.88] z-0 opacity-50 pointer-events-none transition-all duration-500" />
              )}

              {/* Back Card 1 */}
              {nextBrand && (
                <div className="absolute inset-0 rounded-3xl bg-white/90 border border-purple-300/60 shadow-lg transform translate-y-2.5 scale-[0.94] z-10 opacity-80 pointer-events-none transition-all duration-500" />
              )}

              {/* Front Active Card — Clean Pure White Surface */}
              <AnimatePresence mode="popLayout">
                {activeBrand && (
                  <motion.div
                    key={`${selectedCategory}-${activeBrand.id}`}
                    initial={{ opacity: 0, x: -100, scale: 0.9, rotate: -6 }}
                    animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, x: 260, scale: 0.85, rotate: 12 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 rounded-3xl bg-white text-slate-900 p-6 sm:p-7 shadow-2xl shadow-purple-950/60 flex flex-col justify-between z-20 overflow-hidden border border-purple-200/80 group"
                  >
                    {/* Top Row — Clean Category Text Badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-purple-700 bg-purple-100 px-3 py-1 rounded-lg border border-purple-300/60">
                        {activeBrand.category}
                      </span>

                      <span className="text-[11px] font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        {activeBrand.tag}
                      </span>
                    </div>

                    {/* Logo Image — Directly on Crisp White Card */}
                    <div className="my-3 w-full h-32 sm:h-36 flex items-center justify-center p-2 overflow-hidden">
                      <img
                        src={activeBrand.src}
                        alt={activeBrand.name}
                        className="w-full h-full object-contain filter contrast-105 transform scale-140 group-hover:scale-155 transition-transform duration-300"
                      />
                    </div>

                    {/* Bottom Row — Brand Name & Growth Performance */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-tight">
                          {activeBrand.name}
                        </h3>
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                          Verified Growth Partner
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Impact</span>
                        <span className="text-xs font-extrabold text-purple-900 bg-purple-100 px-2.5 py-1 rounded-lg border border-purple-300/50 block mt-0.5">
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


