import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ProductCard } from '../../components/customer/ProductCard'
import { useBusinessStore } from '../../stores/useBusinessStore'
import { ProductItem } from '../../types'

export default function RestaurantPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getBusinessById, getProductsByBusinessId } = useBusinessStore()
  
  const restaurant = id ? getBusinessById(id) : undefined
  const products = id ? getProductsByBusinessId(id) : []
  
  // Group products by category
  const menuCategories = Array.from(new Set(products.map(p => p.category).filter(Boolean))) as string[]
  
  const [activeCategory, setActiveCategory] = useState(menuCategories[0] || '')

  useEffect(() => {
    if (menuCategories.length > 0 && !activeCategory) {
      setActiveCategory(menuCategories[0])
    }
  }, [menuCategories, activeCategory])

  if (!restaurant) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-900">Restaurant not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-orange-600 hover:underline">
          Go back
        </button>
      </div>
    )
  }

  const groupedProducts = menuCategories.map(category => ({
    category,
    items: products.filter(p => p.category === category)
  }))

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Cover Image & Header */}
      <div className="relative h-64 md:h-80 bg-gray-900">
        <img
          src={restaurant.coverImage || 'https://picsum.photos/seed/restaurant/1200/400'}
          alt={restaurant.name}
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          ←
        </button>

        {/* Restaurant Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl p-6 shadow-2xl -mb-12 relative z-10"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                  {restaurant.name}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {restaurant.subCategory}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {restaurant.address}, {restaurant.city}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center bg-green-50 p-2 rounded-xl border border-green-100">
                <div className="flex items-center gap-1 text-green-700 font-bold">
                  <span>{restaurant.avgRating}</span>
                  <span className="text-sm">★</span>
                </div>
                <div className="text-[10px] text-green-600 font-medium mt-1">
                  {restaurant.totalRatings}+ ratings
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛵</span>
                <div>
                  <p className="text-xs text-gray-500">Delivery in</p>
                  <p className="text-sm font-bold text-gray-900">{restaurant.avgDeliveryTime} min</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <div>
                  <p className="text-xs text-gray-500">Min Order</p>
                  <p className="text-sm font-bold text-orange-600">₹{restaurant.minOrderAmount}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        {/* Category Navigation */}
        <div className="sticky top-[60px] md:top-[72px] z-30 bg-gray-50/90 backdrop-blur-md py-4 -mx-4 px-4 border-b border-gray-200">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {menuCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors \${
                  activeCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        {groupedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 mt-6">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items available</h3>
            <p className="text-gray-500">This business hasn't added any products yet.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            {groupedProducts.map((group) => (
              <div key={group.category} id={group.category} className="scroll-mt-32">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{group.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.items.map((item) => (
                    <ProductCard
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      description={item.description || ''}
                      price={item.price}
                      image={item.images[0] || 'https://picsum.photos/seed/food/400/400'}
                      isVeg={item.isVeg || false}
                      isBestseller={item.isBestseller}
                      customizable={!!item.variants?.length}
                      variants={item.variants}
                      restaurantId={restaurant.id}
                      restaurantName={restaurant.name}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
