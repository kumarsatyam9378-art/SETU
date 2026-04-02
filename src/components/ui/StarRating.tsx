import { useState } from 'react'
import { cn } from '../../lib/utils'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
  showValue?: boolean
  count?: number
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  showValue = false,
  count,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0)

  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1
          const isActive = starValue <= (hoverRating || rating)
          const isHalf = !isActive && starValue - 0.5 <= rating

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              className={cn(
                'transition-transform',
                interactive && 'cursor-pointer hover:scale-110',
                !interactive && 'cursor-default'
              )}
            >
              <svg
                className={cn(sizes[size], 'transition-colors')}
                viewBox="0 0 24 24"
                fill={isActive ? '#FFB800' : isHalf ? 'url(#half)' : '#E5E7EB'}
                stroke={isActive || isHalf ? '#FFB800' : '#E5E7EB'}
                strokeWidth="0.5"
              >
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#FFB800" />
                    <stop offset="50%" stopColor="#E5E7EB" />
                  </linearGradient>
                </defs>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          )
        })}
      </div>

      {showValue && (
        <span className={cn('font-bold text-gray-800', textSizes[size])}>
          {rating.toFixed(1)}
        </span>
      )}

      {count !== undefined && (
        <span className={cn('text-gray-400', textSizes[size])}>
          ({count})
        </span>
      )}
    </div>
  )
}
