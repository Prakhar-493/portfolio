"use client"
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Production Apps", value: "15+", detail: "Delivered scalable solutions" },
  { label: "Lines of Clean Code", value: "50k+", detail: "TypeScript & Node.js" },
  { label: "Optimization Rate", value: "40%", detail: "Avg. performance increase" },
  { label: "System Uptime", value: "99.9%", detail: "Architected reliability" },
];

const ImpactStats = () => {
  return (
    <section className="py-24 bg-white border-y border-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="flex flex-col space-y-2">
                <span className="text-cyan-600 font-mono text-xs font-bold tracking-widest uppercase">
                  {stat.label}
                </span>
                <h3 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-cyan-500 transition-all duration-300">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm font-light italic">
                  {stat.detail}
                </p>
              </div>
              
              {/* Bottom Decorative Line */}
              <div className="mt-6 h-[1px] w-full bg-gray-100 relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: index * 0.5 }}
                  className="absolute inset-0 w-1/3 bg-linear-to-r from-transparent via-cyan-400 to-transparent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;