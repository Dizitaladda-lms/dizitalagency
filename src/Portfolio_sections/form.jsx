

import { useState, useRef } from "react";
import { Listbox } from "@headlessui/react";
import "../../styles/scrollbar.css";


export default function PortfolioProjectForm() {
  const serviceOptions = [
    { value: '', label: 'Select a service' },
    { value: 'branding', label: 'Branding' },
    { value: 'web-design', label: 'Web Design' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'ui-ux', label: 'UI/UX Design' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'seo', label: 'SEO & Content' },
    { value: 'social-media', label: 'Social Media Marketing' },
    { value: 'other', label: 'Other' }
  ];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceOptions[0],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  const downloadRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (option) => {
    setFormData({ ...formData, service: option });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service?.value || "General Inquiry",
          message: formData.message,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResult("Form Submitted Successfully! You can now download the portfolio PDF.");
        setFormData({ name: '', email: '', phone: '', service: serviceOptions[0], message: '' });
        setDownloadReady(true);
      } else {
        setResult(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setResult("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-2xl mt-20 shadow-2xl border border-purple-700/30 mt-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-purple-300 mb-2">
          Start Your Project
        </h2>
        <p className="text-gray-300 text-base">
          Share your project details and we’ll get in touch!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">Full Name *</label>
            <input type="text" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-purple-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm" />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Email Address *</label>
            <input type="email" name="email" required placeholder="john@example.com" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-purple-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm" />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
            <input type="tel" name="phone" placeholder="+91 **********" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-purple-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm" />
          </div>
          <div>
            <label className="block text-white text-sm font-medium mb-2">Service Interested In *</label>
            <Listbox value={formData.service} onChange={handleServiceChange} name="service" as="div">
              <div className="relative">
                <Listbox.Button className="w-full px-4 py-2.5 bg-purple-900/50 border border-purple-500/30 rounded-xl text-white text-left focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition text-sm">
                  {formData.service.label}
                </Listbox.Button>
                <Listbox.Options className="absolute left-0 w-full mt-2 bg-[#0d0b24] border border-purple-500/40 rounded-xl shadow-2xl max-h-60 overflow-y-auto focus:outline-none custom-scrollbar z-50">
                  {serviceOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      className={({ active, selected }) =>
                        `cursor-pointer select-none px-4 py-2 transition-colors ${
                          active ? 'bg-purple-700/40 text-white' : selected ? 'bg-purple-800/30 text-purple-200' : 'text-gray-200'
                        }`
                      }
                    >
                      {option.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
        <div>
          <label className="block text-white text-sm font-medium mb-2">Project Details</label>
          <textarea name="message" rows="4" required placeholder="Describe your project requirements..." value={formData.message} onChange={handleChange} className="w-full px-4 py-2.5 bg-purple-900/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none text-sm"></textarea>
        </div>
        {result && (
          <div className={`p-4 rounded-xl text-center font-medium ${
            result.includes("Successfully")
              ? "bg-green-500/20 text-green-300 border border-green-500/30"
              : result.includes("Sending")
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              : "bg-red-500/20 text-red-300 border border-red-500/30"
          }`}>
            {result}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-white shadow-lg hover:scale-[1.02] transition-transform duration-300 text-base flex items-center justify-center gap-3 disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Sending...
            </>
          ) : (
            <>Send Project Request</>
          )}
        </button>
      </form>
      {downloadReady && (
        <div className="text-center mt-6">
          <a
            href="/portfolio.pdf"
            download
            ref={downloadRef}
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-semibold text-white shadow-lg hover:scale-[1.03] transition-transform duration-300 text-base mt-2"
          >
            Download Portfolio PDF
          </a>
        </div>
      )}
    </div>
  );
}
