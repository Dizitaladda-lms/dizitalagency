"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Auto-open popup after 1 minute
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupOpen(true);
    }, 60000); // 60000ms = 1 minute

    return () => clearTimeout(timer);
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || '',
      service: formData.get('service') || 'General Inquiry',
      message: formData.get('message') || 'Popup Inquiry',
    };
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('Popup lead submit error:', err);
    }
    
    // Show success message
    setShowSuccess(true);
    
    // Auto close after 3 seconds
    setTimeout(() => {
      setPopupOpen(false);
      setShowSuccess(false);
      e.target?.reset?.();
    }, 3000);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070714] shadow-lg border-b border-purple-900/40">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {!imageError ? (
              <img
                src="/DAFINAL.png"
                alt="Digital Adda"
                className="h-15 w-auto ml-10 md:ml-18 scale-300 md:scale-400"
                onError={() => setImageError(true)}
              />
            ) : (
              <span className="text-2xl font-bold text-white">Digital Adda</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
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
                    className="text-white hover:text-purple-300 transition font-medium flex items-center gap-1 py-2"
                  >
                    <span className="text-white">{item.name}</span>
                    {hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-white" />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  {hasDropdown && openDropdown === item.name && (
                    <div className="absolute left-1/2 -translate-x-1/2 pt-0 top-full w-64">
                      <div className="bg-gray-900/98 backdrop-blur-sm rounded-lg shadow-2xl py-2 border border-purple-500/20 max-h-[70vh] overflow-y-scroll hide-scrollbar">
                        {dropdownData[item.name].map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2.5 text-white hover:bg-purple-600/20 hover:text-purple-300 transition text-sm"
                          >
                            <span className="text-white">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-white shadow-lg hover:scale-105 transition-all duration-300"
          >
            Get in touch
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white z-50 relative"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#0a0a18] z-40 transform transition-transform duration-300 lg:hidden overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-30">
          {/* Mobile Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-2xl font-bold text-white mb-8"
          >
            Digital Adda
          </Link>

          {/* Mobile Nav Items */}
          {navItems.map((item) => {
            const hasDropdown = dropdownData[item.name];
            const isOpen = openDropdown === item.name;
            return (
              <div key={item.name} className="mb-2">
                {hasDropdown ? (
                  <button
                    onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                    className="w-full flex items-center justify-between text-left text-white hover:text-purple-300 transition text-lg font-medium py-3"
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
                    className="w-full flex items-center justify-between text-left text-white hover:text-purple-300 transition text-lg font-medium py-3"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Mobile Dropdown */}
                {hasDropdown && isOpen && (
                  <div className="ml-4 mt-2 space-y-1">
                    {dropdownData[item.name].map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-white hover:text-purple-400 transition text-sm"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Mobile CTA */}
          <div className="mt-8">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold text-white shadow-2xl shadow-purple-500/50 hover:scale-105 transition-all duration-300 text-center"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>

      {/* POPUP FORM OVERLAY - RESPONSIVE LANDSCAPE/VERTICAL */}
      {popupOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setPopupOpen(false);
              setShowSuccess(false);
            }
          }}
        >
          {/* Container - wider on desktop, narrow on mobile */}
          <div className="w-full max-w-md md:max-w-3xl lg:max-w-4xl max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="bg-gray-900 rounded-3xl p-6 md:p-8 relative border border-purple-500/30 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={() => {
                  setPopupOpen(false);
                  setShowSuccess(false);
                }}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 hover:rotate-90 z-10"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {!showSuccess ? (
                <>
                  <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-300 mb-2">
                      Get Free Consultation
                    </h2>
                    <p className="text-gray-300 text-sm md:text-base">
                      Let's discuss how we can help grow your business
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Grid layout: 1 column on mobile, 2 columns on desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-2.5 md:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="john@example.com"
                          className="w-full px-4 py-2.5 md:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+91 **********"
                          className="w-full px-4 py-2.5 md:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                        />
                      </div>

                      {/* Service */}
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">
                          Service Interested In *
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            required
                            className="w-full px-4 py-2.5 md:py-3 pr-10 bg-[#120e2e]/90 border border-purple-500/40 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30 transition appearance-none text-sm cursor-pointer"
                          >
                            <option value="" className="bg-[#0e0c24] text-gray-400">Select a service</option>
                            <option value="Search Engine Optimization (SEO)" className="bg-[#0e0c24] text-white py-1">Search Engine Optimization (SEO)</option>
                            <option value="Website Designing & Development" className="bg-[#0e0c24] text-white py-1">Website Designing & Development</option>
                            <option value="Social Media Marketing" className="bg-[#0e0c24] text-white py-1">Social Media Marketing</option>
                            <option value="Pay Per Click (PPC Ads)" className="bg-[#0e0c24] text-white py-1">Pay Per Click (PPC Ads)</option>
                            <option value="Graphic Design & Branding" className="bg-[#0e0c24] text-white py-1">Graphic Design & Branding</option>
                            <option value="Professional Video Editing" className="bg-[#0e0c24] text-white py-1">Professional Video Editing</option>
                            <option value="Local SEO & Google Maps" className="bg-[#0e0c24] text-white py-1">Local SEO & Google Maps</option>
                            <option value="Influencer & PR Marketing" className="bg-[#0e0c24] text-white py-1">Influencer & PR Marketing</option>
                            <option value="Other Growth Services" className="bg-[#0e0c24] text-white py-1">Other Growth Services</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-purple-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Message - Full width */}
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Tell us about your project
                      </label>
                      <textarea
                        name="message"
                        rows="3"
                        placeholder="Describe your requirements..."
                        className="w-full px-4 py-2.5 md:py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none text-sm"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-white shadow-lg hover:scale-[1.02] transition-transform duration-300 text-sm md:text-base"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 md:py-12">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl md:text-4xl text-white">✓</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-gray-300 text-sm md:text-base px-2">
                    We've received your message and will get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/9355121681"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
      >
        <img className="w-8 h-8" src="/social.png" alt="WhatsApp" />
	  </a>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}