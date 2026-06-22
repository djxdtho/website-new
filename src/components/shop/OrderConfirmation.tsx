"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

export default function OrderConfirmation() {
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    const num = `BB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    setOrderNumber(num)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4A7C59] flex items-center justify-center mb-6"
      >
        <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </motion.div>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] mb-2">Order Confirmed!</h1>
      <p className="text-[#8B7D73] mb-6 max-w-md">
        Thank you for your order. You&apos;ll receive a confirmation email shortly with tracking details.
      </p>

      {orderNumber && (
        <div className="bg-[#F5F0EB] rounded-xl px-6 py-4 mb-8">
          <p className="text-xs text-[#8B7D73] uppercase tracking-wider mb-1">Order Number</p>
          <p className="text-lg font-mono font-bold text-[#1A0F0A]">{orderNumber}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/shop/products"
          className="px-8 py-3 bg-[#C4956A] text-[#1A0F0A] font-semibold rounded-lg hover:bg-[#D4A87A] transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/shop"
          className="px-8 py-3 border border-[#E8DDD3] text-[#4A3F3A] font-medium rounded-lg hover:bg-[#F5F0EB] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
