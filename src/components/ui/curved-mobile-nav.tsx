"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Package, Briefcase, DollarSign, X, HelpCircle, Phone } from "lucide-react"

const socials = [
  { label: "GitHub", href: "https://github.com/djxdtho",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },

  { label: "Instagram", href: "https://instagram.com/dndloldesigner",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  { label: "TikTok", href: "https://tiktok.com/@dndloldesigner",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  { label: "Snapchat", href: "https://snapchat.com/add/djxdtho",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M5.829 4.533c-.6 1.07-.753 2.267-.793 3.482-.023.704-.019 1.41-.013 2.114.003.397.003.795-.016 1.191-.032.655-.131 1.308-.486 1.883-.327.53-.793.952-1.377 1.186-.282.113-.582.173-.864.255-.097.028-.189.072-.145.19.098.267.376.394.614.502 1.035.471 2.099.785 3.222.95.289.042.567.119.784.313.312.28.341.746.196 1.117-.226.578-.879.803-1.437.895-.574.094-1.155.152-1.733.189-.634.04-1.273.004-1.91.024-.583.019-1.06.137-1.388.623-.251.371-.245.841-.003 1.223.345.545.87.835 1.459.996.795.217 1.615.268 2.438.215.652-.042 1.297-.153 1.934-.295.362-.081.711-.201 1.05-.355.275-.126.492-.241.636-.472.26-.42.29-.959-.166-1.305-.388-.295-.85-.418-1.316-.515-.342-.072-.674-.178-.942-.408-.229-.197-.296-.426-.153-.694.149-.28.427-.374.717-.44.916-.207 1.851-.283 2.781-.381.563-.06 1.127-.124 1.688-.207.659-.098 1.318-.206 1.967-.39.404-.115.796-.268 1.133-.517.343-.253.551-.581.604-.999.049-.406-.001-.778-.322-1.076-.281-.26-.633-.384-.991-.491-.765-.228-1.543-.358-2.334-.415-.392-.028-.786-.043-1.178-.06-.443-.019-.887-.049-1.327-.087-.851-.073-1.603-.382-2.206-.902-.587-.505-.95-1.147-1.12-1.923-.126-.575-.175-1.159-.144-1.746.06-1.139.484-2.062 1.346-2.755.968-.776 2.111-1.037 3.347-.855 1.065.157 1.958.654 2.64 1.495.524.646.844 1.406.997 2.253.133.738.154 1.501.013 2.24-.071.372-.085.759.156 1.09.212.293.515.349.855.307.208-.026.396-.11.567-.217.902-.568 1.347-1.509 1.616-2.595.36-1.448.357-2.914-.08-4.372-.33-1.099-.863-2.056-1.706-2.793-1.478-1.292-3.316-1.697-5.273-1.74-1.443-.031-2.854.182-4.154.781-1.16.533-2.071 1.347-2.707 2.514z" />
      </svg>
    ),
  },
  { label: "Email", href: "mailto:AAelementsweb@gmail.com",
    icon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

const items = [
  { label: "About", icon: User, id: "about" },
  { label: "Services", icon: Package, id: "services" },
  { label: "Work", icon: Briefcase, id: "work" },
  { label: "FAQ", icon: HelpCircle, id: "faq" },
  { label: "Pricing", icon: DollarSign, id: "pricing" },
  { label: "Contact", icon: Phone, id: "contact" },
]

const OPEN_HEIGHT = 290
const CLOSED_HEIGHT = 100

export function CurvedMobileNav() {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (!open) return
    const close = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const closeImmediate = () => {
      setOpen(false)
    }
    document.addEventListener("scroll", closeImmediate, { passive: true })
    document.addEventListener("touchstart", close, { passive: true })
    document.addEventListener("pointerdown", close, { passive: true })
    return () => {
      document.removeEventListener("scroll", closeImmediate)
      document.removeEventListener("touchstart", close)
      document.removeEventListener("pointerdown", close)
    }
  }, [open])

  return (
    <div ref={navRef} className="fixed bottom-0 left-0 right-0 z-50 flex justify-center md:hidden">

      {/* Expanding curve background */}
      <motion.div
        className="absolute bottom-0 w-full"
        animate={{ height: open ? OPEN_HEIGHT : CLOSED_HEIGHT }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        style={{ overflow: "hidden" }}
      >
        <svg
          viewBox="0 0 375 290"
          className="w-full h-[290px]"
          preserveAspectRatio="none"
          style={{ filter: "drop-shadow(0 -4px 20px rgba(0,0,0,0.4))" }}
        >
          <path
            d="M0,60 C60,60 120,20 187.5,20 C255,20 315,60 375,60 L375,290 L0,290 Z"
            fill="rgba(10,10,10,0.92)"
          />
          <path
            d="M0,60 C60,60 120,25 187.5,25 C255,25 315,60 375,60"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      {/* Center FAB */}
      <motion.button
        className="absolute bottom-[52px] z-10 w-14 h-14 flex items-center justify-center border border-white/20 bg-black text-white"
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} strokeWidth={1.5} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="flex flex-col gap-1">
                <span className="block w-5 h-px bg-white" />
                <span className="block w-5 h-px bg-white" />
                <span className="block w-5 h-px bg-white" />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Nav items - fan out when open */}
      <AnimatePresence>
        {open && (
          <>
            {items.map((item, i) => {
              const angle = -75 + (i / (items.length - 1)) * 150
              const rad = (angle * Math.PI) / 180
              const r = 120
              const x = Math.sin(rad) * r
              const y = -Math.cos(rad) * r - 5 + (i === 0 || i === items.length - 1 ? 10 : 0)

              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x, y }}
                  exit={{ opacity: 0, x: 0, y: 0 }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 25 }}
                  onClick={() => scrollTo(item.id)}
                  className="absolute bottom-[52px] flex flex-col items-center gap-1"
                  style={{ zIndex: 20 }}
                >
                  <span className="w-10 h-10 flex items-center justify-center border border-white/10 bg-black/90 text-white/70">
                    <item.icon size={16} strokeWidth={1.5} />
                  </span>
                  <span className="text-[9px] font-mono text-white/50 tracking-wider uppercase whitespace-nowrap">
                    {item.label}
                  </span>
                </motion.button>
              )
            })}

            {/* Social links row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-5"
              style={{ zIndex: 20 }}
            >
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.3 }}
                  className="text-white/40 hover:text-white transition-colors duration-300 p-[14px] -m-[14px]"
                  aria-label={s.label}
                >
                  <s.icon />
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
