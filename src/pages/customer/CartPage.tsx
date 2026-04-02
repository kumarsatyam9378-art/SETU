import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../stores/useCartStore'
import { formatPrice } from '../../lib/utils'

export default function CartPage() {
  const navigate = useNavigate()
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getDeliveryFee,
    getTax,
    getTotal,
  } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center text-6xl mb-6"
        >
          🛒
        </motion.div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 text-center mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our top restaurants and stores!
        </p>
        <button
          onClick={() => navigate('/customer')}
          className="px-8 py-3 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
        >
          Browse Items
        </button>
      </div>
    )
  }

  // Group items by business
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.businessId]) {
      acc[item.businessId] = {
        businessName: item.businessName,
        items: [],
      }
    }
    acc[item.businessId].items.push(item)
    return acc
  }, {} as Record<string, { businessName: string; items: typeof items }>)

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-6 pb-32">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm font-bold text-red-500 hover:text-red-600"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([businessId, group]) => (
          <div key={businessId} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
              <span className="text-xl">🏪</span>
              <h3 className="font-bold text-gray-900">{group.businessName}</h3>
            </div>

            <div className="space-y-4">
              {group.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 text-sm truncate">{item.product.name}</h4>
                    <p className="text-gray-500 text-xs mt-1">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold text-gray-900 text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1 border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-200 rounded-md transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-200 rounded-md transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bill Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
        <h3 className="font-bold text-gray-900 mb-4">Bill Details</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Item Total</span>
          <span>{formatPrice(getSubtotal())}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Fee</span>
          <span>{formatPrice(getDeliveryFee())}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Taxes & Charges</span>
          <span>{formatPrice(getTax())}</span>
        </div>
        <div className="pt-3 border-t border-gray-100 flex justify-between font-black text-lg text-gray-900">
          <span>To Pay</span>
          <span>{formatPrice(getTotal())}</span>
        </div>
      </div>

      {/* Checkout Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 md:relative md:bg-transparent md:border-none md:p-0 z-40">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="hidden md:block flex-1">
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-2xl font-black text-gray-900">{formatPrice(getTotal())}</p>
          </div>
          <button
            onClick={() => navigate('/customer/checkout')}
            className="flex-1 md:flex-none md:w-64 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-shadow flex items-center justify-center gap-2"
          >
            <span>Proceed to Pay</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
