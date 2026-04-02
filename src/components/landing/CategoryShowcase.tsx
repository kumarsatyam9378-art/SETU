import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CATEGORIES } from '../../lib/categories'

export default function CategoryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const activeCategory = CATEGORIES[activeIndex]

  return (
    <div ref={ref} className="px-4 max-w-7xl mx-auto">
      {/* Section Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold mb-4">
          🔍 Deep Dive
        </span>
        <h2 className="text-4xl md:text-5xl font-black">
          <span className="text-white">Explore Every</span>{' '}
          <span className="gradient-text">Category</span>
        </h2>
      </motion.div>

      {/* Category Tabs (Scrollable) */}
      <div className="flex overflow-x-auto gap-2 pb-4 scrollbar-hide mb-8">
        {CATEGORIES.map((cat, index) => (
          <motion.button
            key={cat.id}
            onClick={() => setActiveIndex(index)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all \${
              activeIndex === index
                ? 'text-white'
                : 'text-white/40 hover:text-white/60 bg-white/5'
            }`}
            style={
              activeIndex === index
                ? { backgroundColor: `\${cat.color}30`, borderColor: cat.color, border: '1px solid' }
                : {}
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.03 }}
          >
            <span>{cat.emoji}</span>
            <span className="hidden sm:inline">{cat.name}</span>
          </motion.button>
        ))}
      </div>

      {/* Active Category Detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/10 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, \${activeCategory.color}08, \${activeCategory.color}03)`,
          }}
        >
          {/* Category Header */}
          <div
            className="p-8 md:p-12"
            style={{
              background: `linear-gradient(135deg, \${activeCategory.color}15, transparent)`,
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <motion.span
                className="text-7xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                {activeCategory.emoji}
              </motion.span>
              <div>
                <h3 className="text-3xl md:text-4xl font-black text-white">
                  {activeCategory.name}
                </h3>
                <p className="mt-2 text-white/50 text-lg">{activeCategory.description}</p>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      backgroundColor: `\${activeCategory.color}20`,
                      color: activeCategory.color,
                    }}
                  >
                    UI Inspiration: {activeCategory.uiInspiration}
                  </span>
                  <span className="text-white/30 text-sm">
                    {activeCategory.subCategories.length} business types
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sub Categories Grid */}
          <div className="p-6 md:p-8">
            <h4 className="text-lg font-bold text-white/70 mb-4">Business Types Covered:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {activeCategory.subCategories.map((sub, i) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `\${activeCategory.color}15`,
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer transition-colors"
                >
                  <span className="text-xl">{sub.icon}</span>
                  <span className="text-sm text-white/70 font-medium">{sub.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Features Preview */}
          <div className="p-6 md:p-8 border-t border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🔍', title: 'Smart Search', desc: 'Find anything instantly' },
                { icon: '📱', title: 'Live Tracking', desc: 'Real-time updates' },
                { icon: '💳', title: 'Easy Payments', desc: 'UPI, Card, Wallet' },
                { icon: '⭐', title: 'Reviews & Ratings', desc: 'Trusted by millions' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-xl bg-white/5"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <h5 className="mt-2 font-bold text-white/80 text-sm">{feature.title}</h5>
                  <p className="text-xs text-white/40">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
