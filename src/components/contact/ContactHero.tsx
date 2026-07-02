import Image from "next/image";

const ContactHero = () => {
  return (
    <section
      className="relative w-full min-h-[75vh] md:min-h-[100vh] flex items-center justify-center pt-32 pb-24 overflow-hidden"
      style={{
        backgroundImage: "url('/images/BrandingCreative/DesignSystemsBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1350px] mx-auto px-8 md:px-16 lg:px-20 w-full relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side Text */}
        <div className="flex-1 text-white z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Let's Build<br />
            What's Next
          </h1>
          <p className="text-base md:text-lg text-white max-w-md leading-relaxed">
            Whether you're launching a new brand, scaling your business, or looking for a strategic marketing partner, we're ready to help.
          </p>
        </div>

        {/* Right Side Images */}
        <div className="flex-1 relative flex items-center justify-center md:justify-end w-full max-w-[500px] aspect-square z-20">
          {/* Background Pattern */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <Image
              src="/images/BrandingCreative/DesignSystemLogoBg.png"
              alt="Background Pattern"
              width={400}
              height={400}
              className="object-contain w-[70%] h-[70%]"
            />
          </div>
          {/* Main Icon */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500">
            <Image
              src="/images/ContactIcon.png"
              alt="Contact Icon"
              width={500}
              height={500}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
