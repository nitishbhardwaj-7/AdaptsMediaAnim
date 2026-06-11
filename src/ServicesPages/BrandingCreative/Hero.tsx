import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-[#4c3592] via-[#e21b22] to-[#4c3592] flex items-center justify-center py-12 text-white">
      <Image
        src="/images/brandingcreative/HeroImage.png" 
        alt="Hero Background"
        fill
        priority={true}
        sizes="100vw"
        quality={85}
        className="absolute z-0 pointer-events-none object-cover" 
      />
      {/* Hero Content */}
      <div className="grid grid-cols-1 z-10 gap-8 min-[1200px]:grid-cols-2 max-w-[1350px] w-full px-8 md:px-16">
        {/* Left Side */}
        <div className="flex items-center">
          <h1 className="text-5xl tracking-wide md:text-7xl">
            Branding & Creative
          </h1>
        </div>

        {/* Right Side */}
        <div className="relative z-10 flex flex-col justify-center max-w-xl">
          <h2 className="mb-6 text-3xl leading-snug md:text-5xl">
           Building Brands People <br/> Remember
          </h2>
          <p className="text-2xl font-extralight leading-tight tracking-wide text-white">
            Your brand is more than a logo, it’s how people perceive, connect with, and remember your business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;