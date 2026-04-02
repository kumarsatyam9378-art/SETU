import { create } from 'zustand'
import { BusinessProfile, ProductItem, BusinessCategory } from '../types'

interface BusinessState {
  businesses: BusinessProfile[]
  products: ProductItem[]
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchBusinesses: (category?: BusinessCategory) => void
  getBusinessById: (id: string) => BusinessProfile | undefined
  getProductsByBusinessId: (businessId: string) => ProductItem[]
}

// Empty initial state until real data is fetched
const MOCK_BUSINESSES: BusinessProfile[] = []

const MOCK_PRODUCTS: ProductItem[] = []

export const useBusinessStore = create<BusinessState>((set, get) => ({
  businesses: MOCK_BUSINESSES,
  products: MOCK_PRODUCTS,
  isLoading: false,
  error: null,

  fetchBusinesses: (category) => {
    set({ isLoading: true })
    // Simulate API call
    setTimeout(() => {
      set({ 
        businesses: category ? MOCK_BUSINESSES.filter(b => b.category === category) : MOCK_BUSINESSES,
        isLoading: false 
      })
    }, 500)
  },

  getBusinessById: (id) => {
    return get().businesses.find(b => b.id === id)
  },

  getProductsByBusinessId: (businessId) => {
    return get().products.filter(p => p.business?.id === businessId)
  }
}))
