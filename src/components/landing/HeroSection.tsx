import { motion } from 'framer-motion'
import { CATEGORIES } from '../../lib/categories'

interface HeroSectionProps {
  onGetStarted: () => void
  scrollY: number
}

export default function HeroSection({ onGetStarted, scrollY }: HeroSectionProps) {
  const opacity = Math.max(1 - scrollY / 600, 0)
  const translateY = scrollY * 0.4

  return (
    <div
      className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl mx-auto"
      style={{ opacity, transform: `translateY(\${translateY}px)` }}
    >
      {/* Top Badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-sm text-white/70">Live • Serving 15,000+ businesses across India</span>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.8, ease: 'easeOut' }}
      >
        <span className="block text-white">Har Zaroorat</span>
        <span className="block mt-2">
          <span className="gradient-text">Ek Jagah</span>{' '}
          <motion.span
            className="inline-block text-5xl sm:text-6xl"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 2.5, delay: 2.5, repeat: Infinity, repeatDelay: 3 }}
          >
            🇮🇳
          </motion.span>
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-6 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        Food 🍕 Health 🏥 Shopping 🛒 Education 📚 Beauty 💄 Fitness 💪
        <br />
        <span className="text-white/80 font-medium">
          15 Categories • 200+ Business Types • One Super App
        </span>
      </motion.p>

      {/* Animated category emojis strip */}
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.6 }}
      >
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.id}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 2.5 + index * 0.08,
              type: 'spring',
              bounce: 0.4,
            }}
            whileHover={{
              scale: 1.1,
              backgroundColor: `\${cat.color}20`,
              borderColor: `\${cat.color}50`,
            }}
          >
            <span>{cat.emoji}</span>
            <span className="text-white/70 hidden sm:inline">{cat.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={onGetStarted}
            className="group relative px-10 py-4 rounded-2xl text-lg font-bold text-white overflow-hidden"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 gradient-bg-animated opacity-90 group-hover:opacity-100 transition-opacity" />
            
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ translateX: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            
            <span className="relative flex items-center gap-2">
              Get Started Free
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </button>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-2xl text-lg font-semibold text-white/80 border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2"
        >
          <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            ▶
          </span>
          Watch Demo
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
