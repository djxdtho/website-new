"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { StarBorder } from "@/components/ui/star-border"
import { CornerBrackets } from "@/components/ui/card"

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ""

const projects = [
  {
    id: "001",
    src: `${BASE}/portfolio/card1.png`,
    name: "FitTrack",
    stack: "React / TS / Tailwind",
    description: "Fitness app with AI coach, workout tracking, analytics, and exercise library.",
    url: "https://djxdtho.github.io/3D-portfolio/fittrack/",
  },
  {
    id: "002",
    src: `${BASE}/portfolio/card2.png`,
    name: "Zari",
    stack: "React / TS / Tailwind",
    description: "Modern restaurant website with menu showcase, gallery, and reservation booking.",
    url: "https://djxdtho.github.io/Zari-Restaurant/",
  },
  {
    id: "003",
    src: `${BASE}/portfolio/card3.png`,
    name: "Notes",
    stack: "React / TS / Firebase",
    description: "Full-featured notes app with authentication and cloud sync across devices.",
    url: "https://djxdtho.github.io/notes-app/",
  },
  {
    id: "004",
    src: `${BASE}/portfolio/card4.png`,
    name: "Todo List",
    stack: "React / TS / Tailwind",
    description: "Task manager with priorities, due dates, overdue warnings, and search filters.",
    url: "https://djxdtho.github.io/todo-list/",
  },
  {
    id: "005",
    src: `${BASE}/portfolio/card5.png`,
    name: "Digital Clock",
    stack: "React / TS / PWA",
    description: "Futuristic digital clock with 10 themes, particles, 12/24h modes, and PWA support.",
    url: "https://djxdtho.github.io/digital-clock/",
  },
  {
    id: "006",
    src: `${BASE}/portfolio/card6.png`,
    name: "PinVid",
    stack: "Next.js / TS / Tailwind",
    description: "Pinterest video downloader — paste any Pinterest video link and download it instantly with one click.",
    url: "https://pinterest-video-downloader-seven.vercel.app",
  },
]

function ProjectCard({ project, idx }: { project: (typeof projects)[number]; idx: number }) {
  return (
    <StarBorder
      className="w-full sharp-corners"
      color="rgba(255,255,255,0.08), rgba(255,255,255,0.01), rgba(255,255,255,0.08)"
      speed={`${8 + idx * 1.5}s`}
    >
      <div className="relative card-grid card-glow p-5 md:p-8 lg:p-10 border border-white/[0.06]">
        <CornerBrackets />
        <div className="flex items-start justify-between gap-4 mb-5 md:mb-8">
          <div className="flex items-start gap-3 md:gap-6">
            <span className="font-mono font-black text-4xl md:text-6xl lg:text-7xl leading-[0.8] text-foreground">
              {project.id}
            </span>
            <div className="pt-1 md:pt-2">
              <h3 className="font-display text-lg md:text-xl lg:text-2xl font-medium text-foreground">
                {project.name}
              </h3>
              <p className="text-[10px] md:text-xs text-white/35 font-mono mt-0.5 md:mt-1">
                {project.stack}
              </p>
            </div>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-[11px] font-mono text-white/70 hover:text-white hover:border-white/40 transition-colors duration-200"
          >
            Live Project
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-10 items-start">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
            <Image
              src={project.src}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <p className="text-sm md:text-base text-white/55 leading-relaxed">
              {project.description}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/15 text-[11px] font-mono text-white/70 hover:text-white hover:border-white/40 transition-colors duration-200"
            >
              Live Project
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </StarBorder>
  )
}

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  const rafId = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    const row = rowRef.current
    if (!track || !row) return

    function tick() {
      rafId.current = 0
      const t = trackRef.current
      const r = rowRef.current
      if (!t || !r) return
      const rect = t.getBoundingClientRect()
      const vh = window.innerHeight
      const scrolled = vh - rect.top
      const raw = scrolled / rect.height
      const deadZone = 0.1
      const progress = Math.max(0, Math.min(1, (raw - deadZone) / (1 - deadZone)))
      const maxX = r.scrollWidth - window.innerWidth
      r.style.transform = `translate3d(${-progress * maxX}px, 0, 0)`
    }

    function schedule() {
      if (!rafId.current) rafId.current = requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative z-10 bg-black" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}>
      <div className="mb-4 px-6 max-w-5xl mx-auto w-full pt-16 md:pt-24">
        <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
          [ 05 ]  Projects
        </span>
      </div>

      {/* Desktop: horizontal scroll */}
      <div ref={trackRef} className="relative hidden md:block" style={{ height: `${projects.length * 130}vh` }}>
        <div className="sticky top-0 h-dvh overflow-hidden" style={{ willChange: "transform" }}>
          <div ref={rowRef} className="flex h-full" style={{ willChange: "transform" }}>
            {projects.map((project, i) => (
              <div key={project.id} className="w-screen h-full flex-shrink-0 flex items-center justify-center p-6">
                <div className="w-full max-w-5xl">
                  <ProjectCard project={project} idx={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: normal flow */}
      <div className="md:hidden flex flex-col gap-6 px-6 pb-24">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} idx={i} />
        ))}
      </div>
    </section>
  )
}
