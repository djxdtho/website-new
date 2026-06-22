"use client"

import Link from "next/link"
import { ShoppingBag, Star } from "lucide-react"
import { useCart } from "@/context/CartContext"
import type { Product } from "@/data/products"

const roastColors: Record<string, string> = {
  light: "bg-amber-200 text-amber-900",
  medium: "bg-orange-200 text-orange-900",
  dark: "bg-red-200 text-red-900",
}

export default function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        name: product.name,
        image: product.images[0],
        weight: product.availableWeights[0].label,
        weightGrams: product.availableWeights[0].grams,
        unitPrice: product.price + product.availableWeights[0].priceAdjust,
        quantity: 1,
      },
    })
  }

  return (
    <Link
      href={`/shop/products/${product.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#F5F0EB]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${roastColors[product.roastLevel]}`}
          >
            {product.roastLevel}
          </span>
          <div className="flex items-center gap-1 text-sm text-[#8B7D73]">
            <Star className="w-3.5 h-3.5 fill-[#C4956A] text-[#C4956A]" />
            <span className="text-xs">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-semibold text-[#1A0F0A] text-base sm:text-lg">{product.name}</h3>
        <p className="text-xs sm:text-sm text-[#8B7D73] mt-0.5">{product.origin}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-[#1A0F0A]">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 text-sm font-medium text-[#C4956A] hover:text-[#8B6F4C] transition-colors"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </Link>
  )
}
