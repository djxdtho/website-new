"use client"

import { Check } from "lucide-react"

const steps = ["Shipping", "Review", "Confirmation"]

type Props = {
  currentStep: number
}

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      {steps.map((label, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isComplete = stepNum < currentStep

        return (
          <div key={label} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  isComplete
                    ? "bg-[#C4956A] text-[#1A0F0A]"
                    : isActive
                      ? "bg-[#C4956A] text-[#1A0F0A]"
                      : "bg-[#E8DDD3] text-[#8B7D73]"
                }`}
              >
                {isComplete ? <Check className="w-4 h-4" /> : stepNum}
              </div>
              <span
                className={`text-sm hidden sm:inline ${
                  isActive ? "text-[#1A0F0A] font-medium" : "text-[#8B7D73]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 ${
                  isComplete ? "bg-[#C4956A]" : "bg-[#E8DDD3]"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
