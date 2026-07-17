"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import YellowButton from "../buttons/YellowButton";
import ArrowButton from "../buttons/ArrowButton";

gsap.registerPlugin(SplitText, useGSAP);

const WebDevHero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const splits: ReturnType<typeof SplitText.create>[] = [];
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    const line1 = SplitText.create(".wdh-line-1", { type: "chars" });
    const line2 = SplitText.create(".wdh-line-2", { type: "chars" });
    splits.push(line1, line2);

    tl.from(line1.chars, {
      opacity: 0, yPercent: 110, stagger: 0.025, duration: 1.0,
    });
    tl.from(line2.chars, {
      opacity: 0, yPercent: 110, stagger: 0.025, duration: 1.0,
    }, "-=0.85");
    tl.from(".wdh-desc", { opacity: 0, y: 28, duration: 0.9 }, "-=0.6");
    tl.from(".wdh-cta > *", { opacity: 0, y: 18, stagger: 0.1, duration: 0.7 }, "-=0.5");
    tl.from(".wdh-scroll", { opacity: 0, duration: 0.5 }, "-=0.3");

    return () => splits.forEach((s) => s.revert());
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-28 bg-black"
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Blue glow accent */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] opacity-20"
        style={{ background: "radial-gradient(circle, #064ED3 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="relative z-10 max-w-[1350px] w-full px-8 md:px-16">

        {/* Label */}
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-[#fac02d] mb-8">
          Web Development
        </p>

        {/* Main heading */}
        <div className="overflow-hidden mb-2">
          <h1
            className="wdh-line-1 font-heading font-extralight text-white uppercase leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)" }}
          >
            We Build
          </h1>
        </div>
        <div className="overflow-hidden mb-12">
          <h1
            className="wdh-line-2 font-heading font-black italic uppercase leading-[0.9] tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.5rem, 11vw, 11rem)", color: "#fac02d" }}
          >
            Web Experiences
          </h1>
        </div>

        {/* Two-col lower */}
        <div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 items-end">
          <p
            className="wdh-desc font-heading font-light text-white/60 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.25rem)" }}
          >
            From pixel-perfect interfaces to headless architectures — we engineer
            digital products that perform, convert, and scale. Every site we build
            is fast, accessible, and built to last.
          </p>

          <div className="wdh-cta flex flex-wrap items-center gap-5">
            <YellowButton title="Start a Project" variant="blue" href="/start-project" />
            <ArrowButton title="View Our Work" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="wdh-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-10 w-px bg-gradient-to-b from-transparent to-white/30" />
          <span className="font-heading text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default WebDevHero;
