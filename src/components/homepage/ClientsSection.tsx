"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger, SplitText } from "gsap/all"

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

const brands = [
  { name: "OSN", logo: "/images/osn.svg" },
  { name: "Daikin", logo: "/images/DAIKIN_logo.svg.png" },
  { name: "Braun", logo: "/images/braun.svg" },
  { name: "Toshiba", logo: "/images/960px-TOSHIBA_Logo.png" },
  { name: "Khaleej Times", logo: "/images/khaleej.svg" },
  { name: "Redington", logo: "/images/redington.svg" },
  { name: "Godiva", logo: "/images/godiva.svg" },
  { name: "Midea", logo: "/images/Midea.svg.png" },
  { name: "NBK", logo: "/images/NBK.svg.png" },
  { name: "Hasbro", logo: "/images/hasbro-new.png" },
]

const ClientsSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const cleanups: (() => void)[] = []

    // ANIMATION 1 — "CLIENTS" LABEL
    gsap.from([".clients-label-text", ".clients-label-line"], {
      opacity: 0,
      x: -20,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".clients-label-text",
        start: "top 88%",
        toggleActions: "play none none none",
      },
    })

    // Line draws itself in from left to right
    gsap.from(".clients-label-line", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 0.7,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".clients-label-text",
        start: "top 88%",
        toggleActions: "play none none none",
      },
    })

    // ANIMATION 2 — HEADLINE CLIP REVEAL
    const headingSplit = SplitText.create(".clients-heading", {
      type: "words",
      mask: "words",
    })

    gsap.from(headingSplit.words, {
      yPercent: 115,
      rotationX: -12,
      transformOrigin: "0% 50% -50px",
      opacity: 0,
      duration: 1.0,
      ease: "expo.out",
      stagger: {
        each: 0.075,
        ease: "power1.inOut",
      },
      scrollTrigger: {
        trigger: ".clients-heading",
        start: "top 82%",
        toggleActions: "play none none none",
      },
    })

    // ANIMATION 3 — GRID BORDER DRAW-IN
    gsap.from(".clients-grid-wrapper", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".clients-grid-wrapper",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })

    // The outer border of the grid draws in as a clip-path expand
    gsap.from(".clients-grid-wrapper", {
      clipPath: "inset(50% 50% 50% 50%)",
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".clients-grid-wrapper",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })

    gsap.to(".clients-grid-wrapper", {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.8,
      ease: "expo.out",
      scrollTrigger: {
        trigger: ".clients-grid-wrapper",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    })

    // ANIMATION 4 — LOGO CELLS STAGGER ENTRY
    ScrollTrigger.batch(".client-logo-cell", {
      start: "top 88%",
      onEnter: (batch) => {
        gsap.from(batch, {
          opacity: 0,
          y: isMobile ? 18 : 32,
          scale: 0.92,
          rotationX: isMobile ? 0 : 18,
          transformOrigin: "center top",
          duration: 0.75,
          ease: "expo.out",
          stagger: {
            each: 0.065,
            grid: isMobile ? "auto" : [2, 5],
            from: "start",
            ease: "power2.inOut",
          },
          clearProps: "all",
        })
      },
    })

    // Add perspective to grid container for rotationX to have depth
    gsap.set(".clients-grid-wrapper", { perspective: 800 })

    // ANIMATIONS 5, 6, 7 — HOVER EFFECTS (DESKTOP ONLY)
    if (!isMobile) {
      // Set all logos to grayscale by default
      gsap.set(".client-logo-img", {
        filter: "grayscale(1)",
        opacity: 0.55,
      })

      const allCells = gsap.utils.toArray<HTMLElement>(".client-logo-cell")
      const proxies = new Map<HTMLElement, { val: number; opacity: number }>()
      let activeCell: HTMLElement | null = null
      let restoreTimeout: ReturnType<typeof setTimeout> | null = null

      allCells.forEach((cell) => {
        const img = cell.querySelector(".client-logo-img")
        const inner = cell.querySelector(".client-logo-inner")
        if (!img || !inner) return

        if (!proxies.has(cell)) {
          proxies.set(cell, { val: 1, opacity: 0.55 })
        }
        const proxy = proxies.get(cell)!

        const onMouseEnter = () => {
          if (restoreTimeout) {
            clearTimeout(restoreTimeout)
            restoreTimeout = null
          }

          activeCell = cell

          // Lift and light up the hovered cell's inner logo wrapper
          gsap.to(inner, {
            y: -5,
            scale: 1.04,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          })

          // Reveal color for hovered image
          gsap.to(proxy, {
            val: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: () => {
              gsap.set(img, {
                filter: `grayscale(${proxy.val})`,
                opacity: proxy.opacity,
              })
            },
          })

          // Dim all other cells' inner logo wrappers
          const others = allCells.filter((c) => c !== cell)
          const otherInners = others.map((c) => c.querySelector(".client-logo-inner")).filter(Boolean)

          gsap.to(otherInners, {
            opacity: 0.22,
            scale: 0.97,
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          })

          // Restore grayscale for all other cells' images
          others.forEach((otherCell) => {
            const otherImg = otherCell.querySelector(".client-logo-img")
            if (!otherImg) return
            if (!proxies.has(otherCell)) {
              proxies.set(otherCell, { val: 1, opacity: 0.55 })
            }
            const otherProxy = proxies.get(otherCell)!

            gsap.to(otherProxy, {
              val: 1,
              opacity: 0.55,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
              onUpdate: () => {
                gsap.set(otherImg, {
                  filter: `grayscale(${otherProxy.val})`,
                  opacity: otherProxy.opacity,
                })
              },
            })
          })

          // Shimmer Sweep
          const shimmerEl = cell.querySelector<HTMLElement>(".client-shimmer-overlay")
          if (shimmerEl) {
            gsap.fromTo(
              shimmerEl,
              { "--shimmer-x": "-100%" },
              {
                "--shimmer-x": "200%",
                duration: 0.55,
                ease: "power2.out",
              }
            )
          }
        }

        const onMouseLeave = () => {
          if (activeCell === cell) {
            activeCell = null
          }

          if (restoreTimeout) {
            clearTimeout(restoreTimeout)
          }

          // Delay the check to see if we moved to another cell
          restoreTimeout = setTimeout(() => {
            const isAnyHovered = document.querySelector(".client-logo-cell:hover")
            if (!activeCell && !isAnyHovered) {
              const allInners = allCells.map((c) => c.querySelector(".client-logo-inner")).filter(Boolean)

              // Restore all inner logo wrappers to default flat state
              gsap.to(allInners, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.45)",
                stagger: 0.02,
                overwrite: "auto",
              })

              allCells.forEach((c) => {
                const cImg = c.querySelector(".client-logo-img")
                if (!cImg) return
                if (!proxies.has(c)) {
                  proxies.set(c, { val: 1, opacity: 0.55 })
                }
                const cProxy = proxies.get(c)!

                gsap.to(cProxy, {
                  val: 1,
                  opacity: 0.55,
                  duration: 0.55,
                  ease: "power3.out",
                  overwrite: "auto",
                  onUpdate: () => {
                    gsap.set(cImg, {
                      filter: `grayscale(${cProxy.val})`,
                      opacity: cProxy.opacity,
                    })
                  },
                })
              })
            }
          }, 15)
        }

        cell.addEventListener("mouseenter", onMouseEnter)
        cell.addEventListener("mouseleave", onMouseLeave)

        cleanups.push(() => {
          cell.removeEventListener("mouseenter", onMouseEnter)
          cell.removeEventListener("mouseleave", onMouseLeave)
          if (restoreTimeout) {
            clearTimeout(restoreTimeout)
          }
        })
      })
    } else {
      // Mobile: Set all logos to full opacity, no grayscale
      gsap.set(".client-logo-img", {
        filter: "grayscale(0)",
        opacity: 1,
      })
    }

    return () => {
      cleanups.forEach((fn) => fn())
      headingSplit.revert()
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="bg-white py-20 font-sans w-full flex flex-col items-center">
      <style dangerouslySetInnerHTML={{ __html: `
        .clients-heading {
          overflow: visible;
        }

        .client-logo-cell {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: none !important;
        }

        .client-logo-inner {
          will-change: transform, opacity;
        }

        .client-logo-img {
          display: block;
          transition: none !important;
          will-change: transform, opacity;
          user-select: none;
          pointer-events: none;
        }

        .clients-grid-wrapper {
          transform-style: preserve-3d;
        }

        .client-shimmer-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          border-radius: inherit;
          --shimmer-x: -100%;
        }

        .client-shimmer-overlay::after {
          content: "";
          position: absolute;
          top: 0;
          left: var(--shimmer-x);
          width: 60%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.18) 50%,
            transparent 100%
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .client-logo-cell,
          .client-logo-img,
          .clients-heading * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
            filter: none !important;
            opacity: 1 !important;
          }
        }
      `}} />

      <div className="max-w-[1350px] px-8 md:px-16 w-full">
        <div className="flex items-center gap-[14px] mb-4 clients-label">
          <span className="clients-label-text text-[10px] md:text-[11px] font-medium tracking-tight text-[#064ED3] uppercase">
            Clients
          </span>
          <div className="clients-label-line flex-[0_0_30px] md:flex-[0_0_60px] h-[0.5px] bg-[#003B65] translate-y-[4px] md:translate-y-[5px]" />
        </div>

        <h2 className="clients-heading text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-medium text-[#07476B] mb-10 md:mb-16 tracking-tight">
          Brands We Work With
        </h2>

        <div className="clients-grid-wrapper border-t border-l border-gray-300 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="client-logo-cell border-r border-b border-gray-300 flex items-center justify-center p-6 md:p-12 h-40 sm:h-56 md:h-64 lg:h-72"
            >
              <div className="client-logo-inner relative w-full h-10 sm:h-12 md:h-14">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  fill
                  className="client-logo-img object-contain"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              <div className="client-shimmer-overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ClientsSection
