"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  Instagram,
  Linkedin,
  Facebook,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
} from "lucide-react";

function FadeIn({ children, delay = 0, y = 24, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const serviceOptions = [
  "Search Engine Optimization (SEO)",
  "Website Designing & Development",
  "Social Media Marketing",
  "Pay Per Click (PPC Ads)",
  "Graphic Design & Branding",
  "Professional Video Editing",
  "Influencer & PR Marketing",
  "Complete Digital Growth",
];

const faqs = [
  {
    q: "How quickly will your team respond to my inquiry?",
    a: "We usually respond within 2 to 4 business hours with an initial audit or discovery call invitation.",
  },
  {
    q: "Do you provide custom tailored packages?",
    a: "Yes! Every business has unique goals. We craft customized digital strategies aligned with your specific ROI targets.",
  },
  {
    q: "Can we schedule an in-person meeting at your office?",
    a: "Absolutely. You are welcome to visit our office in Greater Kailash II, New Delhi during our working hours (10:00 AM – 6:00 PM).",
  },
  {
    q: "Is my business information and project details confidential?",
    a: "100% confidential. We respect client privacy and are happy to sign an NDA before getting started.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (service) => {
    setFormData({ ...formData, service });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending your request...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service || "General Inquiry",
          budget: formData.budget || "Not Specified",
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setResult(data.message || "Thank you! Your message has been sent successfully.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        });
      } else {
        setIsSuccess(false);
        setResult(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setIsSuccess(false);
      setResult("Failed to send message. Please check your network or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070714] text-gray-100 selection:bg-purple-600 selection:text-white pt-24 pb-20 overflow-hidden relative">
      {/* Background Glow Effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-700/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-96 -left-32 w-[400px] h-[400px] bg-indigo-700/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-[500px] h-[500px] bg-purple-900/15 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HERO SECTION */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-6 shadow-inner">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>Ready to scale your brand?</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Let’s Build Something <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Extraordinary Together
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
            Have a project in mind, need expert growth marketing guidance, or ready to 10x your online revenue? We’re just a message away.
          </p>
        </FadeIn>

        {/* MAIN CONTENT: CONTACT INFO + FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-24">
          
          {/* LEFT: Contact Cards (5 Columns) */}
          <FadeIn delay={0.1} className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#0e0c24]/80 backdrop-blur-xl border border-purple-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                Direct Channels
              </h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Connect with our team directly for instant support, project consultations, or office visits.
              </p>

              {/* Direct Info Items */}
              <div className="space-y-4">
                
                {/* Phone */}
                <a
                  href="tel:09355121681"
                  className="flex items-start gap-4 p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 hover:border-purple-500/50 hover:bg-purple-900/30 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-purple-600/20 text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">Phone / WhatsApp</span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                      +91 93551 21681
                    </span>
                    <span className="text-xs text-green-400 block mt-0.5">● Available Mon – Sat</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:Info@digitaladdagagency.com"
                  className="flex items-start gap-4 p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 hover:border-purple-500/50 hover:bg-purple-900/30 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-pink-600/20 text-pink-400 group-hover:bg-pink-600 group-hover:text-white transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">Official Email</span>
                    <span className="text-sm sm:text-base font-semibold text-white group-hover:text-purple-300 transition-colors truncate block">
                      Info@digitaladdagagency.com
                    </span>
                    <span className="text-xs text-purple-300 block mt-0.5">Quick reply in 2–4 hours</span>
                  </div>
                </a>

                {/* Office */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-950/30 border border-purple-800/30">
                  <div className="p-3 rounded-lg bg-indigo-600/20 text-indigo-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">Headquarters</span>
                    <p className="text-xs sm:text-sm text-gray-200 mt-0.5 leading-relaxed">
                      Ground Complex, Spacetime LGF, Building No. 1, Desein House, Behind Savitri Cinema, Greater Kailash II, New Delhi - 110048
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-950/30 border border-purple-800/30">
                  <div className="p-3 rounded-lg bg-cyan-600/20 text-cyan-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold block">Business Hours</span>
                    <p className="text-xs sm:text-sm text-gray-200 mt-0.5">
                      Monday – Saturday: <span className="text-white font-medium">10:00 AM – 6:00 PM</span>
                    </p>
                    <span className="text-xs text-gray-400 block">Sunday: Closed</span>
                  </div>
                </div>

              </div>

              {/* Social Channels */}
              <div className="mt-8 pt-6 border-t border-purple-900/40">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-3">
                  Follow Us Online
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <a
                    href="https://www.instagram.com/digitaladdaagency/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 hover:border-pink-500/50 hover:bg-pink-600/10 transition-all text-center group"
                  >
                    <Instagram className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform mb-1" />
                    <span className="text-xs text-gray-300 font-medium">Instagram</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/digitaladda-agency-283322372/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 hover:border-blue-500/50 hover:bg-blue-600/10 transition-all text-center group"
                  >
                    <Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform mb-1" />
                    <span className="text-xs text-gray-300 font-medium">LinkedIn</span>
                  </a>

                  <a
                    href="https://www.facebook.com/profile.php?id=61571980529782"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-purple-950/40 border border-purple-800/30 hover:border-indigo-500/50 hover:bg-indigo-600/10 transition-all text-center group"
                  >
                    <Facebook className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform mb-1" />
                    <span className="text-xs text-gray-300 font-medium">Facebook</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Privacy Guarantee */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-900/20 to-indigo-900/20 border border-purple-700/20 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-purple-400 shrink-0" />
              <p className="text-xs text-gray-300 leading-snug">
                <strong className="text-white">Privacy Guarantee:</strong> We never share your details. Your project inquiry is protected under strict confidentiality.
              </p>
            </div>

          </FadeIn>

          {/* RIGHT: Lead Inquiry Form (7 Columns) */}
          <FadeIn delay={0.2} className="lg:col-span-7">
            <div className="bg-[#0e0c24]/90 backdrop-blur-xl border border-purple-800/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Project Inquiry
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Tell Us About Your Project
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Fill out the form below and receive a detailed growth proposal and audit.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. John Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#151236]/80 border border-purple-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#151236]/80 border border-purple-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                    />
                  </div>
                </div>

                {/* Phone & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#151236]/80 border border-purple-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Estimated Monthly Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#151236]/80 border border-purple-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm"
                    >
                      <option value="" className="bg-[#0e0c24] text-gray-400">Select budget range</option>
                      <option value="₹25,000 – ₹50,000" className="bg-[#0e0c24]">₹25,000 – ₹50,000</option>
                      <option value="₹50,000 – ₹1,00,000" className="bg-[#0e0c24]">₹50,000 – ₹1,00,000</option>
                      <option value="₹1,00,000 – ₹3,00,000" className="bg-[#0e0c24]">₹1,00,000 – ₹3,00,000</option>
                      <option value="₹3,00,000+" className="bg-[#0e0c24]">₹3,00,000+</option>
                    </select>
                  </div>
                </div>

                {/* Service Selection Pills */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Service Interested In
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((srv) => {
                      const isSelected = formData.service === srv;
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => handleServiceSelect(srv)}
                          className={`text-xs px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/30"
                              : "bg-[#151236]/60 text-gray-300 border-purple-900/50 hover:border-purple-600/60 hover:text-white"
                          }`}
                        >
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Project Details & Goals *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your business goals and what you need help with..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#151236]/80 border border-purple-800/40 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none text-sm"
                  />
                </div>

                {/* Live Result Notification */}
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-sm font-medium flex items-center gap-3 ${
                      isSuccess
                        ? "bg-green-500/15 text-green-300 border border-green-500/30"
                        : "bg-red-500/15 text-red-300 border border-red-500/30"
                    }`}
                  >
                    {isSuccess ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-green-400" />
                    ) : (
                      <HelpCircle className="w-5 h-5 shrink-0 text-red-400" />
                    )}
                    <span>{result}</span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-xl shadow-purple-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Project Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-2">
                  ⚡ Average response time: <strong className="text-purple-300">Under 2 hours</strong> (during business days)
                </p>

              </form>
            </div>
          </FadeIn>

        </div>

        {/* FAQ SECTION */}
        <FadeIn delay={0.3} className="max-w-4xl mx-auto mt-16 pt-12 border-t border-purple-900/30">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-400 text-sm">
              Quick answers about working with DigitalAdda Agency.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-purple-900/40 bg-[#0e0c24]/60 backdrop-blur-md overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 text-white font-semibold hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <span className={`text-purple-400 text-xl font-light transform transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-sm text-gray-300 leading-relaxed border-t border-purple-900/20">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </FadeIn>

      </div>
    </div>
  );
}