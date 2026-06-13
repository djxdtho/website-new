"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, X, ShoppingBag, Plus, Check, Star, MapPin, ChevronDown, ArrowRight } from "lucide-react"

const roasters = [
  {
    id: "birch-bean",
    name: "Birch & Bean",
    tagline: "Portland's finest single-origin roaster",
    location: "Portland, OR",
    established: 2024,
    story: "Founded on a simple belief: coffee should taste like where it's from. Every batch roasted in small quantities on a 15-kg Probat drum.",
    featured: true,
    color: "#C4956A",
    products: [
      { id: "bb-1", name: "Ethiopian Yirgacheffe", origin: "Yirgacheffe, Ethiopia", price: 22, size: "12 oz", roast: "Light", notes: "Blueberry, Jasmine, Cocoa", rating: 4.8 },
      { id: "bb-2", name: "Colombia El Paraiso", origin: "Huila, Colombia", price: 24, size: "12 oz", roast: "Medium-Light", notes: "Caramel, Orange Blossom", rating: 4.7 },
      { id: "bb-3", name: "Kenya AA", origin: "Nyeri, Kenya", price: 26, size: "12 oz", roast: "Medium", notes: "Blackcurrant, Tomato, Honey", rating: 4.9 },
      { id: "bb-4", name: "Sumatra Gayo", origin: "Aceh, Sumatra", price: 20, size: "12 oz", roast: "Dark", notes: "Dark Chocolate, Cedar", rating: 4.6 },
    ],
  },
  {
    id: "monsoon",
    name: "Monsoon Coast",
    tagline: "South Indian monsoon-cured specialties",
    location: "Mangalore, India",
    established: 2019,
    story: "Centuries-old monsoon curing technique meets modern roasting. Our beans rest in coastal humidity for weeks, developing a unique mellow character.",
    featured: true,
    color: "#4A7C6F",
    products: [
      { id: "mc-1", name: "Monsoon Malabar AA", origin: "Karnataka, India", price: 20, size: "12 oz", roast: "Medium", notes: "Earthy, Spiced, Low Acid", rating: 4.5 },
      { id: "mc-2", name: "Kodagu Estate", origin: "Coorg, India", price: 22, size: "12 oz", roast: "Medium-Dark", notes: "Cocoa, Cardamom, Roasted Nuts", rating: 4.6 },
      { id: "mc-3", name: "Baba Budangiri", origin: "Chikmagalur, India", price: 24, size: "12 oz", roast: "Light", notes: "Floral, Citrus, Honey", rating: 4.4 },
    ],
  },
  {
    id: "altitude",
    name: "Altitude Lab",
    tagline: "Experimental microlots from Central America",
    location: "Antigua, Guatemala",
    established: 2021,
    story: "Direct trade with family farms across Guatemala, Costa Rica, and Honduras. We cup every single microlot before it hits the shelf.",
    featured: true,
    color: "#8B4513",
    products: [
      { id: "al-1", name: "Guatemala El Injerto", origin: "Cobán, Guatemala", price: 28, size: "10 oz", roast: "Light", notes: "Wine, Dark Cherry, Cocoa", rating: 4.9 },
      { id: "al-2", name: "Costa Rica La Minita", origin: "Tarrazú, Costa Rica", price: 26, size: "12 oz", roast: "Medium", notes: "Honey, Almond, Bright", rating: 4.8 },
      { id: "al-3", name: "Honduras Las Flores", origin: "Santa Bárbara, Honduras", price: 22, size: "12 oz", roast: "Medium-Light", notes: "Peach, Vanilla, Brown Sugar", rating: 4.7 },
    ],
  },
  {
    id: "ember",
    name: "Ember & Oak",
    tagline: "Wood-fired roasting from the Pacific Northwest",
    location: "Seattle, WA",
    established: 2020,
    story: "We roast over alder and oak fire — not gas. The smoke infusion adds a subtle complexity you can't get any other way. Small batch, big flavor.",
    featured: false,
    color: "#A0522D",
    products: [
      { id: "eo-1", name: "Alder Smoked Blend", origin: "Ethiopia / Colombia", price: 25, size: "12 oz", roast: "Dark", notes: "Smoke, Dark Chocolate, Maple", rating: 4.7 },
      { id: "eo-2", name: "Oak Reserve", origin: "Guatemala, Honduras", price: 30, size: "10 oz", roast: "Medium-Dark", notes: "Toasted Oak, Vanilla, Cherry", rating: 4.8 },
    ],
  },
  {
    id: "sawa",
    name: "Sawa Coffee",
    tagline: "East African direct trade cooperative",
    location: "Nairobi, Kenya",
    established: 2018,
    story: "A woman-owned cooperative working directly with 2,000+ smallholder farmers across Kenya, Ethiopia, and Rwanda. Every purchase funds community programs.",
    featured: false,
    color: "#D4A76A",
    products: [
      { id: "sc-1", name: "Rwanda Nyamasheke", origin: "Nyamasheke, Rwanda", price: 24, size: "12 oz", roast: "Light", notes: "Strawberry, Rose, Earl Grey", rating: 4.9 },
      { id: "sc-2", name: "Ethiopia Guji", origin: "Guji Zone, Ethiopia", price: 26, size: "12 oz", roast: "Light", notes: "Bergamot, Lemon, Honey", rating: 4.8 },
      { id: "sc-3", name: "Kenya Kirinyaga", origin: "Kirinyaga, Kenya", price: 28, size: "12 oz", roast: "Medium", notes: "Tomato, Blackcurrant, Winey", rating: 4.7 },
    ],
  },
]

const allOrigins = [...new Set(roasters.flatMap(r => r.products.map(p => p.origin)))]
const allRoasts = [...new Set(roasters.flatMap(r => r.products.map(p => p.roast)))]

function CartBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#C4956A] text-[#1A0F0A] text-[9px] font-bold flex items-center justify-center">
      {count}
    </span>
  )
}

function RoasterCard({ roaster, onClick }: { roaster: typeof roasters[number]; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative text-left w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: roaster.color }} />
              <h3 className="font-display text-lg text-[#F5EDE0] font-bold">{roaster.name}</h3>
            </div>
            <p className="text-white/40 text-xs">{roaster.tagline}</p>
          </div>
          {roaster.featured && (
            <span className="text-[10px] font-mono text-[#C4956A] tracking-wider border border-[#C4956A]/30 px-2 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-white/30 text-xs mb-4">
          <span className="flex items-center gap-1"><MapPin size={10} />{roaster.location}</span>
          <span>Est. {roaster.established}</span>
          <span>{roaster.products.length} beans</span>
        </div>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
          {roaster.story}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[#C4956A] text-xs font-mono tracking-wider group-hover:gap-3 transition-all flex items-center gap-1">
            View Collection <ArrowRight size={10} />
          </span>
        </div>
      </div>
    </motion.button>
  )
}

function ProductCard({ product, roaster, onAdd }: { product: typeof roasters[number]['products'][number]; roaster: typeof roasters[number]; onAdd: () => void }) {
  const [added, setAdded] = useState(false)
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-[#F5EDE0] font-medium text-sm">{product.name}</h4>
          <p className="text-white/30 text-[10px] font-mono mt-0.5">{product.origin}</p>
        </div>
        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full border ${product.roast === "Light" ? "border-amber-700/40 text-amber-600/80" : product.roast === "Dark" ? "border-stone-700/40 text-stone-400/80" : "border-orange-700/40 text-orange-500/80"}`}>
          {product.roast}
        </span>
      </div>
      <p className="text-white/50 text-xs italic mb-3">{product.notes}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#F5EDE0] font-display font-bold">${product.price}</span>
          <span className="text-white/20 text-[10px]">/ {product.size}</span>
          <span className="flex items-center gap-0.5 text-amber-400/70 text-[10px]">
            <Star size={8} fill="currentColor" />{product.rating}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onAdd(); setAdded(true); setTimeout(() => setAdded(false), 1200) }}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${added ? "bg-green-500/20 text-green-400" : "bg-white/5 text-white/50 hover:bg-[#C4956A]/20 hover:text-[#C4956A]"}`}
        >
          {added ? <Check size={12} /> : <Plus size={12} />}
        </button>
      </div>
    </div>
  )
}

export function CoffeePremium() {
  const [search, setSearch] = useState("")
  const [selectedRoaster, setSelectedRoaster] = useState<string | null>(null)
  const [cart, setCart] = useState<number>(0)
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [roastFilter, setRoastFilter] = useState<string | null>(null)
  const [originFilter, setOriginFilter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return roasters.filter(r => {
      if (selectedRoaster && r.id !== selectedRoaster) return false
      const matchesProducts = r.products.some(p => {
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !r.name.toLowerCase().includes(search.toLowerCase())) return false
        if (roastFilter && p.roast !== roastFilter) return false
        if (originFilter && p.origin !== originFilter) return false
        return true
      })
      if (!search && !roastFilter && !originFilter) return true
      return matchesProducts
    })
  }, [search, selectedRoaster, roastFilter, originFilter])

  return (
    <div className="min-h-dvh bg-[#1A0F0A] text-[#F5EDE0]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A0F0A]/90 backdrop-blur-lg border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/website-new/coffee" className="text-[#C4956A] text-sm tracking-[0.2em] uppercase font-medium">
              ← Birch &amp; Bean
            </a>
            <span className="text-white/10 text-sm">/</span>
            <span className="text-white/40 text-xs tracking-wider uppercase">Marketplace</span>
          </div>
          <div className="flex items-center gap-4">
            {selectedRoaster && (
              <button onClick={() => setSelectedRoaster(null)} className="text-white/30 hover:text-white/60 text-xs tracking-wider uppercase transition-colors">
                All Roasters
              </button>
            )}
            <button className="relative text-white/70 hover:text-white transition-colors" onClick={() => {}}>
              <ShoppingBag size={16} />
              <CartBadge count={cart} />
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero */}
        <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-[10px] font-mono text-[#C4956A] tracking-[2px] uppercase">[ Premium — Marketplace ]</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-center mb-4 max-w-3xl mx-auto">
            Discover the World&apos;s Best Roasters
          </h1>
          <p className="text-white/40 text-center max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            A curated marketplace connecting you with independent roasters from around the globe.
            One cart, one checkout — endless discovery.
          </p>

          {/* Search + Filters */}
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-3">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                type="text"
                placeholder="Search roasters or beans..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full py-3 pl-10 pr-4 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30 transition-colors"
              />
            </div>
            <div className="hidden md:flex items-center justify-center gap-2 flex-wrap">
              <button onClick={() => setRoastFilter(null)} className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all ${!roastFilter ? "bg-white/10 border-white/20 text-white" : "border-white/10 text-white/30 hover:text-white/60"}`}>
                All Roasts
              </button>
              {allRoasts.map(r => (
                <button key={r} onClick={() => setRoastFilter(roastFilter === r ? null : r)} className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all ${roastFilter === r ? "bg-white/10 border-white/20 text-white" : "border-white/10 text-white/30 hover:text-white/60"}`}>
                  {r}
                </button>
              ))}
              <button onClick={() => setShowMobileFilter(!showMobileFilter)} className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 text-white/30 hover:text-white/60 flex items-center gap-1">
                <SlidersHorizontal size={10} /> Origin
              </button>
            </div>
          </div>
        </section>

        {/* Roaster Grid */}
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          {selectedRoaster ? (
            // Single roaster view
            <AnimatePresence mode="wait">
              {(() => {
                const r = roasters.find(x => x.id === selectedRoaster)
                if (!r) return null
                return (
                  <motion.div key={r.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
                    <div className="mb-10">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                        <h2 className="font-display text-3xl font-bold">{r.name}</h2>
                      </div>
                      <p className="text-white/40 text-sm mb-1">{r.tagline}</p>
                      <div className="flex items-center gap-3 text-white/30 text-xs font-mono">
                        <span>{r.location}</span>
                        <span>Est. {r.established}</span>
                        <span>{r.products.length} offerings</span>
                      </div>
                      <p className="text-white/50 text-sm mt-4 max-w-lg leading-relaxed">{r.story}</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {r.products.map(p => (
                        <ProductCard key={p.id} product={p} roaster={r} onAdd={() => setCart(c => c + 1)} />
                      ))}
                    </div>
                  </motion.div>
                )
              })()}
            </AnimatePresence>
          ) : (
            // All roasters
            <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {filtered.map(r => (
                <RoasterCard key={r.id} roaster={r} onClick={() => setSelectedRoaster(r.id)} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Mobile origin filter */}
      <AnimatePresence>
        {showMobileFilter && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-6">
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="bg-[#2A150A] rounded-2xl p-6 w-full max-w-sm border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Filter by Origin</span>
                <button onClick={() => setShowMobileFilter(false)} className="text-white/30 hover:text-white/60"><X size={16} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setOriginFilter(null)} className={`text-xs px-3 py-1.5 rounded-full border ${!originFilter ? "bg-white/10 border-white/20" : "border-white/10 text-white/50"}`}>
                  All
                </button>
                {allOrigins.map(o => (
                  <button key={o} onClick={() => setOriginFilter(originFilter === o ? null : o)} className={`text-xs px-3 py-1.5 rounded-full border ${originFilter === o ? "bg-white/10 border-white/20" : "border-white/10 text-white/50"}`}>
                    {o}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowMobileFilter(false)} className="mt-6 w-full py-2.5 bg-[#C4956A] text-[#1A0F0A] text-sm font-medium tracking-wider uppercase rounded-full">
                Apply
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
