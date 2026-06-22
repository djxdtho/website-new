"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { products, origins as allOrigins } from "@/data/products"
import ProductGrid from "@/components/shop/ProductGrid"
import FilterSidebar from "@/components/shop/FilterSidebar"
import FilterDrawer from "@/components/shop/FilterDrawer"
import FilterChips from "@/components/shop/FilterChips"

type FilterState = {
  roastLevel: string[]
  origins: string[]
  minPrice: number
  maxPrice: number
}

type SortOption = "name" | "price_asc" | "price_desc" | "newest"

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
]

export default function ProductsContent() {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<FilterState>({
    roastLevel: [],
    origins: [],
    minPrice: 0,
    maxPrice: 200,
  })
  const [sort, setSort] = useState<SortOption>("name")
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  useEffect(() => {
    document.title = "Shop | Birch & Bean"
  }, [])

  useEffect(() => {
    const roast = searchParams.get("roast")
    if (roast && ["light", "medium", "dark"].includes(roast)) {
      setFilters((f) => ({ ...f, roastLevel: [roast] }))
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.roastLevel.length > 0) {
      result = result.filter((p) => filters.roastLevel.includes(p.roastLevel))
    }
    if (filters.origins.length > 0) {
      result = result.filter((p) => filters.origins.includes(p.origin))
    }

    switch (sort) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price_asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        break
    }

    return result
  }, [filters, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A0F0A]">Our Coffee</h1>
        <p className="text-[#8B7D73] mt-1">
          {filtered.length} product{filtered.length !== 1 && "s"}
        </p>
      </motion.div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <FilterSidebar
          filters={filters}
          availableOrigins={allOrigins}
          onFilterChange={setFilters}
          onClear={() => setFilters({ roastLevel: [], origins: [], minPrice: 0, maxPrice: 200 })}
          onOpenMobile={() => setMobileFilterOpen(true)}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-3 py-2.5 text-sm border border-[#E8DDD3] rounded-lg bg-white text-[#4A3F3A] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/40"
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <FilterChips filters={filters} onFilterChange={setFilters} />

      <div className="flex gap-8 mt-6">
        <div className="flex-1">
          <ProductGrid products={filtered} />
        </div>
      </div>

      <FilterDrawer
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        availableOrigins={allOrigins}
        onFilterChange={setFilters}
        onApply={() => setMobileFilterOpen(false)}
      />
    </div>
  )
}
