import { products } from "@/data/products"
import ProductDetailClient from "./ProductDetailClient"

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export default function ProductDetailPage() {
  return <ProductDetailClient />
}
