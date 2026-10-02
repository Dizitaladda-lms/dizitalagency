"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  Target,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  Zap,
} from "lucide-react";

export default function Homesection1() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [activeTab, setActiveTab] = useState("strategy"); // "strategy" | "results"
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const strategyVideoRef = useRef(null);
  const resultsVideoRef = useRef(null);

  // Synchronized playback & auto-play when tab changes
  useEffect(() => {
    const strategyVid = strategyVideoRef.current;
    const resultsVid = resultsVideoRef.current;

    if (activeTab === "strategy" && strategyVid) {
      try {
        if (resultsVid) resultsVid.pause();
        strategyVid.currentTime = 0;
        strategyVid.muted = isMuted;
        if (isPlaying) {
          const p = strategyVid.play();
          if (p && p.catch) p.catch(() => { strategyVid.muted = true; strategyVid.play().catch(() => {}); });
        }
      } catch (e) { console.error(e); }
    } else if (activeTab === "results" && resultsVid) {
      try {
        if (strategyVid) strategyVid.pause();
        resultsVid.currentTime = 0;
        resultsVid.muted = isMuted;
        if (isPlaying) {
          const p = resultsVid.play();
          if (p && p.catch) p.catch(() => { resultsVid.muted = true; resultsVid.play().catch(() => {}); });
        }
      } catch (e) { console.error(e); }
    }
  }, [activeTab]);

  // Update volume/muted state when user toggles sound
  useEffect(() => {
    const curVid = activeTab === "strategy" ? strategyVideoRef.current : resultsVideoRef.current;
    if (curVid) {
      curVid.muted = isMuted;
    }
  }, [isMuted, activeTab]);

  // Update play/pause state
  useEffect(() => {
    const curVid = activeTab === "strategy" ? strategyVideoRef.current : resultsVideoRef.current;
    if (!curVid) return;
    if (isPlaying) {
      curVid.play().catch(() => {});
    } else {
      curVid.pause();
    }
  }, [isPlaying, activeTab]);

  // Sequential Playback Handler: When Strategy video finishes, automatically switch to Results video!
  const handleStrategyEnded = () => {
    setActiveTab("results");
    setIsPlaying(true);
  };

  // When Results video finishes, loop back to Strategy video!
  const handleResultsEnded = () => {
    setActiveTab("strategy");
    setIsPlaying(true);
  };

  const handleTimeUpdate = (e) => {
    const vid = e.target;
    if (vid && vid.duration) {
      setProgress((vid.currentTime / vid.duration) * 100);
    }
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleFullscreen = () => {
    const curVid = activeTab === "strategy" ? strategyVideoRef.current : resultsVideoRef.current;
    if (curVid) {
      if (curVid.requestFullscreen) curVid.requestFullscreen();
      else if (curVid.webkitRequestFullscreen) curVid.webkitRequestFullscreen();
    }
  };

  return (
    <section
      id="strategy-videos"
      ref={sectionRef}
      className="relative w-full bg-[#070716] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-purple-900/40"
    >
      {/* Top Ambient Glow Line & Divider Gap */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Ambient Lighting Spheres */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-5 right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ══════════════════════════════════════════════════════════════
            SECTION HEADER
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Sequential Strategy & Case Study Video</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Our Strategy &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Verified Client Growth
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Watch our strategy breakdown video first. Once completed, the live client results video automatically plays sequentially to show real proof.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            UNIFIED MODERN VIDEO SHOWCASE PLAYER
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-5xl mx-auto rounded-3xl bg-slate-950/90 border border-purple-500/30 p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl shadow-purple-950/60"
        >
          {/* Top Sequential Tabs Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-purple-900/40">
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => { setActiveTab("strategy"); setIsPlaying(true); }}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-200 ${
                  activeTab === "strategy"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/50 border border-purple-400/40"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <Target className="w-4 h-4 text-purple-300" />
                <span>01. Strategy Blueprint</span>
                {activeTab === "strategy" && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab("results"); setIsPlaying(true); }}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition-all duration-200 ${
                  activeTab === "results"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/50 border border-purple-400/40"
                    : "bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <TrendingUp className="w-4 h-4 text-cyan-300" />
                <span>02. Client ROI & Results</span>
                {activeTab === "results" && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />}
              </button>
            </div>

            {/* Auto Sequence Badge */}
            <div className="text-[11px] font-semibold text-purple-300 bg-purple-950/70 border border-purple-500/30 px-3 py-1.5 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Auto-Plays Next Video On End</span>
            </div>
          </div>

          {/* MAIN VIDEO DISPLAY CONTAINER — Full Edges No Crop */}
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl group">
            
            {/* Strategy Video (1.mp4) */}
            <video
              ref={strategyVideoRef}
              src="/video/1.mp4"
              className={`w-full h-full object-contain block bg-black ${
                activeTab === "strategy" ? "block" : "hidden"
              }`}
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleStrategyEnded}
            />

            {/* Results Video (client.mp4) */}
            <video
              ref={resultsVideoRef}
              src="/video/client.mp4"
              className={`w-full h-full object-contain block bg-black ${
                activeTab === "results" ? "block" : "hidden"
              }`}
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleResultsEnded}
            />

            {/* Overlay Controls & Play Toggle */}
            <div
              className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center"
              onClick={togglePlay}
            >
              {!isPlaying && (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl backdrop-blur-md transform scale-110">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
                </div>
              )}
            </div>

            {/* Bottom Floating Control Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between gap-3 z-30 pointer-events-auto">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />}
                </button>

                {/* Sound Mute/Unmute */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-md transition-colors"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-amber-400" />
                      <span className="hidden sm:inline">Unmute Audio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                      <span className="hidden sm:inline">Audio On</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Indicator */}
              <div className="text-xs font-semibold text-slate-200">
                Playing: <span className="text-purple-300 font-bold">{activeTab === "strategy" ? "Strategy Video (1/2)" : "Client Results Video (2/2)"}</span>
              </div>

              {/* Fullscreen button */}
              <button
                type="button"
                onClick={handleFullscreen}
                className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Timeline Progress Bar */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-40">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-400 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* ACTIVE VIDEO DETAILS & SUMMARY */}
          <div className="mt-6 p-5 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 shrink-0">
                {activeTab === "strategy" ? <Target className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-base font-bold text-white leading-tight">
                  {activeTab === "strategy"
                    ? "Full Campaign Architecture & Execution Plan"
                    : "Verified 3.8x ROAS Client Dashboard Case Study"}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {activeTab === "strategy"
                    ? "Detailed walk-through of keyword clustering, retargeting funnels, and landing page conversion optimization."
                    : "Real analytics showing lead velocity, conversion rate lift, and sustained lower Cost Per Lead."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextTab = activeTab === "strategy" ? "results" : "strategy";
                setActiveTab(nextTab);
                setIsPlaying(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition-all shadow-md"
            >
              <span>{activeTab === "strategy" ? "Watch Results Next" : "Replay Strategy"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            FEATURE HIGHLIGHT CARDS
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 sm:mt-16"
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
