"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Realistic Continent Polygon Coordinates (lat, lng arrays) for authentic 3D world landmasses
const CONTINENT_POLYGONS = [
  // North America (USA, Canada, Alaska, Mexico, Central America)
  [
    [70, -165], [72, -140], [70, -120], [60, -110], [50, -125], [40, -124], 
    [32, -117], [23, -110], [15, -92], [8, -78], [10, -73], [18, -88], 
    [25, -80], [30, -81], [35, -75], [44, -64], [47, -53], [60, -64], 
    [70, -80], [72, -130], [70, -165]
  ],
  // Greenland
  [
    [78, -70], [82, -40], [80, -20], [70, -20], [60, -43], [65, -52], [78, -70]
  ],
  // South America
  [
    [12, -73], [10, -62], [5, -50], [-5, -35], [-12, -37], [-18, -38], [-23, -42], 
    [-35, -55], [-54, -68], [-52, -75], [-45, -74], [-18, -71], [0, -80], [12, -73]
  ],
  // Europe (Western & Central Europe, Scandinavia, Mediterranean)
  [
    [71, 28], [70, 20], [65, 14], [62, 5], [58, 6], [54, 8], [52, 2], [48, -4], 
    [43, -9], [36, -5], [37, 3], [37, 22], [40, 26], [45, 36], [55, 38], [60, 30], 
    [68, 45], [71, 28]
  ],
  // United Kingdom & Ireland
  [
    [58, -6], [58, 2], [50, 1], [50, -5], [58, -6]
  ],
  // Africa (North Africa, Sahara, Central & South Africa)
  [
    [37, 10], [35, -6], [28, -13], [15, -17], [10, -14], [5, 9], [-18, 12], 
    [-34, 18], [-34, 26], [-26, 33], [-11, 40], [4, 42], [11, 51], [12, 43], 
    [28, 34], [32, 32], [37, 10]
  ],
  // Madagascar
  [
    [-12, 49], [-15, 50], [-25, 47], [-25, 44], [-12, 49]
  ],
  // Middle East & Arabia
  [
    [30, 35], [40, 35], [45, 50], [30, 48], [25, 57], [15, 53], [12, 44], 
    [20, 38], [30, 35]
  ],
  // Asia - Main Landmass (China, Russia/Siberia, Central Asia)
  [
    [75, 75], [76, 110], [72, 130], [66, 170], [60, 162], [55, 135], [43, 131], 
    [38, 118], [22, 114], [15, 108], [10, 99], [22, 91], [30, 78], [35, 60], 
    [45, 50], [55, 60], [75, 75]
  ],
  // India Peninsula & Sri Lanka
  [
    [32, 75], [28, 88], [20, 85], [13, 80], [8, 77], [10, 76], [15, 73], [24, 69], [32, 75]
  ],
  // Japan Islands
  [
    [45, 142], [41, 140], [35, 136], [31, 130], [35, 133], [40, 138], [45, 142]
  ],
  // Southeast Asia & Indonesia / Philippines
  [
    [18, 121], [14, 100], [7, 100], [1, 104], [-5, 105], [-8, 115], [-8, 127], 
    [2, 128], [10, 126], [18, 121]
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

// Helper: Point in polygon test
function pointInPolygon(pt, polygon) {
  const x = pt[0], y = pt[1];
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// 30+ Key Target Business Hub Countries across all Continents
const COUNTRY_MARKERS = [
  { name: "India", flag: "🇮🇳", code: "IN", lat: 20.5937, lng: 78.9629, stat: "10M+ Organic Impressions" },
  { name: "United States", flag: "🇺🇸", code: "US", lat: 37.0902, lng: -95.7129, stat: "340% ROAS Growth" },
  { name: "United Kingdom", flag: "🇬🇧", code: "UK", lat: 55.3781, lng: -3.436, stat: "2.8x Lead Velocity" },
  { name: "United Arab Emirates", flag: "🇦🇪", code: "UAE", lat: 23.4241, lng: 53.8478, stat: "15k+ Qualified Leads" },
  { name: "Germany", flag: "🇩🇪", code: "DE", lat: 51.1657, lng: 10.4515, stat: "Multi-Language SEO Scale" },
  { name: "France", flag: "🇫🇷", code: "FR", lat: 46.2276, lng: 2.2137, stat: "High-Authority Branding" },
  { name: "Canada", flag: "🇨🇦", code: "CA", lat: 56.1304, lng: -106.3468, stat: "B2B Market Dominance" },
  { name: "Australia", flag: "🇦🇺", code: "AU", lat: -25.2744, lng: 133.7751, stat: "420% Sales Conversion" },
  { name: "Japan", flag: "🇯🇵", code: "JP", lat: 36.2048, lng: 138.2529, stat: "APAC Market Scale" },
  { name: "Singapore", flag: "🇸🇬", code: "SG", lat: 1.3521, lng: 103.8198, stat: "FinTech Campaign Scale" },
  { name: "Brazil", flag: "🇧🇷", code: "BR", lat: -14.235, lng: -51.9253, stat: "LATAM Growth Spike" },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "SA", lat: 23.8859, lng: 45.0792, stat: "Middle East Scale" },
  { name: "South Korea", flag: "🇰🇷", code: "KR", lat: 35.9078, lng: 127.7669, stat: "Tech User Acquisition" },
  { name: "Spain", flag: "🇪🇸", code: "ES", lat: 40.4637, lng: -3.7492, stat: "E-commerce Revenue Boost" },
  { name: "Italy", flag: "🇮🇹", code: "IT", lat: 41.8719, lng: 12.5674, stat: "Luxury Brand Scale" },
  { name: "Netherlands", flag: "🇳🇱", code: "NL", lat: 52.1326, lng: 5.2913, stat: "Euro Hub ROI" },
  { name: "Switzerland", flag: "🇨🇭", code: "CH", lat: 46.8182, lng: 8.2275, stat: "Wealth Tech Lead Gen" },
  { name: "Mexico", flag: "🇲🇽", code: "MX", lat: 23.6345, lng: -102.5528, stat: "Cross-Border Campaign" },
  { name: "Argentina", flag: "🇦🇷", code: "AR", lat: -38.4161, lng: -63.6167, stat: "Performance PPC" },
  { name: "South Africa", flag: "🇿🇦", code: "ZA", lat: -30.5595, lng: 22.9375, stat: "African Market Scale" },
  { name: "Egypt", flag: "🇪🇬", code: "EG", lat: 26.8206, lng: 30.8025, stat: "MENA Lead Pipeline" },
  { name: "Turkey", flag: "🇹🇷", code: "TR", lat: 38.9637, lng: 35.2433, stat: "Regional Commerce" },
  { name: "China", flag: "🇨🇳", code: "CN", lat: 35.8617, lng: 104.1954, stat: "Global Supply Marketing" },
  { name: "Indonesia", flag: "🇮🇩", code: "ID", lat: -0.7893, lng: 113.9213, stat: "SEA App Growth" },
  { name: "Thailand", flag: "🇹🇭", code: "TH", lat: 15.87, lng: 100.9925, stat: "Tourism & Travel SEO" },
  { name: "Vietnam", flag: "🇻🇳", code: "VN", lat: 14.0583, lng: 108.2772, stat: "Digital Ad Efficiency" },
  { name: "Qatar", flag: "🇶🇦", code: "QA", lat: 25.3548, lng: 51.1839, stat: "Enterprise Deals" },
  { name: "Nigeria", flag: "🇳🇬", code: "NG", lat: 9.082, lng: 8.6753, stat: "West Africa Scaling" },
  { name: "Sweden", flag: "🇸🇪", code: "SE", lat: 60.1282, lng: 18.6435, stat: "Nordic Tech Campaign" },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ", lat: -40.9006, lng: 174.886, stat: "Oceania Performance" },
];

export default function HomesectionGlobalHero() {
  const canvasRef = useRef(null);
  const [activeCountry, setActiveCountry] = useState(0);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  const rotationRef = useRef({ x: 0.28, y: 0.65 });
  // Slow, smooth ambient rotation speed
  const velocityRef = useRef({ x: 0, y: 0.0014 });

  // Precompute 1500+ Land Matrix Dots for realistic 3D Globe Tech Texture
  const landDots = useMemo(() => {
    const dots = [];
    const step = 2.4; // Grid density step in degrees
    for (let lat = -60; lat <= 75; lat += step) {
      for (let lng = -180; lng <= 180; lng += step) {
        // Check if lat/lng is on land
        let isLand = false;
        for (let poly of CONTINENT_POLYGONS) {
          if (pointInPolygon([lat, lng], poly)) {
            isLand = true;
            break;
          }
        }
        if (isLand) {
          dots.push({ lat, lng });
        }
      }
    }
    return dots;
  }, []);

  // Rotate spotlight country marker automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCountry((prev) => (prev + 1) % COUNTRY_MARKERS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // 3D Vector Globe Renderer Engine
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

    // Spherical radius matching hero section layout
    const getRadius = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      return Math.max(rect.width, rect.height) * 0.44;
    };

    // Convert lat/long to 3D point on sphere radius R
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
      const centerY = height * 0.46;
      const radius = getRadius();

      ctx.clearRect(0, 0, width, height);

      // Smooth auto rotation physics
      if (!isDraggingRef.current) {
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += (0.28 - rotationRef.current.x) * 0.01;
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

      // 0. DIAGONAL DATA BEAM (Bottom-Left to Top-Right exact axis)
      const diagonalGrad = ctx.createLinearGradient(0, height, width, 0);
      diagonalGrad.addColorStop(0, "rgba(168, 85, 247, 0.0)");
      diagonalGrad.addColorStop(0.3, "rgba(236, 72, 153, 0.22)");
      diagonalGrad.addColorStop(0.7, "rgba(56, 189, 248, 0.22)");
      diagonalGrad.addColorStop(1, "rgba(168, 85, 247, 0.0)");

      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, 0);
      ctx.strokeStyle = diagonalGrad;
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // 1. Atmosphere Radial Glow Behind Globe
      const glowGrad = ctx.createRadialGradient(
        centerX, centerY, radius * 0.5,
        centerX, centerY, radius * 1.35
      );
      glowGrad.addColorStop(0, "rgba(168, 85, 247, 0.25)");
      glowGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.15)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 2. Base Ocean Sphere (Deep Vibrant Tech Blue Fill)
      const oceanGrad = ctx.createRadialGradient(
        centerX - radius * 0.3, centerY - radius * 0.3, radius * 0.2,
        centerX, centerY, radius
      );
      oceanGrad.addColorStop(0, "#1c0d45");
      oceanGrad.addColorStop(0.7, "#0d062e");
      oceanGrad.addColorStop(1, "#070318");

      ctx.fillStyle = oceanGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render Graticule Latitude & Longitude Lines
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

      ctx.strokeStyle = "rgba(168, 85, 247, 0.18)";
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

      // 4. Render Vector Continent Polygons (Rich Neon purple fill + cyan border)
      CONTINENT_POLYGONS.forEach((poly) => {
        const poly3D = poly.map(([lat, lng]) => latLngTo3D(lat, lng, radius));
        const projectedPoly = poly3D.map(project);
        const avgZ = projectedPoly.reduce((sum, p) => sum + p.z2, 0) / projectedPoly.length;

        if (avgZ > -30) {
          ctx.beginPath();
          projectedPoly.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.screenX, p.screenY);
            else ctx.lineTo(p.screenX, p.screenY);
          });
          ctx.closePath();

          const landAlpha = Math.min(0.55, Math.max(0.18, (avgZ + radius) / (2 * radius)));
          ctx.fillStyle = `rgba(147, 51, 234, ${landAlpha})`;
          ctx.fill();

          ctx.strokeStyle = `rgba(56, 189, 248, ${landAlpha * 1.5})`;
          ctx.lineWidth = 1.4;
          ctx.stroke();
        }
      });

      // 5. Render Glowing Land Dot Matrix (Dense 3D Grid Texture)
      landDots.forEach((dot) => {
        const pt3D = latLngTo3D(dot.lat, dot.lng, radius + 0.8);
        const proj = project(pt3D);
        if (proj.z2 > 0) {
          const dotAlpha = Math.min(0.9, Math.max(0.2, proj.z2 / radius));
          ctx.fillStyle = `rgba(56, 189, 248, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(proj.screenX, proj.screenY, 1.4 * proj.perspective, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Country Markers & Arcs across all 30+ Countries
      const projectedCountries = COUNTRY_MARKERS.map((c, idx) => {
        const pos3D = latLngTo3D(c.lat, c.lng, radius + 2);
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

      // Draw Connection Arcs from Active Country
      const curActive = projectedCountries[activeCountry];
      if (curActive && curActive.isFront) {
        projectedCountries.forEach((target, i) => {
          if (i === activeCountry || !target.isFront) return;

          const midX = (curActive.screenX + target.screenX) / 2;
          const midY = (curActive.screenY + target.screenY) / 2 - 35;

          const arcGradient = ctx.createLinearGradient(
            curActive.screenX, curActive.screenY,
            target.screenX, target.screenY
          );
          arcGradient.addColorStop(0, "rgba(244, 63, 94, 0.9)");
          arcGradient.addColorStop(0.5, "rgba(56, 189, 248, 0.8)");
          arcGradient.addColorStop(1, "rgba(168, 85, 247, 0.3)");

          ctx.beginPath();
          ctx.moveTo(curActive.screenX, curActive.screenY);
          ctx.quadraticCurveTo(midX, midY, target.screenX, target.screenY);
          ctx.strokeStyle = arcGradient;
          ctx.lineWidth = 1.4;
          ctx.setLineDash([5, 3]);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      // Draw Pins & Country Labels for ALL Visible Front Countries
      projectedCountries.forEach((c) => {
        if (!c.isFront) return;

        const isCurrentActive = c.idx === activeCountry;
        const size = isCurrentActive ? 7 : 4.5;

        // Outer Pulsing Glow Circle
        ctx.fillStyle = isCurrentActive
          ? "rgba(244, 63, 94, 0.45)"
          : "rgba(56, 189, 248, 0.3)";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Pin Solid Dot
        ctx.fillStyle = isCurrentActive ? "#f43f5e" : "#38bdf8";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size, 0, Math.PI * 2);
        ctx.fill();

        // Pin Inner White Center
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(c.screenX, c.screenY, size * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Country Code & Flag Label
        ctx.font = isCurrentActive ? "bold 11px Inter, sans-serif" : "600 9.5px Inter, sans-serif";
        ctx.fillStyle = isCurrentActive ? "#f43f5e" : "rgba(255, 255, 255, 0.9)";
        
        // Show flag + country code
        const labelText = `${c.flag} ${c.code}`;
        ctx.fillText(labelText, c.screenX + 8, c.screenY + 3);

        // If active, also draw full country name
        if (isCurrentActive) {
          ctx.font = "bold 10px Inter, sans-serif";
          ctx.fillStyle = "#38bdf8";
          ctx.fillText(c.name, c.screenX + 8, c.screenY + 15);
        }
      });

      // 7. Outer Atmosphere Rim
      const rimGrad = ctx.createRadialGradient(
        centerX, centerY, radius * 0.96,
        centerX, centerY, radius * 1.04
      );
      rimGrad.addColorStop(0, "rgba(168, 85, 247, 0)");
      rimGrad.addColorStop(0.5, "rgba(192, 132, 252, 0.55)");
      rimGrad.addColorStop(1, "rgba(56, 189, 248, 0.75)");

      ctx.strokeStyle = rimGrad;
      ctx.lineWidth = 2.2;
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
  }, [activeCountry, landDots]);

  // Mouse Drag to Rotate Globe 360 Degrees
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
    <section className="relative w-full min-h-[84vh] lg:min-h-[90vh] bg-[#070714] text-white overflow-hidden flex items-center justify-center pt-28 pb-14 sm:pt-32 sm:pb-16 border-b border-purple-900/30">
      
      {/* ── BACKGROUND 1: Ambient Lighting Glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-b from-purple-600/22 via-indigo-600/15 to-cyan-500/10 rounded-full blur-[140px]" />
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

      {/* ── BACKGROUND 2: Full Screen Diagonal 3D Vector Globe Canvas (Spans Bottom-Left to Top-Right) ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 opacity-90 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Decorative Diagonal Orbit Rings */}
          <div className="absolute w-[85vw] h-[85vw] max-w-[1000px] max-h-[1000px] border border-purple-500/20 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none" />
          <div className="absolute w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] border border-cyan-500/15 rounded-full animate-[spin_45s_linear_infinite_reverse] pointer-events-none" />

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

      {/* ── FOREGROUND CONTENT ── */}
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

        {/* Agency Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-3 flex flex-wrap justify-center items-center gap-x-3.5 sm:gap-x-4 text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold tracking-tight leading-none drop-shadow-xl"
        >
          {/* Word 1: DigitalAdda */}
          <span className="inline-block text-white">
            {word1.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>

          {/* Word 2: Agency */}
          <span className="inline-block pr-3 sm:pr-4 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
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
          Scaling Brands Across <span className="text-cyan-400 font-extrabold">30+ Countries</span> Worldwide
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
            { label: "Countries Targeted", value: "30+" },
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
              className="notranslate inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 bg-slate-950/90 backdrop-blur-xl border border-purple-500/40 px-4 py-1.5 rounded-full shadow-xl pointer-events-none"
            >
              <span className="text-[10px] font-black text-purple-400 px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30">
                {activeCountryData.code}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <span className="text-sm">{activeCountryData.flag}</span>
                <span className="text-xs font-bold text-white text-center">
                  {activeCountryData.name}
                </span>
                <span className="text-gray-500">&middot;</span>
                <span className="text-[10px] font-semibold text-cyan-300 text-center">
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
