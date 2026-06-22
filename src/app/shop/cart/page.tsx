"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import CartItem from "@/components/shop/CartItem"
import CartSummary from "@/components/shop/CartSummary"
import { ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { state, subtotal } = useCart()

  useEffect(() => {
    document.title = "Cart | Birch & Bean"
  }, [])

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-[#F5F0EB] flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-[#8B7D73]" />
        </div>
        <h1 className="text-2xl font-bold text-[#1A0F0A] mb-2">Your cart is empty</h1>
        <p className="text-[#8B7D73] mb-6">Time to fill it with some great coffee.</p>
        <Link
          href="/shop/products"
          className="inline-flex px-6 py-3 bg-[#C4956A] text-[#1A0F0A] font-semibold rounded-lg hover:bg-[#D4A87A] transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] mb-2">
        Cart ({state.items.length})
      </h1>
      <p className="text-[#8B7D73] text-sm mb-8">
        {subtotal < 50
          ? `Add $${(50 - subtotal).toFixed(2)} more for free shipping`
          : "Free shipping on this order!"}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6">
          {state.items.map((item) => (
            <CartItem key={`${item.productId}-${item.weight}`} item={item} />
          ))}
          <div className="mt-4 pt-4 border-t border-[#E8DDD3]">
            <Link
              href="/shop/products"
              className="text-sm text-[#C4956A] hover:text-[#8B6F4C] transition-colors"
            >
              &larr; Continue Shopping
            </Link>
          </div>
        </div>
        <div>
          <CartSummary />
          <Link
            href="/shop/checkout"
            className="block w-full mt-4 py-3 bg-[#C4956A] text-[#1A0F0A] font-semibold text-center rounded-lg hover:bg-[#D4A87A] transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}
