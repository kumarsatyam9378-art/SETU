import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../stores/useCartStore'
import { useAppStore } from '../../stores/useAppStore'
import { useBusinessStore } from '../../stores/useBusinessStore'

export default function Navbar() {
  const navigate = useNavigate()
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { city } = useAppStore()
  const itemCount = useCartStore((s) => s.getItemCount())
  const { businesses, products } = useBusinessStore()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredBusinesses = businesses.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.subCategory?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3)

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/customer')}
          >
            <div className="w-9 h-9 rounded-xl gradient-bg-animated flex items-center justify-center">
              <span className="text-white font-black text-xs">LFI</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-black text-gray-900 leading-none">Line-Free</h1>
              <p className="text-[10px] text-gray-400 leading-none">India 🇮🇳</p>
            </div>
          </motion.div>

          {/* Location */}
          <button className="hidden md:flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <span className="text-orange-500">📍</span>
            <span className="font-semibold truncate max-w-[120px]">{city || 'Select City'}</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative" ref={searchRef}>
            <motion.div
              animate={{
                boxShadow: searchFocused
                  ? '0 4px 20px rgba(249, 115, 22, 0.15)'
                  : '0 1px 3px rgba(0,0,0,0.05)',
              }}
              className="relative"
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search food, services, products, doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-orange-400 focus:bg-white outline-none text-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSearchFocused(true)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </motion.div>

            {/* Search Results Dropdown */}
            <AnimatePresence>
              {searchFocused && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
                >
                  {filteredBusinesses.length === 0 && filteredProducts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <div className="text-4xl mb-2">🔍</div>
                      <p>No results found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <>
                      {filteredBusinesses.length > 0 && (
                        <div className="p-2">
                          <h3 className="text-xs font-bold text-gray-400 uppercase px-3 py-1">Businesses</h3>
                          {filteredBusinesses.map(b => (
                            <div 
                              key={b.id}
                              onClick={() => {
                                navigate(`/customer/restaurant/${b.id}`)
                                setSearchFocused(false)
                                setSearchQuery('')
                              }}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                {b.coverImage ? (
                                  <img src={b.coverImage} alt={b.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xl">🏪</span>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{b.name}</p>
                                <p className="text-xs text-gray-500">{b.subCategory}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {filteredProducts.length > 0 && (
                        <div className="p-2 border-t border-gray-100">
                          <h3 className="text-xs font-bold text-gray-400 uppercase px-3 py-1">Products</h3>
                          {filteredProducts.map(p => (
                            <div 
                              key={p.id}
                              onClick={() => {
                                if (p.business?.id) {
                                  navigate(`/customer/restaurant/${p.business.id}`)
                                  setSearchFocused(false)
                                  setSearchQuery('')
                                }
                              }}
                              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                {p.images?.[0] ? (
                                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xl">📦</span>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-gray-900">{p.name}</p>
                                <p className="text-xs text-gray-500">₹{p.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/customer/cart')}
              className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl">🛒</span>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Profile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/customer/profile')}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-xl">👤</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  )
}
