"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

type FilterState = {
  roastLevel: string[]
  origins: string[]
  minPrice: number
  maxPrice: number
}

type Props = {
  open: boolean
  onClose: () => void
  filters: FilterState
  availableOrigins: string[]
  onFilterChange: (filters: FilterState) => void
  onApply: () => void
}

const roastLevels = ["light", "medium", "dark"]

export default function FilterDrawer({
  open,
  onClose,
  filters,
  availableOrigins,
  onFilterChange,
  onApply,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

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

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 lg:hidden max-h-[80vh] overflow-y-auto ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-5 pb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A0F0A]">Filters</h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#F5F0EB] rounded-lg transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-[#4A3F3A]" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold text-[#8B7D73] uppercase tracking-wider mb-2.5">
                Roast Level
              </h4>
              <div className="flex flex-wrap gap-2">
                {roastLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => toggleRoast(level)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.roastLevel.includes(level)
                        ? "bg-[#C4956A] text-[#1A0F0A]"
                        : "bg-[#F5F0EB] text-[#4A3F3A] hover:bg-[#E8DDD3]"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-[#8B7D73] uppercase tracking-wider mb-2.5">
                Origin
              </h4>
              <div className="flex flex-wrap gap-2">
                {availableOrigins.map((origin) => (
                  <button
                    key={origin}
                    onClick={() => toggleOrigin(origin)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.origins.includes(origin)
                        ? "bg-[#C4956A] text-[#1A0F0A]"
                        : "bg-[#F5F0EB] text-[#4A3F3A] hover:bg-[#E8DDD3]"
                    }`}
                  >
                    {origin}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onApply}
            className="w-full mt-6 py-3 bg-[#C4956A] text-[#1A0F0A] font-semibold rounded-lg hover:bg-[#D4A87A] transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  )
}
