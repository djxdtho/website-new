"use client"

import Navbar from "@/components/shop/Navbar"
import Footer from "@/components/shop/Footer"
import { CartProvider } from "@/context/CartContext"

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#F5F0EB]">
        <Navbar />
        <main className="flex-1 pt-16 sm:pt-20">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  )
}
