"use client";

import { useState, useRef } from "react";
import PortfolioShowcase, { Project } from "../homepage/PortfolioShowcase";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const allCaseStudies: (Project & { displayName: string; industry: string; service: string; objective: string })[] = [
  {
    id: 1,
    brand: "HYUNDAI MOBIS",
    displayName: "Hyundai Mobis",
    tagline: "Driving Trust Through Genuine Parts",
    tags: ["Branding", "AI Generation", "Marketing"],
    bgImage: "/images/portfolio/Hyundai/butterfly_2 1.png",
    logoSrc: "/images/portfolio/Hyundai/Group.png",
    industry: "Automotive",
    service: "Web Development",
    objective: "Performance",
  },
  {
    id: 2,
    brand: "THE CAPHE VIETNAM",
    displayName: "The Caphe Vietnam",
    tagline: "Brewing a Brand Experience That Stands Out",
    tags: ["Branding", "AI Execution", "Marketing"],
    bgImage: "/images/portfolio/TheCapheVietnam/image 30.png",
    logoSrc: "/images/portfolio/TheCapheVietnam/Layer_1.png",
    industry: "F&B",
    service: "Social Media",
    objective: "Branding",
  },
  {
    id: 3,
    brand: "THE BLISS",
    displayName: "The Bliss",
    tagline: "Turning Vision into Brand Reality",
    tags: ["Branding", "AI Execution", "Marketing"],
    bgImage: "/images/portfolio/TheBliss/Mask group.png",
    logoSrc: "/images/portfolio/TheBliss/thebliss@4x 1.png",
    industry: "Wellness",
    service: "UI/UX Design",
    objective: "Branding",
  },
  {
    id: 4,
    brand: "JAYWAN",
    displayName: "Jaywan",
    tagline: "UAE's Own National Payment",
    tags: ["Branding", "AI Execution", "Marketing"],
    bgImage: "/images/portfolio/Jaywan/Sustenance_KV_V2_07 1.png",
    logoSrc: "/images/portfolio/Jaywan/logo_2 1.png",
    industry: "Finance",
    service: "Branding",
    objective: "Marketing",
  },
];

const ArrowDown = () => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-current shrink-0 ml-2">
    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function PortfolioList() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const textSplit = SplitText.create(".portfolio-intro-text", {
      type: "lines",
      mask: "lines",
    });

    gsap.from(textSplit.lines, {
      yPercent: 110,
      opacity: 0,
      rotationX: -12,
      transformOrigin: "0% 50% -60px",
      duration: 1.0,
      ease: "expo.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".portfolio-intro-text",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      textSplit.revert();
    };
  }, { scope: containerRef });

  const [selectedIndustry, setSelectedIndustry] = useState("All Case Studies");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedObjective, setSelectedObjective] = useState("All Objectives");

  const [activeIndustry, setActiveIndustry] = useState("All Case Studies");
  const [activeService, setActiveService] = useState("All Services");
  const [activeObjective, setActiveObjective] = useState("All Objectives");

  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isObjectiveOpen, setIsObjectiveOpen] = useState(false);

  const filterStudies = () => {
    setActiveIndustry(selectedIndustry);
    setActiveService(selectedService);
    setActiveObjective(selectedObjective);
  };

  const filteredStudies = allCaseStudies.filter((study) => {
    const matchIndustry = activeIndustry === "All Case Studies" || study.industry === activeIndustry;
    const matchService = activeService === "All Services" || study.service === activeService;
    const matchObjective = activeObjective === "All Objectives" || study.objective === activeObjective;
    return matchIndustry && matchService && matchObjective;
  });

  const uniqueIndustries = ["All Case Studies", "Automotive", "F&B", "Wellness", "Finance"];
  const uniqueServices = ["All Services", "Web Development", "Social Media", "UI/UX Design", "Branding"];
  const uniqueObjectives = ["All Objectives", "Performance", "Branding", "Marketing"];

  return (
    <div ref={containerRef} className="w-full bg-[#12161c] text-white font-heading">
      {/* ── INTRO SECTION ── */}
      <div className="w-full bg-white py-16 md:py-24 text-[#17313B]">
        <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20">
          <p className="portfolio-intro-text text-[clamp(20px,3.2vw,36px)] font-heading font-semibold leading-[1.35] tracking-tight max-w-[1100px]">
            Every brand has different goals, challenges, and audiences - which
            is why we create tailored strategies built around performance,
            creativity, and real business impact. From branding and content to
            digital experiences and marketing campaigns, we help brands
            stand out, connect, and grow.
          </p>
        </div>
      </div>

      {/* ── FILTER SECTION ── */}
      <div className="w-full bg-[#004dc3] py-10">
        <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20">
          <h2 className="text-xl font-heading font-medium tracking-wide mb-6 uppercase text-white font-sans">
            Filter by
          </h2>

          <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6 lg:gap-8 w-full z-30">
            {/* Industry Filter */}
            <div className="relative w-full lg:w-72 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Industries:</span>
              <button
                onClick={() => {
                  setIsIndustryOpen(!isIndustryOpen);
                  setIsServiceOpen(false);
                  setIsObjectiveOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-colors"
              >
                <span>{selectedIndustry}</span>
                <ArrowDown />
              </button>
              {isIndustryOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueIndustries.map((ind) => (
                    <button
                      key={ind}
                      onClick={() => {
                        setSelectedIndustry(ind);
                        setIsIndustryOpen(false);
                      }}
                      className="w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Service Filter */}
            <div className="relative w-full lg:w-72 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Services:</span>
              <button
                onClick={() => {
                  setIsServiceOpen(!isServiceOpen);
                  setIsIndustryOpen(false);
                  setIsObjectiveOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-colors"
              >
                <span>{selectedService}</span>
                <ArrowDown />
              </button>
              {isServiceOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueServices.map((ser) => (
                    <button
                      key={ser}
                      onClick={() => {
                        setSelectedService(ser);
                        setIsServiceOpen(false);
                      }}
                      className="w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {ser}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Objective Filter */}
            <div className="relative w-full lg:w-72 flex flex-col gap-2">
              <span className="text-sm font-heading font-normal text-white/80">Objective:</span>
              <button
                onClick={() => {
                  setIsObjectiveOpen(!isObjectiveOpen);
                  setIsIndustryOpen(false);
                  setIsServiceOpen(false);
                }}
                className="w-full flex items-center justify-between bg-transparent hover:bg-white/5 border border-white rounded-full px-5 py-3 text-sm text-white/50 font-medium cursor-pointer transition-colors"
              >
                <span>{selectedObjective}</span>
                <ArrowDown />
              </button>
              {isObjectiveOpen && (
                <div className="absolute top-full left-0 w-full mt-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
                  {uniqueObjectives.map((obj) => (
                    <button
                      key={obj}
                      onClick={() => {
                        setSelectedObjective(obj);
                        setIsObjectiveOpen(false);
                      }}
                      className="w-full px-5 py-3 text-left text-sm hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
                    >
                      {obj}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apply Button */}
            <button
              onClick={filterStudies}
              className="w-full lg:w-auto bg-white text-[#004dc3] hover:bg-white/90 font-heading font-semibold px-16 py-3 rounded-full text-sm tracking-wide transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* ── CASE STUDIES — Using the exact same PortfolioShowcase component ── */}
      {filteredStudies.length > 0 ? (
        <PortfolioShowcase projects={filteredStudies} variant="list" />
      ) : (
        <div className="text-center py-20 text-white/50 text-lg">
          No case studies match your active filters.
        </div>
      )}
    </div>
  );
}
