import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Badge from '../ui/Badge'
import StarRating from '../ui/StarRating'
import { formatPrice } from '../../lib/utils'

interface RestaurantCardProps {
  id: string
  name: string
  image: string
  cuisines: string[]
  rating: number
  reviewCount: number
  deliveryTime: string
  deliveryFee: number
  minOrder: number
  offer?: string
  isPromoted?: boolean
  isClosed?: boolean
}

export function RestaurantCard({
  id,
  name,
  image,
  cuisines,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  minOrder,
  offer,
  isPromoted,
  isClosed,
}: RestaurantCardProps) {
  const navigate = useNavigate()

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => !isClosed && navigate(`/customer/restaurant/${id}`)}
      className={`relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all ${
        isClosed ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isPromoted && (
            <Badge variant="warning" className="shadow-sm">
              Ad
            </Badge>
          )}
        </div>

        {/* Offer Badge */}
        {offer && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="offer" className="shadow-md">
              {offer}
            </Badge>
          </div>
        )}

        {/* Delivery Time Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
          <span className="text-xs font-bold text-gray-900">{deliveryTime}</span>
        </div>

        {/* Closed Overlay */}
        {isClosed && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-xl font-bold text-gray-900 shadow-lg">
              Currently Closed
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 bg-green-50 px-1.5 py-0.5 rounded-md flex-shrink-0">
            <span className="text-green-700 font-bold text-xs">{rating}</span>
            <span className="text-[10px] text-green-600">★</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 line-clamp-1 mt-1">
          {cuisines.join(' • ')}
        </p>

        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>🛵</span>
            <span>{deliveryFee === 0 ? 'Free Delivery' : formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🛒</span>
            <span>Min {formatPrice(minOrder)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
