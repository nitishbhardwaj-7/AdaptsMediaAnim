"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText, useGSAP);

const WebDevHero = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const splits: ReturnType<typeof SplitText.create>[] = [];
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.from(".wdh-rule", { scaleX: 0, transformOrigin: "left center", duration: 1.2 });
    tl.from(".wdh-label", { opacity: 0, y: 14, duration: 0.8 }, "-=0.8");

    const title1 = SplitText.create(".wdh-title-1", { type: "chars" });
    const title2 = SplitText.create(".wdh-title-2", { type: "chars" });
    splits.push(title1, title2);

    tl.from(
      title1.chars,
      { opacity: 0, yPercent: 120, rotateX: -90, stagger: 0.03, duration: 1.1, transformOrigin: "50% 100%" },
      "-=0.5"
    );
    tl.from(
      title2.chars,
      { opacity: 0, yPercent: 120, rotateX: -90, stagger: 0.03, duration: 1.1, transformOrigin: "50% 100%" },
      "-=0.9"
    );

    const sub = SplitText.create(".wdh-subtitle", { type: "lines", mask: "lines" });
    splits.push(sub);
    tl.from(
      sub.lines,
      { opacity: 0, yPercent: 110, rotationX: -12, transformOrigin: "0% 50% -60px", stagger: 0.1, duration: 1.1 },
      "-=0.7"
    );

    tl.from(".wdh-desc", { opacity: 0, y: 20, duration: 0.9 }, "-=0.6");
    tl.from(".wdh-cta", { opacity: 0, y: 16, duration: 0.8 }, "-=0.5");
    tl.from(".wdh-scroll", { opacity: 0, duration: 0.6 }, "-=0.3");

    return () => splits.forEach((s) => s.revert());
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-28"
      style={{ background: "#080808" }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full opacity-[0.18]"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)", filter: "blur(90px)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full opacity-[0.10]"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)", filter: "blur(110px)" }}
      />
      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-[1350px] w-full px-8 md:px-16">
        {/* Rule + label */}
        <div className="mb-10 flex items-center gap-5">
          <div
            className="wdh-rule h-px max-w-[120px] flex-1"
            style={{ background: "linear-gradient(to right, #C9A96E, transparent)" }}
          />
          <span className="wdh-label font-mono text-xs uppercase tracking-[0.35em]" style={{ color: "#C9A96E" }}>
            Web Development
          </span>
        </div>

        {/* Heading */}
        <div className="mb-10 overflow-hidden">
          <h1
            className="wdh-title-1 leading-[0.88] text-white"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(4rem, 10vw, 9.5rem)",
              fontWeight: 300,
            }}
          >
            Digital
          </h1>
          <h1
            className="wdh-title-2 leading-[0.88] text-white"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(4rem, 10vw, 9.5rem)",
              fontWeight: 300,
              color: "transparent",
              WebkitTextStroke: "1px rgba(201,169,110,0.7)",
            }}
          >
            Excellence
          </h1>
        </div>

        {/* Two-column lower section */}
        <div className="grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 items-end">
          <p
            className="wdh-subtitle text-white leading-snug"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              fontWeight: 300,
            }}
          >
            Precision-crafted web experiences
            <br />
            built for performance and prestige.
          </p>

          <div className="flex flex-col gap-6">
            <p
              className="wdh-desc border-l-2 pl-5 text-sm font-extralight leading-loose tracking-widest"
              style={{ borderColor: "#C9A96E", color: "rgba(255,255,255,0.5)" }}
            >
              We engineer websites that don&apos;t just look exceptional — they convert,
              perform, and scale. From headless CMS architectures to pixel-perfect
              UI, every project is built to the highest standard.
            </p>
            <div className="wdh-cta flex items-center gap-4">
              <a
                href="/start-project"
                className="inline-flex items-center gap-3 border px-7 py-3 text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-black"
                style={{ borderColor: "rgba(201,169,110,0.5)", color: "#C9A96E" }}
              >
                Start a Project
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="wdh-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="h-10 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.5))" }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(201,169,110,0.5)" }}>Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default WebDevHero;
