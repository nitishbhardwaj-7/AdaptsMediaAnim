"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import Image from "next/image";
import ArrowButton from "../buttons/ArrowButton";
import YellowButton from "../buttons/YellowButton";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const ArrowSVG = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
      fill="currentColor"
    />
  </svg>
);

const services = [
  { number: "01", title: "UI/UX<br />Design", items: ["User Research", "Wireframing & Prototyping", "Design Systems"] },
  { number: "02", title: "Frontend<br />Development", items: ["React & Next.js", "GSAP & Animations", "Responsive Builds"] },
  { number: "03", title: "CMS &<br />WordPress", items: ["Headless CMS", "Custom Themes", "Plugin Development"] },
  { number: "04", title: "eCommerce<br />Builds", items: ["Shopify & WooCommerce", "Payment Integration", "Product Catalogue"] },
  { number: "05", title: "Performance<br />& SEO", items: ["Core Web Vitals", "Technical SEO", "Speed Optimisation"] },
  { number: "06", title: "API &<br />Integrations", items: ["REST & GraphQL", "Third-party APIs", "Backend Pipelines"] },
];

const WebDevServices = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const cleanups: (() => void)[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const splits: any[] = [];

    const headingSplit = SplitText.create(".wds-heading", { type: "lines", mask: "lines" });
    splits.push(headingSplit);
    gsap.from(headingSplit.lines, {
      yPercent: 110, opacity: 0, rotationX: -12, transformOrigin: "0% 50% -60px",
      duration: 1.0, ease: "expo.out", stagger: 0.12,
      scrollTrigger: { trigger: ".wds-heading", start: "top 82%", toggleActions: "play none none none" },
    });

    gsap.from(".wds-subtitle", {
      opacity: 0, y: 28, duration: 0.8, ease: "power3.out", delay: 0.3,
      scrollTrigger: { trigger: ".wds-heading", start: "top 82%", toggleActions: "play none none none" },
    });

    ScrollTrigger.batch(".wds-card", {
      start: "top 85%",
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0, y: isMobile ? 35 : 70, rotationX: isMobile ? 0 : 22,
          rotationY: (i: number) => isMobile ? 0 : i % 2 === 0 ? -6 : 6,
          scale: 0.94, transformOrigin: "center top",
          duration: 0.95, ease: "expo.out", stagger: 0.1, clearProps: "all",
        });
      },
    });

    gsap.utils.toArray<HTMLElement>(".wds-number").forEach((num, i) => {
      gsap.from(num, {
        opacity: 0, x: -20, scale: 0.75, duration: 0.55, ease: "back.out(1.7)", delay: i * 0.1 + 0.2,
        scrollTrigger: { trigger: num, start: "top 88%", toggleActions: "play none none none" },
      });
    });

    gsap.utils.toArray<HTMLElement>(".wds-card-title").forEach((title) => {
      const split = SplitText.create(title, { type: "words", mask: "words" });
      splits.push(split);
      gsap.from(split.words, {
        yPercent: 100, opacity: 0, duration: 0.65, ease: "expo.out", stagger: 0.06,
        scrollTrigger: { trigger: title, start: "top 87%", toggleActions: "play none none none" },
      });
    });

    if (!isMobile) {
      gsap.utils.toArray<HTMLElement>(".wds-item-row").forEach((row) => {
        const arrow = row.querySelector<HTMLElement>(".wds-item-arrow");
        const text = row.querySelector<HTMLElement>(".wds-item-text");
        if (!arrow || !text) return;
        const onEnter = () => {
          gsap.to(row, { backgroundColor: "rgba(255,255,255,0.07)", duration: 0.25, ease: "power2.out" });
          gsap.to(arrow, { x: 5, rotation: 45, scale: 1.2, duration: 0.3, ease: "back.out(2)" });
          gsap.to(text, { opacity: 1, x: 3, duration: 0.2 });
        };
        const onLeave = () => {
          gsap.to(row, { backgroundColor: "rgba(255,255,255,0)", duration: 0.35 });
          gsap.to(arrow, { x: 0, rotation: 0, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.4)" });
          gsap.to(text, { opacity: 0.85, x: 0, duration: 0.25 });
        };
        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          row.removeEventListener("mouseenter", onEnter);
          row.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    gsap.utils.toArray<HTMLElement>(".wds-divider").forEach((line) => {
      gsap.from(line, {
        scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: line, start: "top 90%", toggleActions: "play none none none" },
      });
    });

    gsap.from(".wds-cta-buttons > *", {
      opacity: 0, y: 30, scale: 0.96, duration: 0.7, ease: "back.out(1.4)", stagger: 0.12,
      scrollTrigger: { trigger: ".wds-cta-buttons", start: "top 90%", toggleActions: "play none none none" },
    });

    if (!isMobile && sectionRef.current) {
      const btn = sectionRef.current.querySelector<HTMLElement>(".wds-magnetic-btn");
      if (btn) {
        const gxTo = gsap.quickTo(btn, "x", { duration: 0.7, ease: "power1.out" });
        const gyTo = gsap.quickTo(btn, "y", { duration: 0.7, ease: "power1.out" });
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          gxTo((e.clientX - r.left - r.width / 2) * 0.55);
          gyTo((e.clientY - r.top - r.height / 2) * 0.55);
        };
        const onLeave = () => { gxTo(0); gyTo(0); };
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          btn.removeEventListener("mousemove", onMove);
          btn.removeEventListener("mouseleave", onLeave);
        });
      }
    }

    return () => {
      cleanups.forEach((fn) => fn());
      splits.forEach((s) => s.revert());
    };
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="bg-[#064ED3] relative text-white flex flex-col w-full items-start justify-start md:items-center md:justify-center py-20 font-sans overflow-hidden"
    >
      <Image
        src="/images/ServicesMaskNewPng.png"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="absolute z-10 pointer-events-none object-cover"
      />

      <div className="max-w-[1350px] z-50 w-full px-8 md:px-16">
        <div className="mb-20">
          <h2 className="wds-heading text-4xl md:text-6xl font-heading font-medium mb-8 leading-tight max-w-3xl">
            What We<br />Deliver
          </h2>
          <p className="wds-subtitle text-[clamp(1rem,1.6vw,1.35rem)] max-w-3xl font-light leading-relaxed">
            Full-stack web development services built around your goals —
            from brand-new builds to complex integrations.
          </p>
        </div>

        <div className="grid grid-cols-1 min-[1300px]:grid-cols-3 gap-x-12 gap-y-6 md:gap-y-16">
          {services.map((service, index) => (
            <div key={index} style={{ perspective: "900px" }}>
              <div className="wds-card flex flex-col" style={{ transformStyle: "preserve-3d", willChange: "transform", cursor: "pointer" }}>
                <span
                  className="wds-number text-7xl font-heading font-normal opacity-50 mb-[-12px] leading-none text-white blur-[2px] inline-block"
                  style={{ marginLeft: "-32px" }}
                >
                  {service.number}
                </span>
                <h3
                  className="wds-card-title text-3xl md:text-[46px] font-heading font-light mb-8 leading-tight min-h-[6.5rem] md:min-h-[7.2rem] w-full"
                  dangerouslySetInnerHTML={{ __html: service.title }}
                />
                <div className="flex flex-col">
                  {service.items.map((item, i) => (
                    <div key={i}>
                      <div className="wds-divider border-t border-white/60" />
                      <div className="wds-item-row flex items-center justify-between py-3 px-2" style={{ borderRadius: "6px" }}>
                        <span className="wds-item-text text-[clamp(0.85rem,1.1vw,1.05rem)] font-heading font-light tracking-wide opacity-90">
                          {item}
                        </span>
                        <span className="wds-item-arrow flex items-center justify-center">
                          <ArrowSVG className="w-5 h-5 md:w-6 md:h-6 rotate-45 rounded-full border border-white/40 p-1 md:p-1.5 text-white relative z-10" />
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="wds-divider border-t border-white/60 mb-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="wds-cta-buttons flex flex-wrap justify-center gap-6 z-50">
        <div>
          <ArrowButton title="Explore All Services" />
        </div>
        <div className="wds-magnetic-btn p-6 -m-6">
          <YellowButton title="Start a Project" variant="blue" href="/start-project" />
        </div>
      </div>
    </section>
  );
};

export default WebDevServices;
