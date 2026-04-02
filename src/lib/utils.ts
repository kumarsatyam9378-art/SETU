import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatNumber(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`
  if (num >= 100000) return `${(num / 100000).toFixed(1)}L`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

export function getDiscountPercent(mrp: number, price: number): number {
  if (mrp <= 0) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}

export function generateOrderNumber(): string {
  const prefix = 'LFI'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export function getTimeAgo(date: string): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  }
  for (const [key, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value)
    if (interval >= 1) {
      return `${interval} ${key}${interval > 1 ? 's' : ''} ago`
    }
  }
  return 'Just now'
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getDeliveryEstimate(distance: number): string {
  if (distance <= 3) return '15-20 min'
  if (distance <= 7) return '25-35 min'
  if (distance <= 15) return '35-50 min'
  return '50-70 min'
}

export function isBusinessOpen(openingTime: string | null, closingTime: string | null): boolean {
  if (!openingTime || !closingTime) return true
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const [openH, openM] = openingTime.split(':').map(Number)
  const [closeH, closeM] = closingTime.split(':').map(Number)
  
  const openMinutes = openH * 60 + openM
  const closeMinutes = closeH * 60 + closeM
  
  if (closeMinutes < openMinutes) {
    // Crosses midnight
    return currentTime >= openMinutes || currentTime <= closeMinutes
  }
  return currentTime >= openMinutes && currentTime <= closeMinutes
}
