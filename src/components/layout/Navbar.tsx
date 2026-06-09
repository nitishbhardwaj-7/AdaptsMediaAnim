"use client";

import { useState, useEffect } from "react";
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const menuBarClass = "block w-[22px] h-[2px] bg-white rounded-[2px]";

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the narrow version after 50px of scrolling
      setIsScrolled(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[1000] py-4 transition-all duration-500 ease-in-out pointer-events-none">
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