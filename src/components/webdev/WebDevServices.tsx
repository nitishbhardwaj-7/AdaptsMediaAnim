"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SERVICES = [
  {
    number: "01",
    title: "UI / UX Design",
    description:
      "Wireframes, prototypes, and pixel-perfect interfaces that put user experience first. Every interaction is intentional.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="4" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="20" cy="34" r="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M14 34h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M13 14l4 4 8-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Frontend Development",
    description:
      "React, Next.js, and Tailwind engineered for speed, accessibility, and flawless cross-device rendering.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M8 14l-4 6 4 6M32 14l4 6-4 6M24 10l-8 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "CMS Integration",
    description:
      "WordPress, Sanity, and headless architectures that give your team full editorial control without touching code.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="8" width="32" height="6" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="4" y="18" width="32" height="6" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="4" y="28" width="32" height="6" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="11" cy="11" r="1.5" fill="currentColor" />
        <circle cx="11" cy="21" r="1.5" fill="currentColor" />
        <circle cx="11" cy="31" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "eCommerce",
    description:
      "Shopify and WooCommerce stores optimised for conversion — from product pages to checkout and post-purchase flows.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M6 8h4l4 16h16l4-12H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="30" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="28" cy="30" r="2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Performance & SEO",
    description:
      "Core Web Vitals, Lighthouse scores, structured data, and technical SEO baked in from day one — not bolted on after.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.2" />
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M15 20l3 3 7-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Headless & API",
    description:
      "Decoupled front-ends powered by custom APIs, GraphQL, and REST — unlocking speed and flexibility at any scale.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="4" y="14" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="24" y="14" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 20h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const WebDevServices = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wds-header", {
      opacity: 0, y: 30, duration: 1,
      scrollTrigger: { trigger: ".wds-header", start: "top 80%" },
    });

    gsap.from(".wds-card", {
      opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: "expo.out",
      scrollTrigger: { trigger: ".wds-grid", start: "top 75%" },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Subtle divider top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[60%]"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)" }}
      />

      <div className="relative z-10 max-w-[1350px] w-full px-8 md:px-16 mx-auto">
        {/* Header */}
        <div className="wds-header mb-16 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
            <span className="font-mono text-xs uppercase tracking-[0.35em]" style={{ color: "#C9A96E" }}>
              What We Build
            </span>
          </div>
          <h2
            className="text-white leading-tight max-w-xl"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 300,
            }}
          >
            Every discipline.
            <br />
            One standard of craft.
          </h2>
        </div>

        {/* Services grid */}
        <div className="wds-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px" style={{ border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.05)" }}>
          {SERVICES.map((svc) => (
            <div
              key={svc.number}
              className="wds-card group relative flex flex-col gap-5 p-8 transition-all duration-500"
              style={{ background: "#0a0a0a" }}
            >
              {/* Gold hover fill */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(201,169,110,0.06) 0%, transparent 70%)" }}
              />
              <div className="relative z-10 flex flex-col gap-5">
                {/* Number + icon */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-[0.3em]" style={{ color: "rgba(201,169,110,0.5)" }}>
                    {svc.number}
                  </span>
                  <span style={{ color: "rgba(201,169,110,0.6)" }} className="transition-colors duration-300 group-hover:text-[#C9A96E]">
                    {svc.icon}
                  </span>
                </div>
                {/* Title */}
                <h3
                  className="text-white text-lg font-light tracking-wide transition-colors duration-300 group-hover:text-[#C9A96E]"
                  style={{ letterSpacing: "0.03em" }}
                >
                  {svc.title}
                </h3>
                {/* Description */}
                <p className="text-sm font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {svc.description}
                </p>
                {/* Bottom rule — reveals on hover */}
                <div
                  className="h-px w-0 transition-all duration-700 group-hover:w-full"
                  style={{ background: "linear-gradient(to right, #C9A96E, transparent)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevServices;
