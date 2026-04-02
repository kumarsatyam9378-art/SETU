import { motion } from 'framer-motion'
import { useAuthStore } from '../../stores/useAuthStore'

export default function BusinessHeader() {
  const { user } = useAuthStore()

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-gray-900 hidden sm:block">
          {user?.name || 'Business Dashboard'}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600"
        >
          🔔
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
        </motion.button>

        {/* Store Status Toggle */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-bold text-green-700">Accepting Orders</span>
        </div>

        {/* Profile Dropdown (Placeholder) */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-xs cursor-pointer shadow-sm">
          {user?.name?.charAt(0) || 'B'}
        </div>
      </div>
    </header>
  )
}
