import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItemType, ProductItem, ProductVariant, Addon } from '../types'
import toast from 'react-hot-toast'

interface CartState {
  items: CartItemType[]
  businessId: string | null
  businessName: string | null
  
  addItem: (product: ProductItem, businessId: string, businessName: string, variant?: ProductVariant | null, addons?: Addon[] | null) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateNote: (productId: string, note: string) => void
  clearCart: () => void
  
  getSubtotal: () => number
  getItemCount: () => number
  getDeliveryFee: () => number
  getTax: () => number
  getTotal: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      businessId: null,
      businessName: null,

      addItem: (product, businessId, businessName, variant, addons) => {
        const { items, businessId: currentBusinessId } = get()

        // If cart has items from different business, ask to clear
        if (currentBusinessId && currentBusinessId !== businessId && items.length > 0) {
          const confirmed = window.confirm(
            `Your cart has items from ${get().businessName}. Do you want to clear it and add items from ${businessName}?`
          )
          if (!confirmed) return
          set({ items: [], businessId: null, businessName: null })
        }

        const existingIndex = items.findIndex(
          (item) => item.productId === product.id && 
                     JSON.stringify(item.variant) === JSON.stringify(variant)
        )

        if (existingIndex > -1) {
          const newItems = [...items]
          newItems[existingIndex].quantity += 1
          set({ items: newItems })
        } else {
          const variantPrice = variant?.price || 0
          const addonsTotal = addons?.reduce((sum, a) => sum + a.price, 0) || 0
          
          const newItem: CartItemType = {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            product: { ...product, price: product.price + variantPrice + addonsTotal },
            quantity: 1,
            variant: variant || null,
            addons: addons || null,
            specialNote: null,
            businessId,
            businessName,
          }
          set({ 
            items: [...items, newItem], 
            businessId, 
            businessName 
          })
        }
        
        toast.success(`${product.name} added to cart! 🛒`)
      },

      removeItem: (productId) => {
        const newItems = get().items.filter((item) => item.productId !== productId)
        if (newItems.length === 0) {
          set({ items: [], businessId: null, businessName: null })
        } else {
          set({ items: newItems })
        }
        toast.success('Item removed from cart')
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        const newItems = get().items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
        set({ items: newItems })
      },

      updateNote: (productId, note) => {
        const newItems = get().items.map((item) =>
          item.productId === productId ? { ...item, specialNote: note } : item
        )
        set({ items: newItems })
      },

      clearCart: () => {
        set({ items: [], businessId: null, businessName: null })
        toast.success('Cart cleared')
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal()
        if (subtotal >= 499) return 0
        if (subtotal >= 199) return 25
        return 40
      },

      getTax: () => {
        return Math.round(get().getSubtotal() * 0.05) // 5% GST
      },

      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee() + get().getTax()
      },
    }),
    {
      name: 'lfi-cart-store',
    }
  )
)
