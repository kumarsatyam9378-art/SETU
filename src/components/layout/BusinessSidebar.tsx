import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'

const menuItems = [
  { path: '/business', icon: '📊', label: 'Dashboard' },
  { path: '/business/orders', icon: '📦', label: 'Orders' },
  { path: '/business/products', icon: '🍔', label: 'Products' },
  { path: '/business/analytics', icon: '📈', label: 'Analytics' },
  { path: '/business/marketing', icon: '📢', label: 'Marketing' },
  { path: '/business/settings', icon: '⚙️', label: 'Settings' },
]

export default function BusinessSidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <motion.aside
      initial={false}
      animate={{ width: isExpanded ? 240 : 80 }}
      className="hidden md:flex flex-col h-screen bg-gray-900 text-white border-r border-gray-800 sticky top-0"
    >
      {/* Logo Area */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
            <span className="font-black text-xs">LFI</span>
          </div>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-sm whitespace-nowrap"
            >
              Business Hub
            </motion.span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md hover:bg-gray-800 text-gray-400"
        >
          {isExpanded ? '◀' : '▶'}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors \${
                isActive
                  ? 'bg-orange-500/10 text-orange-500'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {isExpanded && (
                <span className="font-medium text-sm whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Bottom Area */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <span className="text-xl flex-shrink-0">🚪</span>
          {isExpanded && <span className="font-medium text-sm whitespace-nowrap">Exit</span>}
        </button>
      </div>
    </motion.aside>
  )
}
