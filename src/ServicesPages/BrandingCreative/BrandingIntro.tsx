"use client";

import { motion, Variants } from "framer-motion";

const BrandingIntro = () => {
  const pills = [
    "Identity",
    "Campaigns",
    "Design Systems",
    "Content Strategy",
    "Leverage Influencers",
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as const, // easeOutQuart
      },
    },
  };

  const pillVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1] as const,
      },
    },
  };

  return (
    <section className="w-full bg-white py-24 flex justify-center font-sans overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-[1350px] w-full px-8 md:px-16 flex flex-col items-start"
      >
        {/* Paragraph Description */}
        <motion.div variants={textVariants} className="max-w-6xl">
          <p className="text-[36px] sm:text-2xl md:text-[40px] font-semibold text-[#1a2b49] leading-[1.35] tracking-tight">
            We combine strategic thinking with creative execution to build
            brands that are{" "}
            <span className="text-[#064ed3] font-bold">
              visually distinctive, emotionally engaging
            </span>
            , and positioned for long-term growth. From identity creation to
            campaign storytelling, every element is designed to create{" "}
            <span className="text-[#064ed3] font-bold">
              consistency, relevance, and impact
            </span>{" "}
            across every touchpoint.
          </p>
        </motion.div>

        {/* Pills / Tags Section */}
        <motion.div 
          variants={containerVariants}
          className="mt-16 flex flex-wrap gap-x-4 gap-y-4 md:gap-x-6 md:gap-y-5 max-w-6xl"
        >
          {pills.map((pill, idx) => (
            <motion.div
              key={idx}
              variants={pillVariants}
              whileHover={{ scale: 1.04, backgroundColor: "#faeacb", borderColor: "#f9d79c" }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center rounded-full border border-[#fce4bd] bg-[#fdf2df] px-8 py-3 text-center text-sm md:text-[17px] font-semibold text-[#064ed3] shadow-xs transition-all duration-300 cursor-pointer"
            >
              {pill}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BrandingIntro;

