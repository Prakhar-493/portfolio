"use client"
import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { 
    title: "Frontend Core", 
    items: ["React", "Next.js", "TypeScript"], 
    size: "col-span-2 row-span-2", 
    color: "bg-sky-100",
    icon: "⚛️"
  },
  { 
    title: "Backend", 
    items: ["Node.js", "Express", "PostgreSQL"], 
    size: "col-span-1 row-span-1", 
    color: "bg-gray-50",
    icon: "⚙️"
  },
  { 
    title: "Design", 
    items: ["Tailwind", "Framer Motion"], 
    size: "col-span-1 row-span-2", 
    color: "bg-cyan-50",
    icon: "🎨"
  },
  { 
    title: "Cloud & DevOps", 
    items: ["AWS", "Docker", "Vercel"], 
    size: "col-span-1 row-span-1", 
    color: "bg-gray-50",
    icon: "☁️"
  },
  { 
    title: "Currently Exploring", 
    items: ["Web3", "AI Integration"], 
    size: "col-span-2 row-span-1", 
    color: "bg-cyan-600 text-white",
    icon: "🚀"
  },
];

const SkillsBento = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">
            Technical <span className="text-cyan-600">Arsenal</span>
          </h2>
          <p className="text-gray-400 font-mono text-xs mt-2 uppercase tracking-widest">
            // Categorized by proficiency
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-auto lg:grid-rows-3 gap-3 sm:gap-4 lg:h-auto lg:h-[600px]">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 0.98 }}
              className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between transition-all border border-transparent hover:border-gray-200 ${
                skill.title === "Currently Exploring" 
                  ? "sm:col-span-2 lg:col-span-2" 
                  : skill.title === "Frontend Core"
                  ? "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2"
                  : skill.title === "Design"
                  ? "sm:row-span-1 lg:col-span-1 lg:row-span-2"
                  : ""
              } ${skill.color}`}
            >
              <div>
                <span className="text-xl sm:text-2xl mb-3 sm:mb-4 block">{skill.icon}</span>
                <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 ${skill.title === "Currently Exploring" ? "text-white" : "text-gray-900"}`}>
                  {skill.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span 
                    key={item} 
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      skill.title === "Currently Exploring" 
                      ? "bg-white/20 text-white" 
                      : "bg-white text-gray-600 border border-gray-100"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsBento;