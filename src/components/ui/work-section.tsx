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
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const rafId = useRef(0)

  useEffect(() => {
    const els = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    const section = sectionRef.current
    if (els.length === 0 || !section) return

    els.forEach((el, i) => {
      el.style.willChange = "transform, opacity"
      el.style.zIndex = String(i + 1)
    })

    const STACK_GAP = 16
    const BASE_SCALE = 0.88
    const TOP_OFFSET = 160

    const s = section
    const entryAt = Array.from({ length: els.length }, (_, i) => Math.pow(i / els.length, 1.35))
    let cached = { cardStart: 0, roomH: 0, trigger: 0, containerH: 0 }

    function cache() {
      const room = s.lastElementChild as HTMLElement | null
      if (!room) return
      const vh = window.innerHeight
      cached = {
        cardStart: s.offsetTop + room.offsetTop,
        roomH: room.offsetHeight,
        trigger: vh - TOP_OFFSET,
        containerH: vh - TOP_OFFSET,
      }
    }

    cache()

    function tick() {
      rafId.current = 0
      const rawProgress = (window.scrollY - cached.cardStart + cached.trigger) / cached.roomH
      const progress = Math.max(0, Math.min(1, rawProgress))
      const { containerH } = cached
      const num = els.length

      for (let i = 0; i < num; i++) {
        const el = els[i]
        const each = 0.22
        const raw = (progress - entryAt[i]) / each
        const p = Math.max(0, Math.min(1, raw))
        const ep = 1 - Math.pow(1 - p, 3)

        const targetY = (num - 1 - i) * STACK_GAP
        const y = containerH + (targetY - containerH) * ep
        const scale = BASE_SCALE + ep * (1 - BASE_SCALE)
        const opacity = ep

        el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`
        el.style.opacity = String(opacity)
      }
    }

    function schedule() {
      if (!rafId.current) rafId.current = requestAnimationFrame(tick)
    }

    function onResize() { cache(); schedule() }

    tick()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(section)

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      ro.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative z-10 bg-black" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }}>
      <div className="mb-4 px-6 max-w-5xl mx-auto w-full pt-16 md:pt-24">
        <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
          [ 05 ]  Projects
        </span>
      </div>

      <div className="w-full overflow-hidden flex items-center border-y border-white/[0.06] py-5 md:py-7 mb-12 md:mb-16">
        <div className="flex whitespace-nowrap animate-marquee" style={{ willChange: "transform" }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center flex-shrink-0" aria-hidden={i > 0 ? true : undefined}>
              <span className="text-[13vw] md:text-[11vw] lg:text-[10vw] font-display font-medium leading-[0.8] tracking-tighter text-foreground">
                Selected Work
              </span>
              <span className="text-[13vw] md:text-[11vw] lg:text-[10vw] font-display font-light leading-[0.8] text-white/15 mx-[3vw] translate-y-[-2px]">
                —
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative" style={{ height: `${projects.length * 100}vh` }}>
        <div className="sticky top-[160px] h-[calc(100vh-160px)] overflow-hidden" style={{ willChange: "transform" }}>
          <div className="max-w-5xl mx-auto px-6 w-full h-full relative">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[index] = el }}
                className="absolute inset-x-0"
                style={{ top: 0 }}
              >
                <StarBorder
                  className="w-full sharp-corners"
                  color="rgba(255,255,255,0.08), rgba(255,255,255,0.01), rgba(255,255,255,0.08)"
                  speed={`${8 + index * 1.5}s`}
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

                      <StarBorder
                        as="a"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="live-btn-star shrink-0 hidden sm:inline-block"
                        color="rgba(255,255,255,0.2), rgba(255,255,255,0.04), rgba(255,255,255,0.2)"
                        speed="4s"
                      >
                        <span className="flex items-center gap-1.5 px-4 py-2 text-[10px] md:text-xs font-mono font-medium text-white tracking-[0.15em] uppercase">
                          Live Project
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </StarBorder>
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
                        <StarBorder
                          as="a"
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="live-btn-star self-start sm:hidden"
                          color="rgba(255,255,255,0.2), rgba(255,255,255,0.04), rgba(255,255,255,0.2)"
                          speed="4s"
                        >
                          <span className="flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono font-medium text-white tracking-[0.15em] uppercase">
                            Live Project
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </span>
                        </StarBorder>
                      </div>
                    </div>
                  </div>
                </StarBorder>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
