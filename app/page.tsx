"use client"
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import Projects from '@/components/Projects'
import SkillsBento from '@/components/SkillsBento'
import ImpactStats from '@/components/ImpactStats'
import Contact from '@/components/Contact'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

// Custom cursor component
const CustomCursor = () => {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  const [isVisible, setIsVisible] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Detect hovering over interactive elements
    const handleMouseOverButton = () => setIsHovering(true)
    const handleMouseOutButton = () => setIsHovering(false)

    const interactiveElements = document.querySelectorAll('button, a, [role="button"], input, textarea')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseOverButton)
      el.addEventListener('mouseleave', handleMouseOutButton)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseOverButton)
        el.removeEventListener('mouseleave', handleMouseOutButton)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Main cursor dot */}
      {isVisible && (
        <motion.div
          className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-multiply"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            transform: 'translate(-50%, -50%)',
            background: isHovering 
              ? 'radial-gradient(circle, rgba(59,130,246,0.85) 0%, rgba(34,211,238,0.65) 100%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.65) 0%, rgba(34,211,238,0.45) 100%)',
            boxShadow: isHovering 
              ? '0 0 20px 8px rgba(59,130,246,0.35)'
              : '0 0 12px 4px rgba(34,211,238,0.25)',
          }}
          animate={{
            scale: isHovering ? 1.8 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Cursor ring */}
      {isVisible && (
        <motion.div
          className="fixed w-8 h-8 rounded-full border-2 border-blue-400 pointer-events-none z-50"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.5,
            borderColor: isHovering ? 'rgb(34,211,238)' : 'rgb(59,130,246)',
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Trailing particles */}
      {isVisible && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`particle-${i}`}
              className="fixed w-1.5 h-1.5 rounded-full pointer-events-none z-40"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
                transform: 'translate(-50%, -50%)',
                background: isHovering 
                  ? 'rgba(34,211,238,0.45)'
                  : 'rgba(59,130,246,0.3)',
              }}
              animate={{
                opacity: [0.8, 0],
                scale: [1, 0.5],
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                repeat: Infinity,
              }}
            />
          ))}
        </>
      )}
    </>
  )
}

// Dynamic animated background
const AnimatedBg = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl"
      style={{
        background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)"
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, 50, 0]
      }}
      transition={{ duration: 15, repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-1/3 right-0 w-96 h-96 rounded-full blur-3xl"
      style={{
        background: "radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 70%)"
      }}
      animate={{
        x: [0, -80, 0],
        y: [0, -60, 0]
      }}
      transition={{ duration: 17, repeat: Infinity, delay: 1 }}
    />
    <motion.div
      className="absolute top-1/2 -left-48 w-80 h-80 rounded-full blur-3xl"
      style={{
        background: "radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)"
      }}
      animate={{
        x: [0, 60, 0],
        y: [0, -40, 0]
      }}
      transition={{ duration: 19, repeat: Infinity, delay: 2 }}
    />
  </div>
)

// Scroll progress line
const ScrollLine = () => {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed left-0 top-0 w-1 h-full bg-linear-to-b from-blue-500 via-cyan-500 to-teal-500"
      style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
    />
  )
}

// Enhanced section with multiple animations
const Section = ({ 
  children, 
  delay = 0,
  className = "",
  title = ""
}: { 
  children: React.ReactNode
  delay?: number
  className?: string
  title?: string
}) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0])

  return (
    <motion.section
      ref={ref}
      style={{ opacity, y, perspective: 1000 }}
      className={`relative ${className}`}
    >
      {title && (
        <motion.h2
          className="text-sm md:text-base font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 uppercase tracking-widest mb-4 md:mb-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay }}
        >
          {title}
        </motion.h2>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className="bg-linear-to-br from-white via-cyan-50/25 to-white rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-300 border border-cyan-100/60 relative overflow-hidden"
        >
          {/* Animated hover background */}
          <motion.div
            className="absolute inset-0 bg-linear-to-br from-blue-100/0 to-cyan-100/0 rounded-2xl pointer-events-none"
            animate={isHovered ? {
              background: "linear-gradient(to bottom right, rgba(59,130,246,0.06), rgba(34,211,238,0.06))"
            } : {
              background: "linear-gradient(to bottom right, rgba(59,130,246,0), rgba(34,211,238,0))"
            }}
          />
          
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

// Floating shapes that move with scroll
const FloatingShapes = () => {
  const { scrollY } = useScroll()
  
  // Different parallax speeds for depth
  const y1 = useTransform(scrollY, [0, 2000], [0, 400])
  const y2 = useTransform(scrollY, [0, 2000], [0, -350])
  const y3 = useTransform(scrollY, [0, 2000], [0, 300])
  const y4 = useTransform(scrollY, [0, 2000], [0, -280])
  
  // Rotation based on scroll
  const rotate1 = useTransform(scrollY, [0, 2000], [0, 360])
  const rotate2 = useTransform(scrollY, [0, 2000], [0, -360])

  return (
    <>
      {/* Large rotating square - top right */}
      <motion.div
        className="fixed top-1/4 -right-40 w-72 h-72 border-3 border-blue-400/45 rounded-3xl pointer-events-none z-0 shadow-lg shadow-blue-300/25"
        style={{ 
          y: y1,
          rotate: rotate1,
        }}
      />
      
      {/* Circle with gradient - middle left */}
      <motion.div
        className="fixed top-1/2 -left-48 w-96 h-96 rounded-full bg-linear-to-br from-cyan-300/25 to-blue-300/25 pointer-events-none z-0 blur-xl shadow-2xl shadow-cyan-300/30"
        style={{ 
          y: y2,
        }}
      />
      
      {/* Small rotating shape - bottom right */}
      <motion.div
        className="fixed bottom-1/3 -right-16 w-64 h-64 border-3 border-teal-400/45 pointer-events-none z-0 shadow-lg shadow-teal-300/25"
        style={{ 
          y: y3,
          rotate: rotate2,
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
        }}
      />
      
      {/* Medium glowing circle - center area */}
      <motion.div
        className="fixed top-2/3 right-1/4 w-72 h-72 rounded-full border-2 border-cyan-400/55 pointer-events-none z-0 shadow-2xl shadow-cyan-400/25"
        style={{ 
          y: y4,
        }}
      />
    </>
  )
}

// Animated decorative divider
const Divider = ({ rotate = false }: { rotate?: boolean }) => (
  <motion.div
    className="flex justify-center py-8 md:py-12 relative"
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="relative flex items-center gap-4"
    >
      <motion.div
        className="w-8 h-px bg-linear-to-r from-transparent via-blue-300 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      />
      
      <motion.div
        className="w-2 h-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50"
        animate={{ 
          rotate: rotate ? 360 : 0,
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity }
        }}
      />
      
      <motion.div
        className="w-8 h-px bg-linear-to-r from-transparent via-blue-300 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
    </motion.div>
  </motion.div>
)

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white cursor-none relative overflow-x-hidden">
      <CustomCursor />
      <AnimatedBg />
      <FloatingShapes />
      <ScrollLine />
      <Navbar />
      
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Hero 
          subtitle="I build robust, user-centric applications using React, Node.js, and TypeScript. Turning complex problems into elegant digital experiences."
        />
      </motion.div>

      <Divider rotate />

      {/* Projects Section */}
      <Section className="px-4 md:px-6 lg:px-8 py-12 md:py-16" delay={0.05} title="Featured Work">
        <Projects />
      </Section>

      <Divider />

      {/* Impact Stats */}
      <Section className="px-4 md:px-6 lg:px-8 py-8 md:py-12" delay={0.1} title="Impact & Results">
        <motion.div
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <ImpactStats />
        </motion.div>
      </Section>

      <Divider rotate />

      {/* Skills */}
      <Section className="px-4 md:px-6 lg:px-8 py-12 md:py-16" delay={0.15} title="Technical Expertise">
        <SkillsBento />
      </Section>

      <Divider />

      {/* Contact */}
      <Section className="px-4 md:px-6 lg:px-8 py-12 md:py-16" delay={0.2} title="Get In Touch">
        <Contact />
      </Section>

      <Divider rotate />

      {/* Footer with enhanced styling */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-linear-to-b from-gray-950 via-gray-900 to-black text-white mt-8 overflow-hidden"
      >
        {/* Animated top border */}
        <motion.div
          className="h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Background glow */}
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/25 rounded-full blur-3xl pointer-events-none"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          <Footer />
        </div>
      </motion.div>
    </div>
  );
}

export default page