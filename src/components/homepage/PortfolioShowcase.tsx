"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import ArrowButton from "../buttons/ArrowButton";
import ArrowIcon from "../icons/ArrowIcon";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Project {
  id: number;
  brand: string;
  tagline: string;
  tags: string[];
  bgImage: string;
}

const projects: Project[] = [
  {
    id: 1,
    brand: "THE BLISS",
    tagline: "Turning Vision into Brand Reality",
    tags: ["Branding", "AI Generation", "Marketing"],
    bgImage: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=1400&q=80",
  },
  {
    id: 2,
    brand: "LUMINARY",
    tagline: "Crafting Digital Experiences That Inspire",
    tags: ["UI/UX", "Web Design", "Strategy"],
    bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
  },
  {
    id: 3,
    brand: "NOVA STUDIO",
    tagline: "Where Imagination Meets Execution",
    tags: ["Motion", "Branding", "Identity"],
    bgImage: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1400&q=80",
  },
];

const TagIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const FlowerLogo = () => (
  <svg width="70" height="80" className="md:w-[90px] md:h-[104px]" viewBox="0 0 52 52" fill="none">
    <circle cx="26" cy="26" r="25" stroke="white" strokeWidth="1.5" />
    <g transform="translate(26,26)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse key={i} cx="0" cy="-9" rx="4" ry="8" fill="white" transform={`rotate(${angle})`} opacity="0.9" />
      ))}
      <circle cx="0" cy="0" r="3.5" fill="white" />
    </g>
  </svg>
);

export default function PortfolioShowcase() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const prev = () => setCurrent((c) => (c - 1 + projects.length) % projects.length);
  const next = () => setCurrent((c) => (c + 1) % projects.length);

  useGSAP(() => {
    // 1. Parallax Scroll Trigger
    gsap.to(".portfolio-bg-image", {
      yPercent: -50,           // background drifts up 50% as user scrolls past
      ease: "none",            // LINEAR — the scrollbar IS the easing
      scrollTrigger: {
        trigger: ".portfolio-section-wrapper",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2             // 1.2s lag = silky physical feel
      }
    });
  }, { scope: sectionRef });

  useGSAP(() => {
    // 2. Cinematic Slide transition logic
    const slides = gsap.utils.toArray<HTMLElement>(".portfolio-slide");
    
    slides.forEach((slide, idx) => {
      if (idx === current) {
        // Active Slide Reveal
        gsap.killTweensOf(slide);
        gsap.to(slide, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.8,
          ease: "power2.out"
        });

        // Background Image Wrapper Zoom Reveal (Separated from parallax layer)
        const bgWrapper = slide.querySelector(".portfolio-bg-wrapper");
        if (bgWrapper) {
          gsap.killTweensOf(bgWrapper);
          gsap.fromTo(bgWrapper, 
            { scale: 1.15 },
            { scale: 1, duration: 1.5, ease: "power2.out" }
          );
        }

        // Staggered Text & Brand Info Reveals
        const logo = slide.querySelector(".portfolio-logo");
        const brand = slide.querySelector(".portfolio-brand");
        const tagline = slide.querySelector(".portfolio-tagline");
        const tags = slide.querySelectorAll(".portfolio-tag");

        if (logo) {
          gsap.killTweensOf(logo);
          gsap.fromTo(logo, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.15 });
        }
        if (brand) {
          gsap.killTweensOf(brand);
          gsap.fromTo(brand, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.25 });
        }
        if (tagline) {
          gsap.killTweensOf(tagline);
          gsap.fromTo(tagline, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.35 });
        }
        if (tags.length > 0) {
          gsap.killTweensOf(tags);
          gsap.fromTo(tags, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.45 });
        }

      } else {
        // Inactive Slide Fadeout
        gsap.killTweensOf(slide);
        gsap.to(slide, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.6,
          ease: "power2.inOut"
        });
      }
    });
  }, { scope: sectionRef, dependencies: [current] });

  return (
    <div ref={sectionRef} className="portfolio-section-wrapper flex flex-col min-h-screen bg-[#12161c] font-['DM_Sans']">

      {/* ── SHOWCASE WRAPPER (The Rounded Box) ── */}
      <div className="relative flex-1 m-4 md:m-16 rounded-2xl overflow-hidden h-[600px] md:h-auto md:min-h-[580px]">
        {projects.map((p, i) => {
          const active = i === current;
          return (
            <div 
              key={p.id} 
              className={`portfolio-slide absolute inset-0 ${active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >
              {/* BG Wrapper (for slide transition zoom/scale) */}
              <div className="portfolio-bg-wrapper absolute inset-0 overflow-hidden">
                <Image
                  src={p.bgImage}
                  alt={p.brand}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={85}
                  className="portfolio-bg-image object-cover"
                  style={{
                    transformOrigin: "center center",
                    scale: "1.3"
                  }}
                />
              </div>

              {/* Overlays */}
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,16,0.9)_0%,rgba(10,12,16,0.4)_40%,transparent_80%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,12,16,0.6)_0%,transparent_50%)]" />

              {/* ── ALIGNMENT CONTAINER (The 1350px Fix) ── */}
              <div className="relative h-full w-full max-w-[1350px] mx-auto px-8 md:px-16 pointer-events-none">
                
                {/* Top bar: Now aligned to the 1350px container's left edge */}
                <div className="absolute top-[24px] md:top-[48px] left-8 md:left-16 right-8 md:right-16 flex items-center gap-[14px] z-[4] pointer-events-auto">
                  <span className="text-[10px] md:text-[11px] font-medium tracking-[0.18em] text-[#f5a623] uppercase">
                    Portfolio
                  </span>
                  <div className="flex-[0_0_30px] md:flex-[0_0_60px] h-[1px] bg-[#f5a623]/50" />
                  <ArrowButton title="View Portfolio"/>
                </div>

                {/* Bottom Content Area: Now aligned to 1350px grid */}
                <div className="absolute bottom-0 left-8 md:left-16 right-8 md:right-16 pb-16 md:pb-[60px] z-[4] flex flex-col gap-6 md:gap-4 pointer-events-auto">
                  
                  {/* Brand Branding */}
                  <div className="flex flex-col items-start w-full md:pl-21"> 
                    <div className="flex flex-col gap-2 items-center md:items-start w-fit">
                      <div className="portfolio-logo w-full flex justify-center md:justify-center">
                        <FlowerLogo />
                      </div>

                      <span className="portfolio-brand font-['DM_Sans'] text-[20px] md:text-[26px] font-normal tracking-[0.22em] text-white/90 uppercase leading-none">
                        {p.brand}
                      </span>
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    
                    <div className="flex items-center gap-4 md:gap-8 w-full flex-1">
                      <button 
                        onClick={prev} 
                        className="hidden md:flex mb-10 w-[52px] h-[52px] border border-white/40 rounded-full items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors shrink-0"
                      >
                        <ArrowIcon direction="left" />
                      </button>

                      <div className="flex flex-col gap-[14px] flex-1">
                        <div className="w-full h-[1px] bg-white/15" />
                        <h2 className="portfolio-tagline font-['Cormorant_Garamond'] text-[24px] md:text-[clamp(26px,4vw,40px)] font-normal text-white leading-[1.2] tracking-[-0.01em] max-w-[640px]">
                          {p.tagline}
                        </h2>
                        <div className="w-full h-[1px] bg-white/15" />

                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((tag) => (
                            <span key={tag} className="portfolio-tag flex items-center gap-1.5 border border-white/30 text-white/75 rounded-full px-3 py-[5px] text-[10px] md:text-[12px] bg-white/5">
                              <TagIcon /> {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0 md:mb-10">
                      <div className="md:hidden">
                         <button onClick={prev} className="w-[44px] h-[44px] border border-white/40 rounded-full flex items-center justify-center text-white"><ArrowIcon direction="left"/></button>
                      </div>
                      
                      <ArrowButton title="Read Case Study"/>

                      <button 
                        onClick={next} 
                        className="w-[44px] h-[44px] md:w-[52px] md:h-[52px] border border-white/40 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition-colors"
                      >
                        <ArrowIcon direction="right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* DOTS (Global center) */}
        <div className="flex gap-3 items-center justify-center absolute bottom-6 left-1/2 -translate-x-1/2 z-[10]">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out border-none p-0 cursor-pointer ${i === current ? "w-16 bg-[#FAC02D]" : "w-5 bg-[#FAC02D] opacity-30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}