import type { Metadata } from "next"
import { CoffeeAdmin } from "@/components/ui/coffee-admin"

export const metadata: Metadata = {
  title: "Admin Panel | Birch & Bean",
  description: "Full-featured coffee roastery admin panel — manage products, orders, employees, customers, inventory, and settings.",
}

export default function AdminPage() {
  return <CoffeeAdmin />
}
