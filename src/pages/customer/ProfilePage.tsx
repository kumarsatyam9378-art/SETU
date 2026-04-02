import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore'

const MENU_SECTIONS = [
  {
    title: 'Food & Orders',
    items: [
      { icon: '📦', label: 'Your Orders', path: '/customer/orders' },
      { icon: '❤️', label: 'Favorite Restaurants', path: '/customer/favorites' },
      { icon: '📍', label: 'Address Book', path: '/customer/addresses' },
    ],
  },
  {
    title: 'Payments & Offers',
    items: [
      { icon: '💳', label: 'Payment Methods', path: '/customer/payments' },
      { icon: '🎟️', label: 'Offers & Coupons', path: '/customer/offers' },
      { icon: '💰', label: 'LFI Wallet', path: '/customer/wallet', badge: '₹250' },
    ],
  },
  {
    title: 'Settings & Support',
    items: [
      { icon: '⚙️', label: 'Settings', path: '/customer/settings' },
      { icon: '🎧', label: 'Help & Support', path: '/customer/support' },
      { icon: '🌐', label: 'Language', path: '/language' },
    ],
  },
]

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-3xl font-black shadow-lg">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-gray-900">{user?.name || 'Guest User'}</h1>
          <p className="text-gray-500 mt-1">{user?.email || 'Login to sync your data'}</p>
          <button className="mt-3 text-sm font-bold text-orange-500 hover:text-orange-600">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="space-y-6">
        {MENU_SECTIONS.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <h3 className="px-5 py-4 bg-gray-50/50 border-b border-gray-100 font-bold text-gray-900 text-sm">
              {section.title}
            </h3>
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIdx) => (
                <motion.button
                  key={itemIdx}
                  whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center justify-between p-5 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-gray-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.badge && (
                      <span className="px-2 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-gray-300">→</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold text-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
      >
        <span>🚪</span> Logout
      </motion.button>
    </div>
  )
}
