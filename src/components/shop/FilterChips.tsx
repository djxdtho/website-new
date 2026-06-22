"use client"

import { X } from "lucide-react"

type FilterState = {
  roastLevel: string[]
  origins: string[]
  minPrice: number
  maxPrice: number
}

type Props = {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
}

export default function FilterChips({ filters, onFilterChange }: Props) {
  const hasActive = filters.roastLevel.length > 0 || filters.origins.length > 0
  if (!hasActive) return null

  const removeRoast = (level: string) => {
    onFilterChange({
      ...filters,
      roastLevel: filters.roastLevel.filter((r) => r !== level),
    })
  }

  const removeOrigin = (origin: string) => {
    onFilterChange({
      ...filters,
      origins: filters.origins.filter((o) => o !== origin),
    })
  }

  const clearAll = () => {
    onFilterChange({ roastLevel: [], origins: [], minPrice: 0, maxPrice: 200 })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.roastLevel.map((level) => (
        <span
          key={level}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C4956A]/10 text-[#8B6F4C] rounded-full text-xs font-medium"
        >
          {level}
          <button
            onClick={() => removeRoast(level)}
            className="hover:text-[#1A0F0A] transition-colors"
            aria-label={`Remove ${level} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {filters.origins.map((origin) => (
        <span
          key={origin}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C4956A]/10 text-[#8B6F4C] rounded-full text-xs font-medium"
        >
          {origin}
          <button
            onClick={() => removeOrigin(origin)}
            className="hover:text-[#1A0F0A] transition-colors"
            aria-label={`Remove ${origin} filter`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={clearAll}
        className="text-xs text-[#8B7D73] hover:text-[#1A0F0A] transition-colors underline"
      >
        Clear all
      </button>
    </div>
  )
}
