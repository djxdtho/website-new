"use client"

import Link from "next/link"
import { getFeaturedProducts } from "@/data/products"
import ProductCard from "./ProductCard"

export default function FeaturedRoasts() {
  const products = getFeaturedProducts().slice(0, 4)

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A]">Best Sellers</h2>
            <p className="text-[#8B7D73] text-sm sm:text-base mt-1">Our most-loved roasts, curated for you</p>
          </div>
          <Link
            href="/shop/products"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#C4956A] hover:text-[#8B6F4C] transition-colors"
          >
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/shop/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#C4956A] hover:text-[#8B6F4C] transition-colors"
          >
            View All &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
