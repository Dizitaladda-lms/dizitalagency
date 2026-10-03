"use client";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

import CountrySelector from "./CountrySelector";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navItems = [
    { name: "Services", hasDropdown: true, href: "/" },
    { name: "Industries", hasDropdown: true, href: "/" },
    { name: "About", hasDropdown: false, href: "/Aboutus" },
    { name: "blog", hasDropdown: false, href: "/blog" },
  ];

  const dropdownData = {
    Services: [
      { name: "Search Engine Optimization", href: "/services/seo" },
      { name: "Website Designing", href: "/services/website-designing" },
      { name: "Graphic Design", href: "/services/graphic-design" },
      { name: "Professional Video Editing", href: "/services/video-editing" },
      { name: "Local SEO", href: "/services/local-seo" },
      { name: "Content Writing", href: "/services/content-writing" },
      { name: "Affiliate Marketing", href: "/services/affiliate-marketing" },
      { name: "Influencer Marketing", href: "/services/influencer-marketing" },
      { name: "Social Media Marketing", href: "/services/social-media-marketing" },
      { name: "Pay Per Click", href: "/services/ppc" },
      { name: "WhatsApp Marketing", href: "/services/whatsapp-marketing" },
      { name: "E-mail Marketing", href: "/services/email-marketing" },
      { name: "Data Management", href: "/services/data-management" },
      { name: "PR Marketing", href: "/services/pr-marketing" },
    ],
    Industries: [
      { name: "StartUp Marketing", href: "/industries/startup" },
      { name: "Fashion Digital Marketing Agency", href: "/industries/fashion" },
      { name: "Health Care Digital Marketing", href: "/industries/healthcare" },
      { name: "B2B Digital Marketing", href: "/industries/b2b" },
      { name: "Education Digital Marketing", href: "/industries/education" },
      { name: "Interior Designer Digital Marketing", href: "/industries/interior-designer" },
      { name: "Real Estate Digital Marketing", href: "/industries/real-estate" },
      { name: "Tour & Travel Digital Marketing", href: "/industries/travel-tour" },
      { name: "CA Digital Marketing", href: "/industries/ca" },
      { name: "Lawyer Digital Marketing", href: "/industries/lawyer" },
      { name: "EV Digital Marketing", href: "/industries/ev" },
      { name: "Finance Digital Marketing", href: "/industries/finance" },
      { name: "Construction Digital Marketing", href: "/industries/construction" },
      { name: "Manufacturing Digital Marketing", href: "/industries/manufacturing" },
      { name: "Political Campaign Digital Marketing", href: "/industries/political" },
    ],
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent pt-4 sm:pt-5 pb-2 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* ── LOGO (100% Transparent Vector Typography - Zero White Box Background) ── */}
          <Link href="/" className="flex items-center gap-2 group select-none">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow-md">
                Digital<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Adda</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full bg-cyan-950/60 backdrop-blur-md shadow-sm">
                Agency
              </span>
            </div>
          </Link>

          {/* ── DESKTOP NAVIGATION (Bold Capsule Bar like Image 2) ── */}
          <nav className="hidden lg:flex items-center gap-7 bg-[#121624]/80 border border-white/15 backdrop-blur-xl rounded-full px-7 py-2.5 shadow-2xl">
            {navItems.map((item) => {
              const hasDropdown = dropdownData[item.name];
              return (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => hasDropdown && setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-white hover:text-cyan-400 transition-colors font-bold text-sm sm:text-base flex items-center gap-1.5 py-1 tracking-wide"
                  >
                    <span>{item.name}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-purple-300 group-hover:text-cyan-400 transition-colors" />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  {hasDropdown && openDropdown === item.name && (
                    <div className="absolute left-1/2 -translate-x-1/2 pt-3 top-full w-64">
                      <div className="bg-[#0a0a1e]/98 backdrop-blur-xl rounded-2xl shadow-2xl py-2 border border-purple-500/30 max-h-[70vh] overflow-y-scroll hide-scrollbar">
                        {dropdownData[item.name].map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-slate-200 hover:bg-purple-600/30 hover:text-white transition font-semibold text-xs sm:text-sm"
                          >
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ── DESKTOP RIGHT SIDE: Country Selector + Bold Contact Capsule ── */}
          <div className="hidden lg:flex items-center gap-4">
            <CountrySelector />
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-purple-900/50 hover:scale-105 transition-all duration-200"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white z-50 p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 backdrop-blur-md"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#0a0a18] z-40 transform transition-transform duration-300 lg:hidden overflow-y-auto border-l border-purple-900/40 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-24">
          {/* Mobile Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-2xl font-extrabold text-white mb-6"
          >
            Digital Adda
          </Link>

          {/* Mobile Country Selector */}
          <div className="mb-6 pb-6 border-b border-purple-900/40">
            <p className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">Select Country & Language</p>
            <CountrySelector isMobile />
          </div>

          {/* Mobile Nav Items */}
          {navItems.map((item) => {
            const hasDropdown = dropdownData[item.name];
            const isOpen = openDropdown === item.name;
            return (
              <div key={item.name} className="mb-2">
                {hasDropdown ? (
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                    className="w-full flex items-center justify-between text-left text-white hover:text-cyan-400 transition text-lg font-bold py-3"
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-between text-left text-white hover:text-cyan-400 transition text-lg font-bold py-3"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Mobile Dropdown */}
                {hasDropdown && isOpen && (
                  <div className="ml-4 mt-2 space-y-1 border-l-2 border-purple-500/30 pl-3">
                    {dropdownData[item.name].map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-slate-300 hover:text-white transition text-sm py-1.5 font-medium"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="mt-8 pt-6 border-t border-purple-900/40">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}