import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAppStore, LANGUAGES } from '../stores/useAppStore'
import type { Language } from '../types'

export default function LanguagePage() {
  const navigate = useNavigate()
  const { language, setLanguage } = useAppStore()

  const handleSelect = (lang: Language) => {
    setLanguage(lang)
    navigate('/role-select')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] top-20 left-20" />
        <div className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] bottom-20 right-20" />
      </div>

      <motion.div
        className="relative max-w-2xl w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <span className="text-xl">🌐</span>
            <span className="text-sm text-white/60">Step 1 of 2</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-white">Choose Your</span>{' '}
            <span className="gradient-text">Language</span>
          </motion.h1>
          <motion.p
            className="mt-3 text-white/50 text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            अपनी भाषा चुनें • Select your preferred language
          </motion.p>
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {LANGUAGES.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.4 + index * 0.06,
                type: 'spring',
                bounce: 0.3,
              }}
              whileHover={{ scale: 1.08, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(lang.code)}
              className={`relative p-5 rounded-2xl border text-center transition-all duration-300 ${
                language === lang.code
                  ? 'bg-orange-500/20 border-orange-500/50 shadow-lg shadow-orange-500/10'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {/* Selected checkmark */}
              {language === lang.code && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}

              <span className="text-3xl">{lang.flag}</span>
              <p className="mt-2 font-bold text-white/90 text-sm">{lang.nativeName}</p>
              <p className="text-xs text-white/40">{lang.name}</p>
            </motion.button>
          ))}
        </div>

        {/* Auto-detect button */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button
            onClick={() => handleSelect('en')}
            className="text-sm text-white/30 hover:text-white/60 transition-colors flex items-center gap-2 mx-auto"
          >
            <span>🔍</span>
            Auto-detect my language
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
