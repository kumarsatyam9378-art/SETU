import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../lib/categories'
import { useAppStore } from '../../stores/useAppStore'

const quickActions = [
  { icon: '🍕', label: 'Food', path: '/customer/category/FOOD_RESTAURANT', color: '#FC8019' },
  { icon: '🏥', label: 'Health', path: '/customer/category/HEALTHCARE', color: '#1E4D8C' },
  { icon: '💄', label: 'Beauty', path: '/customer/category/BEAUTY_WELLNESS', color: '#C9A96E' },
  { icon: '🛒', label: 'Shop', path: '/customer/category/RETAIL_SHOPPING', color: '#0077C8' },
  { icon: '🏠', label: 'Home Fix', path: '/customer/category/HOME_SERVICES', color: '#2563EB' },
  { icon: '📚', label: 'Learn', path: '/customer/category/EDUCATION', color: '#5B2D8E' },
  { icon: '💪', label: 'Fitness', path: '/customer/category/FITNESS_SPORTS', color: '#16a34a' },
  { icon: '🚗', label: 'Transport', path: '/customer/category/TRANSPORT_AUTO', color: '#059669' },
]

const trendingOffers = [
  {
    id: 1,
    title: '50% OFF on First Food Order!',
    subtitle: 'Use code: FIRST50 • Max ₹100 discount',
    gradient: 'from-orange-500 to-red-500',
    emoji: '🍔',
  },
  {
    id: 2,
    title: 'Free Doctor Consultation',
    subtitle: 'Video call — limited time offer',
    gradient: 'from-blue-500 to-teal-500',
    emoji: '👨‍⚕️',
  },
  {
    id: 3,
    title: 'Salon at Home — ₹199 Only',
    subtitle: 'Haircut + Facial combo deal',
    gradient: 'from-pink-500 to-purple-500',
    emoji: '💇‍♀️',
  },
  {
    id: 4,
    title: 'Flat ₹200 OFF on Electronics',
    subtitle: 'Min order ₹999 • All brands',
    gradient: 'from-cyan-500 to-blue-600',
    emoji: '📱',
  },
]

const recentlyUsed: any[] = []

// Route mapping for categories
const CATEGORY_ROUTES: Record<string, string> = {
  FOOD_RESTAURANT: '/customer/category/FOOD_RESTAURANT',
  HEALTHCARE: '/customer/category/HEALTHCARE',
  BEAUTY_WELLNESS: '/customer/category/BEAUTY_WELLNESS',
  EDUCATION: '/customer/category/EDUCATION',
  FITNESS_SPORTS: '/customer/category/FITNESS_SPORTS',
  RETAIL_SHOPPING: '/customer/category/RETAIL_SHOPPING',
  HOME_SERVICES: '/customer/category/HOME_SERVICES',
  TRANSPORT_AUTO: '/customer/category/TRANSPORT_AUTO',
  REAL_ESTATE: '/customer/category/REAL_ESTATE',
  TECHNOLOGY_IT: '/customer/category/TECHNOLOGY_IT',
  FINANCE_LEGAL: '/customer/category/FINANCE_LEGAL',
  AGRICULTURE: '/customer/category/AGRICULTURE',
  HOSPITALITY_EVENTS: '/customer/category/HOSPITALITY_EVENTS',
  MANUFACTURING_B2B: '/customer/category/MANUFACTURING_B2B',
  DIGITAL_ONLINE: '/customer/category/DIGITAL_ONLINE',
}

export default function CustomerHome() {
  const navigate = useNavigate()
  const { language } = useAppStore()
  const isHindi = language === 'hi'

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* ===== GREETING SECTION ===== */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h1 className="text-2xl md:text-3xl font-black text-gray-900">
          {isHindi ? 'नमस्ते' : 'Hey there'}{' '}
          <motion.span
            className="inline-block"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
          >
            👋
          </motion.span>
        </h1>
        <p className="text-gray-500 mt-1">
          {isHindi ? 'आज आपको क्या चाहिए?' : 'What do you need today?'}
        </p>
      </motion.div>

      {/* ===== QUICK ACTIONS ===== */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.path}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 + index * 0.04 }}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center p-3 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
            >
              <motion.span
                className="text-2xl sm:text-3xl"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                {action.icon}
              </motion.span>
              <span className="mt-1.5 text-[10px] sm:text-xs font-semibold text-gray-600">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ===== TRENDING OFFERS CAROUSEL ===== */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            🔥 {isHindi ? 'ट्रेंडिंग ऑफ़र्स' : 'Trending Offers'}
          </h2>
          <button className="text-sm text-orange-500 font-semibold hover:underline">
            {isHindi ? 'सभी देखें' : 'View All'}
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {trendingOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] cursor-pointer"
            >
              <div
                className={`relative p-6 rounded-2xl bg-gradient-to-br \${offer.gradient} text-white overflow-hidden shadow-lg`}
              >
                {/* Background emoji decoration */}
                <div className="absolute -top-2 -right-2 text-7xl opacity-20 transform rotate-12">
                  {offer.emoji}
                </div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />

                <h3 className="relative text-lg font-bold leading-tight pr-12">
                  {offer.title}
                </h3>
                <p className="relative mt-1.5 text-sm text-white/80">{offer.subtitle}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative mt-4 px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold hover:bg-white/30 transition-colors border border-white/20"
                >
                  Grab Now →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== RECENTLY USED ===== */}
      {recentlyUsed.length > 0 && (
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            🕐 {isHindi ? 'हाल ही में उपयोग किया' : 'Recently Used'}
          </h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {recentlyUsed.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                whileHover={{ y: -2 }}
                className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.type} • ⭐ {item.rating}</p>
                </div>
                <span className="text-gray-300 ml-2">→</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* ===== ALL CATEGORIES GRID ===== */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            📦 {isHindi ? 'सभी कैटेगरी' : 'All Categories'}
          </h2>
          <span className="text-sm text-gray-400">{CATEGORIES.length} categories</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.45 + index * 0.03 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(CATEGORY_ROUTES[category.id] || '/customer')}
              className="cursor-pointer group"
            >
              <div
                className="relative p-5 rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{
                  borderColor: 'transparent',
                }}
              >
                {/* Hover background gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, \${category.color}08, \${category.color}04)`,
                  }}
                />

                {/* Category emoji */}
                <motion.div
                  className="relative text-4xl mb-3"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  {category.emoji}
                </motion.div>

                {/* Category name */}
                <h3 className="relative text-sm font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                  {isHindi ? category.nameHi : category.name}
                </h3>

                {/* Sub-category count */}
                <p className="relative mt-1 text-[11px] text-gray-400 group-hover:text-gray-500">
                  {category.subCategories.length}{' '}
                  {isHindi ? 'प्रकार' : 'types'}
                </p>

                {/* Hover arrow */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ x: -5 }}
                  whileHover={{ x: 0 }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `\${category.color}15` }}
                  >
                    <span style={{ color: category.color }} className="text-xs font-bold">
                      →
                    </span>
                  </div>
                </motion.div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: category.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== POPULAR NEAR YOU ===== */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          📍 {isHindi ? 'आपके आसपास लोकप्रिय' : 'Popular Near You'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'Sharma Ji Ka Dhaba',
              type: 'North Indian • Restaurant',
              rating: 4.5,
              reviews: 1200,
              time: '25 min',
              image: '🍛',
              offer: '20% OFF',
              color: '#FC8019',
            },
            {
              name: 'City Care Hospital',
              type: 'Multi-specialty • Hospital',
              rating: 4.7,
              reviews: 3500,
              time: '2 km',
              image: '🏥',
              offer: 'Free Checkup',
              color: '#1E4D8C',
            },
            {
              name: 'Glow Beauty Studio',
              type: 'Unisex • Salon',
              rating: 4.4,
              reviews: 800,
              time: '1.5 km',
              image: '💄',
              offer: '₹99 Facial',
              color: '#C9A96E',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                {/* Image/emoji */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ backgroundColor: `\${item.color}10` }}
                >
                  {item.image}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-gray-900 text-sm truncate pr-2">
                      {item.name}
                    </h3>
                    {/* Rating badge */}
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-green-50 flex-shrink-0">
                      <span className="text-green-700 text-xs font-bold">
                        ⭐ {item.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-0.5">{item.type}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-500">🕐 {item.time}</span>
                    <span className="text-xs text-gray-400">
                      ({item.reviews.toLocaleString()} reviews)
                    </span>
                  </div>

                  {/* Offer badge */}
                  {item.offer && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold">
                      🎉 {item.offer}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== APP DOWNLOAD BANNER ===== */}
      <motion.section
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-800 p-8 md:p-12"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-64 h-64 bg-orange-500 rounded-full blur-[100px] -top-20 -right-20" />
          <div className="absolute w-48 h-48 bg-purple-500 rounded-full blur-[80px] -bottom-10 -left-10" />
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              {isHindi ? 'ऐप डाउनलोड करें' : 'Get the App'} 📱
            </h2>
            <p className="mt-2 text-white/60">
              {isHindi
                ? 'बेहतर अनुभव के लिए हमारा ऐप डाउनलोड करें। ऐप-only ऑफ़र्स!'
                : 'Download our app for the best experience. Exclusive app-only offers!'}
            </p>
            <div className="mt-4 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                ▶ Google Play
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                 App Store
              </motion.button>
            </div>
          </div>

          {/* Phone mockup placeholder */}
          <div className="relative w-40 h-64 bg-gradient-to-b from-white/10 to-white/5 rounded-[2rem] border border-white/20 flex items-center justify-center">
            <span className="text-5xl">📱</span>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
