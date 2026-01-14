"use client"
import React from 'react';
import TextType from './TextType'; // Adjust path as necessary

interface HeroProps {
  // We'll define the dynamic titles here
  titles?: string[];
  subtitle: string;
}

const techStack = [
  "JavaScript", "React.js", "TypeScript", "Next.js", "Tailwind CSS",
  "Node.js", "Python", "MongoDB", "PostgreSQL", "Docker", "AWS", "Git"
];

const Hero: React.FC<HeroProps> = ({ 
  titles = ["Software Engineer", "Full-Stack Developer", "Creative Coder"], 
  subtitle 
}) => {
  return (
    <section id="hero" className="relative bg-white pt-16 md:pt-20 pb-24 md:pb-32 overflow-hidden min-h-[95vh] flex flex-col justify-center">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          
          {/* Content Column */}
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <div className="space-y-2">
              <span className="text-cyan-600 font-mono font-bold tracking-widest uppercase text-xs md:text-sm">
                Available for hire
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight min-h-[1.2em]">
                {/* Your Custom TextType Component */}
                <TextType 
                  text={titles}
                  typingSpeed={70}
                  deletingSpeed={40}
                  pauseDuration={2500}
                  showCursor={true}
                  cursorClassName="text-cyan-500"
                  textColors={["#111827"]} // Match gray-900
                />
              </h1>
            </div>
            
            <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-600 max-w-xl leading-relaxed font-light" style={{ fontFamily: 'Georgia, serif' }}>
              {subtitle}
            </p>

            <div className="flex justify-center lg:justify-start pt-4">
              <button className="group relative px-6 sm:px-8 py-3 sm:py-4 font-bold text-white transition-all duration-300">
                <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-blue-500 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-cyan-500 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                  <span className="relative bg-gray-900 px-6 sm:px-8 py-3 sm:py-4 block text-sm sm:text-base">Let's Connect</span>
               </button>
            </div>
          </div>

          {/* Right Side: Animated Visuals */}
          <div className="lg:w-1/2 relative h-[300px] sm:h-[400px] md:h-[450px] flex items-center justify-center">
            <div className="relative w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80">
              <div className="absolute inset-0 bg-linear-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              
              {/* Floating Tech Cards */}
                <div className="absolute -top-6 sm:-top-8 left-4 sm:left-8 w-16 sm:w-20 h-16 sm:h-20 bg-white shadow-xl rounded-2xl flex items-center justify-center animate-float border border-cyan-50">
                  <span className="text-cyan-500 font-bold text-lg sm:text-2xl">{"{ }"}</span>
              </div>
              
                <div className="absolute bottom-2 sm:bottom-5 right-2 sm:right-5 w-20 sm:w-24 h-20 sm:h-24 bg-white shadow-2xl rounded-full flex items-center justify-center animate-float-delayed border border-cyan-50">
                  <div className="w-9 sm:w-12 h-9 sm:h-12 bg-linear-to-br from-cyan-100 to-blue-100 rounded-full animate-pulse"></div>
              </div>

              {/* Orbital Rings */}
                <div className="absolute inset-0 border-2 border-dashed border-cyan-100 rounded-full animate-spin-slow"></div>
              
              {/* Code Snippet Card */}
                <div className="absolute top-1/4 right-0 bg-gray-900 text-cyan-300 p-3 sm:p-5 rounded-xl shadow-2xl font-mono text-xs sm:text-sm rotate-6 animate-float z-20 border border-gray-800">
                 <p className="text-cyan-300">const <span className="text-white">skillSet</span> = [</p>
                <p className="pl-4 text-blue-300">'React', 'Node',</p>
                <p className="pl-4 text-blue-300">'TypeScript'</p>
                <p>];</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Moving Tech Stack Loop - Kept Original UI */}
      <div className="absolute bottom-4 md:bottom-10 left-0 right-0 overflow-hidden">
        <div className="flex">
          <div className="flex animate-scroll-text py-3 md:py-4 whitespace-nowrap">
            {techStack.concat(techStack).map((item, index) => (
              <span key={index} className="mx-4 md:mx-8 text-sm md:text-lg font-semibold text-gray-600 hover:text-cyan-500 transition-all cursor-default inline-block tracking-wide font-mono">
                {item}
              </span>
            ))}
          </div>
          <div className="flex animate-scroll-text py-4 whitespace-nowrap">
            {techStack.concat(techStack).map((item, index) => (
              <span key={index + 100} className="mx-8 text-lg font-semibold text-gray-600 hover:text-cyan-500 transition-all cursor-default inline-block tracking-wide font-mono">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;