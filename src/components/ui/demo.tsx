'use client'

import { useState, useEffect, useCallback } from 'react'
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight-interactive"
import { Card, CardContent } from "@/components/ui/card"
import { ProtocolCard } from "@/components/ui/protocol-card"
import { ToolkitSection } from "@/components/ui/toolkit-section"
import { ServicesSection } from "@/components/ui/services-section"
import { MorphingSpinner } from "@/components/ui/morphing-spinner"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { Phone, User, Package, Wrench, Calendar, Code, FileText, Clock, Map, DollarSign, Briefcase } from "lucide-react"
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"
import { CurvedMobileNav } from "@/components/ui/curved-mobile-nav"
import { PricingSection } from "@/components/ui/pricing-section"
import { WorkSection } from "@/components/ui/work-section"

const phrases = [
  "Building interactive digital experiences",
  "17 \u2022 Self-taught \u2022 Nigerian",
  "UI/UX \u2022 React \u2022 TypeScript \u2022 Tailwind",
  "Pixel-perfect experiences with soul",
  "Available for freelance & collaborations",
  "Passionate about design & code",
  "From Nigeria \u2014 building for the world",
  "Turning complex into simple",
  "Every pixel tells a story",
  "Let's create something memorable",
]

function TypeWriter({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0)
  const [display, setDisplay] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[index]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && display === current) {
      timer = setTimeout(() => setDeleting(true), 3000)
    } else if (deleting && display === "") {
      setDeleting(false)
      setIndex((i) => (i + 1) % texts.length)
    } else {
      timer = setTimeout(
        () => {
          setDisplay(
            deleting
              ? current.slice(0, display.length - 1)
              : current.slice(0, display.length + 1)
          )
        },
        deleting ? 20 : 50
      )
    }

    return () => clearTimeout(timer)
  }, [display, deleting, index, texts])

  return (
    <span>
      {display}<span className="animate-pulse text-muted-foreground">|</span>
    </span>
  )
}

function useCountUp(target: number, suffix = "") {
  const [val, setVal] = useState(0)
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        let cur = 0
        const step = Math.ceil(target / 60)
        const iv = setInterval(() => {
          cur += step
          if (cur >= target) {
            cur = target
            clearInterval(iv)
          }
          setVal(cur)
        }, 25)
        obs.disconnect()
      },
      { threshold: 0.5 }
    )
    obs.observe(node)
  }, [])
  return { val, ref }
}

function Stat({ num, label }: { num: number; label: string }) {
  const { val, ref } = useCountUp(num)
  return (
    <div ref={ref} className="text-center min-w-[80px]">
      <div className="text-3xl md:text-4xl font-bold text-foreground">
        {val}+
      </div>
      <div className="text-xs text-muted-foreground mt-1 font-mono tracking-wider uppercase">{label}</div>
    </div>
  )
}

function TechItem({ name, desc }: { name: string; desc: string }) {
  return (
    <span className="group relative inline-flex items-center gap-4 cursor-default">
      <span className="text-foreground">&bull;</span>
      <span className="relative">
        {name}
        <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono text-white/80 bg-black/90 border border-white/10 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          {desc}
        </span>
      </span>
    </span>
  )
}

export function SplineSceneBasic() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80)
  })

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handle = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
  }, [])

  const sectionIds = ["about", "services", "toolkit", "journey", "work", "pricing"]

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight
      let best = sectionIds[0]
      let bestRatio = 0
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0))
        const ratio = rect.height > 0 ? visible / rect.height : 0
        if (ratio > bestRatio) {
          bestRatio = ratio
          best = id
        }
      }
      if (bestRatio > 0) setActiveSection(best)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const sectionToTab: Record<string, number> = {
    about: 0, services: 1, toolkit: 3, journey: 4, work: 5, pricing: 6,
  }

  const handleNav = (i: number | null) => {
    if (i === null) return
    const id = sectionIds[i > 1 ? i - 1 : i]
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <MorphingSpinner size="lg" />
            <p className="mt-6 text-sm font-mono text-white/40 tracking-[0.2em] uppercase">
              Loading
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── STICKY NAVBAR ─── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-8 py-3 transition-all duration-300"
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
      >
        <span className="font-display text-lg font-bold text-foreground tracking-tight">
          AA
        </span>
        <ExpandableTabs
          tabs={[
            { title: "About", icon: User },
            { title: "Services", icon: Package },
            { type: "separator" },
            { title: "Toolkit", icon: Wrench },
            { title: "Journey", icon: Map },
            { title: "Work", icon: Briefcase },
            { title: "Pricing", icon: DollarSign },
          ]}
          size="lg"
          selected={activeSection ? sectionToTab[activeSection] ?? null : null}
          onChange={handleNav}
        />
        <div className="w-10" />
      </motion.nav>

      {/* ─── HERO ─── */}
      <div className="relative w-full h-dvh overflow-hidden bg-background">
        <Spotlight />
        <div className="absolute inset-0">
          {isMobile ? (
            <div className="w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent" />
          ) : (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          )}
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground font-display">
            AA Elements
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground font-light tracking-wide">
            Abdurrahman Ali
          </p>
          <p className="mt-6 text-sm md:text-base text-muted-foreground font-mono min-h-[1.6em]">
            <TypeWriter texts={phrases} />
          </p>
          <div className="mt-10 flex gap-4 pointer-events-auto">
            <a href="#about" className="px-6 py-3 text-sm font-semibold text-primary-foreground bg-foreground hover:bg-foreground/80 transition-colors duration-200">
              View Work
            </a>
            <a href="#about" className="px-6 py-3 text-sm font-semibold text-foreground border border-white/20 hover:bg-white hover:text-black transition-colors duration-200">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>

      {/* ─── DIVIDER ─── */}
      <div className="relative z-10 border-t border-white/[0.06]" />

      {/* ─── MARQUEE ─── */}
      <div className="relative z-10 border-b border-white/[0.06] bg-card py-5 overflow-hidden">
        <div className="flex gap-14 whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-14 text-sm font-medium text-muted-foreground tracking-widest uppercase">
              <TechItem name="React" desc="Component-based UI library" />
              <TechItem name="TypeScript" desc="Typed JavaScript superset" />
              <TechItem name="UI/UX Design" desc="Interface & experience design" />
              <TechItem name="WebGL" desc="Browser 3D graphics API" />
              <TechItem name="Figma" desc="Collaborative design tool" />
              <TechItem name="Tailwind CSS" desc="Utility-first CSS framework" />
              <TechItem name="Three.js" desc="3D library for WebGL" />
            </span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative z-10 min-h-dvh flex items-center py-24 px-6">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          {/* Left: visual */}
          <Card data-grid-size="lg" className="sticky top-24 aspect-square flex items-center justify-center overflow-hidden">
            <motion.span
              className="text-9xl font-bold text-white/10 select-none font-display inline-block"
              initial={{ y: -120, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              AA
            </motion.span>
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute border border-white/[0.06] animate-float"
                  style={{
                    width: `${20 + i * 8}px`,
                    height: `${20 + i * 8}px`,
                    top: `${12 + i * 10}%`,
                    left: `${12 + i * 10}%`,
                    animationDelay: `${-i * 2.5}s`,
                  }}
                />
              ))}
            </div>
          </Card>

          {/* Right: content */}
          <div>
              <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
                About
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-medium text-foreground tracking-tight mt-3 mb-8 leading-[1.05]">
                Who I Am
              </h2>

              <div className="space-y-5 text-white/55 leading-relaxed text-sm md:text-base">
                <p>
                  I&apos;m <span className="text-foreground font-medium">Abdurrahman Ali</span> — a 17-year-old self-taught web designer
                  and developer from <span className="text-foreground font-medium">Nigeria</span>. My journey started with pure
                  curiosity: the desire to take something in my head and make it real on a screen.
                </p>
                <p>
                  What began as tinkering with HTML and CSS in a text editor quickly became an obsession.
                  I dove into JavaScript, then React, then the entire modern front-end ecosystem — not through
                  courses or bootcamps, but through building things. Breaking them. Fixing them. Making them better.
                </p>
                <p>
                  I specialize in <span className="text-foreground font-medium">modern, immersive digital experiences</span> —
                  blending clean design, smooth interactions, and thoughtful storytelling. Every project
                  I ship has soul. I believe the best websites are the ones you <em>feel</em>, not just see.
                </p>

                <Card className="my-8">
                  <CardContent className="p-6">
                    <blockquote className="italic text-white/55 text-sm border-l-2 border-white/20 pl-5">
                      &ldquo;Small businesses deserve great websites too. I make that possible at accessible price points
                      without ever compromising on quality. Every business — no matter how small — deserves a web
                      presence that looks professional, loads fast, and converts visitors.&rdquo;
                    </blockquote>
                  </CardContent>
                </Card>

                <p>
                  My approach is simple: <span className="text-foreground font-medium">listen first, design second, build third</span>.
                  I don&apos;t just write code — I solve problems. Whether it&apos;s a landing page for a local business
                  or a full-stack web app, I bring the same level of care, attention, and craftsmanship.
                </p>
                <p>
                  Driven by a passion for <span className="text-foreground font-medium">UI/UX, interaction design, and front-end
                  engineering</span>, I push the boundaries of what the web can feel like. Not pages —
                  <span className="text-foreground font-medium"> experiences</span>.
                </p>

                {/* Journey */}
                <ProtocolCard
                  number="01"
                  label="Timeline"
                  title="My Journey"
                  subtitle="2023 — 2026"
                  description="From first HTML tag to full-stack developer. Here's how it happened."
                  className="mt-8"
                />

                <div className="mt-4 space-y-3">
                  {[
                    { year: "2023", desc: "Discovered HTML & CSS — built first webpage" },
                    { year: "2024", desc: "Learned JavaScript, React, built multiple projects" },
                    { year: "2025", desc: "Mastered TypeScript, Tailwind, started freelancing" },
                    { year: "2026", desc: "Full-stack, WebGL, 3D — pushing the boundaries" },
                  ].map((m) => (
                    <div key={m.year} className="flex items-center gap-4 text-sm border-b border-white/[0.06] pb-3 last:border-0">
                      <span className="font-bold text-foreground font-mono min-w-[50px]">{m.year}</span>
                      <span className="text-white/55">{m.desc}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex gap-8 mt-8 flex-wrap">
                  <Stat num={2} label="Years Coding" />
                  <Stat num={15} label="Projects Built" />
                  <Stat num={8} label="Happy Clients" />
                  <div className="text-center min-w-[80px]">
                    <div className="text-3xl md:text-4xl font-bold text-foreground">100%</div>
                    <div className="text-xs text-white/55 mt-1 font-mono tracking-wider uppercase">Self-taught</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      <ServicesSection />
      <ToolkitSection />

      {/* ─── ORBITAL TIMELINE ─── */}
      <RadialOrbitalTimeline
        timelineData={[
          {
            id: 1, title: "Discovery", date: "2023",
            content: "First HTML tag sparked a passion for building on the web.",
            category: "Learning", icon: Calendar,
            relatedIds: [2], status: "completed", energy: 100,
          },
          {
            id: 2, title: "Foundation", date: "2024",
            content: "Mastered JavaScript, React, and shipped multiple projects.",
            category: "Learning", icon: FileText,
            relatedIds: [1, 3], status: "completed", energy: 90,
          },
          {
            id: 3, title: "Growth", date: "2025",
            content: "TypeScript, Tailwind, freelancing — turning skill into value.",
            category: "Growth", icon: Code,
            relatedIds: [2, 4], status: "completed", energy: 75,
          },
          {
            id: 4, title: "Mastery", date: "2026",
            content: "Full-stack, 3D Web, WebGL — pushing every boundary.",
            category: "Growth", icon: Clock,
            relatedIds: [3, 5], status: "in-progress", energy: 50,
          },
          {
            id: 5, title: "Future", date: "2027+",
            content: "Where I'm headed next — always building, always learning.",
            category: "Future", icon: Calendar,
            relatedIds: [4], status: "pending", energy: 15,
          },
        ]}
      />

      {/* ─── WORK ─── */}
      <WorkSection />

      {/* ─── PRICING ─── */}
      <PricingSection />

      {/* ─── MOBILE NAV ─── */}
      <CurvedMobileNav />
    </>
  )
}
