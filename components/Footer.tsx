"use client"
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden border-t border-gray-50">
      {/* Decorative Grid Background - Subtle technical feel */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
         style={{ backgroundImage: `radial-gradient(#0ea5e9 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Massive Call to Action */}
        <div className="mb-20">
          <p className="text-cyan-600 font-mono text-sm font-bold tracking-[0.3em] uppercase mb-4">
            Next Project?
          </p>
          <a href="mailto:your@email.com" className="group block w-fit">
            <h2 className="text-5xl lg:text-8xl font-black text-gray-900 tracking-tighter transition-all group-hover:text-cyan-600">
              Let's <span className="italic font-light text-gray-400 group-hover:text-cyan-400 transition-colors">Build</span> Together
            </h2>
            <div className="h-2 w-0 bg-linear-to-r from-blue-500 to-cyan-500 transition-all duration-500 group-hover:w-full mt-2"></div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          
          {/* Left Side: System Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-gray-400">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              System Status: Fully Operational
            </div>
            <div className="text-sm font-mono text-gray-500 leading-relaxed">
              {`// Rooted in efficiency`} <br />
              {`// Focused on performance`} <br />
              {`// Built with TypeScript & Passion`}
            </div>
          </div>

          {/* Middle: Links */}
          <div className="lg:col-span-4 flex justify-between lg:justify-center gap-12 font-bold text-gray-900">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-mono">Social</p>
              <a href="https://github.com/Prakhar-493" className="hover:text-cyan-600 transition-colors">Github</a>
              <a href="#" className="hover:text-cyan-600 transition-colors">LinkedIn</a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-mono">Archive</p>
              <a href="#projects" onClick={(e) => handleScroll(e, '#projects')} className="hover:text-cyan-600 transition-colors cursor-pointer">Projects</a>
              <a href="#" className="hover:text-cyan-600 transition-colors">Resume</a>
            </div>
          </div>

          {/* Right Side: Contact Details */}
          <div className="lg:col-span-4 lg:text-right">
             <div className="inline-block text-left">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-mono">Location</p>
                <p className="text-gray-900 font-bold">Lucknow, India</p>
                <p className="text-gray-500 font-light italic">Asia</p>
             </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            {`© ${currentYear} Dev_Core_v2.0.0`}
          </div>
          <div className="flex gap-6 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
             <span>UTC-5:00</span>
             <span>Next.js 14.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;