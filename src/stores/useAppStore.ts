import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Language, LanguageOption } from '../types'

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
]

interface AppState {
  language: Language
  role: 'customer' | 'business' | null
  hasVisited: boolean
  isLandingComplete: boolean
  city: string | null
  latitude: number | null
  longitude: number | null
  
  setLanguage: (lang: Language) => void
  setRole: (role: 'customer' | 'business' | null) => void
  setHasVisited: (val: boolean) => void
  setLandingComplete: (val: boolean) => void
  setLocation: (city: string, lat: number, lng: number) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      language: 'en',
      role: null,
      hasVisited: false,
      isLandingComplete: false,
      city: null,
      latitude: null,
      longitude: null,

      setLanguage: (language) => set({ language }),
      setRole: (role) => set({ role }),
      setHasVisited: (hasVisited) => set({ hasVisited }),
      setLandingComplete: (isLandingComplete) => set({ isLandingComplete }),
      setLocation: (city, latitude, longitude) => set({ city, latitude, longitude }),
    }),
    {
      name: 'lfi-app-store',
    }
  )
)
