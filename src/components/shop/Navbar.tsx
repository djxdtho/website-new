"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { ShoppingBag, Menu, X } from "lucide-react"

const navLinks = [
  { label: "Shop", href: "/shop/products" },
  { label: "About", href: "/shop/about" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1A0F0A]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/shop"
            className="text-lg sm:text-xl font-semibold tracking-tight text-[#C4956A]"
          >
            Birch<span className="text-white/80">&amp;</span>Bean
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-[#C4956A] transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop/cart"
              className="relative p-2 text-white/70 hover:text-[#C4956A] transition-colors"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#C4956A] text-[#1A0F0A] text-xs font-bold flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/shop/cart"
              className="relative p-2 text-white/70 hover:text-[#C4956A] transition-colors"
              aria-label={`Cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#C4956A] text-[#1A0F0A] text-xs font-bold flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-white/70 hover:text-[#C4956A] transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#1A0F0A]/98 backdrop-blur-md border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-white/70 hover:text-[#C4956A] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
