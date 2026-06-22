"use client"

import { useCart } from "@/context/CartContext"
import type { FormData } from "./ShippingForm"

type Props = {
  shippingData: FormData
  onPlaceOrder: () => void
  onBack: () => void
}

export default function OrderReview({ shippingData, onPlaceOrder, onBack }: Props) {
  const { state, subtotal, shipping, discountAmount, total } = useCart()

  return (
    <div className="space-y-6">
      <div className="bg-[#F5F0EB] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#1A0F0A] mb-2">Shipping To</h3>
        <p className="text-sm text-[#4A3F3A]">
          {shippingData.firstName} {shippingData.lastName}
          <br />
          {shippingData.address}
          <br />
          {shippingData.city}, {shippingData.state} {shippingData.zip}
          <br />
          {shippingData.email}
        </p>
      </div>

      <div className="bg-[#F5F0EB] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#1A0F0A] mb-3">Items</h3>
        <div className="space-y-3">
          {state.items.map((item) => (
            <div key={`${item.productId}-${item.weight}`} className="flex items-center justify-between text-sm">
              <span className="text-[#4A3F3A]">
                {item.name} ({item.weight}) &times; {item.quantity}
              </span>
              <span className="font-medium text-[#1A0F0A]">
                ${(item.unitPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-[#E8DDD3] space-y-1.5 text-sm">
          <div className="flex justify-between text-[#4A3F3A]">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#4A3F3A]">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-[#4A7C59]">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-[#1A0F0A] text-base pt-2 border-t border-[#E8DDD3]">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-[#E8DDD3] text-[#4A3F3A] font-medium rounded-lg hover:bg-[#F5F0EB] transition-colors"
        >
          Back
        </button>
        <button
          onClick={onPlaceOrder}
          className="flex-[2] py-3 bg-[#C4956A] text-[#1A0F0A] font-semibold rounded-lg hover:bg-[#D4A87A] transition-colors"
        >
          Place Order
        </button>
      </div>
    </div>
  )
}
