"use client";
import StatsCard from '../cards/StatCard';
import ArrowButton from '../buttons/ArrowButton';
import YellowButton from '../buttons/YellowButton';
import { motion } from "framer-motion";
import Image from "next/image";

// Helper for the reveal animation
const RevealText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  </div>
);

const OrangeSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-x-hidden flex items-center justify-center bg-[#c42a27] text-white py-20">
      
      <Image 
        src="/images/About_Us_Bg.png" 
        alt="Background"
        fill
        priority
        sizes="100vw"
        quality={80}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute z-10 top-1/2 -translate-y-1/2 right-0 w-[50%] h-[70%] object-cover opacity-30 mix-blend-multiply pointer-events-none"
    style={{
      maskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 80%)',
    }}
  >
    <source src="/assets/video_bg2.mp4" type="video/mp4" />
  </video>

      <div className="relative z-20 max-w-[1600px] px-8 md:px-20">
        
        {/* Main Heading */}
        <RevealText>
          <h1 className="text-[clamp(1.6rem,4.5vw,4.5rem)] font-extralight mb-8 md:mb-12 tracking-wider leading-tight">
            A New-Age Agency <br /> Built for Today's Brands
          </h1>
        </RevealText>

        <div className="flex flex-col min-[1200px]:flex-row justify-between gap-10 md:gap-30">

          {/* LEFT COLUMN */}
          <div className="flex flex-col w-full">
            <div className="w-full">
              
              <RevealText delay={0.1}>
                <h2 className="text-[clamp(1rem,2vw,1.875rem)] mb-6 md:mb-8 text-gray-200 font-thin font-sans">
                  We combine <strong>strategy</strong>, <strong>creativity</strong> and <strong>technology</strong> to define marketing that performs not just looks good.
                </h2>
              </RevealText>
              
              <RevealText delay={0.2}>
                <p className="text-[clamp(0.9rem,1.5vw,1.25rem)] mb-6 opacity-70 font-thin">
                  In today's fast-moving digital <strong>landscape</strong>, visibility alone is not enough. Brands need <strong>clarity</strong>, <strong>consistency</strong> and <strong>performance</strong> at every touch point.
                </p>
              </RevealText>
              
              <RevealText delay={0.3}>
                <p className="text-[clamp(0.9rem,1.5vw,1.25rem)] mb-8 md:mb-10 opacity-50 font-thin">
                  We are a new-generation agency built to bridge that gap — bringing together strategic thinking, creative excellence, and data-driven execution under one roof. Every solution we design is rooted in understanding your business, your audience, and your growth ambitions.
                </p>
              </RevealText>
              
              <RevealText delay={0.4}>
                <h2 className="text-[clamp(1rem,2.5vw,2.25rem)] mb-6 md:mb-8 bg-gradient-to-r from-[#fffdf7] to-[#fcd87c] bg-clip-text text-transparent font-medium leading-tight">
                  We don't just build campaigns. <br /> We build momentum.
                </h2>
              </RevealText>

              {/* Buttons fade in slightly later */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-start gap-3 sm:gap-6 items-center"
              >
                <ArrowButton width='md' title="Read More"/>
                <YellowButton title='Start a Project' variant='red'/>
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN (Stats Cards) */}
          <div className="flex gap-6 xl:gap-10 mt-6 w-auto lg:w-auto lg:flex-shrink lg:justify-start">
            <div className="flex flex-col gap-3 sm:gap-6 lg:flex-none">
              <StatsCard value="100+" title={`Brands Scaled\n Across Industries`} />
              <StatsCard value="500+" title={`Successfully Executed Campaigns`} />
            </div>

            <div className="flex flex-col gap-3 sm:gap-6 mt-8 md:mt-10 flex-1 lg:flex-none">
              <StatsCard value="3X" title={`Average Campaign Performance Uplift`} />
              <StatsCard value="5+" title={`Key Market Presence`} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrangeSection;