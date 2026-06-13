"use client"

import React, { useState, useRef, useCallback } from "react"
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber"
import { OrbitControls, Html, Sphere, MeshDistortMaterial, useProgress } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import * as THREE from "three"

const origins = [
  { id: "ethiopia", name: "Ethiopia", region: "Yirgacheffe", notes: "Blueberry, Jasmine, Cocoa", process: "Washed", color: "#C4956A", lat: 9, lng: 40 },
  { id: "colombia", name: "Colombia", region: "Huila", notes: "Caramel, Orange Blossom, Milk Chocolate", process: "Anaerobic", color: "#8B5E3C", lat: 2, lng: -76 },
  { id: "sumatra", name: "Sumatra", region: "Aceh", notes: "Dark Chocolate, Cedar, Brown Sugar", process: "Semi-Washed", color: "#5C3A1E", lat: 5, lng: 97 },
  { id: "kenya", name: "Kenya", region: "Nyeri", notes: "Blackcurrant, Tomato, Honey", process: "Washed", color: "#A0522D", lat: 0, lng: 38 },
]

const roastLevels = [
  { name: "Green", color: "#6B8E23", temp: "N/A", desc: "Raw, unroasted" },
  { name: "Light", color: "#C4956A", temp: "196°C", desc: "Bright, acidic, floral" },
  { name: "Medium", color: "#8B5E3C", temp: "210°C", desc: "Balanced, sweet, smooth" },
  { name: "Dark", color: "#2C1810", temp: "224°C", desc: "Bold, smoky, intense" },
]

const directions = [
  { label: "Rinse filter", time: 5 },
  { label: "Add 15g coffee", time: 10 },
  { label: "Bloom 30g water / 30s", time: 40 },
  { label: "Pour to 250g", time: 70 },
  { label: "Drawdown", time: 90 },
  { label: "Enjoy!", time: 100 },
]

function getOriginId(lat: number, lng: number) {
  return origins.find(o => Math.abs(o.lat - lat) < 5 && Math.abs(o.lng - lng) < 5)?.id || ""
}

function Loader() {
  const { progress } = useProgress()
  return (
    <div className="flex items-center justify-center h-full bg-[#1A0F0A]">
      <div className="text-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C4956A]/30 border-t-[#C4956A] animate-spin mb-3 mx-auto" />
        <p className="text-[#C4956A]/60 text-xs font-mono">{progress.toFixed(0)}%</p>
      </div>
    </div>
  )
}

function Dot({ lat, lng, color, onClick, isActive }: { lat: number; lng: number; color: string; onClick: () => void; isActive: boolean }) {
  const pos = new THREE.Vector3().setFromSphericalCoords(2.55, (90 - lat) * (Math.PI / 180), lng * (Math.PI / 180))
  const origin = origins.find(o => o.id === getOriginId(lat, lng))
  const [hovered, setHovered] = useState(false)
  return (
    <mesh position={pos} onClick={onClick} onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer" }} onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto" }}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={isActive ? "#ffffff" : hovered ? "#C4956A" : color} />
      <Html distanceFactor={8} center>
        <div className={`px-2 py-0.5 rounded-full text-[10px] font-mono whitespace-nowrap transition-all border ${isActive ? "bg-white text-[#1A0F0A] border-white scale-110" : "bg-[#1A0F0A]/80 text-white/70 border-white/10"}`}>
          {origin?.name}
        </div>
      </Html>
    </mesh>
  )
}

function GlobeScene({ activeOrigin, setActiveOrigin }: { activeOrigin: string | null; setActiveOrigin: (id: string | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame(() => {
    if (meshRef.current && !activeOrigin) meshRef.current.rotation.y += 0.002
  })

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <Sphere ref={meshRef} args={[2.5, 64, 64]}>
        <MeshDistortMaterial color="#2C1810" emissive="#1A0F0A" emissiveIntensity={0.2} roughness={0.7} metalness={0.1} distort={0.05} speed={0.3} />
      </Sphere>
      {origins.map(o => (
        <Dot key={o.id} lat={o.lat} lng={o.lng} color={o.color} onClick={() => setActiveOrigin(activeOrigin === o.id ? null : o.id)} isActive={activeOrigin === o.id} />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </>
  )
}

function RoastDrum({ level }: { level: number }) {
  const drumRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  const current = roastLevels[level]
  useFrame(() => {
    if (drumRef.current) drumRef.current.rotation.z += 0.008
    if (innerRef.current) innerRef.current.rotation.x += 0.005
  })

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <mesh ref={drumRef}>
        <torusGeometry args={[1.6, 0.3, 24, 48]} />
        <meshPhysicalMaterial color="#3C1F0E" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshPhysicalMaterial color={current.color} emissive={current.color} emissiveIntensity={0.1} roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshPhysicalMaterial color={current.color} emissive={current.color} emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
    </group>
  )
}

function BrewLab({ step }: { step: number }) {
  const waterRef = useRef<THREE.Mesh>(null!)
  const isPouring = step >= 2 && step <= 3
  useFrame(() => {
    if (waterRef.current && isPouring) {
      waterRef.current.scale.y = 0.5 + Math.sin(Date.now() * 0.005) * 0.2
    }
  })

  return (
    <group position={[0, -0.3, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[0.9, 1.2, 32, 1, true]} />
        <meshPhysicalMaterial color="#F5EDE0" roughness={0.3} metalness={0.1} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.6, 0.7, 0.6, 24]} />
        <meshPhysicalMaterial color="#F5EDE0" transparent opacity={0.4} roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.08, 24]} />
        <meshBasicMaterial color="#3C1F0E" />
      </mesh>
      {isPouring && (
        <mesh ref={waterRef} position={[0.1, 1.6, 0.05]}>
          <cylinderGeometry args={[0.02, 0.06, 0.8, 6]} />
          <meshBasicMaterial color="#87CEEB" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  )
}

function Scene3D({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<Loader />}>
      {children}
    </React.Suspense>
  )
}

export function CoffeePremium() {
  const [activeOrigin, setActiveOrigin] = useState<string | null>(null)
  const [roastLevel, setRoastLevel] = useState(0)
  const [brewStep, setBrewStep] = useState(0)
  const [scene, setScene] = useState(0)

  const activeData = origins.find(o => o.id === activeOrigin)

  const handleNextBrew = useCallback(() => {
    setBrewStep(s => Math.min(s + 1, directions.length - 1))
  }, [])

  return (
    <div className="min-h-dvh bg-[#1A0F0A] text-[#F5EDE0]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A0F0A]/80 backdrop-blur-lg border-b border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/website-new/coffee" className="text-[#C4956A] text-sm tracking-[0.2em] uppercase font-medium">
            ← Birch &amp; Bean
          </a>
          <div className="flex items-center gap-4">
            {["Origin", "Roast", "Brew"].map((s, i) => (
              <button key={s} onClick={() => { setScene(i); setActiveOrigin(null); setBrewStep(0) }} className={`text-xs tracking-wider uppercase transition-colors ${scene === i ? "text-[#F5EDE0]" : "text-white/30 hover:text-white/60"}`}>
                [{i + 1}] {s}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="fixed top-20 left-6 z-40">
        <span className="text-[10px] font-mono text-white/20 tracking-[2px] uppercase">
          [ Premium — ${(scene + 1) * 300} ]
        </span>
      </div>

      {scene === 0 && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-dvh">
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
              <Scene3D>
                <GlobeScene activeOrigin={activeOrigin} setActiveOrigin={setActiveOrigin} />
              </Scene3D>
            </Canvas>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A0F0A] via-[#1A0F0A]/80 to-transparent p-8 pb-12">
            <AnimatePresence mode="wait">
              {activeData ? (
                <motion.div key={activeData.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-xl mx-auto text-center">
                  <p className="text-[#C4956A]/60 text-[10px] tracking-[0.2em] uppercase mb-2">{activeData.region}, {activeData.name}</p>
                  <h2 className="font-display text-3xl font-bold mb-3">{activeData.name}</h2>
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <span className="text-xs text-white/50">{activeData.process} Process</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-xs text-white/50">Single Origin</span>
                  </div>
                  <p className="text-[#C4956A]/80 text-sm font-mono">{activeData.notes}</p>
                  <button onClick={() => setActiveOrigin(null)} className="mt-4 text-[10px] text-white/30 hover:text-white/60 tracking-wider uppercase transition-colors">
                    ← Explore globe
                  </button>
                </motion.div>
              ) : (
                <motion.p key="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-white/30 text-sm">
                  Tap a marker to explore an origin
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      )}

      {scene === 1 && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-dvh flex items-center justify-center">
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Scene3D>
                <RoastDrum level={roastLevel} />
              </Scene3D>
            </Canvas>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A0F0A] via-[#1A0F0A]/80 to-transparent p-8 pb-16">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-[#C4956A]/60 text-[10px] tracking-[0.2em] uppercase mb-2">Roast Level</p>
              <h2 className="font-display text-2xl font-bold mb-2">{roastLevels[roastLevel].name} Roast</h2>
              <p className="text-white/40 text-sm mb-6">{roastLevels[roastLevel].desc}</p>
              <input
                type="range"
                min={0}
                max={3}
                value={roastLevel}
                onChange={e => setRoastLevel(Number(e.target.value))}
                className="w-full max-w-md accent-[#C4956A] h-1 appearance-none bg-white/10 rounded-full cursor-pointer"
              />
              <div className="flex justify-between max-w-md mx-auto mt-2">
                {roastLevels.map((r, i) => (
                  <button key={r.name} onClick={() => setRoastLevel(i)} className={`text-[10px] font-mono transition-colors ${roastLevel === i ? "text-[#C4956A]" : "text-white/20 hover:text-white/40"}`}>
                    {r.name}
                  </button>
                ))}
              </div>
              <p className="text-white/20 text-xs font-mono mt-4">Temp: {roastLevels[roastLevel].temp}</p>
            </div>
          </div>
        </motion.section>
      )}

      {scene === 2 && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-dvh flex items-center justify-center">
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 1.2, 3.5], fov: 45 }}>
              <Scene3D>
                <BrewLab step={brewStep} />
              </Scene3D>
            </Canvas>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A0F0A] via-[#1A0F0A]/80 to-transparent p-8 pb-16">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-[#C4956A]/60 text-[10px] tracking-[0.2em] uppercase mb-2">Brew Guide</p>
              <h2 className="font-display text-2xl font-bold mb-2">Pour Over (V60)</h2>
              <div className="flex items-center justify-center gap-2 mb-6">
                {directions.map((d, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < brewStep ? "bg-[#C4956A]" : i === brewStep ? "bg-white scale-125" : "bg-white/10"}`} />
                ))}
              </div>
              <div className="mb-6 h-8">
                <AnimatePresence mode="wait">
                  <motion.p key={brewStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-white/70 text-lg">
                    {directions[brewStep].label}
                  </motion.p>
                </AnimatePresence>
              </div>
              <button
                onClick={handleNextBrew}
                disabled={brewStep >= directions.length - 1}
                className="px-8 py-3 bg-[#C4956A] text-[#1A0F0A] text-sm font-medium tracking-wider uppercase rounded-full hover:bg-[#D4A87A] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {brewStep >= directions.length - 1 ? "☕ Complete" : "Next Step"}
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  )
}
