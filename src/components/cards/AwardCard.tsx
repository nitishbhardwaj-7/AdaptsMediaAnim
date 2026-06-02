import Image from 'next/image';

type AwardCardProps = {
  awardName: string;
  imagePath: string; // Changed from iconColor to imagePath
};

export default function AwardCard({ awardName, imagePath }: AwardCardProps) {
  return (
    /* 1. Perspective Wrapper */
    <div className="group [perspective:1000px] h-[16rem] w-[18rem]">
      
      {/* 2. Main Card Body with 3D Styles */}
      <div className="relative h-full w-full flex flex-col items-center justify-center p-6 backdrop-blur-md bg-transparent border border-white/10 border-t-white/30 border-l-white/30 rounded-[2rem] rounded-tl-none text-white transition-all duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateX(12deg)_rotateY(-12deg)] group-hover:shadow-[25px_25px_50px_rgba(0,0,0,0.4)] hover:bg-white/5">

        {/* 5. Logo Image (Popped forward significantly) */}
        <div className="w-35 h-35 mb-3 flex items-center justify-center relative z-20 [transform:translateZ(60px)]">
          <Image 
            src={imagePath} 
           alt=''
            fill
            className="object-contain drop-shadow-2xl" 
          />
        </div>

        {/* 6. Text Content (Popped forward moderately) */}
        <div className="text-center relative z-20 [transform:translateZ(40px)]">
         
          <p className="text-[15px] font-light text-white">
            {awardName}
          </p>
        </div>

        {/* 8. Border Glow Ring */}
        <div className="absolute inset-0 rounded-[2rem] rounded-tl-none 
          shadow-[0_0_15px_rgba(255,255,255,0.2)] pointer-events-none z-30 [transform:translateZ(20px)]">
        </div>
        
      </div>
    </div>
  );
}