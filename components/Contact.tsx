"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20">
          
          {/* Left Side: Text & Info */}
          <div className="lg:w-1/2 space-y-6 md:space-y-8">
            <div className="space-y-4">
              <p className="text-cyan-600 font-mono text-xs font-bold tracking-[0.4em] uppercase">
                Transmission
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
                Let's <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 italic font-light">
                  Connect
                </span>
              </h2>
            </div>

            <p className="text-gray-500 max-w-md font-light leading-relaxed text-base sm:text-lg" style={{ fontFamily: 'Georgia, serif' }}>
              Have a complex problem that needs an elegant solution? 
              I’m currently available for interesting projects and engineering roles.
            </p>

            <div className="space-y-4 md:space-y-6 pt-6 md:pt-8">
              <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <span className="font-mono text-sm">@</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400 font-mono">Email</p>
                  <p className="text-gray-900 font-bold text-sm md:text-base break-all">prakharshukla493@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <span className="font-mono text-sm">#</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400 font-mono">Status</p>
                  <p className="text-gray-900 font-bold text-sm md:text-base">Open for Collaboration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Glassmorphism Form */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white/40 backdrop-blur-xl border border-gray-100 p-6 sm:p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-gray-200/50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 ml-2">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe" 
                      className="w-full bg-gray-50/50 border border-transparent focus:border-cyan-200 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 ml-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com" 
                      className="w-full bg-gray-50/50 border border-transparent focus:border-cyan-200 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all" 
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 ml-2">Message</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can I help you?" 
                    className="w-full bg-gray-50/50 border border-transparent focus:border-cyan-200 focus:bg-white outline-none rounded-2xl px-6 py-4 transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3"
                  >
                    <span className="text-green-600 text-2xl">✓</span>
                    <div>
                      <p className="text-green-900 font-bold">Message sent successfully!</p>
                      <p className="text-green-700 text-sm">I'll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3"
                  >
                    <span className="text-red-600 text-2xl">✕</span>
                    <div>
                      <p className="text-red-900 font-bold">Failed to send message</p>
                      <p className="text-red-700 text-sm">Please try again or email directly.</p>
                    </div>
                  </motion.div>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full group relative overflow-hidden bg-gray-900 py-5 rounded-2xl text-white font-bold transition-all disabled:opacity-50"
                >
                  <div className="absolute inset-0 w-0 bg-linear-to-r from-blue-600 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? 'Sending...' : 'Send Signal'} 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;