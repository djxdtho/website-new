"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, Package, Wrench, Calendar, X } from "lucide-react"

const items = [
  { label: "About", icon: User, id: "about" },
  { label: "Services", icon: Package, id: "services" },
  { label: "Toolkit", icon: Wrench, id: "toolkit" },
  { label: "Journey", icon: Calendar, id: "journey" },
  { label: "Home", icon: Home, id: "home" },
]

export function CurvedMobileNav() {
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    setOpen(false)
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center md:hidden">
      {/* Curved background */}
      <svg
        viewBox="0 0 375 100"
        className="absolute bottom-0 w-full h-[100px]"
        preserveAspectRatio="none"
        style={{ filter: "drop-shadow(0 -4px 20px rgba(0,0,0,0.4))" }}
      >
        <path
          d="M0,60 C60,60 120,20 187.5,20 C255,20 315,60 375,60 L375,100 L0,100 Z"
          fill="rgba(10,10,10,0.92)"
        />
        <path
          d="M0,60 C60,60 120,20 187.5,20 C255,20 315,60 375,60"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
        />
      </svg>

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
              const angle = -80 + (i / (items.length - 1)) * 160
              const rad = (angle * Math.PI) / 180
              const r = 90
              const x = Math.sin(rad) * r
              const y = -Math.cos(rad) * r - 10

              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{ opacity: 1, x, y }}
                  exit={{ opacity: 0, x: 0, y: 0 }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 25 }}
                  onClick={() => scrollTo(item.id)}
                  className="absolute bottom-[52px] flex flex-col items-center gap-1"
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
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
