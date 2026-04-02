import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/useAppStore'

const roles = [
  {
    id: 'customer' as const,
    emoji: '🛍️',
    title: 'I\'m a Customer',
    titleHi: 'मैं ग्राहक हूँ',
    subtitle: 'Browse, order, book & enjoy services',
    subtitleHi: 'ब्राउज़ करें, ऑर्डर करें, बुक करें',
    features: [
      '🍕 Order food from restaurants',
      '🏥 Book doctor appointments',
      '💄 Book salon & spa services',
      '🛒 Shop electronics, clothes & more',
      '🏠 Book home services (plumber, electrician)',
      '📚 Find coaching & courses',
      '🚗 Book cab, rental & transport',
      '🏨 Book hotels & event services',
      '💪 Join gym & fitness classes',
      '🌾 Buy farming supplies',
      '📱 Get tech & IT services',
      '📊 Get financial & legal help',
    ],
    color: '#FC8019',
    gradient: 'from-orange-500 to-red-500',
    tagline: 'Unlimited features. Zero hassle.',
  },
  {
    id: 'business' as const,
    emoji: '🏪',
    title: 'I\'m a Business Owner',
    titleHi: 'मैं व्यापारी हूँ',
    subtitle: 'Register your business & grow online',
    subtitleHi: 'अपना व्यापार रजिस्टर करें और बढ़ाएं',
    features: [
      '🏪 Create your digital storefront',
      '📊 Powerful analytics dashboard',
      '📦 Order & inventory management',
      '💰 Revenue tracking & settlements',
      '📢 Marketing & promotion tools',
      '👥 Customer relationship management',
      '⭐ Reviews & ratings management',
      '📱 Mobile-friendly management',
      '🎯 Category-specific features',
      '💳 Payment collection & invoicing',
      '📈 Growth insights & recommendations',
      '🤝 Dedicated support team',
    ],
    color: '#5B2D8E',
    gradient: 'from-purple-600 to-indigo-600',
    tagline: 'Your complete digital business solution.',
  },
]

export default function RoleSelectPage() {
  const navigate = useNavigate()
  const { setRole, language } = useAppStore()
  const isHindi = language === 'hi'

  const handleSelect = (role: 'customer' | 'business') => {
    setRole(role)
    if (role === 'customer') {
      navigate('/customer')
    } else {
      navigate('/business/onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 py-12">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px] -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] -bottom-40 -right-40" />
      </div>

      <motion.div
        className="relative max-w-6xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <span className="text-xl">👤</span>
            <span className="text-sm text-white/60">Step 2 of 2</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white">{isHindi ? 'आप कौन हैं' : 'How will you'}</span>{' '}
            <span className="gradient-text">{isHindi ? '?' : 'use this?'}</span>
          </motion.h1>
          <motion.p
            className="mt-3 text-white/50 text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isHindi
              ? 'अपनी भूमिका चुनें — आप बाद में कभी भी बदल सकते हैं'
              : 'Choose your role — you can always switch later'}
          </motion.p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.6, type: 'spring' }}
            >
              <motion.button
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(role.id)}
                className="w-full text-left"
              >
                <div
                  className="relative p-8 rounded-3xl border border-white/10 overflow-hidden group transition-all duration-500 hover:border-transparent"
                  style={{
                    background: `linear-gradient(135deg, \${role.color}08, \${role.color}03)`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at center, \${role.color}15, transparent 70%)`,
                    }}
                  />

                  {/* Top section */}
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <motion.span
                          className="text-6xl block mb-4"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: 'spring' }}
                        >
                          {role.emoji}
                        </motion.span>
                        <h2 className="text-2xl md:text-3xl font-black text-white group-hover:text-white/95">
                          {isHindi ? role.titleHi : role.title}
                        </h2>
                        <p className="mt-2 text-white/50 text-lg">
                          {isHindi ? role.subtitleHi : role.subtitle}
                        </p>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center mt-2"
                        style={{ backgroundColor: `\${role.color}20` }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.span
                          className="text-xl"
                          style={{ color: role.color }}
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.div>
                    </div>

                    {/* Tagline */}
                    <div
                      className="mt-4 inline-block px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: `\${role.color}15`,
                        color: role.color,
                      }}
                    >
                      {role.tagline}
                    </div>

                    {/* Features list */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {role.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.05 }}
                          className="flex items-center gap-2 text-sm text-white/50 group-hover:text-white/60 transition-colors"
                        >
                          <span className="text-base">{feature.split(' ')[0]}</span>
                          <span>{feature.split(' ').slice(1).join(' ')}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom gradient line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"
                    style={{
                      background: `linear-gradient(to right, \${role.color}, transparent)`,
                    }}
                  />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Back link */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-white/30 hover:text-white/60 transition-colors"
          >
            ← {isHindi ? 'भाषा बदलें' : 'Change Language'}
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
