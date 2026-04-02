import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const businessTypes = [
  {
    id: 'restaurant',
    emoji: '🍛',
    title: 'Restaurant / Dhaba',
    description: 'Perfect for fine dining, casual eateries, and traditional dhabas.',
    features: ['Table Management', 'Menu Categorization', 'Multi-payment support']
  },
  {
    id: 'cafe',
    emoji: '☕',
    title: 'Café / Coffee Shop',
    description: 'Designed for coffee shops, bakeries, and dessert parlors.',
    features: ['Customizations (Milk/Sugar)', 'Item variants (Sizes)', 'Combo offers']
  }
]

export default function OnboardingSelect() {
  const navigate = useNavigate()

  const handleSelect = (typeId: string) => {
    navigate(`/business/onboarding/${typeId}`)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-black mb-4"
          >
            Choose Your Business Type
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            Select the category that best describes your food business to get a tailored setup experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {businessTypes.map((type, index) => (
            <motion.button
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => handleSelect(type.id)}
              className="group text-left p-6 rounded-2xl border border-white/10 hover:border-orange-500/50 bg-white/5 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="relative z-10">
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform origin-left">
                  {type.emoji}
                </span>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                  {type.title}
                </h3>
                <p className="text-white/60 mb-6">
                  {type.description}
                </p>

                <div className="space-y-2">
                  {type.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-white/50">
                      <span className="text-orange-500 mr-2">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
