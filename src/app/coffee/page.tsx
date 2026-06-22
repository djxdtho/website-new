"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Leaf, Coffee, Droplets, Thermometer, Send, Check, ArrowRight, Menu, X } from "lucide-react"
import Link from "next/link"

const roasts = [
  {
    name: "Ethiopian Yirgacheffe",
    origin: "Yirgacheffe, Ethiopia",
    notes: "Blueberry, Jasmine, Cocoa",
    process: "Washed",
    price: "$22",
    size: "12 oz",
    roast: "Light",
  },
  {
    name: "Colombia El Paraiso",
    origin: "Huila, Colombia",
    notes: "Caramel, Orange Blossom, Milk Chocolate",
    process: "Anaerobic",
    price: "$24",
    size: "12 oz",
    roast: "Medium-Light",
  },
  {
    name: "Sumatra Gayo",
    origin: "Aceh, Sumatra",
    notes: "Dark Chocolate, Cedar, Brown Sugar",
    process: "Semi-Washed",
    price: "$20",
    size: "12 oz",
    roast: "Dark",
  },
  {
    name: "Kenya AA",
    origin: "Nyeri, Kenya",
    notes: "Blackcurrant, Tomato, Honey",
    process: "Washed",
    price: "$26",
    size: "12 oz",
    roast: "Medium",
  },
]

const brewMethods = [
  {
    title: "Pour Over (V60)",
    icon: Droplets,
    steps: [
      "Rinse filter with hot water to remove paper taste",
      "Add 15g coffee ground medium-fine",
      "Bloom with 30g water for 30 seconds",
      "Pour to 250g total in slow, circular motions",
      "Total brew time: 2:30 - 3:00",
    ],
  },
  {
    title: "French Press",
    icon: Coffee,
    steps: [
      "Add 30g coffee ground coarse",
          "Pour 350g water at 94&deg;C",
      "Stir gently after 1 minute",
      "Steep for 4 minutes total",
      "Plunge slowly and serve immediately",
    ],
  },
  {
    title: "Aeropress",
    icon: Thermometer,
    steps: [
      "Add 15g coffee ground medium-fine",
          "Pour 200g water at 85&deg;C",
      "Stir for 10 seconds",
      "Press slowly for 30 seconds",
      "Dilute with 50g hot water",
    ],
  },
]

function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/coffee" className="text-[#F5EDE0] text-sm tracking-[0.2em] uppercase font-medium">
          Birch &amp; Bean
        </Link>
        <div className="hidden md:flex items-center gap-7">
          <a href="#roasts" className="text-[#C4956A]/80 hover:text-[#F5EDE0] text-sm tracking-wide transition-colors">
            Roasts
          </a>
          <a href="#story" className="text-[#C4956A]/80 hover:text-[#F5EDE0] text-sm tracking-wide transition-colors">
            Story
          </a>
          <a href="#brew" className="text-[#C4956A]/80 hover:text-[#F5EDE0] text-sm tracking-wide transition-colors">
            Brew
          </a>
          <a href="#contact" className="text-[#C4956A]/80 hover:text-[#F5EDE0] text-sm tracking-wide transition-colors">
            Contact
          </a>
          <Link
            href="/"
            className="text-[#C4956A]/80 hover:text-[#F5EDE0] text-sm tracking-wide transition-colors"
          >
            Portfolio →
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#F5EDE0]"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#2A150A]/95 backdrop-blur-lg border-t border-[#C4956A]/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a href="#roasts" onClick={() => setOpen(false)} className="text-[#C4956A]/70 text-sm tracking-wide">Roasts</a>
            <a href="#story" onClick={() => setOpen(false)} className="text-[#C4956A]/70 text-sm tracking-wide">Story</a>
            <a href="#brew" onClick={() => setOpen(false)} className="text-[#C4956A]/70 text-sm tracking-wide">Brew</a>
            <a href="#contact" onClick={() => setOpen(false)} className="text-[#C4956A]/70 text-sm tracking-wide">Contact</a>
            <Link href="/" onClick={() => setOpen(false)} className="text-[#C4956A]/70 text-sm tracking-wide">Portfolio →</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-[#1A0F0A]">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/website-new/coffee-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#3C1F0E/85_0%,_#1A0F0A/90_60%,_#0A0503_95_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#C4956A]/10 blur-[120px]" />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <div className="mb-8">
          <Leaf size={32} className="text-[#C4956A] mx-auto mb-4" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#F5EDE0] tracking-tight leading-[0.95] mb-6">
          Birch &amp; Bean
        </h1>
        <p className="text-lg md:text-xl text-[#C4956A]/80 max-w-xl mx-auto leading-relaxed mb-10 font-light tracking-wide">
          Small-batch, single-origin coffee roasted to order in Portland, OR.
          Every bean sourced with intention.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#roasts"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C4956A] text-[#1A0F0A] text-sm font-medium tracking-wider uppercase rounded-full hover:bg-[#D4A87A] transition-colors"
          >
            Shop Current Roasts
            <ArrowRight size={14} />
          </a>
          <a
            href="#story"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#C4956A]/30 text-[#C4956A] text-sm font-medium tracking-wider uppercase rounded-full hover:bg-[#C4956A] hover:text-[#1A0F0A] transition-all"
          >
            Our Story
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 rounded-full border border-[#C4956A]/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-[#C4956A] animate-[bounce_2s_infinite]" />
        </div>
      </div>
    </section>
  )
}

function StorySection() {
  return (
    <section id="story" className="py-28 px-6 bg-[#F5EDE0]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/website-new/story-bg.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#3C1F0E] rounded-2xl flex items-center justify-center -z-10">
              <p className="text-[#F5EDE0] text-3xl font-bold font-display">24&rsquo;</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-[#3C1F0E]/60 text-sm tracking-[0.2em] uppercase font-medium">Our Story</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#3C1F0E] font-bold leading-tight">
              Roasted the day it ships.
            </h2>
            <div className="space-y-4 text-[#3C1F0E]/70 leading-relaxed">
              <p>
                Birch &amp; Bean was founded on a simple belief: coffee should taste
                growers in Ethiopia, Colombia, Sumatra, and Kenya &mdash; building
                growers in Ethiopia, Colombia, Sumatra, and Kenya — building
                relationships that go back years.
              </p>
              <p>
                Every batch is roasted in small quantities on our 15-kg
                Probat drum roaster. We never stockpile. When you order, we
                roast. That means your coffee arrives at peak flavor, not a
                month after it left the warehouse.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { label: "Roasts/mo", value: "40+" },
                { label: "Origins", value: "6" },
                { label: "Years", value: "Since 24" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl text-[#3C1F0E] font-bold">{s.value}</p>
                  <p className="text-[#3C1F0E]/50 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function RoastsSection() {
  return (
    <section id="roasts" className="py-28 px-6 bg-[#FAF6F1]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#3C1F0E]/60 text-sm tracking-[0.2em] uppercase font-medium mb-4">Current Offerings</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#3C1F0E] font-bold leading-tight mb-4">
            Now Roasting
          </h2>
          <p className="text-[#3C1F0E]/60 max-w-md mx-auto">
            Rotating selection. Every coffee is cupped and approved before it hits the shelf.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roasts.map((roast) => (
            <div
              key={roast.name}
              className="group relative bg-white rounded-2xl p-6 border border-[#3C1F0E]/8 hover:border-[#C4956A]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#3C1F0E]/5 hover:-translate-y-1"
            >
              <div className="aspect-[3/4] mb-5 rounded-xl overflow-hidden bg-[#3C1F0E]/5">
                <img
                  src={`/website-new/product-${roasts.indexOf(roast) + 1}.jpg`}
                  alt={roast.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C4956A]/10 text-[#3C1F0E] text-[11px] font-medium tracking-wide uppercase mb-2">
                {roast.roast} Roast
              </span>
              <h3 className="font-display text-lg text-[#3C1F0E] font-bold mb-1">{roast.name}</h3>
              <p className="text-[#3C1F0E]/50 text-sm mb-3">{roast.origin}</p>
              <p className="text-[#3C1F0E]/70 text-sm leading-relaxed mb-4">
                {roast.notes}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[#3C1F0E]/8">
                <span className="font-display text-xl text-[#3C1F0E] font-bold">
                  {roast.price}
                  <span className="text-sm font-normal text-[#3C1F0E]/40"> / {roast.size}</span>
                </span>
                <span className="text-[11px] text-[#3C1F0E]/40 uppercase tracking-wider">{roast.process}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function BrewGuideSection() {
  const [openGuide, setOpenGuide] = useState<number | null>(null)

  return (
    <section id="brew" className="py-28 px-6 bg-[#3C1F0E] text-[#F5EDE0]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C4956A]/60 text-sm tracking-[0.2em] uppercase font-medium mb-4">Brew Guides</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
            Make the Perfect Cup
          </h2>
          <p className="text-[#C4956A]/60 max-w-md mx-auto">
            Simple guides to help you get the most out of every bean.
          </p>
        </div>
        <div className="space-y-3">
          {brewMethods.map((method, i) => {
            const isOpen = openGuide === i
            const Icon = method.icon
            return (
              <div
                key={method.title}
                className="rounded-2xl border border-[#C4956A]/15 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenGuide(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#C4956A]/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <Icon size={20} className="text-[#C4956A]" />
                    <span className="font-display text-lg font-semibold">{method.title}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-[#C4956A] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6 pt-0 space-y-2">
                    {method.steps.map((step, j) => (
                      <div key={j} className="flex items-start gap-3 text-[#C4956A]/80 text-sm">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C4956A]/10 text-[#C4956A] text-[11px] flex items-center justify-center font-medium mt-0.5">
                          {j + 1}
                        </span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    }
    console.log("Form submitted:", payload)
    setSubmitted(true)
    form.reset()
  }

  return (
    <section id="contact" className="py-28 px-6 bg-[#FAF6F1]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#3C1F0E]/60 text-sm tracking-[0.2em] uppercase font-medium mb-4">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl text-[#3C1F0E] font-bold leading-tight mb-4">
            Let&rsquo;s Talk Coffee
          </h2>
          <p className="text-[#3C1F0E]/60 max-w-md mx-auto">
            Wholesale inquiries, event collaborations, or just to say hello.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div className="border-l-2 border-[#C4956A]/30 pl-4">
              <p className="text-[#3C1F0E]/50 text-xs tracking-wide uppercase mb-2">Find us</p>
              <p className="text-[#3C1F0E] leading-relaxed">
                234 SE Ankeny St<br />
                Portland, OR 97214
              </p>
            </div>
            <div className="border-l-2 border-[#C4956A]/30 pl-4">
              <p className="text-[#3C1F0E]/50 text-xs tracking-wide uppercase mb-2">Open</p>
              <p className="text-[#3C1F0E] leading-relaxed">
                Wed–Sat 7am–3pm<br />
                Sun 8am–2pm
              </p>
              <p className="text-[#3C1F0E]/40 text-xs mt-2">Closed Mon–Tue (roasting days)</p>
            </div>
            <div className="border-l-2 border-[#C4956A]/30 pl-4">
              <p className="text-[#3C1F0E]/50 text-xs tracking-wide uppercase mb-2">Say hi</p>
              <p className="text-[#3C1F0E]">hello@birchandbean.com</p>
              <p className="text-[#3C1F0E]/40 text-xs mt-1">@birchandbeancoffee on IG</p>
            </div>
            <div className="flex gap-3 pt-2">
              {["IG", "YT", "TT"].map((s) => (
                <span
                  key={s}
                  className="w-9 h-9 rounded-full bg-[#3C1F0E]/5 text-[#3C1F0E]/50 text-[11px] font-medium flex items-center justify-center hover:bg-[#3C1F0E] hover:text-[#F5EDE0] transition-colors cursor-pointer"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[#3C1F0E] flex items-center justify-center mb-4">
                  <Check size={24} className="text-[#F5EDE0]" />
                </div>
                <h3 className="font-display text-xl text-[#3C1F0E] font-semibold mb-2">Message Sent</h3>
                <p className="text-[#3C1F0E]/60 text-sm mb-4">We&rsquo;ll be in touch within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#3C1F0E] text-sm underline underline-offset-4 hover:text-[#C4956A] transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-[#3C1F0E]/70 mb-1.5 font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#3C1F0E]/10 text-[#3C1F0E] placeholder:text-[#3C1F0E]/30 focus:outline-none focus:border-[#C4956A]/50 focus:ring-2 focus:ring-[#C4956A]/10 transition-all text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-[#3C1F0E]/70 mb-1.5 font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#3C1F0E]/10 text-[#3C1F0E] placeholder:text-[#3C1F0E]/30 focus:outline-none focus:border-[#C4956A]/50 focus:ring-2 focus:ring-[#C4956A]/10 transition-all text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-[#3C1F0E]/70 mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#3C1F0E]/10 text-[#3C1F0E] placeholder:text-[#3C1F0E]/30 focus:outline-none focus:border-[#C4956A]/50 focus:ring-2 focus:ring-[#C4956A]/10 transition-all text-sm resize-none"
                    placeholder="Tell us what you need..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#3C1F0E] text-[#F5EDE0] text-sm font-medium tracking-wider uppercase rounded-xl hover:bg-[#2A150A] transition-colors"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-10 px-6 bg-[#1A0F0A] text-[#C4956A]/50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">&copy; 2024 Birch &amp; Bean Coffee Co.</p>
        <div className="flex items-center gap-6 text-xs tracking-wider uppercase">
          <a href="#roasts" className="hover:text-[#C4956A] transition-colors">Roasts</a>
          <a href="#story" className="hover:text-[#C4956A] transition-colors">Story</a>
          <a href="#brew" className="hover:text-[#C4956A] transition-colors">Brew</a>
          <a href="#contact" className="hover:text-[#C4956A] transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default function CoffeePage() {
  useEffect(() => {
    document.title = "Birch & Bean | Artisan Coffee Roaster"
  }, [])

  return (
    <div className="min-h-dvh bg-[#FAF6F1] text-[#3C1F0E]">
      <NavBar />
      <HeroSection />
      <RoastsSection />
      <StorySection />
      <BrewGuideSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
