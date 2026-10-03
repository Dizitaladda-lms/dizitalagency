"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TEAM_PHOTOS = [
  {
    src: "/group.jpeg",
    title: "Strategic Leadership",
    subtitle: "Founders & Lead Strategists driving performance-first digital scale",
    tag: "DELHI HQ STUDIO"
  },
  {
    src: "/dapic/IMG_4066.jpeg",
    title: "Collaborative Design Lab",
    subtitle: "Obsessive visual craft, brand design & high-converting ad concepts",
    tag: "CRAFT & CONCEPT"
  },
  {
    src: "/dapic/group4.jpeg",
    title: "Growth & Media Engines",
    subtitle: "Data-led media buying, funnel optimization & scaling operations",
    tag: "PERFORMANCE HUB"
  },
  {
    src: "/dapic/1.webp",
    title: "In-House Content Studio",
    subtitle: "Creative shoots, video production & rapid creative iterations",
    tag: "PRODUCTION FLOOR"
  },
  {
    src: "/dapic/IMG_4071.jpeg",
    title: "Operations & Client Success",
    subtitle: "Seamless execution, transparent growth metrics & dedicated support",
    tag: "CLIENT ECOSYSTEM"
  },
  {
    src: "/dapic/group3.webp",
    title: "Global Agency Culture",
    subtitle: "Curiosity, team offsites & performance engines built to last",
    tag: "OUR CULTURE"
  }
];

export default function Homesection2() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!manualOverride) {
      const step = Math.min(
        Math.floor(latest * TEAM_PHOTOS.length),
        TEAM_PHOTOS.length - 1
      );
      setActiveStep(step);
    }
  });

  // Preload images for instant lag-free card transitions
  useEffect(() => {
    TEAM_PHOTOS.forEach((photo) => {
      const img = new Image();
      img.src = photo.src;
    });
  }, []);

  const nextCard = () => {
    setManualOverride(true);
    setActiveStep((prev) => (prev + 1) % TEAM_PHOTOS.length);
    setTimeout(() => setManualOverride(false), 2500);
  };

  const prevCard = () => {
    setManualOverride(true);
    setActiveStep((prev) => (prev - 1 + TEAM_PHOTOS.length) % TEAM_PHOTOS.length);
    setTimeout(() => setManualOverride(false), 2500);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[320vh] sm:h-[380vh] bg-[#070716] text-white"
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden bg-[#070716]">
        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-10 w-[450px] h-[450px] bg-indigo-900/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* ── LEFT SIDE: PHOTO STACK SHOWCASE ── */}
            <div className="lg:col-span-7 order-2 lg:order-1 relative flex flex-col items-center justify-center">
              
              {/* Card deck wrapper */}
              <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/11]">
                
                {/* Visual back cards stack (multi-photo stacked effect) */}
                <div className="absolute inset-0 translate-x-5 translate-y-6 rotate-[6deg] rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-sm pointer-events-none shadow-2xl transition-all duration-500" />
                <div className="absolute inset-0 -translate-x-4 translate-y-3 rotate-[-4deg] rounded-2xl bg-indigo-950/40 border border-indigo-500/20 backdrop-blur-sm pointer-events-none shadow-xl transition-all duration-500" />
                <div className="absolute inset-0 translate-x-2 -translate-y-2 rotate-[2deg] rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-sm pointer-events-none shadow-lg transition-all duration-500" />

                {/* Main Active Card Display */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-purple-500/30 bg-[#0c0824] shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, y: -15 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative w-full h-full group"
                    >
                      <img
                        src={TEAM_PHOTOS[activeStep].src}
                        alt={TEAM_PHOTOS[activeStep].title}
                        loading="eager"
                        decoding="sync"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                      {/* Card Top Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase px-3 py-1 bg-black/60 border border-purple-500/40 text-purple-300 backdrop-blur-md rounded">
                          {TEAM_PHOTOS[activeStep].tag}
                        </span>
                      </div>

                      {/* Card Bottom Details */}
                      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex justify-between items-end">
                        <div>
                          <div className="text-[11px] font-mono tracking-widest text-purple-400 uppercase mb-1">
                            Photo {String(activeStep + 1).padStart(2, "0")} / {String(TEAM_PHOTOS.length).padStart(2, "0")}
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                            {TEAM_PHOTOS[activeStep].title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-sm leading-snug">
                            {TEAM_PHOTOS[activeStep].subtitle}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Controls & Deck Indicators */}
              <div className="flex items-center justify-between w-full max-w-lg mt-6 px-1">
                {/* Dot Indicators */}
                <div className="flex items-center gap-2">
                  {TEAM_PHOTOS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setManualOverride(true);
                        setActiveStep(idx);
                        setTimeout(() => setManualOverride(false), 2500);
                      }}
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        idx === activeStep
                          ? "w-8 bg-purple-500"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to photo ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevCard}
                    className="p-2 border border-white/10 hover:border-purple-500/50 bg-white/5 hover:bg-purple-500/10 text-white rounded-lg transition-colors"
                    aria-label="Previous Photo"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextCard}
                    className="p-2 border border-white/10 hover:border-purple-500/50 bg-white/5 hover:bg-purple-500/10 text-white rounded-lg transition-colors"
                    aria-label="Next Photo"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>

            {/* ── RIGHT SIDE: TEXT CONTENT & CULTURE HIGHLIGHTS ── */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
              
              <div className="space-y-6">
                
                {/* Category Tag */}
                <div>
                  <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-purple-400 border border-purple-500/40 px-4 py-1.5 bg-purple-500/10 rounded">
                    Our People
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
                  Our Space, Our Team,
                  <br />
                  <span className="text-purple-300">Our Culture</span>
                </h2>

                {/* Subtitle / Paragraph */}
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  Behind every campaign is a team that genuinely cares — driven by curiosity, fuelled by craft, and committed to results that last.
                </p>

                {/* Culture Feature Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 border border-white/10 bg-white/[0.03] rounded-lg">
                    <div className="text-xs font-mono text-purple-400 font-bold mb-0.5">01</div>
                    <div className="text-sm font-semibold text-white">100% In-House Executions</div>
                    <div className="text-xs text-gray-400 mt-1">Zero outsourcing. Complete operational control.</div>
                  </div>

                  <div className="p-3.5 border border-white/10 bg-white/[0.03] rounded-lg">
                    <div className="text-xs font-mono text-purple-400 font-bold mb-0.5">02</div>
                    <div className="text-sm font-semibold text-white">Craft & Performance</div>
                    <div className="text-xs text-gray-400 mt-1">Where creative storytelling meets scaling ROI.</div>
                  </div>

                  <div className="p-3.5 border border-white/10 bg-white/[0.03] rounded-lg">
                    <div className="text-xs font-mono text-purple-400 font-bold mb-0.5">03</div>
                    <div className="text-sm font-semibold text-white">Zero Hierarchy</div>
                    <div className="text-xs text-gray-400 mt-1">Direct access to lead strategists & builders.</div>
                  </div>

                  <div className="p-3.5 border border-white/10 bg-white/[0.03] rounded-lg">
                    <div className="text-xs font-mono text-purple-400 font-bold mb-0.5">04</div>
                    <div className="text-sm font-semibold text-white">Delhi HQ & Global Reach</div>
                    <div className="text-xs text-gray-400 mt-1">Building scaling engines across borders.</div>
                  </div>
                </div>

                {/* Scroll Indicator */}
                <div className="pt-2 flex items-center gap-3 text-xs text-purple-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                  <span>Scroll down to navigate team photos</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
