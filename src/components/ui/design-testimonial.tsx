"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

const testimonials = [
  {
    quote: "He built something that actually feels alive. Our bounce rate dropped 40% the first week.",
    author: "Tunde Bakare",
    role: "Founder",
    company: "Lagos Prints",
  },
  {
    quote: "The most responsive, accessible site I've ever worked with. And he's 17. Unreal.",
    author: "Aisha Mohammed",
    role: "Product Manager",
    company: "Pulse Africa",
  },
  {
    quote: "Understood our vision on the first call and delivered more than we imagined.",
    author: "David Okafor",
    role: "Creative Director",
    company: "Studio Noir",
  },
]

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    const timer = setInterval(goNext, 6000)
    return () => clearInterval(timer)
  }, [])

  const current = testimonials[activeIndex]

  return (
    <section id="testimonials" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-[10px] text-white/30 tracking-[1px]">[ 07 ]</span>
          <span className="font-mono text-[10px] text-white/40 tracking-[1px] uppercase">Testimonials</span>
        </div>

        <div ref={containerRef} className="relative w-full" onMouseMove={handleMouseMove}>
          <motion.div
            className="absolute -left-8 top-1/2 -translate-y-1/2 text-[12rem] md:text-[28rem] font-bold text-foreground/[0.03] select-none pointer-events-none leading-none tracking-tighter"
            style={{ x: numberX, y: numberY }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <div className="relative flex">
            <div className="flex flex-col items-center justify-center pr-3 md:pr-16 border-r border-white/[0.06]">
              <motion.span
                className="hidden md:block text-xs font-mono text-white/40 tracking-widest uppercase"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Testimonials
              </motion.span>

              <div className="relative h-32 w-px bg-white/[0.06] mt-8">
                <motion.div
                  className="absolute top-0 left-0 w-full bg-white origin-top"
                  animate={{
                    height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <div className="flex-1 pl-4 md:pl-16 py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-white/40 border border-white/[0.06] px-3 py-1">
                    <span className="w-1.5 h-1.5 bg-white/50" />
                    {current.company}
                  </span>
                </motion.div>
              </AnimatePresence>

              <div className="relative mb-6 md:mb-12 min-h-[100px] md:min-h-[140px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeIndex}
                    className="text-2xl md:text-5xl font-light text-foreground leading-[1.15] tracking-tight"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {current.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-[0.3em]"
                        variants={{
                          hidden: { opacity: 0, y: 20, rotateX: 90 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: {
                              duration: 0.5,
                              delay: i * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                          exit: {
                            opacity: 0,
                            y: -10,
                            transition: { duration: 0.2, delay: i * 0.02 },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="flex items-end justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      className="w-8 h-px bg-white"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      style={{ originX: 0 }}
                    />
                    <div>
                      <p className="text-base font-medium text-white">{current.author}</p>
                      <p className="text-sm text-white/50">{current.role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={goPrev}
                    aria-label="Previous testimonial"
                    className="group relative w-12 h-12 border border-white/[0.12] flex items-center justify-center overflow-hidden hover:border-white/30 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="relative z-10 text-white group-hover:text-black transition-colors"
                    >
                      <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={goNext}
                    aria-label="Next testimonial"
                    className="group relative w-12 h-12 border border-white/[0.12] flex items-center justify-center overflow-hidden hover:border-white/30 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="relative z-10 text-white group-hover:text-black transition-colors"
                    >
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-20 left-0 right-0 overflow-hidden opacity-[0.04] pointer-events-none">
            <motion.div
              className="flex whitespace-nowrap text-6xl font-bold tracking-tight"
              animate={{ x: [0, -2000] }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {[...Array(4)].map((_, i) => (
                <span key={i} className="mx-8">
                  design &bull; develop &bull; deliver &bull; repeat &bull;
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
