import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { RestaurantCard } from '../../components/customer/RestaurantCard'
import { RestaurantCardSkeleton } from '../../components/ui/Skeleton'
import { useBusinessStore } from '../../stores/useBusinessStore'
import { getCategoryById } from '../../lib/categories'
import type { BusinessCategory } from '../../types'

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const { businesses, fetchBusinesses, isLoading } = useBusinessStore()

  const category = getCategoryById(categoryId as BusinessCategory)

  useEffect(() => {
    if (!category) {
      navigate('/customer')
      return
    }
    fetchBusinesses(categoryId as BusinessCategory)
  }, [categoryId, fetchBusinesses, category, navigate])

  if (!category) return null

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  const filteredBusinesses = businesses.filter((business) => {
    if (activeFilters.includes('Rating 4.0+') && business.avgRating < 4.0) return false
    
    // Check if any sub-category filter is active
    const subCategoryFilters = activeFilters.filter(f => f !== 'Rating 4.0+' && f !== 'Nearest' && f !== 'Sort')
    if (subCategoryFilters.length > 0) {
      if (!business.subCategory || !subCategoryFilters.includes(business.subCategory)) {
        return false
      }
    }

    return true
  }).sort((a, b) => {
    if (activeFilters.includes('Nearest')) {
      return (a.avgDeliveryTime || 0) - (b.avgDeliveryTime || 0)
    }
    if (activeFilters.includes('Sort')) {
      return b.avgRating - a.avgRating // default sort by rating
    }
    return 0
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">{category.name} {category.emoji}</h1>
        <p className="text-sm text-gray-500 mt-1">{category.description}</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {['Sort', 'Nearest', 'Rating 4.0+'].map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
              activeFilters.includes(filter)
                ? 'bg-orange-50 border-orange-200 text-orange-600'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
        {category.subCategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => toggleFilter(sub.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
              activeFilters.includes(sub.id)
                ? 'bg-orange-50 border-orange-200 text-orange-600'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {sub.icon} {sub.name}
          </button>
        ))}
      </div>

      {/* Business Grid */}
      {!isLoading && filteredBusinesses.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No businesses found</h3>
          <p className="text-gray-500">We couldn't find any businesses matching your criteria.</p>
          <p className="text-gray-500 mt-1">Check back later as new businesses join our platform!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <RestaurantCardSkeleton key={i} />
              ))
            : filteredBusinesses.map((business, index) => (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <RestaurantCard 
                    id={business.id}
                    name={business.name}
                    image={business.coverImage || `https://picsum.photos/seed/${business.id}/800/600`}
                    cuisines={business.subCategory ? [category.subCategories.find(s => s.id === business.subCategory)?.name || business.subCategory] : []}
                    rating={business.avgRating}
                    reviewCount={business.totalRatings}
                    deliveryTime={`${business.avgDeliveryTime} min`}
                    deliveryFee={0}
                    minOrder={business.minOrderAmount || 0}
                    isClosed={!business.isActive}
                  />
                </motion.div>
              ))}
        </div>
      )}
    </div>
  )
}
