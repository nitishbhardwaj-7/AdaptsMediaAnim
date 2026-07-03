"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import StatsCard from "../cards/StatCard";
import ArrowButton from "../buttons/ArrowButton";
import YellowButton from "../buttons/YellowButton";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const OrangeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // ── 1. Main heading — SplitText line mask reveal ──────────────────────
    const headingSplit = SplitText.create(".orange-heading", {
      type: "lines",
      mask: "lines",
    });
    splits.push(headingSplit);

    gsap.from(headingSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -12,
      transformOrigin: "0% 50% -60px",
      duration: 1.0,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".orange-heading",
        start: "top 82%",
        toggleActions: "play none none none",
      },
    });

    // ── 2. Subheading word reveal ─────────────────────────────────────────
    const subSplit = SplitText.create(".orange-subheading", {
      type: "words",
      mask: "words",
    });
    splits.push(subSplit);

    gsap.from(subSplit.words, {
      yPercent: 100,
      opacity: 0,
      duration: 0.65,
      ease: "expo.out",
      stagger: 0.04,
      scrollTrigger: {
        trigger: ".orange-subheading",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // ── 3. Body paragraphs fade-up ────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".orange-body").forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });

    // ── 4. Gold quote line — simple reveal to preserve gradient text clipping ──
    gsap.from(".orange-quote", {
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".orange-quote",
        start: "top 86%",
        toggleActions: "play none none none",
      },
    });

    // ── 5. CTA buttons fade-up ────────────────────────────────────────────
    gsap.from(".orange-cta > *", {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      clearProps: "all",
      scrollTrigger: {
        trigger: ".orange-cta",
        start: "top 95%",
        toggleActions: "play none none none",

      },
    });

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const cleanups: (() => void)[] = [];

    if (!isMobile && sectionRef.current) {
      const goldBtn = sectionRef.current.querySelector<HTMLElement>(".btn-start-project");
      if (goldBtn) {
        // Slow, heavy lag — button trails the cursor like a weighted magnet
        const gxTo = gsap.quickTo(goldBtn, "x", { duration: 0.7, ease: "power1.out" });
        const gyTo = gsap.quickTo(goldBtn, "y", { duration: 0.7, ease: "power1.out" });
        const onMove = (e: MouseEvent) => {
          const r = goldBtn.getBoundingClientRect();
          // Increase displacement from 0.3 to 0.55 so the button follows further
          gxTo((e.clientX - r.left - r.width / 2) * 0.55);
          gyTo((e.clientY - r.top - r.height / 2) * 0.55);
        };
        const onLeave = () => { gxTo(0); gyTo(0); };
        goldBtn.addEventListener("mousemove", onMove);
        goldBtn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          goldBtn.removeEventListener("mousemove", onMove);
          goldBtn.removeEventListener("mouseleave", onLeave);
        });
      }
      // 3D Stats Card Tilt Effect (Desktop only)
      const cards = sectionRef.current.querySelectorAll<HTMLElement>(".stats-card-3d");
      
      // Initialize 3D defaults once to prevent first-hover jump or recalculation flicker
      gsap.set(cards, {
        transformPerspective: 1000,
        transformOrigin: "center center",
        rotateX: 0,
        rotateY: 0,
        z: 0,
        scale: 1
      });

      cards.forEach((card) => {
        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          // Max rotation: 15 degrees
          const rotateX = -(y / (rect.height / 2)) * 15;
          const rotateY = (x / (rect.width / 2)) * 15;
          
          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            z: 25,
            scale: 1.04,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
          });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto"
          });
        };

        card.addEventListener("mousemove", onMouseMove);
        card.addEventListener("mouseleave", onMouseLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMouseMove);
          card.removeEventListener("mouseleave", onMouseLeave);
        });
      });
    }

    // Stats Cards 3D entrance (ScrollTrigger based)
    gsap.from(".stats-card-3d", {
      opacity: 0,
      y: 70,
      rotationX: 35,
      rotationY: -15,
      z: -100,
      transformPerspective: 1000,
      duration: 1.2,
      stagger: 0.12,
      ease: "expo.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: ".stats-card-3d",
        start: "top 92%",
        toggleActions: "play none none none",
      }
    });

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      splits.forEach((s) => s.revert());
      cleanups.forEach((fn) => fn());
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-x-hidden flex items-center justify-center bg-[#c42a27] text-white py-20"
    >
      <Image
        src="/images/About_Us_Bg.png"
        alt="Background"
        fill
        priority
        sizes="100vw"
        quality={80}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-10 top-1/2 -translate-y-1/2 right-0 w-[50%] h-[70%] object-cover opacity-30 mix-blend-multiply pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 80%)",
        }}
      >
        <source src="/assets/video_bg2.mp4" type="video/mp4" />
      </video>

      <div className="relative z-20 max-w-[1350px] px-8 md:px-16">

        {/* Main Heading */}
        <h1 className="orange-heading text-[clamp(1.5rem,3.2vw,4rem)] font-extralight mb-6 md:mb-8 tracking-wider leading-tight">
          A New-Age Agency <br /> Built for Today&apos;s Brands
        </h1>

        <div className="flex flex-col min-[1200px]:flex-row justify-between gap-8 md:gap-16">

          {/* LEFT COLUMN */}
          <div className="flex flex-col w-full min-[1200px]:w-[58%]">
            <div className="w-full">

              <h2 className="orange-subheading text-[clamp(1rem,1.6vw,1.67rem)] mb-4 md:mb-6 text-gray-200 font-normal font-sans">
                We combine <strong>strategy</strong>, <strong>creativity</strong>, and <strong>technology</strong> to <br className="hidden md:block" /> deliver <strong>marketing</strong> that performs not just looks good.
              </h2>

              <p className="orange-body text-[clamp(0.85rem,1.1vw,1.05rem)] mb-4 opacity-90 font-thin">
                In today&apos;s fast-moving <strong>digital landscape</strong>, visibility alone isn&apos;t enough. Brands <br className="hidden md:block" /> need <strong>clarity</strong>, <strong>consistency</strong>, and <strong>performance</strong> at every touchpoint.
              </p>

              <p className="orange-body text-[clamp(0.85rem,1.1vw,1.05rem)] mb-6 md:mb-8 font-thin">
                <span className="opacity-90">We are a new-generation agency built to bridge that gap — bringing together </span><br className="hidden md:block" />
                <span className="opacity-70">strategic thinking, creative excellence, and data-driven execution under one </span><br className="hidden md:block" />
                <span className="opacity-50">roof. Every solution we design is rooted in understanding your business, your </span><br className="hidden md:block" />
                <span className="opacity-40">audience, and your growth ambitions.</span>
              </p>

              <h2 className="orange-quote text-[clamp(1rem,2vw,1.6rem)] mb-5 md:mb-6 bg-gradient-to-r from-[#FFFFFF] to-[#FAC02E] bg-clip-text text-transparent font-heading font-medium leading-tight">
                We don&apos;t just deliver campaigns. <br /> We build momentum.
              </h2>

              {/* Buttons */}
              <div className="orange-cta flex flex-wrap justify-start gap-3 sm:gap-6 items-center">
                <ArrowButton title="Read More" width="md" />
                <div className="btn-start-project p-6 -m-6">
                  <YellowButton title="Start a Project" variant="red" width="md" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Stats Cards) */}
          <div className="flex gap-4 md:gap-6 mt-6 w-auto lg:w-auto lg:flex-shrink lg:justify-start min-[1200px]:translate-x-8 min-[1400px]:translate-x-12" style={{ perspective: "1000px" }}>
            <div className="flex flex-col gap-3 sm:gap-4 lg:flex-none">
              <StatsCard className="stats-card-3d" value="100+" title={`Brands Scaled\n Across Industries`} />
              <StatsCard className="stats-card-3d" value="500+" title={`Successfully Executed Campaigns`} />
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 mt-6 md:mt-8 flex-1 lg:flex-none">
              <StatsCard className="stats-card-3d" value="3X" title={`Average Campaign Performance Uplift`} />
              <StatsCard className="stats-card-3d" value="5+" title={`Key Market Presence`} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrangeSection;