"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Target,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Tv,
} from "lucide-react";

export default function Homesection1() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const leftVideoSrc = "/video/1.mp4";
  const rightVideoSrc = "/video/client.mp4";

  const leftVideoRef = useRef(null);
  const rightVideoRef = useRef(null);

  const [activeSide, setActiveSide] = useState("both"); // "both" | "left" | "right"
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [leftProgress, setLeftProgress] = useState(0);
  const [rightProgress, setRightProgress] = useState(0);

  // Synchronized Video Controller
  useEffect(() => {
    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    if (!left || !right) return;

    const playVideo = async (video, muted) => {
      try {
        video.muted = muted;
        if (isPlaying) {
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => {
              video.muted = true;
              video.play().catch(() => {});
            });
          }
        } else {
          video.pause();
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (activeSide === "both") {
      playVideo(left, isMuted);
      playVideo(right, true); // right video muted by default in dual view to avoid audio conflict
    } else if (activeSide === "left") {
      playVideo(left, isMuted);
      right.pause();
    } else if (activeSide === "right") {
      left.pause();
      playVideo(right, isMuted);
    }
  }, [activeSide, isPlaying, isMuted]);

  // Track progress of left video
  const handleLeftTimeUpdate = () => {
    const video = leftVideoRef.current;
    if (video && video.duration) {
      setLeftProgress((video.currentTime / video.duration) * 100);
    }
  };

  // Track progress of right video
  const handleRightTimeUpdate = () => {
    const video = rightVideoRef.current;
    if (video && video.duration) {
      setRightProgress((video.currentTime / video.duration) * 100);
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <section
      id="strategy-videos"
      ref={sectionRef}
      className="relative w-full bg-[#070716] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-purple-900/40"
    >
      {/* Top Ambient Glow Line & Divider Gap */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* Background Ambient Spheres */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-5 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 left-[-5%] w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ══════════════════════════════════════════════════════════════
            SECTION HEADER — Professional Title & Badge
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Growth Blueprint & Proven Case Studies</span>
          </div>

          {/* Section Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Our Data-Driven{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Strategy & Live Client Results
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Watch how we combine strategic campaign architecture with high-converting performance funnels to deliver compounding ROI for global brands.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            INTERACTIVE CONTROLS BAR (Dual View / Focus Switcher & Sound)
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-between gap-4 max-w-6xl mx-auto mb-8 bg-slate-900/80 backdrop-blur-xl border border-purple-500/30 p-2.5 sm:p-3 rounded-2xl shadow-xl"
        >
          {/* View Mode Switchers */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar">
            <button
              type="button"
              onClick={() => setActiveSide("both")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeSide === "both"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40 border border-purple-400/30"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Tv className="w-4 h-4" /> Dual Side-by-Side View
            </button>

            <button
              type="button"
              onClick={() => setActiveSide("left")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeSide === "left"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40 border border-purple-400/30"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Target className="w-4 h-4 text-purple-300" /> Strategy Video Only
            </button>

            <button
              type="button"
              onClick={() => setActiveSide("right")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                activeSide === "right"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40 border border-purple-400/30"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4 text-cyan-300" /> Client Results Video Only
            </button>
          </div>

          {/* Sound & Play Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={togglePlay}
              className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 text-purple-300" /> Pause Videos
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-purple-300 fill-purple-300" /> Play Videos
                </>
              )}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-amber-400" /> Unmute Audio
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" /> Audio On
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            DUAL VIDEO SHOWCASE GRID — High-Attraction Animated Cards
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className={`grid gap-6 sm:gap-8 max-w-6xl mx-auto transition-all duration-300 ${
            activeSide === "both"
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1"
          }`}
        >
          {/* ──────────────────────────────────────────────────────────
              LEFT VIDEO CARD — Strategy Blueprint
          ────────────────────────────────────────────────────────── */}
          {(activeSide === "both" || activeSide === "left") && (
            <div
              className={`group relative rounded-2xl md:rounded-3xl bg-slate-950/90 border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/50 hover:border-purple-400/60 transition-all duration-300 flex flex-col ${
                activeSide === "left" ? "max-w-4xl mx-auto w-full" : ""
              }`}
            >
              {/* Card Top Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-950/80 to-slate-900/80 border-b border-purple-900/40 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                      Performance Strategy Blueprint
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400">
                      Campaign Architecture & Funnel Scaling
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-extrabold uppercase tracking-wider">
                  Strategy Guide
                </span>
              </div>

              {/* Video Wrapper */}
              <div className="relative w-full aspect-video bg-black overflow-hidden group/vid cursor-pointer" onClick={togglePlay}>
                <video
                  ref={leftVideoRef}
                  className="w-full h-full object-cover block"
                  playsInline
                  loop
                  muted={isMuted}
                  onTimeUpdate={handleLeftTimeUpdate}
                >
                  <source src={leftVideoSrc} type="video/mp4" />
                </video>

                {/* Overlay Play Icon on Hover or Pause */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-20">
                    <div className="w-16 h-16 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl scale-110">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Bottom Video Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100"
                    style={{ width: `${leftProgress}%` }}
                  />
                </div>
              </div>

              {/* Card Footer Insights */}
              <div className="p-4 sm:p-5 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 border-t border-purple-900/30">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> High Intent Keyword Targeting
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Zap className="w-4 h-4 text-purple-400" /> Automated Lead Nurturing
                </span>
              </div>
            </div>
          )}

          {/* ──────────────────────────────────────────────────────────
              RIGHT VIDEO CARD — Client Results & ROI
          ────────────────────────────────────────────────────────── */}
          {(activeSide === "both" || activeSide === "right") && (
            <div
              className={`group relative rounded-2xl md:rounded-3xl bg-slate-950/90 border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/50 hover:border-purple-400/60 transition-all duration-300 flex flex-col ${
                activeSide === "right" ? "max-w-4xl mx-auto w-full" : ""
              }`}
            >
              {/* Card Top Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900/80 to-purple-950/80 border-b border-purple-900/40 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                      Client Growth & Verified ROAS
                    </h3>
                    <p className="text-[11px] font-medium text-slate-400">
                      Real Dashboard Metrics & Scaled Campaigns
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[10px] font-extrabold uppercase tracking-wider">
                  Live Case Study
                </span>
              </div>

              {/* Video Wrapper */}
              <div className="relative w-full aspect-video bg-black overflow-hidden group/vid cursor-pointer" onClick={togglePlay}>
                <video
                  ref={rightVideoRef}
                  className="w-full h-full object-cover block"
                  playsInline
                  loop
                  muted={activeSide === "both" ? true : isMuted}
                  onTimeUpdate={handleRightTimeUpdate}
                >
                  <source src={rightVideoSrc} type="video/mp4" />
                </video>

                {/* Overlay Play Icon on Hover or Pause */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-20">
                    <div className="w-16 h-16 rounded-full bg-cyan-600/90 text-white flex items-center justify-center shadow-2xl scale-110">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                  </div>
                )}

                {/* Bottom Video Progress Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-100"
                    style={{ width: `${rightProgress}%` }}
                  />
                </div>
              </div>

              {/* Card Footer Insights */}
              <div className="p-4 sm:p-5 bg-slate-900/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 border-t border-purple-900/30">
                <span className="flex items-center gap-1.5 font-medium">
                  <TrendingUp className="w-4 h-4 text-cyan-400" /> 3.8x ROAS Multiplier
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Verified Growth
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            FEATURE HIGHLIGHT CARDS UNDERNEATH — Pure Value Proposition
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12 sm:mt-16"
        >
          {[
            {
              icon: Target,
              title: "Laser-Targeted Audience Strategy",
              desc: "We pinpoint high-converting audience segments using intent data, custom retargeting, and geographical optimization.",
            },
            {
              icon: TrendingUp,
              title: "Compounding ROAS & Scale",
              desc: "Engineered ad creatives and landing page funnels optimized to decrease Cost Per Lead while maximizing lifetime value.",
            },
            {
              icon: ShieldCheck,
              title: "Full Transparency & Real Metrics",
              desc: "No vanity stats. Access real-time conversion dashboards, transparent ad spend tracking, and custom weekly reporting.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-purple-950/30 border border-purple-500/20 backdrop-blur-xl hover:bg-purple-900/30 hover:border-purple-400/50 transition-all duration-300 flex flex-col items-start group"
            >
              <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}