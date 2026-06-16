"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NavLogo = () => (
  <div className="relative w-[60px] h-[40px]">
    <Image
      alt="Company Logo"
      src="/images/navlogo.png"
      fill
      priority
      sizes="(max-width: 768px) 45px, 60px"
      className="object-contain"
    />
  </div>
);

const IDLE_TIMEOUT = 2500; // ms before hiding on no movement
const TOP_HOVER_ZONE = 80; // px from top to trigger show on hover

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringNav = useRef(false);

  const menuBarClass = "block w-[22px] h-[2px] bg-white rounded-[2px]";

  // ── Reset idle timer: hides navbar after inactivity ──
  const resetIdleTimer = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      // Don't hide if user is hovering on the navbar itself or still in hero
      if (!isHoveringNav.current && window.scrollY > window.innerHeight) {
        setIsVisible(false);
      }
    }, IDLE_TIMEOUT);
  }, []);

  // ── Scroll handler: direction detection + pill morph ──
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const heroEnd = window.innerHeight; // hero is h-screen

      // Original pill transition
      setIsScrolled(currentY > 250);

      // Within the hero section (first 70%) → stay visible for pill animation
      if (currentY <= heroEnd * 0.8) {
        setIsVisible(true);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        lastScrollY.current = currentY;
        return;
      }

      // Approaching hero end → auto-hide so it disappears before section 2
      if (currentY <= heroEnd && currentY > lastScrollY.current) {
        setIsVisible(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
        lastScrollY.current = currentY;
        return;
      }

      // Past the hero: scroll-up → show, scroll-down → hide
      if (currentY < lastScrollY.current) {
        setIsVisible(true);
        resetIdleTimer();
      } else if (currentY > lastScrollY.current) {
        setIsVisible(false);
        if (idleTimer.current) clearTimeout(idleTimer.current);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [resetIdleTimer]);

  // ── Mouse movement: show on top-zone hover & restart idle timer ──
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If mouse is in the top hover zone, show navbar
      if (e.clientY <= TOP_HOVER_ZONE) {
        setIsVisible(true);
      }

      // Any movement while visible resets idle
      resetIdleTimer();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [resetIdleTimer]);

  // ── Cleanup ──
  useEffect(() => {
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 w-full z-[1000] py-4 pointer-events-none"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
      onMouseEnter={() => {
        isHoveringNav.current = true;
        setIsVisible(true);
        if (idleTimer.current) clearTimeout(idleTimer.current);
      }}
      onMouseLeave={() => {
        isHoveringNav.current = false;
        resetIdleTimer();
      }}
    >
      <nav
        aria-label="Main Navigation"
        className={`
          mx-auto flex items-center justify-between transition-all duration-500 ease-in-out pointer-events-auto
          ${
            isScrolled
              ? "max-w-[1200px] w-[90%] bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-lg"
              : "max-w-full w-full bg-transparent border-transparent px-8 md:px-16 py-4 rounded-none shadow-none"
          }
        `}
      >
        <Link href="/" aria-label="Home" className="flex no-underline">
          <NavLogo />
        </Link>

        <div className="flex items-center gap-4 md:gap-[28px]">
          <button
            type="button"
            className="flex items-center gap-2 bg-[#3b6ef5] text-white border-none rounded-full 
                       px-4 py-2 md:px-5 md:py-[10px] 
                       text-[16px] md:text-[20px] font-regular tracking-[0.01em] 
                       cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105"
          >
            <span className="font-sans">Start a Project</span>
            <Image
              alt=""
              src="/images/clock.png"
              width={20}
              height={20}
              style={{ height: 'auto' }}
              className="w-4 md:w-5 object-contain shrink-0"
            />
          </button>

          <button
            type="button"
            aria-label="Open Menu"
            className="w-10 h-10 md:w-12 md:h-12 bg-[#f5a623] border-none rounded-full 
                       flex flex-col items-center justify-center gap-1 cursor-pointer 
                       transition-transform duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] 
                       hover:rotate-90"
          >
            <span className={menuBarClass} />
            <span className={menuBarClass} />
            <span className={menuBarClass} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;