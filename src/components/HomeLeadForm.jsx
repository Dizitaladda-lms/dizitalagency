"use client";

import { useState } from "react";

export default function HomeLeadForm({ services }) {
  const [status, setStatus] = useState({ message: "", success: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ message: "Sending your request…", success: false });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus({
          message: result.error || "We couldn't send your request. Please try again.",
          success: false,
        });
        return;
      }

      form.reset();
      setStatus({
        message:
          result.message || "Thanks! Our team will be in touch shortly.",
        success: true,
      });
    } catch {
      setStatus({
        message:
          "We couldn't connect. Please try again or call us at +91 93551 21681.",
        success: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "w-full rounded-lg border border-white/15 bg-[#08001a]/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-300";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Name
        <input
          className={fieldClass}
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
          maxLength={100}
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Email
        <input
          className={fieldClass}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Phone
        <input
          className={fieldClass}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+91"
        />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        Service
        <select className={fieldClass} name="service" defaultValue="" required>
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((service) => (
            <option key={service} value={service} className="bg-[#100b24]">
              {service}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-200 sm:col-span-2">
        What would you like to grow?
        <textarea
          className={`${fieldClass} min-h-24 resize-y`}
          name="message"
          placeholder="Tell us briefly about your goals."
          required
          maxLength={3000}
        />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-fuchsia-500 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-fuchsia-400 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Sending…" : "Request my free audit"}
        </button>
        <p
          aria-live="polite"
          className={`mt-3 min-h-5 text-sm ${
            status.success ? "text-emerald-300" : "text-slate-300"
          }`}
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}
