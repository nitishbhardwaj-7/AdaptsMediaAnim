"use client"
import { motion, Variants } from "framer-motion"; 
import Image from "next/image";
import ServiceList from "../layout/ServicesList";

const services = [
  {
    number: "01",
    title: "Performance Marketing",
    items: ["Affiliate Channels", "Cost Per Action", "ROI Model"],
  },
  {
    number: "02",
    title: "Social & Content",
    items: ["Content Strategy", "Leverage Influencers", "Paid Social"],
  },
  
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1,     
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};


const WebDigitalExperience = () => {
  return (
    
      <motion.section 
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  className="bg-transparent relative text-white font-sans overflow-hidden"
>

  <div className="relative z-50 max-w-[1350px] w-full px-8 md:px-16 mx-auto">
    
    {/* Flex Wrapper: Performance Marketing on Left, Image on Right */}
    <div className="flex flex-col min-[1200px]:flex-row gap-12 md:gap-36 items-start">
      
      {/* LEFT COLUMN: Text and Grid */}
      <div className="flex-grow w-full">
        <motion.div variants={fadeInUp}>
          <h2 className="text-2xl md:text-6xl font-light mb-8 leading-tight">
            Web & Digital  <br/> Experience
          </h2>
          <p className="text-lg md:text-3xl opacity-90 mb-20 font-light max-w-3xl">
            End-to-end solutions built to help brands grow, connect, and perform across every touchpoint.
          </p>
        </motion.div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 w-full">
          {services && services.map((service, index) => (
            <div key={index} className="w-full">
              <ServiceList items={service.items} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Image (Sticky) */}
      <div className="flex-shrink-0 md:sticky md:top-20">
        {/* THE SENSOR: This div stays perfectly still so it doesn't jitter */}
        {/* THE SENSOR: Stays still to avoid jitter */}
  <motion.div
    initial="down"
    whileInView="up"
    viewport={{ once: false, amount: 0.6, margin: "-15% 0px -20% 0px" }}
    className="h-40 w-40 md:h-72 md:w-72 relative"
  >
    {/* THE MOVER: Both images are now inside this animated div */}
    <motion.div
  initial="down"
  whileInView="up"
  viewport={{ once: false, amount: 0.6, margin: "-15% 0px -20% 0px" }}
  className="w-full h-full relative"
>
  {/* 1. THE BACKGROUND IMAGE (Small Jump) */}
  <motion.img 
    src="/images/services/commonbg.png" 
    variants={{
      down: { y: 0 },
      up: { y: -30 } // Much smaller jump
    }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    className="absolute inset-0 w-full h-full object-contain scale-150 z-0 opacity-50 pointer-events-none" 
    style={{ filter: 'brightness(0)' }}
    alt="Background" 
  />

  {/* 2. THE MAIN IMAGE (Large Jump) */}
  <motion.img 
    src="/images/services/i3.png" 
    variants={{
      down: { y: 0 },
      up: { y: -80 } // Original jump
    }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    className="relative z-10 w-full h-full object-contain" 
    alt="Rocket" 
  />
</motion.div>
  </motion.div>
      </div>

    </div>
  </div>
</motion.section>
      );
    };



export default WebDigitalExperience;