"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import StepIndicator from "@/components/shop/StepIndicator"
import ShippingForm, { type FormData } from "@/components/shop/ShippingForm"
import OrderReview from "@/components/shop/OrderReview"
import OrderConfirmation from "@/components/shop/OrderConfirmation"

export default function CheckoutPage() {
  const router = useRouter()
  const { state } = useCart()
  const [step, setStep] = useState(1)
  const [shippingData, setShippingData] = useState<FormData | null>(null)

  useEffect(() => {
    document.title = "Checkout | Birch & Bean"
  }, [])

  useEffect(() => {
    if (state.items.length === 0 && step < 3) {
      router.push("/shop/cart")
    }
  }, [state.items, step, router])

  if (state.items.length === 0 && step < 3) return null

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <StepIndicator currentStep={step} />

      {step === 1 && (
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] mb-6">Shipping</h1>
          <ShippingForm
            onSubmit={(data) => {
              setShippingData(data)
              setStep(2)
            }}
          />
        </div>
      )}

      {step === 2 && shippingData && (
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] mb-6">Review Your Order</h1>
          <OrderReview
            shippingData={shippingData}
            onPlaceOrder={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        </div>
      )}

      {step === 3 && <OrderConfirmation />}
    </div>
  )
}
