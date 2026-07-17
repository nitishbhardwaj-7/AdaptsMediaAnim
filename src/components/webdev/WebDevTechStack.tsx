"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TECH = [
  { name: "Next.js" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
  { name: "GSAP" },
  { name: "Framer Motion" },
  { name: "Node.js" },
  { name: "WordPress" },
  { name: "Sanity" },
  { name: "Shopify" },
  { name: "Figma" },
  { name: "GraphQL" },
  { name: "Vercel" },
  { name: "AWS" },
  { name: "Cloudflare" },
];

const Dot = () => (
  <span
    className="mx-8 inline-block h-1 w-1 rounded-full shrink-0"
    style={{ background: "rgba(201,169,110,0.5)" }}
  />
);

const Track = ({ reverse = false }) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.scrollWidth / 2;
    const dir = reverse ? total : -total;

    const tween = gsap.fromTo(
      el,
      { x: reverse ? -total : 0 },
      { x: dir, duration: 28, ease: "none", repeat: -1 }
    );
    return () => { tween.kill(); };
  }, [reverse]);

  const items = [...TECH, ...TECH];

  return (
    <div className="flex overflow-hidden">
      <div ref={trackRef} className="flex shrink-0 items-center whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="font-mono text-sm uppercase tracking-[0.25em] transition-colors duration-300 hover:text-[#C9A96E]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {t.name}
            </span>
            <Dot />
          </span>
        ))}
      </div>
    </div>
  );
};

const WebDevTechStack = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wdt-header", {
      opacity: 0, y: 24, duration: 1,
      scrollTrigger: { trigger: ".wdt-header", start: "top 82%" },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, #C9A96E 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative z-10 max-w-[1350px] mx-auto px-8 md:px-16 mb-14">
        <div className="wdt-header flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-12" style={{ background: "#C9A96E" }} />
            <span className="font-mono text-xs uppercase tracking-[0.35em]" style={{ color: "#C9A96E" }}>
              Tech Stack
            </span>
          </div>
          <h2
            className="text-white"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(2.2rem, 4vw, 4rem)",
              fontWeight: 300,
            }}
          >
            Built with the best tools.
          </h2>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-5 py-2">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
          style={{ background: "linear-gradient(to right, #0a0a0a, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
          style={{ background: "linear-gradient(to left, #0a0a0a, transparent)" }}
        />
        <Track />
        <Track reverse />
      </div>
    </section>
  );
};

export default WebDevTechStack;
