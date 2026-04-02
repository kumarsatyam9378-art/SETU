import React from 'react';
import { cn } from '../../lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'veg' | 'nonveg' | 'offer'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    veg: 'bg-green-100 text-green-700 border border-green-300',
    nonveg: 'bg-red-100 text-red-700 border border-red-300',
    offer: 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-semibold rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {variant === 'veg' && (
        <span className="w-2.5 h-2.5 border border-green-600 rounded-sm flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
        </span>
      )}
      {variant === 'nonveg' && (
        <span className="w-2.5 h-2.5 border border-red-600 rounded-sm flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
        </span>
      )}
      {children}
    </span>
  )
}
