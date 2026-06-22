"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Coffee, Leaf, Heart, Globe } from "lucide-react"

const timeline = [
  { year: "2015", event: "Birch & Bean founded in Portland, OR" },
  { year: "2017", event: "First direct-trade partnership in Ethiopia" },
  { year: "2019", event: "Opened our own roastery in Southeast Portland" },
  { year: "2021", event: "Transitioned to 100% compostable packaging" },
  { year: "2024", event: "Surpassed 10,000 orders and counting" },
]

const team = [
  { name: "Elena Torres", role: "Head Roaster", image: "/website-new/product-1.jpg" },
  { name: "Marcus Chen", role: "Green Buyer", image: "/website-new/product-2.jpg" },
  { name: "Samira Patel", role: "Operations", image: "/website-new/product-3.jpg" },
  { name: "James Okafor", role: "Quality Control", image: "/website-new/product-4.jpg" },
]

const values = [
  {
    icon: Globe,
    title: "Direct Trade",
    desc: "We travel to origin, build relationships with farmers, and pay well above fair trade pricing. Every bean has a story.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "From compostable packaging to carbon-neutral shipping, we minimize our footprint at every step.",
  },
  {
    icon: Heart,
    title: "Community",
    desc: "We donate 5% of all profits to coffee-growing communities for education and healthcare initiatives.",
  },
  {
    icon: Coffee,
    title: "Quality",
    desc: "Every batch is cupped, scored, and approved before it reaches your door. No exceptions.",
  },
]

export default function AboutPage() {
  useEffect(() => {
    document.title = "Our Story | Birch & Bean"
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-[#1A0F0A] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/website-new/product-1.jpg')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0A]/90 to-[#1A0F0A]/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl"
          >
            <p className="text-[#C4956A] text-sm font-medium uppercase tracking-[0.2em] mb-3">
              Our Story
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Coffee is our
              <br />
              <span className="text-[#C4956A]">connection</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] mb-6">From Portland, With Love</h2>
          <div className="space-y-4 text-[#4A3F3A] leading-relaxed">
            <p>
              Birch &amp; Bean started in a small garage in Southeast Portland with a single batch of
              Ethiopian Yirgacheffe and a borrowed roaster. We were obsessed with the idea that coffee
              could taste completely different depending on where it was grown, how it was processed,
              and how carefully it was roasted.
            </p>
            <p>
              That obsession turned into a mission: to bring the world&apos;s best single-origin coffees
              to your cup while honoring the farmers and communities that make it possible. Every bag
              we sell is traceable to the farm or cooperative where it was grown.
            </p>
            <p>
              Today we roast in our own facility in Portland&apos;s Central Eastside, sourcing from 12
              producer partners across 8 countries. We cup every batch, roast to order, and ship within
              48 hours. Because coffee is at its best when it&apos;s fresh — and when every step of the
              journey is done with care.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 bg-[#F5F0EB]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] text-center mb-10">
            Our Journey
          </h2>
          <div className="space-y-6">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4"
              >
                <div className="text-right w-16 flex-shrink-0">
                  <span className="text-sm font-bold text-[#C4956A]">{t.year}</span>
                </div>
                <div className="w-px h-10 bg-[#C4956A]/30 flex-shrink-0 mt-1.5" />
                <p className="text-sm text-[#4A3F3A]">{t.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] text-center mb-2">
            What We Stand For
          </h2>
          <p className="text-[#8B7D73] text-center mb-10 max-w-md mx-auto">
            Every decision we make is guided by these principles
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl bg-[#F5F0EB]"
              >
                <div className="w-12 h-12 rounded-full bg-[#C4956A]/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-[#C4956A]" />
                </div>
                <h3 className="font-semibold text-[#1A0F0A] mb-2">{v.title}</h3>
                <p className="text-sm text-[#8B7D73] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-[#F5F0EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] text-center mb-2">
            Meet the Team
          </h2>
          <p className="text-[#8B7D73] text-center mb-10">
            The people behind your morning cup
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#E8DDD3] mb-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-medium text-[#1A0F0A] text-sm">{member.name}</h3>
                <p className="text-xs text-[#8B7D73]">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#1A0F0A]">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Ready to find your new favorite roast?
          </h2>
          <p className="text-white/60 text-sm sm:text-base mb-6">
            Explore our full collection, roasted to order and shipped free over $50.
          </p>
          <Link
            href="/shop/products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#C4956A] text-[#1A0F0A] font-semibold rounded-lg hover:bg-[#D4A87A] transition-colors"
          >
            Shop All Coffee
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
