import Image from 'next/image';

const AboutOrangeSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#c42a27] text-white py-20">
      
      {/* LAYER 0: The Background Image */}
      <img 
        src="/images/About_Us_Bg.png" 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* LAYER 20: The Content Layer */}
      <div className="relative z-20 max-w-[1350px] px-8 md:px-16">
        <div className="flex flex-col min-[1200px]:flex-row justify-between items-start gap-8 md:gap-16">
          
          {/* LEFT COLUMN */}
          <div className="flex flex-col w-full min-[1200px]:w-[58%]">
            <h1 className="text-[clamp(1.5rem,3.2vw,3rem)] font-extralight mb-6 md:mb-8 tracking-wider leading-tight">
              More Than an Agency. <br /> A Growth Partner.
            </h1>
            
            <div className="w-full">
              <h2 className="text-[clamp(1rem,1.6vw,1.35rem)] mb-4 md:mb-6 text-gray-200 font-thin">
                We combine <strong>strategy</strong>, <strong>creativity</strong> and <strong>technology</strong> to define marketing that performs not just looks good.
              </h2>
              
              <p className="text-[clamp(0.85rem,1.1vw,1.05rem)] mb-4 opacity-70 font-thin">
                In today's fast-moving digital <strong>landscape</strong>, visibility alone is not enough. Brands need <strong>clarity</strong>, <strong>consistency</strong> and <strong>performance</strong> at every touch point.
              </p>
              
              <p className="text-[clamp(0.85rem,1.1vw,1.05rem)] mb-6 md:mb-8 opacity-50 font-thin">
                We are a new-generation agency built to bridge that gap — bringing together strategic thinking, creative excellence, and data-driven execution under one roof. Every solution we design is rooted in understanding your business, your audience, and your growth ambitions.
              </p>
              
              
              <h2 className="text-[clamp(1rem,2vw,1.6rem)] mb-5 md:mb-6 bg-gradient-to-r from-[#fffdf7] to-[#fcd87c] bg-clip-text text-transparent font-medium">
                We don't just deliver campaigns. <br /> We build momentum.
              </h2>

            </div>
          </div>

         
         <div className="flex justify-center items-center -mt-20 md:mt-6 w-full min-[1200px]:w-[42%]">
            
           
          <div className="relative pointer-events-none max-w-[800px] w-full aspect-square flex items-center justify-center overflow-hidden">
            {/* SVG Filter to remove black background (Chroma Key) */}
            <svg width="0" height="0" className="absolute">
              <defs>
                <filter id="remove-black" colorInterpolationFilters="sRGB">
                  <feColorMatrix type="matrix" 
                    values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            3 3 3 0 -0.5" />
                </filter>
              </defs>
            </svg>
            
            <video
              src='/assets/moving compass_1.webm'
              autoPlay
              muted
              loop
              playsInline
              style={{ filter: 'url(#remove-black)' }}
              className="w-full h-full object-contain scale-160 md:scale-220"
            />
          </div>
          </div>

        </div>
      </div>
      
    </section>
  );
};

export default AboutOrangeSection;