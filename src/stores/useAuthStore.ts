import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string | null
  email: string
  phone: string | null
  image: string | null
  role: 'CUSTOMER' | 'BUSINESS_OWNER' | 'ADMIN'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setLoading: (isLoading) => set({ isLoading }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'lfi-auth-store',
    }
  )
)
