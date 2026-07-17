"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const steps = [
  { number: "01", title: "Discovery", desc: "We dig into your business, audience, and goals. Stakeholder interviews, competitor analysis, and a clear project brief." },
  { number: "02", title: "Strategy & Architecture", desc: "Information architecture, tech stack decisions, CMS selection, and a full wireframe blueprint before a pixel is designed." },
  { number: "03", title: "Design", desc: "High-fidelity UI in Figma. Brand-aligned, responsive across all breakpoints. You get full design review rounds." },
  { number: "04", title: "Development", desc: "We build in React / Next.js, integrating your CMS, APIs, and third-party tools. GSAP animations included by default." },
  { number: "05", title: "Launch & Optimise", desc: "QA across devices and browsers, performance audit, SEO baseline setup, then go live. We monitor Core Web Vitals post-launch." },
];

const WebDevProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    const headingSplit = SplitText.create(".wdp-heading", { type: "lines", mask: "lines" });
    splits.push(headingSplit);
    gsap.from(headingSplit.lines, {
      yPercent: 110, opacity: 0, rotationX: -12, transformOrigin: "0% 50% -60px",
      duration: 1.0, ease: "expo.out", stagger: 0.12,
      scrollTrigger: { trigger: ".wdp-heading", start: "top 82%", toggleActions: "play none none none" },
    });

    gsap.utils.toArray<HTMLElement>(".wdp-step").forEach((step, i) => {
      gsap.from(step, {
        opacity: 0, y: 40, duration: 0.8, ease: "expo.out", delay: i * 0.07,
        scrollTrigger: { trigger: step, start: "top 85%", toggleActions: "play none none none" },
      });
    });

    gsap.utils.toArray<HTMLElement>(".wdp-step-num").forEach((num) => {
      gsap.from(num, {
        opacity: 0, x: -30, scale: 0.7, duration: 0.6, ease: "back.out(1.7)",
        scrollTrigger: { trigger: num, start: "top 88%", toggleActions: "play none none none" },
      });
    });

    gsap.utils.toArray<HTMLElement>(".wdp-line").forEach((line) => {
      gsap.from(line, {
        scaleY: 0, transformOrigin: "top center", duration: 0.6, ease: "expo.out",
        scrollTrigger: { trigger: line, start: "top 85%", toggleActions: "play none none none" },
      });
    });

    return () => splits.forEach((s) => s.revert());
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-black text-white w-full py-24 overflow-hidden font-sans">
      {/* Noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative max-w-[1350px] mx-auto px-8 md:px-16">
        {/* Header */}
        <div className="mb-20">
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-[#fac02d] mb-6">Our Process</p>
          <h2 className="wdp-heading text-4xl md:text-6xl font-heading font-medium leading-tight max-w-2xl">
            How We<br />Build Sites
          </h2>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col gap-0">
          {steps.map((step, index) => (
            <div key={index} className="wdp-step relative flex gap-8 md:gap-16 pb-0">

              {/* Left column: number + connector line */}
              <div className="flex flex-col items-center flex-shrink-0 w-14 md:w-20">
                <span
                  className="wdp-step-num font-heading font-black text-4xl md:text-5xl leading-none"
                  style={{ color: "rgba(250,192,45,0.25)" }}
                >
                  {step.number}
                </span>
                {index < steps.length - 1 && (
                  <div className="wdp-line w-px flex-1 mt-4 mb-0 min-h-[60px]" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)" }} />
                )}
              </div>

              {/* Right column: content */}
              <div className="pb-16 flex-1 border-b border-white/10">
                <h3 className="font-heading font-semibold text-2xl md:text-3xl text-white mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="font-heading font-light text-white/55 leading-relaxed text-[clamp(0.9rem,1.3vw,1.1rem)] max-w-2xl">
                  {step.desc}
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
