"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const WebDevCTA = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const splits: ReturnType<typeof SplitText.create>[] = [];

    const tl = gsap.timeline({
      scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
    });

    tl.from(".wdc-rule", { scaleX: 0, transformOrigin: "left center", duration: 1 });
    tl.from(".wdc-label", { opacity: 0, y: 10, duration: 0.7 }, "-=0.5");

    const heading = SplitText.create(".wdc-heading", { type: "lines", mask: "lines" });
    splits.push(heading);
    tl.from(
      heading.lines,
      { opacity: 0, yPercent: 110, rotationX: -12, transformOrigin: "0% 50% -60px", stagger: 0.12, duration: 1.1, ease: "expo.out" },
      "-=0.4"
    );

    tl.from(".wdc-sub", { opacity: 0, y: 20, duration: 0.9 }, "-=0.6");
    tl.from(".wdc-btn", { opacity: 0, y: 14, stagger: 0.1, duration: 0.8 }, "-=0.5");

    return () => splits.forEach((s) => s.revert());
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-36 overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Ambient top centre */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[800px] opacity-[0.12]"
        style={{ background: "radial-gradient(ellipse, #C9A96E 0%, transparent 65%)", filter: "blur(70px)" }}
      />
      {/* Top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[70%]"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)" }}
      />

      <div className="relative z-10 max-w-[1350px] mx-auto px-8 md:px-16 text-center">
        {/* Rule + label */}
        <div className="mb-10 flex items-center justify-center gap-5">
          <div
            className="wdc-rule h-px flex-1 max-w-[100px]"
            style={{ background: "linear-gradient(to right, transparent, #C9A96E)" }}
          />
          <span className="wdc-label font-mono text-xs uppercase tracking-[0.35em]" style={{ color: "#C9A96E" }}>
            Let&apos;s Build
          </span>
          <div
            className="wdc-rule h-px flex-1 max-w-[100px]"
            style={{ background: "linear-gradient(to left, transparent, #C9A96E)" }}
          />
        </div>

        <h2
          className="wdc-heading mx-auto mb-8 text-white leading-tight"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 300,
            maxWidth: "900px",
          }}
        >
          Ready to build something
          <br />
          truly premium?
        </h2>

        <p
          className="wdc-sub mx-auto mb-12 text-sm font-extralight leading-loose tracking-widest max-w-lg"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Tell us about your project and we&apos;ll come back with a detailed proposal
          within 48 hours — no obligation, no generic pitch deck.
        </p>

        <div className="flex items-center justify-center gap-5 flex-wrap">
          <Link
            href="/start-project"
            className="wdc-btn inline-flex items-center gap-3 border px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-400 hover:bg-[#C9A96E] hover:border-[#C9A96E] hover:text-black"
            style={{ borderColor: "#C9A96E", color: "#C9A96E" }}
          >
            Start a Project
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/contact"
            className="wdc-btn inline-flex items-center gap-3 px-10 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-400 hover:text-[#C9A96E]"
            style={{ color: "rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.15)" }}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WebDevCTA;
