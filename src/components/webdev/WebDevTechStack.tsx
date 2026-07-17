"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const row1 = ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Node.js", "Vercel"];
const row2 = ["WordPress", "Shopify", "WooCommerce", "Sanity", "Contentful", "Figma", "GraphQL", "AWS"];

const Marquee = ({ items, reverse = false }: { items: string[]; reverse?: boolean }) => (
  <div className="relative flex overflow-hidden">
    <div
      className="flex gap-0 whitespace-nowrap"
      style={{ animation: `marquee${reverse ? "Rev" : ""} 28s linear infinite` }}
    >
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center gap-0">
          <span className="font-heading font-medium text-xl md:text-2xl text-white/70 hover:text-[#fac02d] transition-colors duration-300 cursor-default px-8 py-4">
            {item}
          </span>
          <span className="text-[#fac02d] opacity-40 text-sm select-none">•</span>
        </span>
      ))}
    </div>
  </div>
);

const WebDevTechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];
    const headingSplit = SplitText.create(".wdt-heading", { type: "lines", mask: "lines" });
    splits.push(headingSplit);
    gsap.from(headingSplit.lines, {
      yPercent: 110, opacity: 0, rotationX: -12, transformOrigin: "0% 50% -60px",
      duration: 1.0, ease: "expo.out", stagger: 0.12,
      scrollTrigger: { trigger: ".wdt-heading", start: "top 82%", toggleActions: "play none none none" },
    });

    gsap.from(".wdt-tracks", {
      opacity: 0, y: 30, duration: 0.8, ease: "expo.out",
      scrollTrigger: { trigger: ".wdt-tracks", start: "top 85%", toggleActions: "play none none none" },
    });

    return () => splits.forEach((s) => s.revert());
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-[#07090d] w-full py-24 overflow-hidden font-sans">
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }
        @keyframes marqueeRev { from { transform: translateX(-33.333%); } to { transform: translateX(0); } }
      `}</style>

      {/* Yellow glow left */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[400px] w-[300px] opacity-10"
        style={{ background: "radial-gradient(circle, #fac02d 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative max-w-[1350px] mx-auto px-8 md:px-16 mb-16">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-[#fac02d] mb-6">Tech Stack</p>
        <h2 className="wdt-heading text-4xl md:text-6xl font-heading font-medium leading-tight max-w-2xl text-white">
          Tools We<br />Build With
        </h2>
      </div>

      <div className="wdt-tracks flex flex-col gap-4">
        {/* Horizontal fade masks on the sides */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10" style={{ background: "linear-gradient(to right, #07090d, transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10" style={{ background: "linear-gradient(to left, #07090d, transparent)" }} />
          <Marquee items={row1} />
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10" style={{ background: "linear-gradient(to right, #07090d, transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10" style={{ background: "linear-gradient(to left, #07090d, transparent)" }} />
          <Marquee items={row2} reverse />
        </div>
      </div>
    </section>
  );
};

export default WebDevTechStack;
