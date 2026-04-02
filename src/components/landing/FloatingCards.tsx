import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CATEGORIES } from '../../lib/categories'

export default function FloatingCards() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} className="relative px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ y: 40, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-sm font-semibold mb-4"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          ✨ 15 Super Categories
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-black">
          <span className="text-white">One App,</span>{' '}
          <span className="gradient-text">Infinite Possibilities</span>
        </h2>
        <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
          From ordering food to booking doctors, from home repairs to wedding planning — everything you need, right here.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ y: 60, opacity: 0, rotateX: -15 }}
            animate={
              inView
                ? { y: 0, opacity: 1, rotateX: 0 }
                : {}
            }
            transition={{
              delay: 0.3 + index * 0.08,
              duration: 0.6,
              type: 'spring',
              bounce: 0.3,
            }}
            whileHover={{
              y: -12,
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            className="group relative"
          >
            <div
              className="relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden cursor-pointer"
              style={{
                background: `linear-gradient(135deg, \${category.color}10, \${category.color}05)`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, \${category.color}20, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <motion.div
                className="relative text-5xl mb-4"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                {category.emoji}
              </motion.div>

              {/* Name */}
              <h3 className="relative text-sm font-bold text-white/90 group-hover:text-white transition-colors">
                {category.name}
              </h3>

              {/* Sub-category count */}
              <p className="relative mt-1 text-xs text-white/40">
                {category.subCategories.length} sub-types
              </p>

              {/* Arrow */}
              <motion.div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-white/50 text-lg">→</span>
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
    </div>
  )
}
