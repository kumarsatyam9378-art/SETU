import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCartStore } from '../../stores/useCartStore'

const tabs = [
  { path: '/customer', icon: '🏠', label: 'Home' },
  { path: '/customer/food', icon: '🍕', label: 'Food' },
  { path: '/customer/shopping', icon: '🛒', label: 'Shop' },
  { path: '/customer/orders', icon: '📦', label: 'Orders' },
  { path: '/customer/profile', icon: '👤', label: 'Profile' },
]

export default function BottomNav() {
  const location = useLocation()
  const pathname = location.pathname
  const navigate = useNavigate()
  const itemCount = useCartStore((s) => s.getItemCount())

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Cart bar (if items in cart) */}
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mx-4 mb-2"
        >
          <button
            onClick={() => navigate('/customer/cart')}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold flex items-center justify-between shadow-xl shadow-orange-500/30"
          >
            <span>{itemCount} item{itemCount > 1 ? 's' : ''} in cart</span>
            <span className="flex items-center gap-1">
              View Cart →
            </span>
          </button>
        </motion.div>
      )}

      {/* Tab bar */}
      <nav className="bg-white/90 backdrop-blur-xl border-t border-gray-100 px-2 py-1 safe-area-bottom">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center py-2 px-3 min-w-[56px]"
              >
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -top-1 w-8 h-1 rounded-full bg-orange-500"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.span
                  className="text-xl"
                  animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                >
                  {tab.icon}
                </motion.span>
                <span
                  className={`text-[10px] mt-0.5 font-medium \${
                    isActive ? 'text-orange-500' : 'text-gray-400'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
