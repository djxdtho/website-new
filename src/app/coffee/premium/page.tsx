import type { Metadata } from "next"
import { CoffeePremium } from "@/components/ui/coffee-premium"

export const metadata: Metadata = {
  title: "Marketplace | Premium Roasters",
  description: "A curated multi-roaster coffee marketplace — discover independent craft roasters from around the world.",
}

export default function PremiumCoffeePage() {
  return <CoffeePremium />
}
