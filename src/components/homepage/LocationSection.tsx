import Image from "next/image";

const locations = [
  {
    city: "London",
    address: "Surbiton KT5, London, UK",
    contact: "Email: Info@adaptsmedia.com"
  },
  {
    city: "United States",
    address: "2807 Allen St Dallas, Texas 75204 United States",
    contact: "Contact Number: (256) 286-1817\nEmail: Info@adaptsmedia.com"
  },
  {
    city: "India",
    sub: "Office 01",
    address: "Gurugram: Plot no 23, Sector 18 Gurugram, Haryana 122015",
    contact: "Contact Number: +91 9818706696\nEmail: Info@adaptsmedia.com"
  },
  {
    city: "India",
    sub: "Office 02",
    address: "Bilaspur: G-9, G-10, Commercial Complex, Phase III, Ramalife City, Sakri Road, Bilaspur, Chhattisgarh",
    contact: "Contact Number: +91 9818706696\nEmail: Ankita@adaptsmedia.com"
  },
  {
    city: "Philippines",
    address: "Julia Vargas Avenue, Ortigas Pasig City, Philippines",
    contact: "Contact Number: +639 95 308 2820\nEmail: Info@adaptsmedia.com"
  }
];

const LocationSection = () => {
  return (
    <section className="bg-[#022C56] relative text-white flex flex-col items-start justify-start md:items-center md:justify-center py-20 font-sans overflow-hidden">
      <Image
              src="/images/LocationMask.png" 
              alt="Decorative Element"
              fill
              className="absolute z-0 pointer-events-none" // Add your animation class here
            />
      <div className="max-w-[1350px] w-full px-8 md:px-16">
        
        {/* Main Content Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          
          {/* Left: Dubai Info */}
          <div className="w-full md:w-[70%]">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#f5a623] uppercase">
                Locations
              </span>
              <div className="w-12 h-[1px] bg-[#f5a623]" />
            </div>
            
            <h2 className="text-5xl md:text-7xl relative font-heading font-medium mb-16 leading-tight tracking-tight">
              Exactly Where <br /> You Need Us <Image
              src='/images/Arrow.png'
              alt=""
              width={20}
              height={20}
              className="hidden md:block lg:block md:absolute lg:absolute right-6 top-28"/>
              
            </h2>

            <div className="space-y-6">
              <h3 className="text-3xl font-light">Dubai</h3>
              <p className="text-sm opacity-70 leading-relaxed max-w-xs font-light">
                702, Warsan Tower, Near Media Rotana, <br />
                Tecom, Barsha Heights, Dubai, <br />
                United Arab Emirates
              </p>
              <div className="text-sm opacity-70 space-y-1 font-light">
                <p>Contact Number: +971 58 560 1701</p>
                <p>Landline: +971 043257279</p>
                <p>Email: Info@adaptsmedia.com</p>
              </div>
            </div>
          </div>

          {/* Right: Dotted World Map */}
          <div className="w-full relative min-h-[300px] flex items-center justify-center">
            {/* Dotted Map Placeholder (Using an SVG pattern or Image) */}
            <div className="opacity-100 w-full h-full">
               <img 
                 src="/images/global_map.png" 
                 alt="World Map"
                 className="w-full  object-contain opacity-100"
               />
               {/* Location Pin */}
               <Image
               src='/images/LocationPin.png'
               alt=''
               height={20}
               width={30}
               className='hidden md:block lg:block md:absolute lg:absolute top-[38%] left-[58%]'/>
            </div>
          </div>
        </div>

        {/* Branch Offices Section */}
        <div className="mt-12 w-full">
          <span className="text-[14px] font-medium tracking-[0.1em] opacity-80 mb-6 block">
            Branch Offices
          </span>

          {/* Desktop Layout (Continuous lines) */}
          <div className="hidden lg:flex flex-col w-full pt-4">
            <div className="grid grid-cols-5 gap-10">
              {locations.map((loc, index) => (
                <div key={`desktop-addr-${index}`} className="flex flex-col">
                  <h4 className="text-3xl xl:text-4xl font-light mb-6 flex items-baseline gap-2">
                    {loc.city} {loc.sub && <span className="text-base opacity-80">- {loc.sub}</span>}
                  </h4>
                  <p className="text-[13px] opacity-80 leading-relaxed font-light pr-4 min-h-[60px]">
                    {loc.address}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="w-full h-[1px] bg-white/30 my-6" />
            
            <div className="grid grid-cols-5 gap-10">
              {locations.map((loc, index) => (
                <div key={`desktop-contact-${index}`} className="flex flex-col justify-start">
                  <div className="text-[13px] opacity-80 whitespace-pre-line font-light leading-relaxed">
                    {loc.contact}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full h-[1px] bg-white/30 mt-6" />
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-12 pt-4">
            {locations.map((loc, index) => (
              <div key={`mobile-${index}`} className="flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-3xl font-light mb-4 flex items-baseline gap-2">
                    {loc.city} {loc.sub && <span className="text-base opacity-80">- {loc.sub}</span>}
                  </h4>
                  <p className="text-[13px] opacity-80 leading-relaxed min-h-[60px] font-light">
                    {loc.address}
                  </p>
                </div>
                <div className="text-[13px] py-4 flex flex-col justify-center opacity-80 mt-4 border-t border-b border-white/30 whitespace-pre-line font-light leading-relaxed">
                  {loc.contact}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default LocationSection;