"use client"
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, extend, ThreeElement } from '@react-three/fiber'
import { Image, Float, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// --- 3D GEOMETRY LOGIC ---
class BentPlaneGeometry extends THREE.PlaneGeometry {
  constructor(radius: number, ...args: any[]) {
    super(...args)
    const p = this.attributes.position
    const v3 = new THREE.Vector3()
    for (let i = 0; i < p.count; i++) {
      v3.fromBufferAttribute(p, i)
      const x = v3.x
      const angle = x / radius
      v3.x = Math.sin(angle) * radius
      v3.z = (Math.cos(angle) - 1) * radius
      p.setXYZ(i, v3.x, v3.y, v3.z)
    }
    p.needsUpdate = true
  }
}

extend({ BentPlaneGeometry })

declare module '@react-three/fiber' {
  interface ThreeElements {
    bentPlaneGeometry: ThreeElement<typeof BentPlaneGeometry>
  }
}

const projects = [
  { url: "/image1.png" },
  { url: "/image2.png" },
  { url: "/image3.png" },
  { url: "/image4.png" },
  { url: "/image5.png" },
  { url: "/image6.png" },
]

function Card({ url, angle, radius }: { url: string; angle: number; radius: number }) {
  const [hovered, setHover] = useState(false)
  return (
    <group position={[Math.sin(angle) * (radius + 0.2), 0, Math.cos(angle) * (radius + 0.2)]} rotation={[0, angle, 0]}>
      <Image
        url={url}
        scale={[4, 2.5]}
        transparent
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        grayscale={hovered ? 0 : 0.5}
      >
        <bentPlaneGeometry args={[radius, 4, 2.5, 64, 64]} />
      </Image>
    </group>
  )
}

function Carousel() {
  const group = useRef<THREE.Group>(null!)
  const radius = 14; 
  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.1
  })
  return (
    <group ref={group}>
      {projects.map((project, i) => (
        <Card key={i} url={project.url} angle={(i / projects.length) * Math.PI * 2} radius={radius} />
      ))}
    </group>
  )
}

// --- MAIN COMPONENT ---
const ProjectCylinder = () => {
  return (
    <section id="projects" className="relative w-full py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
      
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-sky-100 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-0 -right-32 w-[600px] h-[600px] bg-cyan-100 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        
        {/* NEW TYPOGRAPHY SECTION */}
        <div className="max-w-4xl mb-8 md:mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 md:w-12 bg-cyan-600"></span>
            <p className="font-mono text-xs font-bold tracking-[0.4em] text-cyan-600 uppercase">
              Portfolio v2.0
            </p>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">
            DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500 italic font-light">
              ARCHIVE
            </span>
          </h2>
          
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <p className="text-gray-500 max-w-md font-light leading-relaxed text-sm md:text-base" style={{ fontFamily: 'Georgia, serif' }}>
              A curated collection of full-stack projects focusing on scalability, 
              user experience, and robust architectural patterns. Each piece represents a 
              unique challenge solved through code.
            </p>
            <div className="font-mono text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest border-l border-gray-100 pl-4 md:pl-6">
              Status: Interactive <br />
              Stack: R3F / Three.js <br />
              Render: WebGL 2.0
            </div>
          </div>
        </div>
        
        {/* THE 3D CANVAS */}
        <div className="w-full h-[300px] sm:h-[400px] md:h-[650px] cursor-grab active:cursor-grabbing rounded-2xl md:rounded-3xl overflow-hidden bg-gray-50/30">
          <Canvas camera={{ position: [0, 0, 35], fov: 25 }}>
            <ambientLight intensity={2} />
            <pointLight position={[20, 20, 20]} />
            <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
              <Carousel />
            </Float>
            <fog attach="fog" args={["#ffffff", 15, 42]} />
            <ContactShadows position={[0, -6, 0]} opacity={0.2} scale={40} blur={2.5} />
            <Environment preset="studio" />
          </Canvas>
        </div>
      </div>
    </section>
  )
}

export default ProjectCylinder;