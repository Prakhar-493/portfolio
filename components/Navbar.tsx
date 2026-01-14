"use client"
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Contact', href: '#contact' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav 
      className={`fixed top-2 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'w-[95%] md:w-[90%] max-w-4xl py-2 md:py-3 bg-white/85 backdrop-blur-2xl rounded-full shadow-xl shadow-black/10' 
          : 'w-[95%] md:w-full py-4 md:py-6 bg-transparent'
      }`}
    >
      <div className={`mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center ${isScrolled ? 'max-w-none' : 'container'}`}>
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-1.5 md:gap-2 group cursor-pointer">
          <div className="w-6 md:w-8 h-6 md:h-8 bg-gray-900 flex items-center justify-center rounded-lg group-hover:bg-cyan-500 transition-colors">
            <span className="text-white font-mono text-xs font-bold">D</span>
          </div>
          <span className="text-sm md:text-xl font-black text-gray-900 tracking-tighter uppercase">
            Dev<span className="text-cyan-600">Core</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <ul className="flex gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-xs lg:text-sm font-bold text-gray-600 hover:text-cyan-600 transition-colors font-mono tracking-tight cursor-pointer"
                >
                  {`// ${link.name}`}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-gray-200 mx-1 lg:mx-2"></div>

          <a 
            href="#contact"
            className="px-4 lg:px-5 py-2 lg:py-2.5 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-cyan-500 transition-all shadow-lg shadow-gray-200"
          >
            Start a Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-900 p-2"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-0.5 bg-current mb-1.5"></div>
          <div className="w-6 h-0.5 bg-current"></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 w-full bg-white border-b border-gray-100 p-4 flex flex-col gap-3 md:hidden animate-in fade-in slide-in-from-top-4 mt-2 rounded-2xl shadow-lg">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => {
                handleScroll(e, link.href);
                setIsMobileMenuOpen(false);
              }}
              className="text-base md:text-lg font-bold text-gray-900 cursor-pointer py-2 px-2 hover:bg-cyan-50 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="w-full text-center py-4 bg-cyan-600 text-white font-bold rounded-xl cursor-pointer">
            Let's Talk
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;