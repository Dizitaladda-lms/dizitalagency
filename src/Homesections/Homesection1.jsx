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
  Maximize2,
} from "lucide-react";

export default function Homesection1() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

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

  useEffect(() => {
    const curVid = activeTab === "strategy" ? strategyVideoRef.current : resultsVideoRef.current;
    if (curVid) curVid.muted = isMuted;
  }, [isMuted, activeTab]);

  useEffect(() => {
    const curVid = activeTab === "strategy" ? strategyVideoRef.current : resultsVideoRef.current;
    if (!curVid) return;
    if (isPlaying) curVid.play().catch(() => {});
    else curVid.pause();
  }, [isPlaying, activeTab]);

  // Sequential Playback: Strategy ends -> Results plays -> Results ends -> Strategy plays
  const handleStrategyEnded = () => {
    setActiveTab("results");
    setIsPlaying(true);
  };

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
      className="relative w-full bg-[#070716] text-white py-10 sm:py-14 overflow-hidden border-t border-purple-900/30"
    >
      {/* Top Divider Gap */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Compact Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Growth Blueprint & Verified Case Studies</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Our Strategy &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Client Growth Results
            </span>
          </h2>
        </motion.div>

        {/* Sleek Tabs Switcher */}
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { setActiveTab("strategy"); setIsPlaying(true); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "strategy"
                  ? "bg-purple-600 text-white shadow-md border border-purple-400/40"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>01. Strategy Blueprint</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab("results"); setIsPlaying(true); }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === "results"
                  ? "bg-purple-600 text-white shadow-md border border-purple-400/40"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>02. Client ROI & Results</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold text-purple-300 bg-purple-950/50 border border-purple-500/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auto-Plays Next Video</span>
          </div>
        </div>

        {/* SINGLE CLEAN VIDEO PLAYER — No Nested Containers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl group"
        >
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

          {/* Overlay Click to Play/Pause */}
          <div
            className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center"
            onClick={togglePlay}
          >
            {!isPlaying && (
              <div className="w-14 h-14 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-xl backdrop-blur-md transform scale-110">
                <Play className="w-7 h-7 fill-white ml-0.5" />
              </div>
            )}
          </div>

          {/* Floating Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between gap-2 z-30">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-colors"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                    <span>Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Muted Off</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] font-semibold text-slate-300">
              Playing: <span className="text-purple-300 font-bold">{activeTab === "strategy" ? "Strategy (1/2)" : "Client Growth (2/2)"}</span>
            </div>

            <button
              type="button"
              onClick={handleFullscreen}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline Progress Bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-40">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-400 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
