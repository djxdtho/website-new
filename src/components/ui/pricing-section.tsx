"use client"

import { useRef, useState, useEffect } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { Check, Star, HelpCircle } from "lucide-react"
import { FallingPattern } from "@/components/ui/falling-pattern"



const plans = [
  {
    name: "STARTER",
    price: "120",
    ngnPrice: "180k",
    features: [
      "Single-page website",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "1 round of revisions",
      "3-5 day delivery",
    ],
    description: "Perfect for small businesses and personal sites",
    buttonText: "Get Started",
    href: "#contact",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "300",
    ngnPrice: "450k",
    features: [
      "Up to 5 pages",
      "Custom design & branding",
      "Advanced SEO optimization",
      "CMS integration",
      "3 rounds of revisions",
      "1-2 week delivery",
      "Priority support",
    ],
    description: "Ideal for growing businesses \u2014 Most Popular",
    buttonText: "Get Started",
    href: "#contact",
    isPopular: true,
  },
  {
    name: "PREMIUM",
    price: "900",
    ngnPrice: "1.35M",
    features: [
      "Custom pages & features",
      "Full-stack development",
      "3D / WebGL experiences",
      "Unlimited revisions",
      "Scoped individually",
      "Ongoing support & maintenance",
      "SLA agreement",
    ],
    description: "For large-scale custom projects",
    buttonText: "Contact Sales",
    href: "#contact",
    isPopular: false,
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const [isMd, setIsMd] = useState(true)
  useEffect(() => {
    setIsMd(window.innerWidth >= 768)
    const h = () => setIsMd(window.innerWidth >= 768)
    window.addEventListener("resize", h)
    return () => window.removeEventListener("resize", h)
  }, [])

  const leftX = useTransform(scrollYProgress, [0, 0.4], [-50, 30])
  const rightX = useTransform(scrollYProgress, [0, 0.4], [50, -30])
  const middleScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.08])
  const sideScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9])

  return (
    <section id="pricing" ref={sectionRef} className="relative z-10 py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 hidden md:block">
        <FallingPattern
          color="rgba(255,255,255,0.08)"
          backgroundColor="transparent"
          duration={200}
          blurIntensity="0.3em"
          density={3}
          className="h-full"
        />
      </div>
      <div className="relative z-[1] max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 will-change-transform"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-white/30 tracking-[1px]">
              [ 06 ]
            </span>
            <span className="font-mono text-[10px] text-white/40 tracking-[1px] uppercase">
              Pricing
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-4 leading-[1.05]">
            Transparent Pricing
          </h2>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
            No surprises. Every business deserves a great website at an accessible price.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="flex-1 max-w-sm relative will-change-transform"
              style={isMd ? {
                x: index === 0 ? leftX : index === 2 ? rightX : 0,
                scale: index === 1 ? middleScale : index === 0 || index === 2 ? sideScale : 1,
              } : {}}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.12 }}
            >
              <Card className={cn(
                "p-8 flex flex-col h-full relative",
                plan.isPopular && "border-white/30"
              )}>
                  {plan.isPopular && (
                    <div className="absolute top-0 right-0 bg-white py-1 px-3 flex items-center gap-1.5">
                      <Star className="text-black h-3.5 w-3.5 fill-black" />
                      <span className="text-black text-[10px] font-semibold font-mono tracking-wider uppercase">
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="flex-1 flex flex-col">
                    <p className="font-mono text-xs text-white/40 tracking-[1px] mb-3">
                      {plan.name}
                    </p>

                    <div className="flex items-baseline gap-1 mb-0">
                      <div className="relative h-14 md:h-20 overflow-hidden cursor-default group min-w-[140px] md:min-w-[180px]">
                        <span className="text-4xl md:text-5xl font-bold text-foreground font-display tracking-tight tabular-nums block leading-none transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                          ${plan.price}
                        </span>
                        <span className="text-4xl md:text-5xl font-bold text-foreground font-display tracking-tight tabular-nums absolute inset-0 flex items-center leading-none transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0">
                          ₦{plan.ngnPrice}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-mono text-white/40 mb-4">
                      one-time payment
                    </p>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-white/60 mt-0.5 shrink-0" />
                          <span className="text-sm text-white/70">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto space-y-3">
                      <a
                        href={plan.href}
                        className={cn(
                          buttonVariants({ variant: plan.isPopular ? "default" : "outline" }),
                          "w-full text-sm font-semibold tracking-wider uppercase font-mono",
                          plan.isPopular
                            ? "bg-white text-black hover:bg-white/80"
                            : "border-white/20 text-white/70 hover:bg-white hover:text-black"
                        )}
                      >
                        {plan.buttonText}
                      </a>
                      <p className="text-[11px] text-white/40 text-center font-mono leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-mono text-white/50 hover:text-white transition-colors duration-200"
          >
            <HelpCircle className="h-4 w-4" />
            Not sure which tier fits? Reach out &mdash; I&apos;ll help you figure it out.
          </a>
        </motion.div>
      </div>
    </section>
  )
}
