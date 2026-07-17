"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText, useGSAP);

const STATS = [
  { value: "12+", label: "Years of Excellence" },
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Brands Elevated" },
];

const ServicesHero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // Gold rule draws in
    tl.from(".sh-rule", { scaleX: 0, transformOrigin: "left center", duration: 1.2 });

    // Label fades up
    tl.from(".sh-label", { opacity: 0, y: 14, duration: 0.8 }, "-=0.8");

    // Main title — char flip
    const titleSplit = SplitText.create(".sh-title", { type: "chars" });
    splits.push(titleSplit);
    tl.from(
      titleSplit.chars,
      { opacity: 0, yPercent: 120, rotateX: -90, stagger: 0.04, duration: 1.2, transformOrigin: "50% 100%" },
      "-=0.6"
    );

    // Subtitle — line unmask
    const subtitleSplit = SplitText.create(".sh-subtitle", { type: "lines", mask: "lines" });
    splits.push(subtitleSplit);
    tl.from(
      subtitleSplit.lines,
      { opacity: 0, yPercent: 110, rotationX: -12, transformOrigin: "0% 50% -60px", stagger: 0.1, duration: 1.2 },
      "-=0.8"
    );

    // Description fade
    tl.from(".sh-desc", { opacity: 0, y: 24, duration: 1 }, "-=0.7");

    // Divider
    tl.from(".sh-divider", { scaleX: 0, transformOrigin: "left center", duration: 0.8 }, "-=0.5");

    // Stats stagger
    tl.from(".sh-stat", { opacity: 0, y: 20, stagger: 0.15, duration: 0.8 }, "-=0.4");

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center py-24"
      style={{ background: "#080808" }}
    >
      {/* Ambient gold glow — top left */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      {/* Ambient glow — bottom right */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 h-[500px] w-[500px] rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="relative z-10 max-w-[1350px] w-full px-8 md:px-16">
        {/* Gold rule + label */}
        <div className="mb-8 flex items-center gap-5">
          <div
            className="sh-rule h-px flex-1 max-w-[120px]"
            style={{ background: "linear-gradient(to right, #C9A96E, transparent)" }}
          />
          <span
            className="sh-label font-mono text-xs uppercase tracking-[0.35em]"
            style={{ color: "#C9A96E" }}
          >
            Our Services
          </span>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 gap-12 min-[1200px]:grid-cols-2 items-end">
          {/* Left — main title */}
          <div>
            <h1
              className="sh-title leading-[0.9] text-white"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(4.5rem, 10vw, 9rem)",
                fontWeight: 300,
              }}
            >
              Services
            </h1>
          </div>

          {/* Right — subtitle + desc + stats */}
          <div className="flex flex-col gap-6">
            <h2
              className="sh-subtitle text-white leading-snug"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                fontWeight: 300,
              }}
            >
              Services for all brands
              <br />
              for best results.
            </h2>

            <div
              className="sh-desc border-l-2 pl-5 text-base font-extralight leading-relaxed tracking-widest"
              style={{ borderColor: "#C9A96E", color: "rgba(255,255,255,0.55)" }}
            >
              From strategy to execution, we create integrated solutions
              that help brands connect, perform, and scale.
            </div>

            {/* Thin divider */}
            <div
              className="sh-divider h-px w-full"
              style={{ background: "linear-gradient(to right, rgba(201,169,110,0.4), transparent)" }}
            />

            {/* Stats row */}
            <div className="flex gap-10">
              {STATS.map((stat) => (
                <div key={stat.label} className="sh-stat flex flex-col gap-1">
                  <span
                    className="font-mono text-3xl font-light"
                    style={{ color: "#C9A96E" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs uppercase tracking-[0.2em]"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
