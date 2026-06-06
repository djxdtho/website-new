"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { useScroll, useMotionValueEvent } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Analyze",
    description: "Understand the problem, research the market, define requirements and user goals.",
  },
  {
    number: "02",
    title: "Design",
    description: "Architect the solution, craft wireframes, design systems, and high-fidelity mockups.",
  },
  {
    number: "03",
    title: "Build",
    description: "Develop with modern stacks, iterate fast, test thoroughly, ship with confidence.",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Deploy, monitor, optimize — then support and evolve the product post-launch.",
  },
]

function solveBezier(t: number): number {
  const cx = 3 * 0.76
  const bx = 3 * (0.24 - 0.76) - cx
  const ax = 1 - cx - bx
  let x = t
  for (let i = 0; i < 8; i++) {
    const f = ((ax * x + bx) * x + cx) * x - t
    const df = (3 * ax * x + 2 * bx) * x + cx
    if (Math.abs(df) < 1e-7) break
    x -= f / df
  }
  return ((-2) * x + 3) * x * x
}

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  const [ready, setReady] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const scrollOffset = useRef(0)
  const pathLen = useRef(0)
  const raf = useRef(0)

  const CARD_W = 340
  const CARD_H = 220

  const setup = useCallback(() => {
    setIsMobile(window.innerWidth < 1024)

    if (sectionRef.current) {
      scrollOffset.current =
        sectionRef.current.getBoundingClientRect().top + window.scrollY
    }

    const w = window.innerWidth
    const h = window.innerHeight
    let d = ""

    if (window.innerWidth < 1024) {
      const cx = w / 2
      d = `M ${cx},-10 L ${cx},${h / 2 - CARD_H / 2}`
    } else {
      const s = w / 3000
      const sx = (1500 + 1100 * Math.cos((196 * Math.PI) / 180)) * s
      const ex = w / 2 - CARD_W / 2
      const my = h / 2
      const r = 1100 * s
      d = `M ${sx},0 A ${r},${r} 0 0,0 ${ex},${my}`
    }

    if (pathRef.current) {
      pathRef.current.setAttribute("d", d)
      try {
        const len = pathRef.current.getTotalLength()
        if (len > 0) pathLen.current = len
      } catch {
        /* noop */
      }
    }

    if (contentRef.current && sectionRef.current) {
      const ch = contentRef.current.scrollHeight
      const room = h * 1.2 + ch
      sectionRef.current.style.height = `${room}px`
      sectionRef.current.style.minHeight = `${room}px`
    }

    setReady(true)
  }, [])

  useEffect(() => {
    requestAnimationFrame(() => {
      setup()
      setTimeout(setup, 150)
    })
    window.addEventListener("resize", setup, { passive: true })
    return () => {
      window.removeEventListener("resize", setup)
      cancelAnimationFrame(raf.current)
    }
  }, [setup])

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    if (!ready) return
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const pe = pathRef.current
      const ce = cardRef.current
      const xe = contentRef.current
      const ae = anchorRef.current

      if (!ce || !xe) return

      const vh = window.innerHeight
      const vw = window.innerWidth
      const d = y - scrollOffset.current

      if (pe && ae && pathLen.current > 0) {
        const draw = Math.min(Math.max((d + vh) / vh, 0), 1)
        pe.style.strokeDasharray = `${pathLen.current}`
        pe.style.strokeDashoffset = `${(pathLen.current - draw * pathLen.current).toFixed(1)}`
      }

      if (d < -vh * 0.35) {
        ce.style.visibility = "hidden"
        ce.style.opacity = "0"
      } else {
        ce.style.visibility = "visible"
        ce.style.opacity = "1"
      }

      if (d <= 0) {
        ce.style.position = "absolute"
        ce.style.top = "50vh"
        ce.style.transform = "translate3d(0,0,0) scale(1)"
        if (ae) {
          ae.style.position = "absolute"
          ae.style.top = "0"
        }
        xe.style.transform = "scale(1)"
        ce.style.overflow = "hidden"
      } else {
        const total = vh * 1.2
        const p = Math.min(Math.max(d / total, 0), 1)

        if (p < 1) {
          ce.style.position = "fixed"
          ce.style.top = "50%"
          if (ae) {
            ae.style.position = "fixed"
            ae.style.top = "0"
          }
          ce.style.overflow = "hidden"
        } else {
          ce.style.position = "absolute"
          ce.style.top = `${total + vh / 2}px`
          if (ae) {
            ae.style.position = "absolute"
            ae.style.top = `${total}px`
          }
          ce.style.overflow = "visible"
        }

        const e = solveBezier(p)
        const sx = 1 + e * (vw / CARD_W - 1)
        const sy = 1 + e * (vh / CARD_H - 1)

        ce.style.transform = `translate3d(0,0,0) scale(${sx.toFixed(4)},${sy.toFixed(4)})`
        xe.style.transform = `scale(${(1 / sx).toFixed(4)},${(1 / sy).toFixed(4)})`

        const bo = Math.max(0, 1 - e / 0.5)
        ce.style.borderWidth = bo < 0.01 ? "0px" : "1px"
        ce.style.borderColor = `rgba(255,255,255,${bo.toFixed(3)})`
      }
    })
  })

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ minHeight: "320vh" }}
    >
      <div
        id="process"
        className="absolute top-[120vh] left-0 w-px h-px pointer-events-none"
      />

      <div
        ref={anchorRef}
        className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
        style={{ zIndex: 10, willChange: "transform, top, position" }}
      >
        <svg width="100%" height="100%" style={{ overflow: "visible" }}>
          <path
            ref={pathRef}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeLinecap="round"
            style={{
              strokeWidth: isMobile ? "0.8vw" : "1px",
              strokeDasharray: "99999",
              strokeDashoffset: "99999",
            }}
          />
        </svg>
      </div>

      <div
        ref={cardRef}
        className="absolute"
        style={{
          top: "50vh",
          left: "50%",
          width: `${CARD_W}px`,
          height: `${CARD_H}px`,
          marginLeft: `-${CARD_W / 2}px`,
          marginTop: `-${CARD_H / 2}px`,
          background: "black",
          border: "1px solid rgba(255,255,255,0.15)",
          visibility: "hidden",
          opacity: 0,
          zIndex: 50,
          overflow: "hidden",
          transformOrigin: "center center",
        }}
      >
        <div
          ref={contentRef}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
            width: "100vw",
            height: "100vh",
            marginLeft: "-50vw",
            marginTop: "-50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center center",
          }}
        >
          <div className="w-full h-full overflow-y-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
            <div className="max-w-5xl mx-auto">
              <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
                [ 00 ]  Process
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mt-4 mb-12 md:mb-16 leading-[1.05]">
                How I Work
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="relative border border-white/[0.06] card-grid card-glow p-5 md:p-6"
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      aria-hidden="true"
                    >
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-white/20" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-white/20" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-white/20" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-white/20" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 tracking-[1px]">
                      {step.number}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-medium text-foreground tracking-tight mt-2 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-white/55 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
