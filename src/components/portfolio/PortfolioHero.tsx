import Image from "next/image";

const PortfolioHero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#d61e1b] flex items-center justify-center py-20 text-white">
      {/* Hero Background Image */}
      <Image
        src="/images/portfolio/Hero.png"
        alt="Hero Background"
        fill
        priority={true}
        sizes="100vw"
        quality={95}
        className="absolute inset-0 z-0 pointer-events-none object-cover"
      />

      {/* Hero Content */}
      <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 max-w-[1350px] w-full px-8 md:px-16 lg:px-20 items-center mt-12 lg:mt-0">
        {/* Left Side - Text */}
        <div className="flex flex-col justify-center text-left">
          <h1 className="text-[clamp(38px,5.5vw,68px)] font-heading font-medium tracking-normal leading-[1.12] text-white font-sans max-w-xl">
            Work That <br />
            Delivers Results
          </h1>
          <p className="text-[clamp(16px,1.8vw,24px)] font-heading font-light leading-snug text-white/90 max-w-[520px] mt-6">
            Explore the brands, campaigns, and digital experiences we've created to drive growth, engagement, and measurable impact.
          </p>
        </div>

        {/* Right Side - Images */}
        <div className="relative w-full flex items-center justify-center lg:justify-end min-h-[350px] md:min-h-[500px]">
          {/* Main container that aligns Layer 1 behind the target */}
          <div className="relative w-full max-w-[520px] aspect-square flex items-center justify-center">
            {/* Dot pattern/Stars layer (Layer 1.png) - static background */}
            <div className="absolute w-[80%] h-[80%] pointer-events-none z-0">
              <Image
                src="/images/portfolio/Layer 1.png"
                alt=""
                fill
                priority={true}
                className="object-contain"
              />
            </div>
            {/* Target Dart image (Target Hit.L03.2k 1.png) - interactive overlay */}
            <div className="relative w-[92%] h-[92%] z-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05]">
              <Image
                src="/images/portfolio/Target Hit.L03.2k 1.png"
                alt="Target Hit"
                fill
                priority={true}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
