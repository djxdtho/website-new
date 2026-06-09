'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SplineScene } from "@/components/ui/splite"
import { Spotlight } from "@/components/ui/spotlight-interactive"
import { Card, CardContent } from "@/components/ui/card"
import { ProtocolCard } from "@/components/ui/protocol-card"
import { ToolkitSection } from "@/components/ui/toolkit-section"
import { ServicesSection } from "@/components/ui/services-section"
import { MorphingSpinner } from "@/components/ui/morphing-spinner"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { User, Package, Wrench, Map, DollarSign, Briefcase, MessageSquare, HelpCircle, Phone } from "lucide-react"
import { ProcessTimeline } from "@/components/ui/process-timeline"
import { CurvedMobileNav } from "@/components/ui/curved-mobile-nav"
import { PricingSection } from "@/components/ui/pricing-section"
import { WorkSection } from "@/components/ui/work-section"
import { Testimonial } from "@/components/ui/design-testimonial"
import { FAQSection } from "@/components/ui/faq-section"
import { ContactSection } from "@/components/ui/contact-section"

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

function SocialIcons() {
  return (
    <>
      <a href="https://github.com/djxdtho" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-300 p-3 -m-3" aria-label="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </a>

      <a href="https://instagram.com/AAelementsweb" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-300 p-3 -m-3" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      </a>
      <a href="https://tiktok.com/@aaelements" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-300 p-3 -m-3" aria-label="TikTok">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      </a>
      <a href="https://snapchat.com/add/djxdtho" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors duration-300 p-3 -m-3" aria-label="Snapchat">
        <svg viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5">
          <path d="M 15.6875 4 C 15.097656 4.003906 13.949219 4.097656 12.65625 4.65625 C 11.339844 5.222656 9.914063 6.3125 9.03125 8.25 C 8.335938 9.777344 8.546875 11.683594 8.65625 13.25 C 8.496094 13.21875 8.363281 13.234375 8.125 13.125 C 7.894531 13.019531 7.664063 12.96875 7.4375 12.96875 C 7.03125 12.96875 6.683594 13.078125 6.34375 13.28125 C 6.003906 13.484375 5.609375 13.8125 5.5 14.375 C 5.433594 14.726563 5.535156 15.25 5.84375 15.625 C 6.152344 16 6.609375 16.265625 7.21875 16.5 C 7.363281 16.554688 7.472656 16.617188 7.59375 16.65625 C 7.851563 16.734375 8.132813 16.8125 8.3125 16.90625 C 8.492188 17 8.519531 17.074219 8.5 17.03125 C 8.496094 17.066406 8.472656 17.152344 8.40625 17.28125 C 8.394531 17.292969 8.386719 17.300781 8.375 17.3125 C 8.347656 17.371094 6.933594 20.445313 4.0625 20.90625 C 3.441406 21.003906 2.964844 21.574219 3 22.21875 C 3.011719 22.394531 3.066406 22.550781 3.125 22.6875 C 3.347656 23.199219 3.789063 23.527344 4.375 23.78125 C 4.847656 23.984375 5.605469 24.128906 6.4375 24.28125 C 6.453125 24.335938 6.453125 24.332031 6.46875 24.40625 C 6.507813 24.582031 6.554688 24.804688 6.625 25.03125 C 6.714844 25.328125 6.957031 25.652344 7.25 25.8125 C 7.542969 25.972656 7.796875 25.96875 7.9375 25.96875 C 8.238281 25.96875 8.425781 25.914063 8.625 25.875 C 8.953125 25.8125 9.308594 25.75 9.78125 25.75 C 10.042969 25.75 10.34375 25.765625 10.625 25.8125 C 11.015625 25.875 11.453125 26.171875 12.0625 26.59375 C 12.945313 27.203125 14.125 28 15.84375 28 C 15.863281 28 15.886719 28 15.90625 28 C 15.957031 28 16.023438 28.003906 16.0625 28 C 16.09375 28 16.125 28 16.15625 28 C 17.875 28 19.050781 27.203125 19.9375 26.59375 C 20.546875 26.175781 21.015625 25.875 21.40625 25.8125 C 21.6875 25.765625 21.957031 25.75 22.21875 25.75 C 22.683594 25.75 23.015625 25.808594 23.375 25.875 C 23.625 25.921875 23.824219 25.96875 24.0625 25.96875 L 24.09375 25.96875 C 24.324219 25.96875 24.644531 25.90625 24.90625 25.71875 C 25.167969 25.53125 25.308594 25.226563 25.375 25 C 25.441406 24.777344 25.488281 24.589844 25.53125 24.40625 C 25.546875 24.328125 25.546875 24.335938 25.5625 24.28125 C 26.394531 24.128906 27.152344 23.984375 27.625 23.78125 C 28.210938 23.527344 28.652344 23.199219 28.875 22.6875 C 28.933594 22.546875 28.988281 22.390625 29 22.21875 C 29.035156 21.585938 28.578125 21.007813 27.96875 20.90625 C 27.957031 20.90625 27.949219 20.90625 27.9375 20.90625 C 26.5 20.675781 25.449219 19.839844 24.71875 19 C 23.988281 18.160156 23.621094 17.332031 23.625 17.34375 C 23.617188 17.332031 23.59375 17.28125 23.59375 17.28125 C 23.527344 17.152344 23.503906 17.066406 23.5 17.03125 C 23.480469 17.074219 23.507813 17 23.6875 16.90625 C 23.867188 16.8125 24.148438 16.734375 24.40625 16.65625 C 24.535156 16.617188 24.667969 16.554688 24.8125 16.5 C 25.347656 16.292969 25.726563 16.089844 26.03125 15.78125 C 26.335938 15.472656 26.539063 15.011719 26.53125 14.625 C 26.515625 13.796875 25.90625 13.339844 25.3125 13.125 C 25.308594 13.125 25.316406 13.09375 25.3125 13.09375 C 25.300781 13.089844 25.292969 13.097656 25.28125 13.09375 C 25.03125 12.996094 24.792969 12.96875 24.53125 12.96875 C 24.351563 12.96875 24.085938 12.972656 23.75 13.125 C 23.578125 13.203125 23.476563 13.183594 23.34375 13.21875 C 23.453125 11.660156 23.664063 9.769531 22.96875 8.25 C 22.085938 6.3125 20.664063 5.195313 19.34375 4.625 C 18.023438 4.054688 16.828125 4 16.25 4 L 16.1875 4 C 16.1875 4 16.074219 4 15.96875 4 C 15.917969 4 15.855469 4 15.8125 4 C 15.789063 4 15.757813 4 15.75 4 C 15.742188 4 15.777344 3.992188 15.6875 4 Z M 15.75 6 C 15.78125 6 15.8125 6 15.84375 6 C 15.882813 6 15.949219 6 16 6 C 16.101563 6 16.1875 6 16.1875 6 L 16.25 6 C 16.648438 6 17.566406 6.054688 18.53125 6.46875 C 19.496094 6.882813 20.484375 7.625 21.15625 9.09375 C 21.464844 9.773438 21.480469 11.746094 21.375 13.34375 L 21.34375 13.40625 C 21.328125 13.628906 21.324219 13.851563 21.3125 14.0625 C 21.296875 14.339844 21.398438 14.613281 21.59375 14.8125 C 21.710938 14.929688 22.167969 15.140625 22.65625 15.25 C 22.292969 15.457031 21.882813 15.726563 21.65625 16.25 C 21.40625 16.828125 21.519531 17.429688 21.75 17.96875 C 21.757813 18 21.769531 18.03125 21.78125 18.0625 C 21.785156 18.070313 21.777344 18.085938 21.78125 18.09375 C 21.78125 18.097656 21.78125 18.121094 21.78125 18.125 C 21.789063 18.136719 21.804688 18.144531 21.8125 18.15625 C 21.890625 18.335938 22.304688 19.261719 23.21875 20.3125 C 23.828125 21.011719 24.738281 21.664063 25.8125 22.1875 C 25.472656 22.273438 25.320313 22.355469 24.78125 22.4375 C 24.296875 22.511719 23.929688 22.949219 23.8125 23.21875 C 23.703125 23.464844 23.675781 23.675781 23.625 23.90625 C 23.234375 23.835938 22.796875 23.75 22.21875 23.75 C 21.84375 23.75 21.441406 23.78125 21.0625 23.84375 C 20.097656 24 19.417969 24.519531 18.8125 24.9375 C 17.921875 25.546875 17.28125 26 16.15625 26 C 16.117188 26 16.078125 26.003906 16.03125 26 C 15.988281 25.996094 15.949219 25.996094 15.90625 26 C 15.886719 26 15.851563 26 15.84375 26 C 14.71875 26 14.070313 25.546875 13.1875 24.9375 C 12.578125 24.519531 11.90625 24 10.9375 23.84375 C 10.558594 23.78125 10.15625 23.75 9.78125 23.75 C 9.175781 23.75 8.742188 23.8125 8.40625 23.875 C 8.363281 23.675781 8.316406 23.480469 8.21875 23.25 C 8.105469 22.984375 7.757813 22.519531 7.21875 22.4375 C 6.695313 22.359375 6.554688 22.273438 6.21875 22.1875 C 8.851563 20.914063 10.070313 18.453125 10.1875 18.1875 C 10.1875 18.1875 10.1875 18.15625 10.1875 18.15625 C 10.1875 18.152344 10.214844 18.132813 10.21875 18.125 C 10.234375 18.097656 10.253906 18.078125 10.28125 17.96875 L 10.21875 17.9375 C 10.441406 17.398438 10.59375 16.820313 10.34375 16.25 C 10.109375 15.710938 9.683594 15.425781 9.3125 15.21875 C 9.777344 15.121094 10.242188 14.980469 10.40625 14.8125 C 10.601563 14.613281 10.703125 14.339844 10.6875 14.0625 C 10.675781 13.828125 10.671875 13.59375 10.65625 13.34375 C 10.554688 11.742188 10.535156 9.773438 10.84375 9.09375 C 11.515625 7.625 12.507813 6.882813 13.46875 6.46875 C 14.429688 6.054688 15.355469 6 15.75 6 Z" />
        </svg>
      </a>
      <a href="mailto:AAelementsweb@gmail.com" className="text-white/50 hover:text-white transition-colors duration-300 p-3 -m-3" aria-label="Email">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      </a>
    </>
  )
}

export function SplineSceneBasic() {
  const [loaded, setLoaded] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const scrollRaf = useRef(0)
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (scrollRaf.current) return
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = 0
      setScrolled(latest > 80)
    })
  })

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const el = overlayRef.current
    if (!el) return
    const duration = 2000
    const phase1Split = 0.4
    let startTime: number | null = null
    let raf: number

    const step = (now: number) => {
      if (!startTime) startTime = now
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)

      if (eased <= phase1Split) {
        const p = eased / phase1Split
        const val = p * 100
        el.style.background = `radial-gradient(circle at 50% 50%, white 0%, white ${val}%, black ${val}%)`
        el.style.maskImage = ''
        el.style.webkitMaskImage = ''
      } else {
        const p = (eased - phase1Split) / (1 - phase1Split)
        const val = p * 100
        el.style.background = 'white'
        el.style.maskImage = `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${val}%, white ${val}%)`
        el.style.webkitMaskImage = `radial-gradient(circle at 50% 50%, transparent 0%, transparent ${val}%, white ${val}%)`
      }

      if (t < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setRevealed(true)
      }
    }

    el.style.background = 'black'
    el.style.maskImage = ''
    el.style.webkitMaskImage = ''
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [loaded])

  const sectionIds = ["about", "services", "toolkit", "process", "work", "testimonials", "faq", "pricing", "contact"]

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
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
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const sectionToTab: Record<string, number> = {
    about: 0, services: 1, toolkit: 3, process: 4, work: 5, testimonials: 7, faq: 9, pricing: 10, contact: 11,
  }

  const handleNav = (i: number | null) => {
    if (i === null) return
    const id = sectionIds[i > 1 ? (i > 6 ? (i > 8 ? i - 3 : i - 2) : i - 1) : i]
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {!revealed && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
        >
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={loaded ? { opacity: 0, scale: 1.4 } : {}}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center"
          >
            <MorphingSpinner size="lg" />
            <p className="mt-6 text-sm font-mono text-white/40 tracking-[0.2em] uppercase">
              Loading
            </p>
          </motion.div>
        </div>
      )}

      {/* ─── STICKY NAVBAR ─── */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 items-center justify-between px-4 md:px-8 py-3 transition-all duration-300 hidden md:flex"
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
            { title: "Process", icon: Map },
            { title: "Work", icon: Briefcase },
            { type: "separator" },
            { title: "Testimonials", icon: MessageSquare },
            { type: "separator" },
            { title: "FAQ", icon: HelpCircle },
            { title: "Pricing", icon: DollarSign },
            { title: "Contact", icon: Phone },
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
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Socials — side of robot */}
        {/* Mobile: fades on scroll */}
        <motion.div
          animate={{ opacity: scrolled ? 0 : 1, x: scrolled ? 16 : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute right-3 bottom-[15vh] z-20 flex-col items-center gap-5 pointer-events-none md:hidden flex"
        >
          <div className="pointer-events-auto flex flex-col items-center gap-5">
            <SocialIcons />
          </div>
        </motion.div>
        {/* Desktop: always visible */}
        <div className="absolute right-6 bottom-[15vh] z-20 flex-col items-center gap-5 pointer-events-none hidden md:flex">
          <div className="pointer-events-auto flex flex-col items-center gap-5">
            <SocialIcons />
          </div>
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
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Left: visual */}
          <div className="md:sticky md:top-24 md:w-1/2 h-fit shrink-0">
            <Card data-grid-size="lg" className="aspect-square flex items-center justify-center overflow-hidden">
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
                    animationDelay: `${-i * 0.5}s`,
                    willChange: "transform",
                  }}
                />
              ))}
            </div>
          </Card>
          </div>

          {/* Right: content */}
          <div className="md:w-1/2">
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

      {/* ─── PROCESS TIMELINE ─── */}
      <ProcessTimeline />

      {/* ─── WORK ─── */}
      <WorkSection />

      {/* ─── TESTIMONIALS ─── */}
      <Testimonial />

      {/* ─── FAQ ─── */}
      <FAQSection />

      {/* ─── PRICING ─── */}
      <PricingSection />

      {/* ─── CONTACT ─── */}
      <ContactSection />

      {/* ─── MOBILE NAV ─── */}
      <CurvedMobileNav />
    </>
  )
}
