export type BusinessCategory = 
  | 'FOOD_RESTAURANT'
  | 'HEALTHCARE'
  | 'BEAUTY_WELLNESS'
  | 'EDUCATION'
  | 'FITNESS_SPORTS'
  | 'RETAIL_SHOPPING'
  | 'HOME_SERVICES'
  | 'TRANSPORT_AUTO'
  | 'REAL_ESTATE'
  | 'TECHNOLOGY_IT'
  | 'FINANCE_LEGAL'
  | 'AGRICULTURE'
  | 'HOSPITALITY_EVENTS'
  | 'MANUFACTURING_B2B'
  | 'DIGITAL_ONLINE';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'COD' | 'UPI' | 'CARD' | 'WALLET' | 'NET_BANKING' | 'EMI';

// ============ CATEGORY CONFIG TYPES ============
export interface CategoryConfig {
  id: BusinessCategory
  name: string
  nameHi: string
  icon: string
  emoji: string
  color: string
  bgColor: string
  gradient: string
  description: string
  descriptionHi: string
  subCategories: SubCategory[]
  uiInspiration: string
  heroImage: string
}

export interface SubCategory {
  id: string
  name: string
  nameHi: string
  icon: string
}

// ============ BUSINESS TYPES ============
export interface BusinessProfile {
  id: string
  name: string
  slug: string
  description: string | null
  category: BusinessCategory
  subCategory: string | null
  phone: string
  email: string | null
  address: string
  city: string
  state: string
  logo: string | null
  coverImage: string | null
  photos: string[]
  isActive: boolean
  isVerified: boolean
  isFeatured: boolean
  openingTime: string | null
  closingTime: string | null
  avgRating: number
  totalRatings: number
  totalOrders: number
  avgDeliveryTime: number | null
  minOrderAmount: number | null
}

// ============ PRODUCT TYPES ============
export interface ProductItem {
  id: string
  name: string
  description: string | null
  price: number
  mrp: number | null
  discountPercent: number | null
  images: string[]
  isVeg: boolean | null
  isNonVeg: boolean | null
  isBestseller: boolean
  isAvailable: boolean
  stock: number
  category: string | null
  preparationTime: number | null
  calories: number | null
  allergens: string[]
  variants: ProductVariant[] | null
  attributes: Record<string, string> | null
  business?: BusinessProfile
}

export interface ProductVariant {
  name: string
  price: number
  isAvailable?: boolean
}

// ============ CART TYPES ============
export interface CartItemType {
  id: string
  productId: string
  product: ProductItem
  quantity: number
  variant: ProductVariant | null
  addons: Addon[] | null
  specialNote: string | null
  businessId: string
  businessName: string
}

export interface Addon {
  name: string
  price: number
}

// ============ ORDER TYPES ============
export interface OrderType {
  id: string
  orderNumber: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod | null
  subtotal: number
  deliveryFee: number
  discount: number
  tax: number
  total: number
  items: OrderItemType[]
  business: BusinessProfile
  address: AddressType | null
  customerNote: string | null
  createdAt: string
  deliveredAt: string | null
  trackingUpdates: TrackingUpdate[] | null
}

export interface OrderItemType {
  id: string
  name: string
  price: number
  quantity: number
  variant: ProductVariant | null
}

export interface TrackingUpdate {
  status: string
  timestamp: string
  message: string
}

export interface AddressType {
  id: string
  label: string
  fullAddress: string
  landmark: string | null
  city: string
  state: string
  pincode: string
  latitude: number | null
  longitude: number | null
  isDefault: boolean
}

// ============ REVIEW TYPES ============
export interface ReviewType {
  id: string
  rating: number
  title: string | null
  comment: string | null
  images: string[]
  reply: string | null
  isVerified: boolean
  user: {
    name: string | null
    image: string | null
  }
  createdAt: string
}

// ============ FILTER TYPES ============
export interface FilterOptions {
  search?: string
  category?: string
  subCategory?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sortBy?: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'distance' | 'newest'
  isVeg?: boolean
  isOpen?: boolean
  freeDelivery?: boolean
  hasOffer?: boolean
  city?: string
  page?: number
  limit?: number
}

// ============ DASHBOARD TYPES ============
export interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  avgOrderValue: number
  totalCustomers: number
  todayOrders: number
  todayRevenue: number
  pendingOrders: number
  avgRating: number
  revenueData: { date: string; revenue: number }[]
  ordersByStatus: { status: string; count: number }[]
  topProducts: { name: string; orders: number; revenue: number }[]
  recentOrders: OrderType[]
}

// ============ LANGUAGE ============
export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'kn' | 'ml' | 'pa'

export interface LanguageOption {
  code: Language
  name: string
  nativeName: string
  flag: string
}
