"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Check, Search } from "lucide-react";

// Dom removal patch for Google Translate / React DOM reconciliation compatibility
if (typeof window !== "undefined") {
  if (Node.prototype.removeChild) {
    const originalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function (child) {
      if (child.parentNode !== this) {
        if (child.parentNode) {
          return child.parentNode.removeChild(child);
        }
        return child;
      }
      return originalRemoveChild.apply(this, arguments);
    };
  }
  if (Node.prototype.insertBefore) {
    const originalInsertBefore = Node.prototype.insertBefore;
    Node.prototype.insertBefore = function (newNode, referenceNode) {
      if (referenceNode && referenceNode.parentNode !== this) {
        if (referenceNode.parentNode) {
          return referenceNode.parentNode.insertBefore(newNode, referenceNode);
        }
        return newNode;
      }
      return originalInsertBefore.apply(this, arguments);
    };
  }
}

export const COUNTRIES = [
  { id: "IN", name: "India", flagCode: "in", flag: "🇮🇳", lang: "English", code: "en" },
  { id: "IN_HI", name: "India", flagCode: "in", flag: "🇮🇳", lang: "Hindi (हिंदी)", code: "hi" },
  { id: "US", name: "United States", flagCode: "us", flag: "🇺🇸", lang: "English", code: "en" },
  { id: "GB", name: "United Kingdom", flagCode: "gb", flag: "🇬🇧", lang: "English", code: "en" },
  { id: "AE", name: "United Arab Emirates", flagCode: "ae", flag: "🇦🇪", lang: "Arabic (العربية)", code: "ar" },
  { id: "ES", name: "Spain", flagCode: "es", flag: "🇪🇸", lang: "Spanish (Español)", code: "es" },
  { id: "FR", name: "France", flagCode: "fr", flag: "🇫🇷", lang: "French (Français)", code: "fr" },
  { id: "DE", name: "Germany", flagCode: "de", flag: "🇩🇪", lang: "German (Deutsch)", code: "de" },
  { id: "JP", name: "Japan", flagCode: "jp", flag: "🇯🇵", lang: "Japanese (日本語)", code: "ja" },
  { id: "CN", name: "China", flagCode: "cn", flag: "🇨🇳", lang: "Chinese (中文)", code: "zh-CN" },
  { id: "SG", name: "Singapore", flagCode: "sg", flag: "🇸🇬", lang: "English", code: "en" },
  { id: "CA", name: "Canada", flagCode: "ca", flag: "🇨🇦", lang: "English", code: "en" },
  { id: "AU", name: "Australia", flagCode: "au", flag: "🇦🇺", lang: "English", code: "en" },
  { id: "SA", name: "Saudi Arabia", flagCode: "sa", flag: "🇸🇦", lang: "Arabic (العربية)", code: "ar" },
  { id: "IT", name: "Italy", flagCode: "it", flag: "🇮🇹", lang: "Italian (Italiano)", code: "it" },
  { id: "BR", name: "Brazil", flagCode: "br", flag: "🇧🇷", lang: "Portuguese (Português)", code: "pt" },
  { id: "RU", name: "Russia", flagCode: "ru", flag: "🇷🇺", lang: "Russian (Русский)", code: "ru" },
];

export default function CountrySelector({ isMobile = false }) {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default India (English)
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Set Google Translate cookies
  const setTranslationCookies = (langCode) => {
    if (typeof document === "undefined") return;
    const hostname = window.location.hostname;
    const valEn = `/en/${langCode}`;
    const valAuto = `/auto/${langCode}`;

    document.cookie = `googtrans=${valEn}; path=/;`;
    document.cookie = `googtrans=${valEn}; path=/; domain=${hostname}`;
    document.cookie = `googtrans=${valAuto}; path=/;`;
    document.cookie = `googtrans=${valAuto}; path=/; domain=${hostname}`;
  };

  // Initialize Google Translate Script
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: "en,hi,ar,es,fr,de,ja,zh-CN,it,pt,ru",
          },
          "google_translate_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Load saved country from localStorage & initialize translation
  useEffect(() => {
    try {
      const saved = localStorage.getItem("digitaladda_selected_country");
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = COUNTRIES.find((c) => c.id === parsed.id);
        if (match) {
          setSelectedCountry(match);
          if (match.code !== "en") {
            setTranslationCookies(match.code);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Apply Language Translation dynamically
  const applyLanguageTranslation = (langCode) => {
    if (typeof document === "undefined") return;

    if (langCode === "en") {
      // Clear translation cookie to restore English
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;

      const selectElem = document.querySelector(".goog-te-combo");
      if (selectElem) {
        selectElem.value = "en";
        selectElem.dispatchEvent(new Event("change", { bubbles: true }));
      }
      window.location.reload();
      return;
    }

    setTranslationCookies(langCode);

    const selectElem = document.querySelector(".goog-te-combo");
    if (selectElem) {
      selectElem.value = langCode;
      selectElem.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      window.location.reload();
    }
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");

    try {
      localStorage.setItem("digitaladda_selected_country", JSON.stringify(country));
    } catch (e) {
      console.error(e);
    }

    applyLanguageTranslation(country.code);
  };

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Off-screen Google Translate Target Container */}
      <div
        id="google_translate_element"
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      <div className="relative inline-block text-left notranslate" ref={dropdownRef}>
        {/* Selected Country Badge Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-purple-950/90 via-slate-900/90 to-purple-950/90 border border-purple-500/40 text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/30 transition-all duration-200 text-xs sm:text-sm font-semibold ${
            isMobile ? "w-full justify-between" : ""
          }`}
          aria-label="Select Country and Language"
        >
          <span className="flex items-center gap-2">
            {/* High-Res Country Flag Logo */}
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.flagCode}.png`}
              srcSet={`https://flagcdn.com/w80/${selectedCountry.flagCode}.png 2x`}
              width="22"
              height="15"
              alt={selectedCountry.name}
              className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm shrink-0 border border-white/20"
            />
            <span className="font-bold text-white tracking-wide">{selectedCountry.name}</span>
            <span className="text-[11px] text-purple-300 font-normal hidden sm:inline-block">
              ({selectedCountry.lang})
            </span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-purple-300 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-cyan-400" : ""
            }`}
          />
        </button>

        {/* Country Dropdown Menu */}
        {isOpen && (
          <div
            className={`absolute ${
              isMobile ? "left-0 right-0 w-full" : "right-0 w-72"
            } mt-2 bg-[#0a0a1e]/98 border border-purple-500/30 backdrop-blur-xl rounded-2xl shadow-2xl z-50 py-3 overflow-hidden animate-in fade-in zoom-in-95 duration-150`}
          >
            {/* Search Bar */}
            <div className="px-3 pb-2 mb-2 border-b border-purple-900/40 relative">
              <Search className="w-3.5 h-3.5 text-purple-400 absolute left-6 top-3" />
              <input
                type="text"
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-purple-950/60 border border-purple-500/30 rounded-lg text-white placeholder-slate-400 text-xs focus:outline-none focus:border-purple-400"
              />
            </div>

            {/* Country List */}
            <div className="max-h-64 overflow-y-auto hide-scrollbar space-y-0.5 px-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => {
                  const isSelected = selectedCountry.id === country.id;
                  return (
                    <button
                      key={country.id}
                      type="button"
                      onClick={() => handleSelectCountry(country)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors duration-150 ${
                        isSelected
                          ? "bg-purple-600/30 text-white font-bold border border-purple-500/40"
                          : "text-slate-200 hover:bg-purple-900/40 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <img
                          src={`https://flagcdn.com/w40/${country.flagCode}.png`}
                          srcSet={`https://flagcdn.com/w80/${country.flagCode}.png 2x`}
                          width="20"
                          height="14"
                          alt={country.name}
                          className="w-4 h-3 object-cover rounded-[2px] shadow-sm shrink-0 border border-white/20"
                        />
                        <span className="font-semibold">{country.name}</span>
                        <span className="text-[10px] text-purple-300">({country.lang})</span>
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                    </button>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">No countries found</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
