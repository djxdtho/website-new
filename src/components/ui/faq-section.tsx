"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { FallingPattern } from "@/components/ui/falling-pattern"

const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Full websites, web apps, interactive 3D experiences, and UI/UX design. I work best with clients who value craftsmanship and want something that stands out.",
  },
  {
    q: "How long does a typical project take?",
    a: "A single-page site takes 3–5 days. Multi-page projects range from 1–2 weeks. Larger custom builds are scoped individually with clear milestones.",
  },
  {
    q: "What's your pricing model?",
    a: "Fixed-price per project. You know the cost upfront — no hourly billing, no surprises. Payments are split: 50% to start, 50% on delivery.",
  },
  {
    q: "Do you offer revisions?",
    a: "Every plan includes at least one round of revisions. I work iteratively — you see the project as it develops, so there are no last-minute surprises.",
  },
  {
    q: "What do I need to provide to get started?",
    a: "Content (text, images, branding), any references or examples you like, and a rough idea of what you need. I handle the rest — design, development, deployment.",
  },
  {
    q: "Can you work with an existing site or brand?",
    a: "Yes. I can redesign, rebuild, or extend an existing site. I'll audit what's there, keep what works, and improve the rest.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative z-10 py-24 md:py-32 px-6 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <FallingPattern
          color="rgba(255,255,255,0.08)"
          backgroundColor="transparent"
          duration={200}
          blurIntensity="0.3em"
          density={3}
          className="h-full"
        />
      </div>
      <div className="relative z-[1] max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
            [ 08 ]  FAQ
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-3 leading-[1.05]">
          Frequently Asked Questions
        </h2>
        <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mb-12">
          Quick answers to common questions about working with me.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <Card key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-white/20 tracking-[1px] shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm md:text-base font-medium text-foreground leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/30 shrink-0 ml-4"
                  >
                    <ChevronDown size={16} strokeWidth={1.5} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="border-t border-white/[0.06] pt-4" />
                        <p className="text-sm text-white/60 leading-relaxed max-w-2xl">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
