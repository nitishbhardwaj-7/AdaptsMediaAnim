"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const DesignSystemsSection = () => {
  const deliverables = [
    "UI and Visual Design Systems",
    "Brand Asset Libraries",
    "Component and Layout Systems",
    "Marketing Templates and Guidelines",
    "Cross-platform Consistency Frameworks",
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  const starVariants: Variants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  return (
    <section className="relative w-full py-24 md:py-32 flex justify-center overflow-hidden bg-[#c22d2d] text-white">
      {/* Background Image */}
      <Image
        src="/images/BrandingCreative/DesignSystemsBg.png"
        alt="Design Systems Background"
        fill
        priority={true}
        quality={90}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-[1350px] w-full px-8 md:px-16 flex flex-col gap-16 relative z-10"
      >
        {/* Top Content Row: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Content */}
          <motion.div variants={fadeInUp} className="lg:col-span-7 flex flex-col items-start">
            <span className="text-[#FAC02E] text-lg tracking-wider mb-3">
              Design Systems
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] tracking-tight leading-[1.15] mb-8 max-w-2xl">
              Consistency Across Every Brand Touchpoint
            </h2>

            <div className="space-y-6 max-w-2xl text-[17px] md:text-[19px] font-light leading-relaxed text-red-50/90">
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
          </motion.div>

          {/* Right Column: Illustration & CTA */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            {/* Illustration Container */}
            <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
              {/* THE SENSOR: Stays still to avoid jitter */}
              <motion.div
                initial="down"
                whileInView="up"
                viewport={{ once: false, amount: 0.6, margin: "-15% 0px -20% 0px" }}
                className="w-full h-full relative"
              >
                {/* 1. THE BACKGROUND IMAGE (Small Jump) */}
                <motion.img 
                  src="/images/BrandingCreative/DesignSystemLogoBg.png" 
                  variants={{
                    down: { y: 0 },
                    up: { y: -30 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
                  className="absolute inset-0 w-full h-full object-contain scale-110 z-0 opacity-80 pointer-events-none" 
                  alt="Logo Background Grid" 
                />
              
                {/* 2. THE MAIN IMAGE (Large Jump) */}
                <motion.img 
                  src="/images/BrandingCreative/DesignSystemLogo.png" 
                  variants={{
                    down: { y: 0 },
                    up: { y: -70 }
                  }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
                  className="relative z-10 w-full h-full object-contain scale-[0.75]" 
                  alt="Design System Logo" 
                />
              </motion.div>
            </div>

            {/* Button Centered Under Image */}
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#"
                className="inline-flex items-center justify-center px-10 py-3.5 rounded-full border border-white/60 bg-transparent text-white font-semibold text-[15px] md:text-base tracking-wide transition-all duration-300 hover:bg-white hover:text-[#c22d2d] hover:border-white shadow-md cursor-pointer"
              >
                View Work <span className="ml-2">↗</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Content Row: What We Deliver */}
        <motion.div variants={fadeInUp} className="w-full mt-8">
          <h3 className="text-xl md:text-2xl mb-6">
            What We Deliver
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            {deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <motion.div
                  variants={starVariants}
                  className="mt-1 flex-shrink-0"
                >
                  <svg
                    className="w-4 h-4 text-[#FAC02E]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                  </svg>
                </motion.div>
                <span className="text-sm md:text-[15px] text-white/90 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default DesignSystemsSection;
