import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore } from '../../stores/useCartStore'
import { formatPrice } from '../../lib/utils'
import Badge from '../ui/Badge'
import { ProductVariant } from '../../types'

interface ProductCardProps {
  id: string
  restaurantId: string
  restaurantName: string
  name: string
  description: string
  price: number
  image: string
  isVeg: boolean
  isBestseller?: boolean
  customizable?: boolean
  variants?: ProductVariant[] | null
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  restaurantId,
  restaurantName,
  name,
  description,
  price,
  image,
  isVeg,
  isBestseller,
  customizable,
  variants,
}) => {
  const { items, addItem, removeItem, updateQuantity } = useCartStore()
  const [showModal, setShowModal] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(variants?.[0] || null)
  
  const cartItem = items.find((item) => item.id === id)
  const quantity = cartItem?.quantity || 0

  const handleAdd = () => {
    if (customizable && variants && variants.length > 0) {
      setShowModal(true)
      return
    }
    addToCart()
  }

  const addToCart = (variant?: ProductVariant) => {
    addItem(
      {
        id,
        name,
        price: variant ? variant.price : price,
        images: [image],
        description,
        isVeg,
        isNonVeg: !isVeg,
        isBestseller: isBestseller || false,
        mrp: null,
        discountPercent: null,
        category: null,
        isAvailable: true,
        stock: 100,
        preparationTime: null,
        calories: null,
        allergens: [],
        variants: variants || null,
        attributes: null,
      },
      restaurantId,
      restaurantName,
      variant
    )
    setShowModal(false)
  }

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={isVeg ? 'veg' : 'nonveg'}>
            {isVeg ? 'Veg' : 'Non-Veg'}
          </Badge>
          {isBestseller && (
            <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-md">
              Bestseller
            </span>
          )}
        </div>
        <h3 className="font-bold text-gray-900 text-base">{name}</h3>
        <p className="font-bold text-gray-900 mt-1">{formatPrice(price)}</p>
        <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Image & Add Button */}
      <div className="relative w-32 h-32 flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-xl"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24">
          {quantity === 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdd}
              className="w-full py-2 bg-white text-orange-500 font-bold text-sm rounded-xl shadow-md border border-gray-100 hover:bg-orange-50 transition-colors"
            >
              ADD
            </motion.button>
          ) : (
            <div className="flex items-center justify-between w-full bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
              <button
                onClick={() => updateQuantity(id, quantity - 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
              >
                -
              </button>
              <span className="text-sm font-bold text-orange-500">{quantity}</span>
              <button
                onClick={() => updateQuantity(id, quantity + 1)}
                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
              >
                +
              </button>
            </div>
          )}
          {customizable && quantity === 0 && (
            <p className="text-[9px] text-gray-400 text-center mt-1">Customizable</p>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">Customize {name}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Select Variant</h4>
                  {variants?.map((v, i) => (
                    <label key={i} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl mb-2 cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="variant" 
                          checked={selectedVariant?.name === v.name}
                          onChange={() => setSelectedVariant(v)}
                          className="text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm font-medium">{v.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">₹{v.price}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <div className="font-bold text-lg">
                  Total: ₹{selectedVariant ? selectedVariant.price : price}
                </div>
                <button 
                  onClick={() => addToCart(selectedVariant || undefined)}
                  className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
