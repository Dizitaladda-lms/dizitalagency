"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowRight, Sparkles, ShieldCheck, Zap, Play, Compass } from "lucide-react";
import Link from "next/link";

// Key countries data with coordinates (lat, lng) and info
const COUNTRY_MARKERS = [
  { name: "United States", flag: "🇺🇸", lat: 37.0902, lng: -95.7129, stat: "340% ROAS Growth" },
  { name: "United Kingdom", flag: "🇬🇧", lat: 55.3781, lng: -3.436, stat: "2.8x Lead Velocity" },
  { name: "United Arab Emirates", flag: "🇦🇪", lat: 23.4241, lng: 53.8478, stat: "15k+ Qualified Leads" },
  { name: "India", flag: "🇮🇳", lat: 20.5937, lng: 78.9629, stat: "10M+ Organic Impressions" },
  { name: "Australia", flag: "🇦🇺", lat: -25.2744, lng: 133.7751, stat: "420% Sales Conversion" },
  { name: "Canada", flag: "🇨🇦", lat: 56.1304, lng: -106.3468, stat: "High-Authority Branding" },
  { name: "Germany", flag: "🇩🇪", lat: 51.1657, lng: 10.4515, stat: "Multi-Language SEO Scale" },
  { name: "Singapore", flag: "🇸🇬", lat: 1.3521, lng: 103.8198, stat: "FinTech Campaign Success" },
];

export default function HomesectionGlobalHero() {
  const canvasRef = useRef(null);
  const [activeCountry, setActiveCountry] = useState(0);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.3, y: 0.8 });
  const velocityRef = useRef({ x: 0, y: 0.003 });

  // Rotate active country badge periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCountry((prev) => (prev + 1) % COUNTRY_MARKERS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // 3D Canvas Globe Engine
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

    // Generate Globe Dot Grid (sphere lat/lng points)
    const points = [];
    const radius = 175; // Sphere radius in px
    const latLines = 32;
    const lngLines = 64;

    for (let i = 0; i <= latLines; i++) {
      const lat = (i / latLines) * Math.PI - Math.PI / 2;
      for (let j = 0; j < lngLines; j++) {
        const lng = (j / lngLines) * 2 * Math.PI;
        // Introduce continent mask density to simulate realistic landmass dots
        const isLand =
          (lat > -0.7 && lat < 1.1 && (
            (lng > 0.3 && lng < 2.5) || // Eurasia & Africa
            (lng > -2.8 && lng < -0.8) || // Americas
            (lng > 2.0 && lng < 2.9 && lat < 0.2) // Australia
          ));

        if (isLand || Math.random() < 0.18) {
          points.push({
            x: radius * Math.cos(lat) * Math.sin(lng),
            y: radius * Math.sin(lat),
            z: radius * Math.cos(lat) * Math.cos(lng),
            isLand,
          });
        }
      }
    }

    // Convert country lat/long to 3D sphere coordinate
    const country3DCoords = COUNTRY_MARKERS.map((c) => {
      const phi = (90 - c.lat) * (Math.PI / 180);
      const theta = (c.lng + 180) * (Math.PI / 180);
      return {
        ...c,
        x: -(radius * Math.sin(phi) * Math.cos(theta)),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
      };
    });

    // Render loop
    const render = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Auto rotation physics
      if (!isDraggingRef.current) {
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += (0.3 - rotationRef.current.x) * 0.02; // snap back tilt
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Render Atmosphere Glow Ring
      const bgGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.7,
        centerX, centerY, radius * 1.35
      );
      bgGradient.addColorStop(0, "rgba(168, 85, 247, 0.12)");
      bgGradient.addColorStop(0.6, "rgba(99, 102, 241, 0.08)");
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = bgGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Project and draw dot matrix points
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];

        // 3D Matrix Rotation (Y axis then X axis)
        const x1 = pt.x * cosY + pt.z * sinY;
        const z1 = -pt.x * sinY + pt.z * cosY;
        const y1 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        // Perspective scale & culling (only render front-facing hemisphere clearly)
        const perspective = 600 / (600 + z2);
        const screenX = centerX + x1 * perspective;
        const screenY = centerY + y1 * perspective;

        const isFront = z2 > -40;
        const alpha = isFront
          ? Math.max(0.12, (z2 + radius) / (2 * radius))
          : Math.max(0.02, (z2 + radius) / (4 * radius));

        ctx.fillStyle = pt.isLand
          ? `rgba(168, 85, 247, ${alpha * 0.85})` // Neon Purple
          : `rgba(99, 102, 241, ${alpha * 0.4})`; // Indigo

        const dotSize = (pt.isLand ? 1.8 : 1.2) * perspective;
        ctx.beginPath();
        ctx.arc(screenX, screenY, Math.max(0.5, dotSize), 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Connection Arcs between countries on front face
      const projectedCountries = country3DCoords.map((c, idx) => {
        const x1 = c.x * cosY + c.z * sinY;
        const z1 = -c.x * sinY + c.z * cosY;
        const y1 = c.y * cosX - z1 * sinX;
        const z2 = c.y * sinX + z1 * cosX;
        const perspective = 600 / (600 + z2);
        return {
          ...c,
          screenX: centerX + x1 * perspective,
          screenY: centerY + y1 * perspective,
          z2,
          isFront: z2 > 0,
          idx,
        };
      });

      // Draw bezier flight / data arcs connecting active country to others
      const curActive = projectedCountries[activeCountry];
      if (curActive && curActive.isFront) {
        projectedCountries.forEach((target, i) => {
          if (i === activeCountry || !target.isFront) return;

          const midX = (curActive.screenX + target.screenX) / 2;
          const midY = (curActive.screenY + target.screenY) / 2 - 45;

          const arcGradient = ctx.createLinearGradient(
            curActive.screenX, curActive.screenY,
            target.screenX, target.screenY
          );
          arcGradient.addColorStop(0, "rgba(217, 70, 239, 0.8)");
          arcGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.9)");
          arcGradient.addColorStop(1, "rgba(168, 85, 247, 0.2)");

          ctx.beginPath();
          ctx.moveTo(curActive.screenX, curActive.screenY);
          ctx.quadraticCurveTo(midX, midY, target.screenX, target.screenY);
          ctx.strokeStyle = arcGradient;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // Draw Country Ping Markers & Pulsing Rings
      projectedCountries.forEach((c) => {
        if (!c.isFront) return;

        const isCurrentActive = c.idx === activeCountry;
        const size = isCurrentActive ? 6 : 4;

        // Outer glow aura
        ctx.fillStyle = isCurrentActive
          ? "rgba(236, 72, 153, 0.4)"
          : "rgba(56, 189, 248, 0.3)";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Inner solid core
        ctx.fillStyle = isCurrentActive ? "#f43f5e" : "#38bdf8";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size, 0, Math.PI * 2);
        ctx.fill();

        // White highlight
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCountry]);

  // Drag handlers for 3D Globe rotation
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    rotationRef.current.y += deltaX * 0.005;
    rotationRef.current.x += deltaY * 0.005;

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Character-by-Character Stagger Animation Variants
  const agencyNameText = "DigitalAdda Agency";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.8,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const activeCountryData = COUNTRY_MARKERS[activeCountry];

  return (
    <section className="relative w-full min-h-[90vh] bg-[#070714] text-white overflow-hidden flex items-center pt-24 pb-16 border-b border-purple-900/30">
      
      {/* ── Background Grid & Radial Lights ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top center deep purple glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-purple-600/20 via-indigo-600/10 to-transparent rounded-full blur-[140px]" />
        
        {/* Right side cyan light bloom */}
        <div className="absolute bottom-10 right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px]" />

        {/* Futuristic Cybernetic Mesh Overlay */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(168, 85, 247, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(168, 85, 247, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* ══════════════════════════════════════════════════════════════
              LEFT COLUMN — Character-by-Character Animated Headline & Info
          ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-md mb-6"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-300">
                Global Performance Marketing Agency
              </span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </motion.div>

            {/* ── Character-by-Character Agency Name Animation ── */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-4 flex flex-wrap items-center gap-x-1 sm:gap-x-2 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]"
            >
              {agencyNameText.split("").map((char, index) => {
                const isAgency = index >= 12; // "Agency" part
                return (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className={`inline-block ${
                      isAgency
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.5)]"
                        : "text-white"
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </motion.div>

            {/* Sub-Title / Global Value Proposition */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-200 mb-6 leading-snug"
            >
              Scaling Brands Across <span className="text-cyan-400 underline decoration-purple-500 decoration-wavy decoration-2">25+ Countries</span> Worldwide 🌐
            </motion.h2>

            {/* Description Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8"
            >
              Whether you're expanding into international markets or dominating your home turf — we build AI-driven PPC campaigns, high-converting global SEO, and performance strategies that turn worldwide clicks into revenue.
            </motion.p>

            {/* CTAs Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto text-center overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Free Global Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <a
                href="#strategy-videos"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-purple-500/30 hover:border-purple-400 font-bold text-sm uppercase tracking-wider transition-all duration-300 w-full sm:w-auto text-center backdrop-blur-md"
              >
                <Play className="w-4 h-4 fill-purple-400 text-purple-400" />
                Watch Strategy Videos
              </a>
            </motion.div>

            {/* Global Performance Highlights Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-purple-900/30 w-full max-w-2xl"
            >
              {[
                { label: "Global Clients", value: "200+" },
                { label: "Countries Targeted", value: "25+" },
                { label: "Campaign ROI", value: "3.8x" },
                { label: "Satisfaction", value: "98.5%" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300">
                    {item.value}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT COLUMN — 3D Interactive Spinning Globe Canvas
          ══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Globe Outer Glow Box */}
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
              
              {/* Outer Decorative Orbit Ring */}
              <div className="absolute inset-2 border border-purple-500/20 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-8 border border-cyan-500/20 rounded-full animate-[spin_25s_linear_infinite_reverse] pointer-events-none" />

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

              {/* Floating Active Country Glassmorphism Spotlight Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCountryData.name}
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-purple-500/40 px-5 py-3 rounded-2xl shadow-2xl shadow-purple-900/50 flex items-center gap-3 z-30 pointer-events-none whitespace-nowrap min-w-[260px]"
                >
                  <span className="text-3xl">{activeCountryData.flag}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-white">
                        {activeCountryData.name}
                      </span>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    </div>
                    <p className="text-[11px] font-semibold text-purple-300">
                      ⚡ {activeCountryData.stat}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Drag Hint Overlay */}
              <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30 text-[10px] font-bold text-slate-300 flex items-center gap-1.5 shadow-md pointer-events-none">
                <Compass className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>Drag to Rotate Globe</span>
              </div>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
