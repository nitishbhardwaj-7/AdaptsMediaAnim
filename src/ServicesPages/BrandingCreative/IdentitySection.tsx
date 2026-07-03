"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const IdentitySection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const deliverables = [
    "Brand Strategy and Positioning",
    "Logo and Visual Identity Design",
    "Typography and Color Systems",
    "Brand Guidelines and Usage Systems",
    "Verbal Identity and Tone of Voice",
  ];

  useGSAP(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    // Title reveal
    const titleSplit = SplitText.create(".identity-title", {
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
        trigger: ".identity-title",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // Content paragraphs reveal
    gsap.from(".identity-desc p", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".identity-desc",
        start: "top 88%",
        toggleActions: "play none none none"
      }
    });

    // Deliverables heading & list items stagger
    gsap.from(".identity-deliverables-header", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: ".identity-deliverables-header",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    gsap.from(".identity-deliverable-item", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".identity-deliverable-item",
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });

    // Image Parallax scroll-scrub
    gsap.fromTo(".identity-img-bg",
      { y: 30 },
      {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".identity-img-container",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );

    gsap.fromTo(".identity-img-main",
      { y: 65 },
      {
        y: -65,
        ease: "none",
        scrollTrigger: {
          trigger: ".identity-img-container",
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
    <section ref={containerRef} className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-[#064ed3] text-white">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/IdentityBg.png"
        alt="Identity Background"
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
              Identity
            </span>
            <h2 className="identity-title text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.25] pb-2 mb-8 max-w-2xl font-heading">
              Creating Brands with Purpose and Personality
            </h2>

            <div className="identity-desc space-y-6 max-w-xl text-[17px] md:text-[19px] font-light leading-relaxed text-blue-50/90">
              <p>
                A strong identity creates recognition, trust, and differentiation. We develop brand identities that go beyond aesthetics — building systems that communicate who you are, what you stand for, and why your audience should care.
              </p>
              <p>
                From logos and typography to color systems and brand language, every detail is crafted to create a cohesive and memorable presence.
              </p>
            </div>
          </div>

          {/* Right Column: Illustration & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Illustration Container */}
            <div className="identity-img-container relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* 1. THE BACKGROUND IMAGE (Small Scrub) */}
                <img
                  src="/images/BrandingCreative/LogoBgBlue.png"
                  className="identity-img-bg absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-40 pointer-events-none"
                  style={{ filter: 'brightness(0)' }}
                  alt="Logo Background Grid"
                />

                {/* 2. THE MAIN IMAGE (Large Scrub) */}
                <img
                  src="/images/BrandingCreative/LogoBlue.png"
                  className="identity-img-main relative z-10 w-full h-full object-contain scale-[0.75]"
                  alt="Logo Blue Screen"
                />
              </div>
            </div>

            {/* Button Centered Under Image */}
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center justify-center px-10 py-3.5 rounded-full border border-white/60 bg-transparent text-white font-semibold text-[15px] md:text-base tracking-wide transition-all duration-300 hover:bg-white hover:text-[#064ed3] hover:border-white shadow-md cursor-pointer"
              >
                View Work <span className="ml-2">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <div className="w-full mt-8">
          <h3 className="identity-deliverables-header text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="identity-deliverable-item flex items-start gap-2.5">
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

export default IdentitySection;
