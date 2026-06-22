"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Star, ShoppingBag, ChevronDown } from "lucide-react"
import { getProductById, products } from "@/data/products"
import { useCart } from "@/context/CartContext"
import QuantitySelector from "@/components/shop/QuantitySelector"
import ProductCard from "@/components/shop/ProductCard"

export default function ProductDetailClient() {
  const params = useParams()
  const { dispatch } = useCart()
  const product = getProductById(params.id as string)

  const [quantity, setQuantity] = useState(1)
  const [selectedWeight, setSelectedWeight] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description")
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (product) document.title = `${product.name} | Birch & Bean`
  }, [product])

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-[#1A0F0A]">Product not found</h1>
        <Link href="/shop/products" className="text-[#C4956A] hover:underline mt-2 inline-block">
          &larr; Back to Shop
        </Link>
      </div>
    )
  }

  const weight = product.availableWeights[selectedWeight]
  const unitPrice = product.price + weight.priceAdjust
  const related = products.filter((p) => p.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        name: product.name,
        image: product.images[0],
        weight: weight.label,
        weightGrams: weight.grams,
        unitPrice,
        quantity,
      },
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const accordionItems = [
    { id: "description", title: "Description" },
    { id: "brewing", title: "Brewing Guide" },
    { id: "shipping", title: "Shipping & Returns" },
  ]

  const accordionContent: Record<string, string> = {
    description: product.description,
    brewing:
      "For best results, use water at 200\u00b0F (93\u00b0C) with a 1:16 coffee-to-water ratio. Grind to a medium-fine consistency and steep for 3\u20134 minutes. Adjust to taste.",
    shipping:
      "Free shipping on orders over $50. Orders are roasted and shipped within 48 hours. We offer free returns within 30 days of delivery.",
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link
        href="/shop/products"
        className="inline-flex items-center gap-1.5 text-sm text-[#8B7D73] hover:text-[#C4956A] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      >
        <div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F0EB] mb-3">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === i ? "border-[#C4956A]" : "border-transparent"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
            {product.roastLevel}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A0F0A] mt-3">{product.name}</h1>
          <p className="text-[#8B7D73] text-sm mt-1">
            {product.origin} &middot; {product.region}
          </p>

          <div className="flex items-center gap-1.5 mt-3">
            <Star className="w-4 h-4 fill-[#C4956A] text-[#C4956A]" />
            <span className="font-medium text-[#1A0F0A] text-sm">{product.rating}</span>
            <span className="text-[#8B7D73] text-xs">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-[#4A3F3A] text-sm mt-2">{product.shortDescription}</p>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            {product.tastingNotes.map((note) => (
              <span
                key={note}
                className="px-3 py-1 bg-[#C4956A]/10 text-[#8B6F4C] rounded-full text-xs font-medium"
              >
                {note}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-semibold text-[#8B7D73] uppercase tracking-wider mb-2">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              {product.availableWeights.map((w, i) => (
                <button
                  key={w.label}
                  onClick={() => setSelectedWeight(i)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedWeight === i
                      ? "bg-[#1A0F0A] text-white"
                      : "bg-[#F5F0EB] text-[#4A3F3A] hover:bg-[#E8DDD3]"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-end gap-4 flex-wrap">
            <div>
              <p className="text-2xl font-bold text-[#1A0F0A]">${unitPrice.toFixed(2)}</p>
            </div>
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <button
              onClick={handleAdd}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                added
                  ? "bg-[#4A7C59] text-white"
                  : "bg-[#C4956A] text-[#1A0F0A] hover:bg-[#D4A87A]"
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 p-4 bg-[#F5F0EB] rounded-xl">
            <div>
              <p className="text-[10px] text-[#8B7D73] uppercase tracking-wider">Altitude</p>
              <p className="text-sm font-medium text-[#1A0F0A] mt-0.5">{product.specs.altitude}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#8B7D73] uppercase tracking-wider">Process</p>
              <p className="text-sm font-medium text-[#1A0F0A] mt-0.5">{product.specs.process}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#8B7D73] uppercase tracking-wider">Producer</p>
              <p className="text-sm font-medium text-[#1A0F0A] mt-0.5">{product.specs.producer}</p>
            </div>
          </div>

          <div className="mt-8 space-y-1">
            {accordionItems.map((item) => (
              <div key={item.id} className="border-b border-[#E8DDD3]">
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === item.id ? null : item.id)
                  }
                  className="flex items-center justify-between w-full py-3 text-sm font-medium text-[#1A0F0A] hover:text-[#C4956A] transition-colors"
                  aria-expanded={activeAccordion === item.id}
                >
                  {item.title}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === item.id && (
                  <p className="pb-4 text-sm text-[#4A3F3A] leading-relaxed">
                    {accordionContent[item.id]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A0F0A] mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
