import { cn } from '../../lib/utils'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
}

export default function Skeleton({
  className,
  variant = 'text',
  width,
  height,
}: SkeletonProps) {
  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-xl',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variants[variant],
        className
      )}
      style={{ width, height }}
    />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <Skeleton variant="rectangular" className="w-full h-48" />
      <div className="p-4 space-y-3">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-1/2 h-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="w-16 h-6" />
          <Skeleton className="w-20 h-8 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function RestaurantCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <Skeleton variant="rectangular" className="w-full h-44" />
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="w-40 h-6" />
          <Skeleton className="w-12 h-6 rounded-lg" />
        </div>
        <Skeleton className="w-32 h-4" />
        <div className="flex gap-4">
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
    </div>
  )
}
