"use client"
import { motion, Variants } from "framer-motion"; // Added Variants import
import ArrowButton from "../buttons/ArrowButton";
import YellowButton from "../buttons/YellowButton";
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
  {
    number: "03",
    title: "Web & Digital Experience",
    items: ["UX/UI", "Front & Back End", "API Integration"],
  },
  {
    number: "04",
    title: "Branding & Creative",
    items: ["Affiliate Channels", "Cost Per Action", "ROI Model"],
  },
  {
    number: "05",
    title: "Public Relations & Activations",
    items: ['Strategic PR', 'Press Releases', 'Events and Activation'],
  },
  {
    number: "06",
    title: "Strategy & Consulting",
    items: ['Industry and Competitor Analysis', 'Tailor-made Growth Strategies', 'Targeted Ads and Email Campaigns'],
  },
];

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

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const ArrowIcon = () => (
 <motion.div
      // Framer Motion handles the nudge and opacity change
      variants={{
        initial: { x: 0, opacity: 0.8 },
        hover: { x: 5, opacity: 1 }
      }}
      className="flex items-center justify-center"
    >
      <svg
        // Your exact classes and effects
        // Fixed at rotate-45 (initial) and rotate-90 (group-hover)
        className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/40 p-1.5 duration-300 ease-linear group-hover:border-none group-hover:bg-white group-hover:rotate-90 text-white group-hover:text-black relative z-10 rotate-45"
        viewBox="0 0 16 19"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
);

const ServicesSection = () => {
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
              sizes="100vw"
              quality={80}
              className="absolute z-10 pointer-events-none object-cover" 
            />
      <div className="max-w-[1600px] z-50 w-full px-8 md:px-20">
        {/* Header Section */}
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
            Services Designed to Drive Growth
          </h2>
          <p className="text-lg md:text-3xl opacity-90 max-w-3xl font-light leading-relaxed">
            End-to-end solutions built to help brands grow, connect, and perform
            across every touchpoint.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 min-[1300px]:grid-cols-3 gap-x-12 gap-y-6 md:gap-y-16"
        >
          {services.map((service, index) => (
            <motion.div key={index} className="flex flex-col">
              {/* Large Background Number */}
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 0.8, x: -32 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
                className="text-7xl font-normal opacity-80 mb-2 leading-none text-white blur-[2px] inline-block"
              >
                {service.number}
              </motion.span>
              
              <h3 className="text-2xl md:text-5xl font-light mb-8 leading-snug min-h-[4rem] w-86">
                {service.title}
              </h3>
             <ServiceList items={service.items} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div className="flex flex-wrap justify-center gap-6">
        <ArrowButton title="Explore All Services"/>

        <YellowButton title="Start a Project" variant="blue"/>
      </motion.div>
    </motion.section>
  );
};

export default ServicesSection;