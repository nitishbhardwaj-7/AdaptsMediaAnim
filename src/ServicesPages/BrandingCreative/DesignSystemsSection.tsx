"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const DesignSystemsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const deliverables = [
    "UI and Visual Design Systems",
    "Brand Asset Libraries",
    "Component and Layout Systems",
    "Marketing Templates and Guidelines",
    "Cross-platform Consistency Frameworks",
  ];

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // Title reveal
    const titleSplit = SplitText.create(".designsystems-title", {
      type: "lines",
      mask: "lines",
    });
    splits.push(titleSplit);

    gsap.from(titleSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -10,
      transformOrigin: "0% 50% -50px",
      duration: 1.0,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".designsystems-title",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Content paragraphs reveal
    gsap.from(".designsystems-desc p", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".designsystems-desc",
        start: "top 88%",
        toggleActions: "play none none none"
      }
    });

    // Deliverables heading & list items stagger
    gsap.from(".designsystems-deliverables-header", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".designsystems-deliverables-header",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".designsystems-deliverable-item", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".designsystems-deliverable-item",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    // Image Parallax scroll-scrub
    gsap.fromTo(".designsystems-img-bg", 
      { y: 30 },
      { 
        y: -30, 
        ease: "none",
        scrollTrigger: {
          trigger: ".designsystems-img-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );

    gsap.fromTo(".designsystems-img-main", 
      { y: 65 },
      { 
        y: -65, 
        ease: "none",
        scrollTrigger: {
          trigger: ".designsystems-img-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );

    return () => {
      splits.forEach((s) => s.revert());
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-[#c22d2d] text-white">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/DesignSystemsBg.png"
        alt="Design Systems Background"
        fill
        priority={true}
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      <div className="max-w-[1350px] w-full px-8 md:px-16 flex flex-col gap-16 relative z-10">
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[#FAC02E] text-lg tracking-wider mb-3">
              Design Systems
            </span>
            <h2 className="designsystems-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading">
              Consistency Across Every Brand Touchpoint
            </h2>

            <div className="designsystems-desc space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-red-50/90">
              <p>
                A scalable brand needs structure. Our design systems create
                consistency across digital, print, social, and marketing assets -
                ensuring your brand looks unified wherever it appears.
              </p>
              <p>
                We build flexible systems that simplify execution while
                maintaining visual quality and brand integrity across teams and
                platforms.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="designsystems-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* 1. THE BACKGROUND IMAGE (Small Scrub) */}
                <img 
                  src="/images/BrandingCreative/DesignSystemLogoBg.png" 
                  className="designsystems-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-80 pointer-events-none" 
                  alt="Logo Background Grid" 
                />
              
                {/* 2. THE MAIN IMAGE (Large Scrub) */}
                <img 
                  src="/images/BrandingCreative/DesignSystemLogo.png" 
                  className="designsystems-img-main relative z-10 w-full h-full object-contain scale-[0.75]" 
                  alt="Design System Logo" 
                />
              </div>
            </div>

            {/* Button Centered Under Image */}
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center justify-center px-10 py-3.5 rounded-full border border-white/60 bg-transparent text-white font-semibold text-[15px] md:text-base tracking-wide transition-all duration-300 hover:bg-white hover:text-[#c22d2d] hover:border-white shadow-md cursor-pointer"
              >
                View Work <span className="ml-2">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="designsystems-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="designsystems-deliverable-item flex items-start gap-2.5">
                <div className="mt-1 flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-[#FAC02E]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                  </svg>
                </div>
                <span className="text-sm md:text-[15px] text-white/90 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignSystemsSection;
