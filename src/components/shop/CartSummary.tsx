"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Truck, Percent } from "lucide-react"

export default function CartSummary() {
  const { state, subtotal, shipping, discountAmount, total, dispatch } = useCart()
  const [promoInput, setPromoInput] = useState("")
  const [promoError, setPromoError] = useState(false)
  const [promoApplied, setPromoApplied] = useState(false)

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return
    dispatch({ type: "APPLY_PROMO", payload: promoInput.trim() })
    if (state.promoCode !== promoInput.trim().toUpperCase()) {
      setPromoError(true)
      setPromoApplied(false)
    } else {
      setPromoApplied(true)
      setPromoError(false)
    }
  }

  const freeShippingRemaining = Math.max(0, 50 - subtotal)

  return (
    <div className="bg-[#F5F0EB] rounded-xl p-5 sm:p-6">
      {subtotal < 50 && subtotal > 0 && (
        <div className="flex items-center gap-2 text-xs text-[#8B7D73] mb-4 pb-4 border-b border-[#E8DDD3]">
          <Truck className="w-4 h-4 text-[#C4956A]" />
          <span>
            Add <strong>${freeShippingRemaining.toFixed(2)}</strong> more for free shipping
          </span>
        </div>
      )}

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-[#4A3F3A]">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#4A3F3A]">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-[#4A7C59]">Free</span> : `$${shipping.toFixed(2)}`}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-[#4A7C59]">
            <span>Discount ({state.promoCode})</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-semibold text-[#1A0F0A] text-base pt-2.5 border-t border-[#E8DDD3]">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => {
              setPromoInput(e.target.value)
              setPromoError(false)
              setPromoApplied(false)
            }}
            placeholder="Promo code"
            className="flex-1 px-3 py-2 text-sm border border-[#E8DDD3] rounded-lg bg-white text-[#1A0F0A] placeholder:text-[#8B7D73] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/40"
          />
          <button
            onClick={handleApplyPromo}
            className="px-4 py-2 text-sm font-medium text-[#C4956A] border border-[#C4956A] rounded-lg hover:bg-[#C4956A] hover:text-[#1A0F0A] transition-colors"
          >
            Apply
          </button>
        </div>
        {promoError && (
          <p className="text-xs text-[#C44A4A] mt-1.5">Invalid code. Try BREW10</p>
        )}
        {promoApplied && (
          <p className="text-xs text-[#4A7C59] mt-1.5 flex items-center gap-1">
            <Percent className="w-3 h-3" /> Code applied!
          </p>
        )}
      </div>
    </div>
  )
}
