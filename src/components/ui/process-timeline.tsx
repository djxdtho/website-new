"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Analyze",
    description: "Understand the problem, research the market, define requirements and user goals.",
    color: "from-white/80 to-white/40",
  },
  {
    number: "02",
    title: "Design",
    description: "Architect the solution, craft wireframes, design systems, and high-fidelity mockups.",
    color: "from-white/70 to-white/30",
  },
  {
    number: "03",
    title: "Build",
    description: "Develop with modern stacks, iterate fast, test thoroughly, ship with confidence.",
    color: "from-white/60 to-white/20",
  },
  {
    number: "04",
    title: "Deliver",
    description: "Deploy, monitor, optimize — then support and evolve the product post-launch.",
    color: "from-white/50 to-white/10",
  },
]

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const overallOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  return (
    <section ref={sectionRef} className="relative z-10 py-24 md:py-32 px-6 overflow-hidden" id="process">
      <div className="max-w-6xl mx-auto">
        <motion.div style={{ opacity: overallOpacity }} className="mb-4">
          <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
            [ 00 ]  Process
          </span>
        </motion.div>
        <motion.h2
          style={{ opacity: overallOpacity }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-16 md:mb-24 leading-[1.05]"
        >
          How I Work
        </motion.h2>

        <div className="relative">
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] md:-translate-x-px" />

          {steps.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              index={i}
              sectionRef={sectionRef}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({
  step,
  index,
  sectionRef,
}: {
  step: typeof steps[0]
  index: number
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    container: sectionRef,
    offset: ["start 0.85", "end 0.4"],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative pb-20 md:pb-28 last:pb-0">
      <div className="flex items-start md:block">
        <motion.div
          className="relative z-10 shrink-0 w-10 h-10 rounded-full border border-white/20 bg-black flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2"
          style={{
            scale: useTransform(progress, [0, 1], [0.6, 1]),
          }}
        >
          <motion.span
            className="absolute inset-0 rounded-full border border-white/40"
            style={{
              scale: useTransform(progress, [0, 0.5, 1], [0, 1.4, 1.8]),
              opacity: useTransform(progress, [0, 0.5, 1], [0, 0.4, 0]),
            }}
          />
          <motion.span
            className="w-2 h-2 rounded-full bg-white"
            style={{
              scale: useTransform(progress, [0, 1], [0, 1]),
            }}
          />
        </motion.div>

        <div className={`ml-5 md:ml-0 md:w-[calc(50%-32px)] ${isLeft ? "md:pr-12 md:text-right" : "md:ml-[calc(50%+32px)]"}`}>
          <motion.div
            className="bg-card border border-white/[0.06] card-grid card-glow p-6 md:p-8"
            style={{
              x: useTransform(progress, [0, 1], [isLeft ? -24 : 24, 0]),
              opacity: progress,
            }}
          >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-white/20" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-white/20" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-white/20" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-white/20" />
            </div>
            <span className="text-[10px] font-mono text-white/30 tracking-[1px]">
              {step.number}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground tracking-tight mt-2 mb-3">
              <motion.span
                className="bg-gradient-to-r bg-clip-text text-transparent from-white to-white/50 inline-block"
                style={{
                  backgroundImage: useTransform(
                    progress,
                    [0, 1],
                    [
                      "linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
                      step.color,
                    ]
                  ),
                }}
              >
                {step.title}
              </motion.span>
            </h3>
            <p className="text-sm md:text-base text-white/55 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
