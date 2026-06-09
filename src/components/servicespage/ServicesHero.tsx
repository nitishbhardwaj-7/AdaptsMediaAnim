import Image from "next/image";

const ServicesHero = () => {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-br from-[#4c3592] via-[#e21b22] to-[#4c3592] flex items-center justify-center py-12 text-white">
      <Image
        src="/images/services/HeroMaskGroup.png" 
        alt="Hero Background"
        fill
        priority={true}
        sizes="100vw"
        quality={85}
        className="absolute z-10 pointer-events-none object-cover" 
      />
      {/* Hero Content */}
      <div className="grid grid-cols-1 gap-8 min-[1200px]:grid-cols-2 max-w-[1350px] w-full px-8 md:px-16">
        {/* Left Side */}
        <div className="flex items-center">
          <h1 className="text-5xl tracking-wide md:text-7xl">
            Services
          </h1>
        </div>

        {/* Right Side */}
        <div className="relative z-10 flex flex-col justify-center max-w-md">
          <h2 className="mb-6 text-3xl leading-snug md:text-5xl">
            Services Built to <br /> Drive Real Growth.
          </h2>
          <p className="text-2xl font-extralight leading-tight tracking-wide text-white">
            From strategy to execution, we create integrated solutions 
            that help brands connect, perform, and scale.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;