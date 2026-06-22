"use client"

import { Minus, Plus } from "lucide-react"

type Props = {
  quantity: number
  min?: number
  max?: number
  onChange: (qty: number) => void
}

export default function QuantitySelector({ quantity, min = 1, max = 99, onChange }: Props) {
  return (
    <div className="inline-flex items-center border border-[#E8DDD3] rounded-lg overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="p-2 hover:bg-[#F5F0EB] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4 text-[#4A3F3A]" />
      </button>
      <span className="w-10 text-center text-sm font-medium text-[#1A0F0A]" aria-live="polite">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="p-2 hover:bg-[#F5F0EB] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 text-[#4A3F3A]" />
      </button>
    </div>
  )
}
