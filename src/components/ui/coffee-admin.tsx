"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import {
  LayoutDashboard, ShoppingBag, Package, Users, UserCheck, BarChart3, Settings,
  Plus, Search, Edit2, Trash2, X, Check, ChevronDown, ChevronUp, MoreHorizontal,
  Star, Filter, ArrowUpDown, Upload, Download, Eye, AlertTriangle,
  Clock, Truck, Flame, Box, BookOpen, ImageIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// ─── Types ───

type RoastLevel = "Light" | "Medium-Light" | "Medium" | "Medium-Dark" | "Dark"
type OrderStatus = "Pending" | "Roasting" | "Packed" | "Shipped" | "Delivered"
type EmployeeRole = "Roaster" | "Barista" | "Manager" | "Delivery" | "Admin"

interface Product {
  id: string; name: string; description: string; price: number; roast: RoastLevel
  origin: string; notes: string; stock: number; lowStock: number; active: boolean
  sizes: { name: string; price: number }[]; image: string; rating: number; createdAt: string
}

interface OrderItem { productId: string; name: string; qty: number; price: number; size: string }
interface Order {
  id: string; customerName: string; customerEmail: string; items: OrderItem[]
  total: number; status: OrderStatus; createdAt: string; shippingAddress: string; notes: string
}

interface EmployeeDocument { name: string; type: "resume" | "cv" | "portfolio" | "other"; url: string }
interface Employee {
  id: string; firstName: string; lastName: string; email: string; phone: string
  age: number; address: string; role: EmployeeRole; salary: number; startDate: string
  documents: EmployeeDocument[]; active: boolean
}

interface Customer {
  id: string; name: string; email: string; phone: string; address: string
  totalSpent: number; orderCount: number; createdAt: string; orders: Order[]
}

// ─── Mock Data ───

const mockProducts: Product[] = [
  { id: "p1", name: "Ethiopian Yirgacheffe", description: "Bright, complex single-origin from the birthplace of coffee.", price: 22, roast: "Light", origin: "Yirgacheffe, Ethiopia", notes: "Blueberry, Jasmine, Dark Cocoa", stock: 45, lowStock: 10, active: true, sizes: [{ name: "8 oz", price: 18 }, { name: "12 oz", price: 22 }, { name: "16 oz", price: 28 }], image: "", rating: 4.8, createdAt: "2024-01-15" },
  { id: "p2", name: "Colombia El Paraiso", description: "Smooth washed process from the Huila region.", price: 24, roast: "Medium-Light", origin: "Huila, Colombia", notes: "Caramel, Orange Blossom, Honey", stock: 32, lowStock: 10, active: true, sizes: [{ name: "8 oz", price: 20 }, { name: "12 oz", price: 24 }, { name: "16 oz", price: 30 }], image: "", rating: 4.7, createdAt: "2024-02-10" },
  { id: "p3", name: "Kenya AA", description: "Bold, winey profile from the Nyeri region.", price: 26, roast: "Medium", origin: "Nyeri, Kenya", notes: "Blackcurrant, Tomato, Honey", stock: 28, lowStock: 8, active: true, sizes: [{ name: "8 oz", price: 22 }, { name: "12 oz", price: 26 }, { name: "16 oz", price: 32 }], image: "", rating: 4.9, createdAt: "2024-03-05" },
  { id: "p4", name: "Sumatra Gayo", description: "Full-bodied, earthy with low acidity.", price: 20, roast: "Dark", origin: "Aceh, Sumatra", notes: "Dark Chocolate, Cedar, Tobacco", stock: 50, lowStock: 10, active: true, sizes: [{ name: "8 oz", price: 16 }, { name: "12 oz", price: 20 }, { name: "16 oz", price: 26 }], image: "", rating: 4.6, createdAt: "2024-01-20" },
  { id: "p5", name: "Guatemala El Injerto", description: "Award-winning microlot from Cobán.", price: 28, roast: "Light", origin: "Cobán, Guatemala", notes: "Wine, Dark Cherry, Cocoa Nibs", stock: 15, lowStock: 5, active: true, sizes: [{ name: "8 oz", price: 24 }, { name: "10 oz", price: 28 }, { name: "12 oz", price: 34 }], image: "", rating: 4.9, createdAt: "2024-04-01" },
  { id: "p6", name: "Monsoon Malabar", description: "Monsoon-cured for a mellow, smooth cup.", price: 20, roast: "Medium", origin: "Karnataka, India", notes: "Earthy, Spiced, Low Acid", stock: 8, lowStock: 10, active: true, sizes: [{ name: "12 oz", price: 20 }, { name: "16 oz", price: 26 }], image: "", rating: 4.5, createdAt: "2024-02-25" },
  { id: "p7", name: "Honduras Las Flores", description: "Bright, fruity lot from Santa Bárbara.", price: 22, roast: "Medium-Light", origin: "Santa Bárbara, Honduras", notes: "Peach, Vanilla, Brown Sugar", stock: 0, lowStock: 5, active: false, sizes: [{ name: "12 oz", price: 22 }], image: "", rating: 4.7, createdAt: "2024-03-15" },
]

const mockOrders: Order[] = [
  { id: "ORD-001", customerName: "Sarah Chen", customerEmail: "sarah@example.com", items: [{ productId: "p1", name: "Ethiopian Yirgacheffe", qty: 2, price: 22, size: "12 oz" }, { productId: "p4", name: "Sumatra Gayo", qty: 1, price: 20, size: "12 oz" }], total: 64, status: "Delivered", createdAt: "2024-05-10", shippingAddress: "123 Main St, Portland, OR 97201", notes: "Leave at front door" },
  { id: "ORD-002", customerName: "Marcus Williams", customerEmail: "marcus@example.com", items: [{ productId: "p3", name: "Kenya AA", qty: 3, price: 26, size: "12 oz" }], total: 78, status: "Shipped", createdAt: "2024-05-12", shippingAddress: "456 Oak Ave, Seattle, WA 98101", notes: "" },
  { id: "ORD-003", customerName: "Emily Rodriguez", customerEmail: "emily@example.com", items: [{ productId: "p2", name: "Colombia El Paraiso", qty: 1, price: 24, size: "12 oz" }, { productId: "p5", name: "Guatemala El Injerto", qty: 1, price: 28, size: "10 oz" }, { productId: "p5", name: "Guatemala El Injerto", qty: 1, price: 34, size: "12 oz" }], total: 86, status: "Roasting", createdAt: "2024-05-14", shippingAddress: "789 Pine St, San Francisco, CA 94102", notes: "Gift wrap please" },
  { id: "ORD-004", customerName: "James Kim", customerEmail: "james@example.com", items: [{ productId: "p1", name: "Ethiopian Yirgacheffe", qty: 1, price: 28, size: "16 oz" }], total: 28, status: "Pending", createdAt: "2024-05-15", shippingAddress: "321 Elm St, Austin, TX 78701", notes: "" },
  { id: "ORD-005", customerName: "Lisa Thompson", customerEmail: "lisa@example.com", items: [{ productId: "p6", name: "Monsoon Malabar", qty: 2, price: 20, size: "12 oz" }, { productId: "p3", name: "Kenya AA", qty: 1, price: 32, size: "16 oz" }], total: 72, status: "Packed", createdAt: "2024-05-13", shippingAddress: "654 Maple Dr, Chicago, IL 60601", notes: "Ring bell" },
]

const mockEmployees: Employee[] = [
  { id: "e1", firstName: "Jake", lastName: "Torres", email: "jake@birchbean.com", phone: "503-555-0101", age: 34, address: "210 Roastery Ln, Portland, OR 97202", role: "Roaster", salary: 62000, startDate: "2023-06-01", documents: [{ name: "Resume 2024", type: "resume", url: "" }, { name: "Roasting Cert", type: "cv", url: "" }], active: true },
  { id: "e2", firstName: "Maya", lastName: "Patel", email: "maya@birchbean.com", phone: "503-555-0102", age: 28, address: "455 Brew Ave, Portland, OR 97203", role: "Barista", salary: 38000, startDate: "2024-01-15", documents: [{ name: "Barista Portfolio", type: "portfolio", url: "" }], active: true },
  { id: "e3", firstName: "David", lastName: "Okonkwo", email: "david@birchbean.com", phone: "503-555-0103", age: 42, address: "88 Cherry St, Portland, OR 97204", role: "Manager", salary: 75000, startDate: "2023-03-10", documents: [{ name: "CV", type: "cv", url: "" }, { name: "Management Cert", type: "other", url: "" }], active: true },
  { id: "e4", firstName: "Priya", lastName: "Singh", email: "priya@birchbean.com", phone: "503-555-0104", age: 25, address: "120 Hazel Rd, Portland, OR 97205", role: "Delivery", salary: 35000, startDate: "2024-02-20", documents: [], active: true },
  { id: "e5", firstName: "Tom", lastName: "Grayson", email: "tom@birchbean.com", phone: "503-555-0105", age: 55, address: "7 River Rd, Portland, OR 97206", role: "Admin", salary: 82000, startDate: "2022-09-01", documents: [{ name: "Full CV", type: "resume", url: "" }], active: false },
]

const mockCustomers: Customer[] = [
  { id: "c1", name: "Sarah Chen", email: "sarah@example.com", phone: "503-555-1001", address: "123 Main St, Portland, OR 97201", totalSpent: 284, orderCount: 4, createdAt: "2024-01-10", orders: mockOrders.filter(o => o.customerEmail === "sarah@example.com") },
  { id: "c2", name: "Marcus Williams", email: "marcus@example.com", phone: "206-555-2001", address: "456 Oak Ave, Seattle, WA 98101", totalSpent: 156, orderCount: 2, createdAt: "2024-02-15", orders: mockOrders.filter(o => o.customerEmail === "marcus@example.com") },
  { id: "c3", name: "Emily Rodriguez", email: "emily@example.com", phone: "415-555-3001", address: "789 Pine St, San Francisco, CA 94102", totalSpent: 412, orderCount: 5, createdAt: "2023-11-20", orders: mockOrders.filter(o => o.customerEmail === "emily@example.com") },
  { id: "c4", name: "James Kim", email: "james@example.com", phone: "512-555-4001", address: "321 Elm St, Austin, TX 78701", totalSpent: 88, orderCount: 3, createdAt: "2024-03-05", orders: mockOrders.filter(o => o.customerEmail === "james@example.com") },
  { id: "c5", name: "Lisa Thompson", email: "lisa@example.com", phone: "773-555-5001", address: "654 Maple Dr, Chicago, IL 60601", totalSpent: 210, orderCount: 3, createdAt: "2024-01-25", orders: mockOrders.filter(o => o.customerEmail === "lisa@example.com") },
]

// ─── Helpers ───

const statusIcon: Record<OrderStatus, typeof Flame> = { Pending: Clock, Roasting: Flame, Packed: Box, Shipped: Truck, Delivered: Check }
const statusColor: Record<OrderStatus, string> = { Pending: "text-yellow-400/80", Roasting: "text-orange-400/80", Packed: "text-blue-400/80", Shipped: "text-purple-400/80", Delivered: "text-green-400/80" }
const statusBg: Record<OrderStatus, string> = { Pending: "bg-yellow-500/10", Roasting: "bg-orange-500/10", Packed: "bg-blue-500/10", Shipped: "bg-purple-500/10", Delivered: "bg-green-500/10" }

function formatCurrency(n: number) { return `$${n.toFixed(2)}` }

// ─── Toast ───

function Toast({ message, show, onClose }: { message: string; show: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed bottom-6 right-6 z-[100] bg-green-500/20 border border-green-500/30 text-green-300 px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 backdrop-blur-lg">
          <Check size={14} /> {message}
          <button onClick={onClose} className="ml-2 text-green-300/50 hover:text-green-300"><X size={12} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Confirm Dialog ───

function ConfirmDialog({ open, title, message, onConfirm, onCancel }: { open: boolean; title: string; message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-[#2A150A] border border-white/[0.06] rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-display font-bold text-[#F5EDE0] mb-2">{title}</h3>
            <p className="text-white/50 text-sm mb-6">{message}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={onCancel} className="px-4 py-2 text-sm text-white/50 hover:text-white/80 transition-colors">Cancel</button>
              <button onClick={() => { onConfirm(); onCancel() }} className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/30 transition-colors">Confirm</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Select ───

function Select({ value, onChange, options, className }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; className?: string }) {
  return (
    <div className={`relative ${className || ""}`}>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="appearance-none w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 pr-8 text-sm text-[#F5EDE0] focus:outline-none focus:border-[#C4956A]/30 transition-colors cursor-pointer"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30" />
    </div>
  )
}

// ─── Image Upload ───

function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return
    const reader = new FileReader()
    reader.onload = e => onChange(e.target?.result as string || "")
    reader.readAsDataURL(file)
  }, [onChange])

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-white/[0.08] group">
          <img src={value} alt="Preview" className="w-full aspect-[3/2] object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button type="button" onClick={() => inputRef.current?.click()} className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-[10px] text-white font-mono hover:bg-white/20 transition-colors">
              Change
            </button>
            <button type="button" onClick={() => onChange("")} className="px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-lg text-[10px] text-red-300 font-mono hover:bg-red-500/30 transition-colors">
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); e.stopPropagation() }}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
          className="border border-dashed border-white/[0.08] rounded-lg p-6 text-center cursor-pointer hover:border-[#C4956A]/30 hover:bg-white/[0.02] transition-all group"
        >
          <ImageIcon size={20} className="mx-auto text-white/20 group-hover:text-[#C4956A]/60 transition-colors mb-2" />
          <p className="text-xs text-white/30 group-hover:text-white/50 transition-colors">Drop an image or click to upload</p>
          <p className="text-[10px] text-white/20 mt-1">PNG, JPG, WebP — or paste a URL below</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }} className="hidden" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Or paste image URL..." className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30 transition-colors" />
    </div>
  )
}

// ─── Sidebar ───

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: ShoppingBag },
  { id: "orders", label: "Orders", icon: Package },
  { id: "employees", label: "Employees", icon: UserCheck },
  { id: "customers", label: "Customers", icon: Users },
  { id: "inventory", label: "Inventory", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

function Sidebar({ active, setActive, collapsed, setCollapsed }: { active: string; setActive: (s: string) => void; collapsed: boolean; setCollapsed: (s: boolean) => void }) {
  return (
    <aside className={`fixed left-0 top-0 bottom-0 z-40 bg-[#150B05]/95 backdrop-blur-xl border-r border-white/[0.04] transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}>
      <div className="flex items-center gap-3 px-4 h-14 border-b border-white/[0.04]">
        <div className="w-7 h-7 rounded-lg bg-[#C4956A] flex items-center justify-center text-[#1A0F0A] text-xs font-bold shrink-0">B</div>
        {!collapsed && <span className="font-display font-bold text-sm text-[#F5EDE0] tracking-wide">Admin</span>}
      </div>
      <nav className="p-2 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button key={item.id} onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all ${
                isActive ? "bg-[#C4956A]/15 text-[#C4956A]" : "text-white/30 hover:text-white/60 hover:bg-white/[0.03]"
              }`}
            >
              <Icon size={16} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>
      <button onClick={() => setCollapsed(!collapsed)} className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 hover:text-white/40 transition-colors">
        <ChevronDown size={14} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
      </button>
    </aside>
  )
}

// ─── Dashboard ───

function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string | number; sub?: string; icon: any; color: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/30 text-[10px] font-mono tracking-wider uppercase">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
          <Icon size={14} className="text-white" />
        </div>
      </div>
      <div className="font-display text-2xl font-bold text-[#F5EDE0]">{value}</div>
      {sub && <p className="text-white/25 text-[10px] font-mono mt-1">{sub}</p>}
    </div>
  )
}

function Dashboard({ products, orders, employees, customers }: { products: Product[]; orders: Order[]; employees: Employee[]; customers: Customer[] }) {
  const activeProducts = products.filter(p => p.active).length
  const lowStock = products.filter(p => p.active && p.stock <= p.lowStock).length
  const totalRevenue = orders.filter(o => o.status === "Delivered").reduce((s, o) => s + o.total, 0)
  const pending = orders.filter(o => o.status === "Pending").length
  const monthlyRevenue = totalRevenue // simplified

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-[#F5EDE0]">Dashboard</h1>
        <p className="text-white/30 text-sm mt-1">Your roastery at a glance</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} sub="All time delivered orders" icon={ShoppingBag} color="bg-emerald-500/20" />
        <StatCard label="Active Products" value={activeProducts} sub={`${lowStock} low stock alerts`} icon={BarChart3} color="bg-[#C4956A]/20" />
        <StatCard label="Pending Orders" value={pending} sub="Awaiting processing" icon={Clock} color="bg-yellow-500/20" />
        <StatCard label="Employees" value={employees.filter(e => e.active).length} sub={`${employees.length} total on payroll`} icon={UserCheck} color="bg-blue-500/20" />
        <StatCard label="Customers" value={customers.length} sub={`${customers.reduce((s, c) => s + c.orderCount, 0)} total orders`} icon={Users} color="bg-purple-500/20" />
        <StatCard label="Monthly Revenue" value={formatCurrency(monthlyRevenue)} sub="Current month" icon={TrendingUp} color="bg-orange-500/20" />
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="font-display font-bold text-[#F5EDE0] mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 4).map(o => {
              const SIcon = statusIcon[o.status]
              return (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div>
                    <p className="text-sm text-[#F5EDE0] font-medium">{o.customerName}</p>
                    <p className="text-[10px] text-white/30 font-mono">{o.id} — {o.items.length} item(s)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#F5EDE0] text-sm font-mono">{formatCurrency(o.total)}</span>
                    <span className={`flex items-center gap-1 text-[10px] font-mono ${statusColor[o.status]} ${statusBg[o.status]} px-2 py-0.5 rounded-full`}>
                      <SIcon size={10} /> {o.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="font-display font-bold text-[#F5EDE0] mb-4">Low Stock Alert</h3>
          {products.filter(p => p.active && p.stock <= p.lowStock).length === 0 ? (
            <p className="text-white/30 text-sm">All products are well-stocked.</p>
          ) : (
            <div className="space-y-3">
              {products.filter(p => p.active && p.stock <= p.lowStock).map(p => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={12} className="text-orange-400" />
                    <div>
                      <p className="text-sm text-[#F5EDE0]">{p.name}</p>
                      <p className="text-[10px] text-white/30 font-mono">{p.origin}</p>
                    </div>
                  </div>
                  <span className="text-orange-400 text-sm font-mono">{p.stock} / {p.lowStock}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const TrendingUp = BarChart3

// ─── Products ───

const emptyProduct = (): Product => ({
  id: "", name: "", description: "", price: 0, roast: "Medium", origin: "", notes: "", stock: 0,
  lowStock: 10, active: true, sizes: [{ name: "12 oz", price: 0 }], image: "", rating: 0, createdAt: new Date().toISOString().slice(0, 10)
})

function ProductsSection({ products, setProducts, onToast }: { products: Product[]; setProducts: (p: Product[]) => void; onToast: (m: string) => void }) {
  const [search, setSearch] = useState("")
  const [roastFilter, setRoastFilter] = useState<RoastLevel | "all">("all")
  const [editing, setEditing] = useState<Product | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.origin.toLowerCase().includes(search.toLowerCase())) return false
      if (roastFilter !== "all" && p.roast !== roastFilter) return false
      return true
    })
  }, [products, search, roastFilter])

  function save(p: Product) {
    if (p.id) {
      setProducts(products.map(x => x.id === p.id ? p : x))
      onToast("Product updated")
    } else {
      setProducts([...products, { ...p, id: `p${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) }])
      onToast("Product created")
    }
    setEditing(null); setShowForm(false)
  }

  function remove(id: string) {
    setProducts(products.filter(p => p.id !== id))
    onToast("Product deleted")
    setConfirmDelete(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#F5EDE0]">Products</h1>
          <p className="text-white/30 text-sm mt-1">{products.length} products total</p>
        </div>
        <button onClick={() => { setEditing(emptyProduct()); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 bg-[#C4956A] text-[#1A0F0A] text-xs font-mono font-bold tracking-wider rounded-xl hover:bg-[#C4956A]/90 transition-colors">
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg py-2 pl-8 pr-3 text-xs text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30 transition-colors" />
        </div>
        {(["all", "Light", "Medium-Light", "Medium", "Medium-Dark", "Dark"] as const).map(r => (
          <button key={r} onClick={() => setRoastFilter(r)} className={`text-[10px] font-mono px-2.5 py-1.5 rounded-lg border transition-all ${roastFilter === r ? "bg-white/10 border-white/20 text-white" : "border-white/[0.06] text-white/30 hover:text-white/60"}`}>
            {r === "all" ? "All" : r}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/[0.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.04] text-white/30 text-[10px] font-mono tracking-wider uppercase">
                <th className="text-left px-4 py-3 font-normal">Product</th>
                <th className="text-left px-4 py-3 font-normal">Price</th>
                <th className="text-left px-4 py-3 font-normal">Roast</th>
                <th className="text-left px-4 py-3 font-normal">Stock</th>
                <th className="text-left px-4 py-3 font-normal">Rating</th>
                <th className="text-right px-4 py-3 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg border border-white/[0.06] overflow-hidden bg-white/[0.04] flex-shrink-0">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px]">
                            {p.name.slice(0, 2)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-[#F5EDE0] text-sm font-medium">{p.name}</p>
                        <p className="text-white/25 text-[10px] font-mono">{p.origin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#F5EDE0] font-mono text-sm">${p.price}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${p.roast === "Light" ? "bg-amber-500/10 text-amber-400/80" : p.roast === "Dark" ? "bg-stone-500/10 text-stone-400/80" : "bg-orange-500/10 text-orange-400/80"}`}>
                      {p.roast}
                    </span>
                  </td>
                  <td className={`px-4 py-3 font-mono text-sm ${p.stock <= p.lowStock ? "text-orange-400" : "text-white/50"}`}>
                    {p.stock}
                  </td>
                  <td className="px-4 py-3 text-amber-400/70 text-sm flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> {p.rating}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setEditing(p); setShowForm(true) }} className="p-1.5 text-white/30 hover:text-white/70 transition-colors"><Edit2 size={12} /></button>
                      <button onClick={() => { setEditing(p); setShowForm(true) }} className="p-1.5 text-white/30 hover:text-white/70 transition-colors"><Eye size={12} /></button>
                      <button onClick={() => setConfirmDelete(p.id)} className="p-1.5 text-red-400/50 hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog open={!!confirmDelete} title="Delete Product?" message="This action cannot be undone." onConfirm={() => confirmDelete && remove(confirmDelete)} onCancel={() => setConfirmDelete(null)} />

      <AnimatePresence>
        {showForm && (
          <ProductForm product={editing || emptyProduct()} onSave={save} onClose={() => { setShowForm(false); setEditing(null) }} />
        )}
      </AnimatePresence>
    </div>
  )
}

function ProductForm({ product, onSave, onClose }: { product: Product; onSave: (p: Product) => void; onClose: () => void }) {
  const [form, setForm] = useState(product)

  const set = useCallback(<K extends keyof Product>(key: K, value: Product[K]) => setForm(f => ({ ...f, [key]: value })), [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#2A150A] border border-white/[0.06] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg font-bold text-[#F5EDE0]">{form.id ? "Edit Product" : "New Product"}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X size={16} /></button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Name *</label>
              <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Product name" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={2} placeholder="Brief description" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30 resize-none" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Base Price *</label>
              <input type="number" value={form.price || ""} onChange={e => set("price", Number(e.target.value))} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Roast Level</label>
              <Select value={form.roast} onChange={v => set("roast", v as RoastLevel)} options={(["Light", "Medium-Light", "Medium", "Medium-Dark", "Dark"] as const).map(r => ({ value: r, label: r }))} />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Origin *</label>
              <input value={form.origin} onChange={e => set("origin", e.target.value)} placeholder="Region, Country" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Tasting Notes</label>
              <input value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="Flavor, Aroma, Finish" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Product Image</label>
              <ImageUpload value={form.image} onChange={v => set("image", v)} />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Stock</label>
              <input type="number" value={form.stock} onChange={e => set("stock", Number(e.target.value))} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Low Stock At</label>
              <input type="number" value={form.lowStock} onChange={e => set("lowStock", Number(e.target.value))} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Cup Sizes</label>
              {form.sizes.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={s.name} onChange={e => { const ns = [...form.sizes]; ns[i] = { ...ns[i], name: e.target.value }; set("sizes", ns) }} placeholder="Size name" className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
                  <input type="number" value={s.price || ""} onChange={e => { const ns = [...form.sizes]; ns[i] = { ...ns[i], price: Number(e.target.value) }; set("sizes", ns) }} placeholder="Price" className="w-24 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-xs text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
                  {form.sizes.length > 1 && <button onClick={() => set("sizes", form.sizes.filter((_, j) => j !== i))} className="p-2 text-red-400/50 hover:text-red-400"><X size={12} /></button>}
                </div>
              ))}
              <button onClick={() => set("sizes", [...form.sizes, { name: "", price: 0 }])} className="text-[10px] font-mono text-[#C4956A]/60 hover:text-[#C4956A] flex items-center gap-1">
                <Plus size={10} /> Add size
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
          <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={e => set("active", e.target.checked)} className="accent-[#C4956A]" />
            Active
          </label>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-xs text-white/40 hover:text-white/70 transition-colors">Cancel</button>
            <button onClick={() => form.name && form.origin ? (onSave(form), onClose()) : null} className="px-5 py-2 bg-[#C4956A] text-[#1A0F0A] text-xs font-mono font-bold tracking-wider rounded-xl hover:bg-[#C4956A]/90 transition-colors">
              {form.id ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Orders ───

function OrdersSection({ orders, setOrders, onToast }: { orders: Order[]; setOrders: (o: Order[]) => void; onToast: (m: string) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<OrderStatus | "all">("all")

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter)
  const statuses: (OrderStatus | "all")[] = ["all", "Pending", "Roasting", "Packed", "Shipped", "Delivered"]

  function advance(id: string) {
    const flow: OrderStatus[] = ["Pending", "Roasting", "Packed", "Shipped", "Delivered"]
    setOrders(orders.map(o => {
      if (o.id !== id) return o
      const idx = flow.indexOf(o.status)
      return idx < flow.length - 1 ? { ...o, status: flow[idx + 1] } : o
    }))
    onToast("Order status updated")
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[#F5EDE0]">Orders</h1>
        <p className="text-white/30 text-sm mt-1">{orders.length} orders total</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`text-[10px] font-mono px-2.5 py-1.5 rounded-lg border transition-all ${filter === s ? "bg-white/10 border-white/20 text-white" : "border-white/[0.06] text-white/30 hover:text-white/60"}`}>
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map(o => {
          const SIcon = statusIcon[o.status]
          const isExpanded = expanded === o.id
          return (
            <div key={o.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <button onClick={() => setExpanded(isExpanded ? null : o.id)} className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-[#F5EDE0] font-medium">{o.customerName}</p>
                    <p className="text-[10px] text-white/30 font-mono">{o.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[#F5EDE0] text-sm font-mono">{formatCurrency(o.total)}</span>
                  <span className={`flex items-center gap-1 text-[10px] font-mono ${statusColor[o.status]} ${statusBg[o.status]} px-2 py-0.5 rounded-full`}>
                    <SIcon size={10} /> {o.status}
                  </span>
                  <span className="text-white/20 text-[10px] font-mono">{o.createdAt}</span>
                  {isExpanded ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/[0.04] pt-4">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-1">Customer</p>
                      <p className="text-sm text-[#F5EDE0]">{o.customerName}</p>
                      <p className="text-xs text-white/40">{o.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-1">Shipping</p>
                      <p className="text-sm text-[#F5EDE0]">{o.shippingAddress}</p>
                      {o.notes && <p className="text-xs text-white/40 italic mt-1">"{o.notes}"</p>}
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-2">Items</p>
                  <div className="space-y-2 mb-4">
                    {o.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-white/50 font-mono text-xs">{item.qty}×</span>
                          <span className="text-[#F5EDE0]">{item.name}</span>
                          <span className="text-white/30 text-[10px] font-mono">({item.size})</span>
                        </div>
                        <span className="text-[#F5EDE0] font-mono text-xs">{formatCurrency(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <span className="text-sm text-white/50">Total</span>
                    <span className="text-lg font-display font-bold text-[#F5EDE0]">{formatCurrency(o.total)}</span>
                  </div>
                  {o.status !== "Delivered" && (
                    <button onClick={() => advance(o.id)} className="mt-4 w-full py-2 bg-white/5 border border-white/[0.08] rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/[0.08] transition-all font-mono tracking-wider uppercase">
                      Advance to {({ Pending: "Roasting", Roasting: "Packed", Packed: "Shipped", Shipped: "Delivered" } as Record<OrderStatus, string>)[o.status]}
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Employees ───

const emptyEmployee = (): Employee => ({
  id: "", firstName: "", lastName: "", email: "", phone: "", age: 0, address: "",
  role: "Barista", salary: 0, startDate: new Date().toISOString().slice(0, 10), documents: [], active: true
})

function EmployeesSection({ employees, setEmployees, onToast }: { employees: Employee[]; setEmployees: (e: Employee[]) => void; onToast: (m: string) => void }) {
  const [editing, setEditing] = useState<Employee | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = employees.filter(e => {
    if (!search) return true
    const q = search.toLowerCase()
    return e.firstName.toLowerCase().includes(q) || e.lastName.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)
  })

  function save(e: Employee) {
    if (!e.firstName || !e.lastName || !e.email || e.age <= 0) {
      onToast("Please fill all required fields")
      return
    }
    if (e.id) {
      setEmployees(employees.map(x => x.id === e.id ? e : x))
      onToast("Employee updated")
    } else {
      setEmployees([...employees, { ...e, id: `e${Date.now()}` }])
      onToast("Employee added")
    }
    setEditing(null); setShowForm(false)
  }

  function remove(id: string) {
    setEmployees(employees.filter(e => e.id !== id))
    onToast("Employee removed")
    setConfirmDelete(null)
  }

  const roles: EmployeeRole[] = ["Roaster", "Barista", "Manager", "Delivery", "Admin"]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-[#F5EDE0]">Employees</h1>
          <p className="text-white/30 text-sm mt-1">{employees.filter(e => e.active).length} active · {employees.length} total</p>
        </div>
        <button onClick={() => { setEditing(emptyEmployee()); setShowForm(true) }} className="flex items-center gap-2 px-4 py-2 bg-[#C4956A] text-[#1A0F0A] text-xs font-mono font-bold tracking-wider rounded-xl hover:bg-[#C4956A]/90 transition-colors">
          <Plus size={14} /> Add Employee
        </button>
      </div>

      <div className="relative max-w-xs mb-6">
        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
        <input type="text" placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg py-2 pl-8 pr-3 text-xs text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(e => (
          <div key={e.id} className={`rounded-xl border ${e.active ? "border-white/[0.06]" : "border-white/[0.03]"} bg-white/[0.02] p-5 ${e.active ? "" : "opacity-50"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C4956A]/20 flex items-center justify-center text-[#C4956A] font-display font-bold text-sm">
                  {e.firstName[0]}{e.lastName[0]}
                </div>
                <div>
                  <p className="text-sm text-[#F5EDE0] font-medium">{e.firstName} {e.lastName}</p>
                  <p className="text-[10px] text-white/30 font-mono">{e.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(e); setShowForm(true) }} className="p-1.5 text-white/30 hover:text-white/70"><Edit2 size={11} /></button>
                <button onClick={() => setConfirmDelete(e.id)} className="p-1.5 text-red-400/50 hover:text-red-400"><Trash2 size={11} /></button>
              </div>
            </div>
            <div className="space-y-1 text-xs text-white/40">
              <p>{e.email}</p>
              <p>{e.phone}</p>
              <p>{e.address}</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.04] mt-2">
                <span className="text-[#F5EDE0] font-mono text-sm font-bold">${e.salary.toLocaleString()}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/30">Age {e.age}</span>
                {e.documents.length > 0 && (
                  <>
                    <span className="text-white/30">·</span>
                    <span className="text-white/40">{e.documents.length} doc(s)</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog open={!!confirmDelete} title="Remove Employee?" message="This will permanently delete their record." onConfirm={() => confirmDelete && remove(confirmDelete)} onCancel={() => setConfirmDelete(null)} />

      <AnimatePresence>
        {showForm && (
          <EmployeeForm employee={editing || emptyEmployee()} roles={roles} onSave={save} onClose={() => { setShowForm(false); setEditing(null) }} />
        )}
      </AnimatePresence>
    </div>
  )
}

function EmployeeForm({ employee, roles, onSave, onClose }: { employee: Employee; roles: EmployeeRole[]; onSave: (e: Employee) => void; onClose: () => void }) {
  const [form, setForm] = useState(employee)

  const set = <K extends keyof Employee>(key: K, value: Employee[K]) => setForm(f => ({ ...f, [key]: value }))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[#2A150A] border border-white/[0.06] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg font-bold text-[#F5EDE0]">{form.id ? "Edit Employee" : "New Employee"}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white/60"><X size={16} /></button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">First Name *</label>
              <input value={form.firstName} onChange={e => set("firstName", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Last Name *</label>
              <input value={form.lastName} onChange={e => set("lastName", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Email *</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Phone *</label>
              <input value={form.phone} onChange={e => set("phone", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Age *</label>
              <input type="number" value={form.age || ""} onChange={e => set("age", Number(e.target.value))} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Address *</label>
              <input value={form.address} onChange={e => set("address", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Role</label>
              <Select value={form.role} onChange={v => set("role", v as EmployeeRole)} options={roles.map(r => ({ value: r, label: r }))} />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Annual Salary *</label>
              <input type="number" value={form.salary || ""} onChange={e => set("salary", Number(e.target.value))} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Documents</label>
              <div className="border border-dashed border-white/[0.08] rounded-lg p-4 text-center">
                <Upload size={16} className="mx-auto text-white/20 mb-2" />
                <p className="text-xs text-white/30">Upload Resume, CV, or Portfolio</p>
                <p className="text-[10px] text-white/20 mt-1">PDF, DOC, or links supported</p>
                <button className="mt-2 text-[10px] font-mono text-[#C4956A]/60 hover:text-[#C4956A] border border-[#C4956A]/30 px-3 py-1 rounded-lg transition-colors">
                  Choose Files
                </button>
              </div>
              {form.documents.length > 0 && (
                <div className="mt-2 space-y-1">
                  {form.documents.map((d, i) => (
                    <div key={i} className="flex items-center justify-between text-xs text-white/40 py-1">
                      <span>{d.name}</span>
                      <button onClick={() => set("documents", form.documents.filter((_, j) => j !== i))} className="text-red-400/50 hover:text-red-400"><X size={10} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
          <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={e => set("active", e.target.checked)} className="accent-[#C4956A]" />
            Active
          </label>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 text-xs text-white/40 hover:text-white/70 transition-colors">Cancel</button>
            <button onClick={() => onSave(form)} className="px-5 py-2 bg-[#C4956A] text-[#1A0F0A] text-xs font-mono font-bold tracking-wider rounded-xl hover:bg-[#C4956A]/90 transition-colors">
              {form.id ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Customers ───

function CustomersSection({ customers }: { customers: Customer[] }) {
  const [search, setSearch] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = customers.filter(c => {
    if (!search) return true
    const q = search.toLowerCase()
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  })

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[#F5EDE0]">Customers</h1>
        <p className="text-white/30 text-sm mt-1">{customers.length} registered customers</p>
      </div>
      <div className="relative max-w-xs mb-6">
        <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
        <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg py-2 pl-8 pr-3 text-xs text-[#F5EDE0] placeholder:text-white/20 focus:outline-none focus:border-[#C4956A]/30" />
      </div>
      <div className="space-y-3">
        {filtered.map(c => {
          const isExpanded = expanded === c.id
          return (
            <div key={c.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <button onClick={() => setExpanded(isExpanded ? null : c.id)} className="w-full flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center text-xs text-white/50 font-mono">
                    {c.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-[#F5EDE0] font-medium">{c.name}</p>
                    <p className="text-[10px] text-white/30 font-mono">{c.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-[#F5EDE0] font-mono">{formatCurrency(c.totalSpent)}</p>
                    <p className="text-[10px] text-white/30">{c.orderCount} orders</p>
                  </div>
                  {isExpanded ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
                </div>
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/[0.04] pt-4">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-1">Contact</p>
                      <p className="text-sm text-[#F5EDE0]">{c.email}</p>
                      <p className="text-xs text-white/40">{c.phone}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-1">Address</p>
                      <p className="text-sm text-[#F5EDE0]">{c.address}</p>
                      <p className="text-xs text-white/40">Customer since {c.createdAt}</p>
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-2">Order History</p>
                  {c.orders.length === 0 ? (
                    <p className="text-xs text-white/30">No orders yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {c.orders.map(o => (
                        <div key={o.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0 text-sm">
                          <div className="flex items-center gap-3">
                            <p className="text-[#F5EDE0]">{o.id}</p>
                            <span className={`flex items-center gap-1 text-[10px] font-mono ${statusColor[o.status]} ${statusBg[o.status]} px-2 py-0.5 rounded-full`}>
                              {o.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-white/40">
                            <span>{o.createdAt}</span>
                            <span className="text-[#F5EDE0] font-mono">{formatCurrency(o.total)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Inventory ───

function InventorySection({ products, setProducts, onToast }: { products: Product[]; setProducts: (p: Product[]) => void; onToast: (m: string) => void }) {
  const [showRestock, setShowRestock] = useState<string | null>(null)
  const [restockQty, setRestockQty] = useState(0)

  function restock(id: string) {
    if (restockQty <= 0) return
    setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock + restockQty } : p))
    onToast(`Restocked +${restockQty}`)
    setShowRestock(null); setRestockQty(0)
  }

  const sorted = [...products].sort((a, b) => a.stock - b.stock)

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[#F5EDE0]">Inventory</h1>
        <p className="text-white/30 text-sm mt-1">Track stock levels across all products</p>
      </div>
      <div className="space-y-2">
        {sorted.map(p => {
          const isLow = p.stock <= p.lowStock
          const isOut = p.stock === 0
          return (
            <div key={p.id} className={`rounded-xl border ${isOut ? "border-red-500/20 bg-red-500/5" : isLow ? "border-orange-500/20 bg-orange-500/5" : "border-white/[0.06] bg-white/[0.02]"} p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div>
                    <p className="text-sm text-[#F5EDE0] font-medium">{p.name}</p>
                    <p className="text-[10px] text-white/30 font-mono">{p.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className={`text-lg font-display font-bold ${isOut ? "text-red-400" : isLow ? "text-orange-400" : "text-[#F5EDE0]"}`}>{p.stock}</span>
                    <span className="text-white/20 text-xs ml-1">/ {p.lowStock}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-white/30">{p.roast}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setShowRestock(p.id); setRestockQty(0) }} className="px-3 py-1.5 bg-white/5 border border-white/[0.08] rounded-lg text-[10px] text-white/50 hover:text-white hover:bg-white/[0.08] transition-all font-mono flex items-center gap-1">
                      <Plus size={10} /> Restock
                    </button>
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {showRestock === p.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="flex items-center gap-3 pt-3 mt-3 border-t border-white/[0.04]">
                      <input type="number" value={restockQty || ""} onChange={e => setRestockQty(Number(e.target.value))} placeholder="Qty" className="w-24 bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-[#F5EDE0] placeholder:text-white/20 focus:outline-none" />
                      <button onClick={() => restock(p.id)} className="px-3 py-1.5 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg text-[10px] font-mono hover:bg-green-500/30 transition-colors">Confirm</button>
                      <button onClick={() => setShowRestock(null)} className="px-3 py-1.5 text-white/30 hover:text-white/60 text-[10px]">Cancel</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Settings ───

function SettingsSection({ onToast }: { onToast: (m: string) => void }) {
  const [form, setForm] = useState({
    storeName: "Birch & Bean",
    storeEmail: "hello@birchbean.com",
    currency: "USD",
    taxRate: "8.5",
    shippingFlatRate: "5.00",
    lowStockThreshold: "10",
    timezone: "America/Los_Angeles",
    socialInstagram: "@birchbeancoffee",
    socialTwitter: "@birchbean",
    about: "Portland's finest single-origin roaster. Small batch, big flavor."
  })

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[#F5EDE0]">Settings</h1>
        <p className="text-white/30 text-sm mt-1">Manage your roastery configuration</p>
      </div>
      <div className="max-w-2xl space-y-6">
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="font-display font-bold text-[#F5EDE0] text-sm mb-4">Store Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Store Name</label>
              <input value={form.storeName} onChange={e => set("storeName", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Store Email</label>
              <input value={form.storeEmail} onChange={e => set("storeEmail", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] focus:outline-none focus:border-[#C4956A]/30" />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">About</label>
              <textarea value={form.about} onChange={e => set("about", e.target.value)} rows={2} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] focus:outline-none focus:border-[#C4956A]/30 resize-none" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="font-display font-bold text-[#F5EDE0] text-sm mb-4">Pricing & Shipping</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Currency</label>
              <Select value={form.currency} onChange={v => set("currency", v)} options={[{ value: "USD", label: "USD" }, { value: "EUR", label: "EUR" }, { value: "GBP", label: "GBP" }]} />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Tax Rate (%)</label>
              <input value={form.taxRate} onChange={e => set("taxRate", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Flat Shipping ($)</label>
              <input value={form.shippingFlatRate} onChange={e => set("shippingFlatRate", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <h3 className="font-display font-bold text-[#F5EDE0] text-sm mb-4">Social & Preferences</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Instagram</label>
              <input value={form.socialInstagram} onChange={e => set("socialInstagram", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Twitter / X</label>
              <input value={form.socialTwitter} onChange={e => set("socialTwitter", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Timezone</label>
              <Select value={form.timezone} onChange={v => set("timezone", v)} options={[{ value: "America/Los_Angeles", label: "America/Los_Angeles" }, { value: "America/New_York", label: "America/New_York" }, { value: "America/Chicago", label: "America/Chicago" }, { value: "Europe/London", label: "Europe/London" }]} />
            </div>
            <div>
              <label className="text-[10px] font-mono text-white/40 tracking-wider uppercase block mb-1.5">Low Stock Threshold</label>
              <input value={form.lowStockThreshold} onChange={e => set("lowStockThreshold", e.target.value)} className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-[#F5EDE0] focus:outline-none" />
            </div>
          </div>
        </div>
        <button onClick={() => onToast("Settings saved")} className="px-5 py-2 bg-[#C4956A] text-[#1A0F0A] text-xs font-mono font-bold tracking-wider rounded-xl hover:bg-[#C4956A]/90 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  )
}

// ─── Main Admin Panel ───

export function CoffeeAdmin() {
  const [active, setActive] = useState("dashboard")
  const [collapsed, setCollapsed] = useState(false)
  const [toast, setToast] = useState({ show: false, message: "" })
  const [products, setProducts] = useState(mockProducts)
  const [orders, setOrders] = useState(mockOrders)
  const [employees, setEmployees] = useState(mockEmployees)

  const showToast = (message: string) => {
    setToast({ show: true, message })
    setTimeout(() => setToast({ show: false, message: "" }), 2500)
  }

  return (
    <div className="min-h-dvh bg-[#1A0F0A] text-[#F5EDE0]">
      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`transition-all duration-300 ${collapsed ? "ml-16" : "ml-56"}`}>
        {/* Top bar */}
        <header className="h-14 border-b border-white/[0.04] flex items-center justify-between px-6 bg-[#1A0F0A]/80 backdrop-blur-lg sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/20 tracking-wider uppercase">
              {active === "dashboard" ? "Overview" : active.charAt(0).toUpperCase() + active.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/website-new/coffee" className="text-[10px] font-mono text-white/30 hover:text-white/60 transition-colors tracking-wider uppercase">
              ← Back to Site
            </a>
          </div>
        </header>

        <main className="p-6 md:p-8 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
              {active === "dashboard" && <Dashboard products={products} orders={orders} employees={employees} customers={mockCustomers} />}
              {active === "products" && <ProductsSection products={products} setProducts={setProducts} onToast={showToast} />}
              {active === "orders" && <OrdersSection orders={orders} setOrders={setOrders} onToast={showToast} />}
              {active === "employees" && <EmployeesSection employees={employees} setEmployees={setEmployees} onToast={showToast} />}
              {active === "customers" && <CustomersSection customers={mockCustomers} />}
              {active === "inventory" && <InventorySection products={products} setProducts={setProducts} onToast={showToast} />}
              {active === "settings" && <SettingsSection onToast={showToast} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: "" })} />
    </div>
  )
}
