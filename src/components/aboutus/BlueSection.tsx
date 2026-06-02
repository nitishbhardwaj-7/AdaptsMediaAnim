"use client"

import { motion, Variants } from "framer-motion"; // Added Variants import
import Image from "next/image";

// Animation Variants with explicit typing
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] // Framer Motion now recognizes this correctly
    }
  }
};


const BlueSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-[#064ED3] bg-gradient-to-br from-[#0052FF] relative to-[#0039CC] text-white flex flex-col w-full items-start justify-start md:items-center md:justify-center py-20 font-sans overflow-hidden"
    >
      <Image
        src="/images/Services_Bg.png"
        alt=""
        fill
        className="absolute z-10 pointer-events-none object-cover"
      />

      <div className="max-w-[1600px] relative z-50 w-full px-8 md:px-20">
        <motion.div className="mb-20" variants={fadeInUp}>
          <div className="flex gap-4 mb-6">
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase opacity-80 text-[#FAC02E]">
              Services
            </span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="h-[1px] bg-yellow-500"
            />
          </div>

          <h2 className="text-4xl md:text-7xl font-medium mb-8 leading-tight max-w-3xl">
            Strategy First. <br /> Always.
          </h2>

          <p className="text-lg md:text-3xl opacity-90 max-w-3xl font-light mb-10 md:mb-30 leading-relaxed">
            End-to-end solutions built to help brands grow, connect, and perform
            across every touchpoint.
          </p>

          {/* Repeating Headings */}
          <h2 className="text-xl md:text-[82px] w-full font-medium mb-8 leading-tight">
            What does your brand stand for?
          </h2>
          <h2 className="text-xl md:text-[82px] w-full font-medium mb-8 leading-tight">
            Where is the real opportunity?
          </h2>
          <h2 className="text-xl md:text-[82px] w-full font-medium mb-10 md:mb-30 leading-tight">
            What will actually move the needle?
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="max-w-2xl">
              <p className="text-lg md:text-3xl opacity-90 font-light mb-10 leading-relaxed">
                End-to-end solutions built to help brands grow, connect, and perform
                across every touchpoint.
              </p>
              <p className="text-lg md:text-3xl opacity-90 font-light mb-10 leading-relaxed">
                No guesswork. No wasted effort. <br /> Just focused, effective execution.
              </p>
            </div>

            {/* THE JUMPING BULB EFFECT */}
            <div className="flex-shrink-0">
              <motion.div
                initial="down"
                whileInView="up"
                viewport={{ once: false, amount: 0.6 }}
                className="h-40 w-40 md:h-92 md:w-92 relative"
              >
                {/* THE MOVER */}
                <motion.div
                  variants={{
                    down: { y: 0 },
                    up: { y: -60 } // The jump height
                  }}
                  transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="w-full h-full"
                >
                  <video
                    src="/assets/Light Bulb 1_1.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain pointer-events-none"
                  ></video>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlueSection;