"use client"

import { motion } from "framer-motion"
import ProductCard from "./ProductCard"
import type { Product } from "@/data/products"

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-[#1A0F0A]">No products found</p>
        <p className="text-sm text-[#8B7D73] mt-1">Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}
