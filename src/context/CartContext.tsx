"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"

export type CartItem = {
  productId: string
  name: string
  image: string
  weight: string
  weightGrams: number
  unitPrice: number
  quantity: number
}

type CartState = {
  items: CartItem[]
  promoCode: string | null
  discount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; weight: string } }
  | { type: "UPDATE_QTY"; payload: { productId: string; weight: string; quantity: number } }
  | { type: "APPLY_PROMO"; payload: string }
  | { type: "CLEAR_PROMO" }
  | { type: "CLEAR_CART" }

const PROMO_CODES: Record<string, number> = {
  BREW10: 0.1,
  FREESHIP: 0,
}

const STORAGE_KEY = "birch-bean-cart"

function loadCart(): CartState {
  if (typeof window === "undefined") return { items: [], promoCode: null, discount: 0 }
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return { items: [], promoCode: null, discount: 0 }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (i) => i.productId === action.payload.productId && i.weight === action.payload.weight
      )
      if (existingIndex >= 0) {
        const updated = [...state.items]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.payload.quantity,
        }
        return { ...state, items: updated }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.productId === action.payload.productId && i.weight === action.payload.weight)
        ),
      }
    case "UPDATE_QTY": {
      if (action.payload.quantity < 1) return state
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId && i.weight === action.payload.weight
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      }
    }
    case "APPLY_PROMO": {
      const code = action.payload.toUpperCase()
      if (code in PROMO_CODES) {
        return { ...state, promoCode: code, discount: PROMO_CODES[code] }
      }
      return state
    }
    case "CLEAR_PROMO":
      return { ...state, promoCode: null, discount: 0 }
    case "CLEAR_CART":
      return { items: [], promoCode: null, discount: 0 }
    default:
      return state
  }
}

type CartContextType = {
  state: CartState
  dispatch: React.Dispatch<CartAction>
  itemCount: number
  subtotal: number
  shipping: number
  discountAmount: number
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, null, loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 5.99
  const discountAmount = state.discount === 0 ? 0 : subtotal * state.discount
  const total = Math.max(0, subtotal - discountAmount + shipping)

  return (
    <CartContext.Provider
      value={{ state, dispatch, itemCount, subtotal, shipping, discountAmount, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
