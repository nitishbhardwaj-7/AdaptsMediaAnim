"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into your brand, audience, and goals. We map the competitive landscape and identify what will make your digital presence unmistakable.",
  },
  {
    number: "02",
    title: "Strategy & Architecture",
    description: "Information architecture, tech stack selection, and a detailed project roadmap — agreed before a single line of code is written.",
  },
  {
    number: "03",
    title: "Design",
    description: "High-fidelity prototypes in Figma. Every screen, every state, every interaction designed and signed off before development begins.",
  },
  {
    number: "04",
    title: "Development",
    description: "Component-driven build with staging previews at every milestone. Continuous QA across devices, browsers, and accessibility standards.",
  },
  {
    number: "05",
    title: "Launch & Optimise",
    description: "Zero-downtime deployment, performance benchmarking, and 90-day post-launch support. We don't ship and disappear.",
  },
];

const WebDevProcess = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wdp-header", {
      opacity: 0, y: 30, duration: 1,
      scrollTrigger: { trigger: ".wdp-header", start: "top 80%" },
    });

    gsap.from(".wdp-step", {
      opacity: 0, x: -30, stagger: 0.15, duration: 0.9, ease: "expo.out",
      scrollTrigger: { trigger: ".wdp-list", start: "top 75%" },
    });

    gsap.from(".wdp-connector", {
      scaleY: 0, transformOrigin: "top center", stagger: 0.15, duration: 1, ease: "expo.out",
      scrollTrigger: { trigger: ".wdp-list", start: "top 70%" },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 overflow-hidden"
      style={{ background: "#080808" }}
    >
      <div
        className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] opacity-[0.08]"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 max-w-[1350px] w-full px-8 md:px-16 mx-auto">
        {/* Header */}
        <div className="wdp-header mb-20 grid grid-cols-1 min-[900px]:grid-cols-2 gap-10 items-end">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-px w-12" style={{ background: "#C9A96E" }} />
              <span className="font-mono text-xs uppercase tracking-[0.35em]" style={{ color: "#C9A96E" }}>
                Our Process
              </span>
            </div>
            <h2
              className="text-white leading-tight"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                fontWeight: 300,
              }}
            >
              How we build
              <br />
              what lasts.
            </h2>
          </div>
          <p className="text-sm font-light leading-loose tracking-wide max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
            A rigorous, transparent process that eliminates surprises. You see every step,
            approve every milestone, and get a handover so clean your team can own it from day one.
          </p>
        </div>

        {/* Steps */}
        <div className="wdp-list relative">
          {STEPS.map((step, i) => (
            <div key={step.number} className="wdp-step relative flex gap-8 items-start mb-0">
              {/* Left column — number + connector */}
              <div className="flex flex-col items-center w-14 shrink-0 pt-1">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-mono tracking-widest"
                  style={{ borderColor: "rgba(201,169,110,0.4)", color: "#C9A96E" }}
                >
                  {step.number}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="wdp-connector mt-2 w-px flex-1 min-h-[60px]"
                    style={{ background: "linear-gradient(to bottom, rgba(201,169,110,0.35), transparent)" }}
                  />
                )}
              </div>

              {/* Right column — content */}
              <div className="pb-14 flex-1">
                <h3
                  className="mb-3 text-white"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
                    fontWeight: 300,
                  }}
                >
                  {step.title}
                </h3>
                <p className="text-sm font-light leading-loose max-w-xl" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevProcess;
