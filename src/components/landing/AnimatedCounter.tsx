import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedNumber from '../ui/AnimatedNumber'

const stats = [
  {
    value: 15000,
    label: 'Active Businesses',
    suffix: '+',
    icon: '🏪',
    color: '#FC8019',
  },
  {
    value: 500000,
    label: 'Happy Customers',
    suffix: '+',
    icon: '😊',
    color: '#5B2D8E',
  },
  {
    value: 200,
    label: 'Business Types',
    suffix: '+',
    icon: '📦',
    color: '#00B8A9',
  },
  {
    value: 500,
    label: 'Cities Covered',
    suffix: '+',
    icon: '🏙️',
    color: '#FF6B6B',
  },
  {
    value: 50,
    label: 'Lakh+ Orders',
    suffix: 'L+',
    icon: '📊',
    color: '#FFD700',
  },
  {
    value: 99,
    label: 'Satisfaction Rate',
    suffix: '%',
    icon: '⭐',
    color: '#57FF31',
  },
]

export default function AnimatedCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div ref={ref} className="px-4 max-w-7xl mx-auto">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob w-96 h-96 bg-orange-500/5 top-0 left-0" />
        <div className="blob w-80 h-80 bg-purple-500/5 bottom-0 right-0 animation-delay-400" />
      </div>

      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-black">
          <span className="text-white">Numbers That</span>{' '}
          <span className="gradient-text">Speak</span>
        </h2>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
            transition={{
              delay: 0.1 + index * 0.1,
              duration: 0.6,
              type: 'spring',
            }}
            whileHover={{ y: -8, scale: 1.05 }}
            className="relative group"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
              {/* Icon */}
              <motion.div
                className="text-4xl mb-3"
                animate={inView ? { scale: [0, 1.2, 1] } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                {stat.icon}
              </motion.div>

              {/* Number */}
              <div className="text-2xl md:text-3xl font-black" style={{ color: stat.color }}>
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2000 + index * 200}
                />
              </div>

              {/* Label */}
              <p className="mt-2 text-xs md:text-sm text-white/50 font-medium">
                {stat.label}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  boxShadow: `0 0 40px \${stat.color}20`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
