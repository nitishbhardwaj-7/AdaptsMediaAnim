"use client";

import Image from "next/image";
import { useState } from "react";

const ContactFormSection = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/images/ContactSectionBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20 w-full relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">

        {/* Left Side Content */}
        <div className="flex-1 flex flex-col w-full text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">Free Consultation</h2>
          <p className="text-white/80 text-base md:text-lg max-w-md leading-relaxed mb-12">
            Whether you&apos;re launching a new brand, scaling your business, or looking for a strategic marketing partner, we&apos;re ready to help.
          </p>

          <div className="relative w-full max-w-[400px] aspect-square mx-auto lg:mx-0">
            <Image
              src="/images/ContactStarPattern.png"
              alt="Star Pattern"
              fill
              className="object-contain opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
              <Image
                src="/images/ContactRocket.png"
                alt="Rocket"
                width={350}
                height={350}
                className="object-contain drop-shadow-2xl hover:-translate-y-4 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 w-full max-w-2xl lg:ml-auto">
          <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-8 md:p-10 shadow-2xl">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <div className="text-4xl">🎉</div>
                <h3 className="text-white text-2xl font-bold">Message Sent!</h3>
                <p className="text-white/70">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 px-6 py-2 rounded-full bg-[#f5b800] text-black text-sm font-semibold hover:bg-[#f5b800]/80 transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-white text-sm font-medium ml-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter Full Name"
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800]"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-white text-sm font-medium ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="example@domain.com"
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800]"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-white text-sm font-medium ml-1">Phone</label>
                    <div className="relative flex items-center bg-[#F0F0F0] rounded-full p-[4px]">
                      <div className="bg-white text-gray-500 text-xs px-4 py-2 rounded-full font-medium shrink-0 shadow-sm">+971</div>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="58 560 1701"
                        className="w-full bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-white text-sm font-medium ml-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800]"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-white text-sm font-medium ml-1">Subject</label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800] appearance-none cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      <option value="seo">SEO Services</option>
                      <option value="web">Web Development</option>
                      <option value="social">Social Media Marketing</option>
                      <option value="performance">Performance Marketing</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-black">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Row 4 — textarea */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-white text-sm font-medium ml-1">Leave us a message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Please type your message here..."
                    className="w-full bg-[#F0F0F0] rounded-2xl px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800] resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#f5b800] hover:bg-[#f5b800]/80 disabled:opacity-60 text-black font-semibold text-sm py-4 rounded-full transition-colors duration-300"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactFormSection;
