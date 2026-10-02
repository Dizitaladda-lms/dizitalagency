"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroSection() {
  const leftVideoSrc = "/video/1.mp4";
  const rightVideoSrc = "/video/client.mp4";

  const leftVideoRef = useRef(null);
  const rightVideoRef = useRef(null);

  const [activeSide, setActiveSide] = useState("left");
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    if (!left || !right) return;

    const active = activeSide === "left" ? left : right;
    const inactive = activeSide === "left" ? right : left;

    try {
      inactive.pause();
    } catch {}

    inactive.muted = true;

    try {
      active.currentTime = 0;
    } catch {}

    active.muted = isMuted;

    const playPromise = active.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // Most browsers block unmuted autoplay.
        // Fall back to muted autoplay; user can unmute via the sound button.
        try {
          active.muted = true;
        } catch {}
        setIsMuted(true);

        const retry = active.play();
        if (retry && typeof retry.catch === "function") {
          retry.catch(() => {});
        }
      });
    }
  }, [activeSide, isMuted]);

  useEffect(() => {
    const left = leftVideoRef.current;
    const right = rightVideoRef.current;
    if (!left || !right) return;

    const active = activeSide === "left" ? left : right;
    const inactive = activeSide === "left" ? right : left;

    inactive.muted = true;
    active.muted = isMuted;

    if (!isMuted) {
      const playPromise = active.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {
          try {
            active.muted = true;
          } catch {}
          setIsMuted(true);
        });
      }
    }
  }, [isMuted, activeSide]);

  const handleLeftEnded = () => setActiveSide("right");
  const handleRightEnded = () => setActiveSide("left");

  return (
    <section id="strategy-videos" className="w-full bg-[#0f0020]">

      <div className="grid grid-cols-2 w-full relative">
        <div className="relative w-full aspect-video bg-black border border-white/15">
          <div className="absolute top-2 left-2 bg-amber-400 text-black text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 border border-black/20 shadow-sm z-10 pointer-events-none">
            Strategy
          </div>
          <video
            ref={leftVideoRef}
            className="absolute inset-0 w-full h-full object-cover object-[50%_40%] block"
            playsInline
            preload="auto"
            onEnded={handleLeftEnded}
          >
            <source src={leftVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Center Toggle Button */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            onClick={() => setActiveSide((prev) => (prev === "left" ? "right" : "left"))}
            className="bg-black hover:bg-neutral-900 text-white font-bold px-6 py-3 rounded-full shadow-lg text-base border-2 border-white/20 transition-all duration-200"
            aria-label="Toggle Video"
          >
            {activeSide === "left" ? "Show Results Video" : "Show Strategy Video"}
          </button>
        </div>

        <div className="relative w-full aspect-video bg-black border border-white/15">
          <div className="absolute top-2 right-2 bg-amber-400 text-black text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 border border-black/20 shadow-sm z-10 pointer-events-none">
            Results
          </div>
          <video
            ref={rightVideoRef}
            className="absolute inset-0 w-full h-full object-cover block"
            playsInline
            preload="auto"
            onEnded={handleRightEnded}
          >
            <source src={rightVideoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          type="button"
          onClick={() => setIsMuted((prev) => !prev)}
          className="my-3 px-4 py-2 bg-black text-white text-sm font-medium"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <span className="inline-flex items-center gap-2">
              <Volume2 className="w-4 h-4" /> Unmute
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <VolumeX className="w-4 h-4" /> Mute
            </span>
          )}
        </button>
      </div>
    </section>
  );
}