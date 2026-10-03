"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Realistic Continent Polygon Data (lat, lng arrays) for authentic 3D world landmasses
const CONTINENT_POLYGONS = [
  // North America
  [
    [70, -165], [72, -130], [70, -80], [60, -64], [47, -53], [44, -64], 
    [32, -80], [25, -80], [18, -95], [15, -92], [8, -78], [15, -104], 
    [30, -115], [48, -125], [60, -140], [65, -168], [70, -165]
  ],
  // Greenland
  [
    [78, -70], [82, -30], [70, -20], [60, -43], [65, -52], [78, -70]
  ],
  // South America
  [
    [12, -73], [10, -62], [5, -50], [-5, -35], [-18, -38], [-23, -42], 
    [-35, -55], [-54, -68], [-52, -75], [-45, -74], [-18, -71], [0, -80], [12, -73]
  ],
  // Europe
  [
    [71, 28], [68, 45], [60, 30], [55, 38], [45, 36], [40, 26], [37, 22],
    [36, -5], [43, -9], [48, -4], [52, 2], [58, 6], [62, 5], [65, 14], [70, 20], [71, 28]
  ],
  // United Kingdom & Ireland
  [
    [58, -6], [58, 2], [50, 1], [50, -5], [58, -6]
  ],
  // Africa
  [
    [37, 10], [32, 32], [28, 34], [12, 43], [11, 51], [4, 42], [-11, 40], 
    [-26, 33], [-34, 20], [-34, 18], [-18, 12], [5, 9], [10, -14], [15, -17], [35, -6], [37, 10]
  ],
  // Madagascar
  [
    [-12, 49], [-15, 50], [-25, 47], [-25, 44], [-12, 49]
  ],
  // Asia - Main Landmass
  [
    [75, 75], [76, 110], [72, 130], [66, 170], [60, 162], [55, 135], [43, 131], 
    [38, 118], [22, 114], [15, 108], [10, 99], [22, 91], [8, 77], [22, 69], 
    [12, 44], [15, 53], [25, 57], [30, 48], [30, 35], [40, 35], [45, 50], [55, 60], [75, 75]
  ],
  // India Peninsula
  [
    [32, 75], [24, 69], [15, 73], [8, 77], [13, 80], [20, 85], [27, 88], [30, 78], [32, 75]
  ],
  // Arabia Peninsula
  [
    [30, 35], [30, 48], [25, 57], [15, 53], [12, 44], [20, 38], [30, 35]
  ],
  // Japan
  [
    [45, 142], [41, 140], [35, 136], [31, 130], [35, 133], [40, 138], [45, 142]
  ],
  // Southeast Asia Islands (Indonesia & Philippines)
  [
    [18, 121], [10, 126], [5, 115], [-5, 105], [-8, 115], [-8, 127], [2, 128], [18, 121]
  ],
  // Australia
  [
    [-12, 130], [-12, 142], [-25, 153], [-38, 148], [-35, 135], [-33, 115], 
    [-22, 114], [-15, 124], [-12, 130]
  ],
  // New Zealand
  [
    [-34, 172], [-46, 166], [-46, 174], [-38, 178], [-34, 172]
  ]
];

// Key Target Business Hub Countries
const COUNTRY_MARKERS = [
  { name: "United States", flag: "🇺🇸", code: "US", lat: 37.0902, lng: -95.7129, stat: "340% ROAS Growth" },
  { name: "United Kingdom", flag: "🇬🇧", code: "UK", lat: 55.3781, lng: -3.436, stat: "2.8x Lead Velocity" },
  { name: "United Arab Emirates", flag: "🇦🇪", code: "UAE", lat: 24.2, lng: 54.3, stat: "15k+ Qualified Leads" },
  { name: "India", flag: "🇮🇳", code: "IN", lat: 21.0, lng: 78.0, stat: "10M+ Organic Impressions" },
  { name: "Australia", flag: "🇦🇺", code: "AU", lat: -25.2, lng: 133.7, stat: "420% Sales Conversion" },
  { name: "Canada", flag: "🇨🇦", code: "CA", lat: 56.1, lng: -106.3, stat: "High-Authority Branding" },
  { name: "Germany", flag: "🇩🇪", code: "DE", lat: 51.1, lng: 10.4, stat: "Multi-Language SEO Scale" },
  { name: "Singapore", flag: "🇸🇬", code: "SG", lat: 1.35, lng: 103.8, stat: "FinTech Campaign Success" },
  { name: "Japan", flag: "🇯🇵", code: "JP", lat: 36.2, lng: 138.2, stat: "APAC Market Expansion" },
];

export default function HomesectionGlobalHero() {
  const canvasRef = useRef(null);
  const [activeCountry, setActiveCountry] = useState(0);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.25, y: 0.6 });
  // Slow ambient rotation speed
  const velocityRef = useRef({ x: 0, y: 0.0012 });

  // Rotate spotlight country marker
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCountry((prev) => (prev + 1) % COUNTRY_MARKERS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  // 3D Engine for Vector Continent Globe Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const updateCanvasSize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Controlled medium radius for professional proportions
    const getRadius = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      return Math.min(rect.width, rect.height) * 0.40;
    };

    // Helper: Convert lat/long to 3D point on sphere radius R
    const latLngTo3D = (lat, lng, r) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return {
        x: -(r * Math.sin(phi) * Math.cos(theta)),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
      };
    };

    // Render loop
    const render = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = getRadius();

      ctx.clearRect(0, 0, width, height);

      // Auto rotation physics (slow & smooth)
      if (!isDraggingRef.current) {
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += (0.25 - rotationRef.current.x) * 0.01;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // 3D Point Projection Helper
      const project = (pt) => {
        const x1 = pt.x * cosY + pt.z * sinY;
        const z1 = -pt.x * sinY + pt.z * cosY;
        const y1 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        const perspective = 700 / (700 + z2);
        return {
          screenX: centerX + x1 * perspective,
          screenY: centerY + y1 * perspective,
          z2,
          perspective,
          isFront: z2 > -10,
        };
      };

      // 1. Atmosphere Radial Glow Behind Globe
      const glowGrad = ctx.createRadialGradient(
        centerX, centerY, radius * 0.5,
        centerX, centerY, radius * 1.35
      );
      glowGrad.addColorStop(0, "rgba(168, 85, 247, 0.2)");
      glowGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.1)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Ocean Sphere (Deep Dark Blue Fill)
      const oceanGrad = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.2,
        centerX, centerY, radius
      );
      oceanGrad.addColorStop(0, "#1a0f3d");
      oceanGrad.addColorStop(0.7, "#0b0524");
      oceanGrad.addColorStop(1, "#070316");

      ctx.fillStyle = oceanGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // Graticule Lines
      const graticuleLines = [];
      for (let lat = -60; lat <= 60; lat += 30) {
        const ring = [];
        for (let lng = -180; lng <= 180; lng += 10) {
          ring.push(latLngTo3D(lat, lng, radius));
        }
        graticuleLines.push(ring);
      }
      for (let lng = -180; lng < 180; lng += 45) {
        const line = [];
        for (let lat = -80; lat <= 80; lat += 10) {
          line.push(latLngTo3D(lat, lng, radius));
        }
        graticuleLines.push(line);
      }

      // 3. Render Graticule Lines
      ctx.strokeStyle = "rgba(168, 85, 247, 0.12)";
      ctx.lineWidth = 1;
      graticuleLines.forEach((ring) => {
        ctx.beginPath();
        let started = false;
        ring.forEach((pt) => {
          const proj = project(pt);
          if (proj.isFront) {
            if (!started) {
              ctx.moveTo(proj.screenX, proj.screenY);
              started = true;
            } else {
              ctx.lineTo(proj.screenX, proj.screenY);
            }
          } else {
            started = false;
          }
        });
        ctx.stroke();
      });

      // 4. Render Vector Continent Polygons
      CONTINENT_POLYGONS.forEach((poly) => {
        const poly3D = poly.map(([lat, lng]) => latLngTo3D(lat, lng, radius));
        const projectedPoly = poly3D.map(project);
        const avgZ = projectedPoly.reduce((sum, p) => sum + p.z2, 0) / projectedPoly.length;

        if (avgZ > -20) {
          ctx.beginPath();
          projectedPoly.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.screenX, p.screenY);
            else ctx.lineTo(p.screenX, p.screenY);
          });
          ctx.closePath();

          const landAlpha = Math.min(0.45, Math.max(0.1, (avgZ + radius) / (2 * radius)));
          ctx.fillStyle = `rgba(147, 51, 234, ${landAlpha})`;
          ctx.fill();

          ctx.strokeStyle = `rgba(192, 132, 252, ${landAlpha * 1.6})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      });

      // 5. Country Markers & Arcs
      const projectedCountries = COUNTRY_MARKERS.map((c, idx) => {
        const pos3D = latLngTo3D(c.lat, c.lng, radius);
        const proj = project(pos3D);
        return {
          ...c,
          screenX: proj.screenX,
          screenY: proj.screenY,
          z2: proj.z2,
          isFront: proj.z2 > 0,
          idx,
        };
      });

      // Draw Arcs
      const curActive = projectedCountries[activeCountry];
      if (curActive && curActive.isFront) {
        projectedCountries.forEach((target, i) => {
          if (i === activeCountry || !target.isFront) return;

          const midX = (curActive.screenX + target.screenX) / 2;
          const midY = (curActive.screenY + target.screenY) / 2 - 30;

          const arcGradient = ctx.createLinearGradient(
            curActive.screenX, curActive.screenY,
            target.screenX, target.screenY
          );
          arcGradient.addColorStop(0, "rgba(236, 72, 153, 0.85)");
          arcGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.75)");
          arcGradient.addColorStop(1, "rgba(168, 85, 247, 0.25)");

          ctx.beginPath();
          ctx.moveTo(curActive.screenX, curActive.screenY);
          ctx.quadraticCurveTo(midX, midY, target.screenX, target.screenY);
          ctx.strokeStyle = arcGradient;
          ctx.lineWidth = 1.3;
          ctx.setLineDash([4, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // Draw Pins
      projectedCountries.forEach((c) => {
        if (!c.isFront) return;

        const isCurrentActive = c.idx === activeCountry;
        const size = isCurrentActive ? 6 : 3.5;

        ctx.fillStyle = isCurrentActive
          ? "rgba(244, 63, 94, 0.4)"
          : "rgba(56, 189, 248, 0.3)";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size * 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isCurrentActive ? "#f43f5e" : "#38bdf8";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "bold 9px Inter, sans-serif";
        ctx.fillStyle = isCurrentActive ? "#f43f5e" : "rgba(255, 255, 255, 0.8)";
        ctx.fillText(c.code, c.screenX + 7, c.screenY + 3);
      });

      // 6. Outer Atmosphere Rim
      const rimGrad = ctx.createRadialGradient(
        centerX, centerY, radius * 0.96,
        centerX, centerY, radius * 1.04
      );
      rimGrad.addColorStop(0, "rgba(168, 85, 247, 0)");
      rimGrad.addColorStop(0.5, "rgba(192, 132, 252, 0.5)");
      rimGrad.addColorStop(1, "rgba(56, 189, 248, 0.7)");

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCountry]);

  // Drag handlers
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    rotationRef.current.y += deltaX * 0.003;
    rotationRef.current.x += deltaY * 0.003;

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const word1 = "DigitalAdda";
  const word2 = "Agency";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.35,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const activeCountryData = COUNTRY_MARKERS[activeCountry];

  return (
    <section className="relative w-full min-h-[75vh] lg:min-h-[82vh] bg-[#070714] text-white overflow-hidden flex items-center justify-center pt-14 pb-10 sm:pt-16 sm:pb-12 border-b border-purple-900/30">
      
      {/* ── BACKGROUND 1: Ambient Lighting Glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-b from-purple-600/18 via-indigo-600/12 to-cyan-500/8 rounded-full blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(168, 85, 247, 0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(168, 85, 247, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* ── BACKGROUND 2: Medium Professional 3D Vector Globe Canvas ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] lg:w-[720px] lg:h-[720px] pointer-events-auto z-0 opacity-40 sm:opacity-50 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Decorative Orbit Rings */}
          <div className="absolute inset-3 border border-purple-500/15 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
          <div className="absolute inset-12 border border-cyan-500/10 rounded-full animate-[spin_45s_linear_infinite_reverse] pointer-events-none" />

          {/* 3D Canvas element */}
          <div
            className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>
        </div>
      </div>

      {/* ── FOREGROUND CONTENT: Clean, Medium Proportional Typography & Elements ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center max-w-4xl">
        
        {/* Top Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 backdrop-blur-md mb-4 shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-purple-200">
            Global Performance Marketing Agency
          </span>
        </motion.div>

        {/* ── Agency Title: Medium Sleek Proportional Size ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-3 flex flex-wrap justify-center items-center gap-x-2.5 sm:gap-x-3.5 text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight leading-none drop-shadow-xl"
        >
          {/* Word 1: DigitalAdda */}
          <span className="inline-block whitespace-nowrap text-white">
            {word1.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>

          {/* Word 2: Agency */}
          <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
            {word2.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        </motion.div>

        {/* Sub-Title */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base sm:text-xl lg:text-2xl font-bold text-slate-100 mb-3 leading-snug max-w-2xl drop-shadow"
        >
          Scaling Brands Across <span className="text-cyan-400 font-extrabold">25+ Countries</span> Worldwide
        </motion.h2>

        {/* Description Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl leading-relaxed mb-6 font-medium"
        >
          Whether expanding internationally or dominating regional markets — we craft data-driven PPC campaigns, high-converting global SEO, and performance marketing built for compounding scale.
        </motion.p>

        {/* CTAs Row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap justify-center items-center gap-3.5 mb-6 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/40 hover:scale-[1.02] transition-all duration-200 w-full sm:w-auto text-center"
          >
            Get Free Global Audit
          </Link>

          <a
            href="#strategy-videos"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-slate-100 border border-purple-500/40 hover:border-purple-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 w-full sm:w-auto text-center backdrop-blur-xl"
          >
            Watch Strategy Videos
          </a>
        </motion.div>

        {/* Performance Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border border-purple-500/30 w-full max-w-2xl bg-slate-950/50 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg"
        >
          {[
            { label: "Global Clients", value: "200+" },
            { label: "Countries Targeted", value: "25+" },
            { label: "Campaign ROI", value: "3.8x" },
            { label: "Satisfaction", value: "98.5%" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-extrabold text-white">
                {item.value}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-purple-300 mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Active Country Spotlight Floating Pill */}
        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCountryData.name}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="notranslate inline-flex items-center gap-2.5 bg-slate-950/90 backdrop-blur-xl border border-purple-500/40 px-4 py-1.5 rounded-full shadow-xl pointer-events-none whitespace-nowrap"
            >
              <span className="text-[10px] font-black text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                {activeCountryData.code}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{activeCountryData.flag}</span>
                <span className="text-xs font-bold text-white">
                  {activeCountryData.name}
                </span>
                <span className="text-gray-500">&middot;</span>
                <span className="text-[10px] font-semibold text-cyan-300">
                  {activeCountryData.stat}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
