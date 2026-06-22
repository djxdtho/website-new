"use client"

import { Trash2 } from "lucide-react"
import { useCart } from "@/context/CartContext"
import QuantitySelector from "./QuantitySelector"
import type { CartItem as CartItemType } from "@/context/CartContext"

export default function CartItem({ item }: { item: CartItemType }) {
  const { dispatch } = useCart()

  return (
    <div className="flex items-start gap-4 py-5 border-b border-[#E8DDD3] last:border-b-0">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#F5F0EB] flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium text-[#1A0F0A] text-sm sm:text-base truncate">{item.name}</h3>
            <p className="text-xs text-[#8B7D73] mt-0.5">{item.weight}</p>
          </div>
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_ITEM",
                payload: { productId: item.productId, weight: item.weight },
              })
            }
            className="p-1 hover:bg-red-50 rounded transition-colors flex-shrink-0"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 className="w-4 h-4 text-[#C44A4A]" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(qty) =>
              dispatch({
                type: "UPDATE_QTY",
                payload: { productId: item.productId, weight: item.weight, quantity: qty },
              })
            }
          />
          <span className="font-semibold text-[#1A0F0A] text-sm">
            ${(item.unitPrice * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
