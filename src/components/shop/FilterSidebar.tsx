"use client"

import { SlidersHorizontal } from "lucide-react"

type FilterState = {
  roastLevel: string[]
  origins: string[]
  minPrice: number
  maxPrice: number
}

type Props = {
  filters: FilterState
  availableOrigins: string[]
  onFilterChange: (filters: FilterState) => void
  onClear: () => void
  onOpenMobile: () => void
}

const roastLevels = ["light", "medium", "dark"]

export default function FilterSidebar({
  filters,
  availableOrigins,
  onFilterChange,
  onClear,
  onOpenMobile,
}: Props) {
  const toggleRoast = (level: string) => {
    const updated = filters.roastLevel.includes(level)
      ? filters.roastLevel.filter((r) => r !== level)
      : [...filters.roastLevel, level]
    onFilterChange({ ...filters, roastLevel: updated })
  }

  const toggleOrigin = (origin: string) => {
    const updated = filters.origins.includes(origin)
      ? filters.origins.filter((o) => o !== origin)
      : [...filters.origins, origin]
    onFilterChange({ ...filters, origins: updated })
  }

  const hasActiveFilters = filters.roastLevel.length > 0 || filters.origins.length > 0

  return (
    <>
      <button
        onClick={onOpenMobile}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-[#E8DDD3] rounded-lg text-sm font-medium text-[#4A3F3A] hover:bg-[#F5F0EB] transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {hasActiveFilters && (
          <span className="w-5 h-5 rounded-full bg-[#C4956A] text-[#1A0F0A] text-xs font-bold flex items-center justify-center">
            {filters.roastLevel.length + filters.origins.length}
          </span>
        )}
      </button>

      <aside className="hidden lg:block w-56 flex-shrink-0">
        <div className="sticky top-24 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#1A0F0A] uppercase tracking-wider">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={onClear}
                className="text-xs text-[#C4956A] hover:text-[#8B6F4C] transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#8B7D73] uppercase tracking-wider mb-2.5">
              Roast Level
            </h4>
            <div className="space-y-1.5">
              {roastLevels.map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.roastLevel.includes(level)}
                    onChange={() => toggleRoast(level)}
                    className="w-4 h-4 rounded border-[#E8DDD3] text-[#C4956A] focus:ring-[#C4956A]"
                  />
                  <span className="text-sm text-[#4A3F3A] capitalize group-hover:text-[#1A0F0A] transition-colors">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-[#8B7D73] uppercase tracking-wider mb-2.5">
              Origin
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {availableOrigins.map((origin) => (
                <label
                  key={origin}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.origins.includes(origin)}
                    onChange={() => toggleOrigin(origin)}
                    className="w-4 h-4 rounded border-[#E8DDD3] text-[#C4956A] focus:ring-[#C4956A]"
                  />
                  <span className="text-sm text-[#4A3F3A] group-hover:text-[#1A0F0A] transition-colors">
                    {origin}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
