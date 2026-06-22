"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Coffee, Leaf, Heart } from "lucide-react"
import FeaturedRoasts from "@/components/shop/FeaturedRoasts"

const testimonials = [
  {
    quote: "The Ethiopia Yirgacheffe is hands-down the best light roast I've ever had. Fast shipping, too.",
    author: "Sarah M.",
    role: "Verified Buyer",
  },
  {
    quote: "I've been a subscriber for six months. Every batch is consistently fresh and delicious.",
    author: "James K.",
    role: "Subscriber since 2025",
  },
  {
    quote: "Finally, a roaster that cares about both quality and sustainability. My new go-to.",
    author: "Priya R.",
    role: "Verified Buyer",
  },
]

const values = [
  {
    icon: Coffee,
    title: "Direct Trade",
    desc: "We partner directly with growers, cutting out middlemen to ensure fair wages and exceptional quality.",
  },
  {
    icon: Leaf,
    title: "Small Batch",
    desc: "Every roast is crafted in small batches to ensure peak freshness and flavor development.",
  },
  {
    icon: Heart,
    title: "Ethical Sourcing",
    desc: "100% compostable packaging and carbon-neutral shipping. Coffee that's good for you and the planet.",
  },
]

export default function ShopHome() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    document.title = "Birch & Bean | Artisan Coffee Roaster"
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-[#1A0F0A] overflow-hidden">
        <div
          className="absolute inset-0 bg-[url('/website-new/coffee-bg.mp4')] bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/website-new/product-1.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0F0A]/90 via-[#1A0F0A]/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <p className="text-[#C4956A] text-sm font-medium uppercase tracking-[0.2em] mb-4">
              Portland&apos;s Finest Single-Origin
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Crafted from
              <br />
              <span className="text-[#C4956A]">seed to cup</span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
              Small-batch coffee roasted with intention. Every bean is sourced directly from farmers
              who share our passion for quality and sustainability.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C4956A] text-[#1A0F0A] text-sm font-semibold tracking-wider uppercase rounded-lg hover:bg-[#D4A87A] transition-all"
              >
                Shop Current Roasts
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#C4956A]/30 text-[#C4956A] text-sm font-medium tracking-wider uppercase rounded-lg hover:bg-[#C4956A] hover:text-[#1A0F0A] transition-all"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A]">Why Birch &amp; Bean</h2>
            <p className="text-[#8B7D73] mt-2 max-w-md mx-auto">
              Coffee that connects every step of the journey
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center p-6"
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

      {/* Featured Roasts */}
      <FeaturedRoasts />

      {/* Testimonials */}
      <section className="py-16 sm:py-20 bg-[#1A0F0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <p className="text-white/80 text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-white font-medium text-sm">{t.author}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] mb-2">Brew Better</h2>
          <p className="text-[#8B7D73] text-sm sm:text-base mb-6">
            Subscribe for brewing tips, new arrivals, and exclusive offers.
          </p>
          {subscribed ? (
            <p className="text-[#4A7C59] font-medium">Thanks for subscribing!</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSubscribed(true)
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 text-sm border border-[#E8DDD3] rounded-lg text-[#1A0F0A] placeholder:text-[#8B7D73] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/40"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C4956A] text-[#1A0F0A] font-semibold rounded-lg hover:bg-[#D4A87A] transition-colors text-sm whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
