import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const steps = [
  'Welcome',
  'Café Type',
  'Basic Info',
  'Café Style',
  'Menu Upload',
  'Photos',
  'Operating Details',
  'Pricing & Payments',
  'Compliance',
  'Review & Launch'
]

const cafeTypes = [
  { id: 'classic', icon: '☕', name: 'Classic Coffee Shop', desc: 'Traditional café serving coffee, pastries' },
  { id: 'bubble_tea', icon: '🧋', name: 'Bubble Tea / Specialty', desc: 'Trendy drinks, boba, smoothies' },
  { id: 'book_cafe', icon: '📚', name: 'Book Café / Study Space', desc: 'Reading lounge with café service' },
  { id: 'dessert', icon: '🍰', name: 'Dessert Café', desc: 'Focus on cakes, pastries, sweets' },
  { id: 'health', icon: '🌿', name: 'Health Café', desc: 'Organic, vegan, health-focused' },
  { id: 'gaming', icon: '🎮', name: 'Gaming / Theme Café', desc: 'Themed experience with café service' }
]

const designStyles = [
  { id: 'cozy', name: 'Cozy Minimalist', desc: 'Clean white, warm brown accents', color: '#FAF0E6' },
  { id: 'industrial', name: 'Industrial Chic', desc: 'Exposed brick, dark scheme', color: '#36454F', isDark: true },
  { id: 'scandi', name: 'Scandinavian Clean', desc: 'Bright whites, airy layouts', color: '#FAFAFA' },
  { id: 'retro', name: 'Vintage Retro', desc: 'Warm pastels, 1950s diner style', color: '#98D8C8' },
  { id: 'botanical', name: 'Botanical Brew', desc: 'Earthy greens, plant motifs', color: '#87A96B' },
  { id: 'neon', name: 'Neon Nights', desc: 'Dark background, neon accents', color: '#0D0D0D', isDark: true }
]

export default function CafeOnboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    type: 'classic',
    style: 'cozy'
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Launch
      navigate('/business')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    } else {
      navigate('/business/onboarding')
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-black">Brew Your Online Presence in Minutes ☕</h1>
            <p className="text-white/60 text-lg">From cozy coffee corner to digital café - we'll handle the tech, you handle the coffee.</p>
            <div className="flex justify-center gap-8 text-sm text-white/40 mt-12">
              <span>✓ 1,200+ Cafés Already Online</span>
              <span>✓ Average setup: 7 minutes</span>
              <span>✓ First 30 days free</span>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">What kind of café do you run?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cafeTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setFormData({...formData, type: type.id})}
                  className={`p-6 text-left rounded-2xl border transition-all ${
                    formData.type === type.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-3xl mb-3 block">{type.icon}</span>
                  <h3 className="font-bold text-lg">{type.name}</h3>
                  <p className="text-sm text-white/50">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">What's your café called?</label>
              <input
                type="text"
                placeholder="Your Café Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Where can we find you?</label>
              <input
                type="text"
                placeholder="Full Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Best number to reach you</label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Pick a vibe that matches your café</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {designStyles.map(style => (
                <button
                  key={style.id}
                  onClick={() => setFormData({...formData, style: style.id})}
                  className={`p-6 rounded-xl border text-left transition-all ${
                    formData.style === style.id
                      ? 'border-orange-500 bg-orange-500/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`h-20 rounded-lg mb-4`}
                    style={{ backgroundColor: style.color }}
                  />
                  <h3 className="font-bold">{style.name}</h3>
                  <p className="text-xs text-white/50">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Let's add your menu ☕</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 text-center">
                <span className="text-4xl block mb-4">✨</span>
                <h3 className="text-xl font-bold mb-2">Quick Start with Template</h3>
                <p className="text-sm text-white/50">Pre-loaded menu based on your café type. Just edit the prices.</p>
              </button>
              <button className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 text-center">
                <span className="text-4xl block mb-4">📄</span>
                <h3 className="text-xl font-bold mb-2">Upload My Menu</h3>
                <p className="text-sm text-white/50">Upload PDF or Images. AI will organize sizes, milk options, and prices.</p>
              </button>
            </div>

            <div className="mt-8 p-4 border border-orange-500/30 bg-orange-500/5 rounded-xl flex items-start gap-4">
               <span className="text-2xl mt-1">💡</span>
               <div>
                 <h4 className="font-bold text-orange-200">Café Specific Features</h4>
                 <p className="text-sm text-white/60">Our menu system handles milk variations (Oat, Soy, Almond), sweetness levels, and multiple sizes seamlessly.</p>
               </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Show off your café vibes 📸</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-orange-500/50 hover:bg-white/5 transition-all cursor-pointer">
                <span className="text-4xl block mb-4">🖼️</span>
                <p className="font-bold">Cover Photo / Hero Image</p>
                <p className="text-sm text-white/50 mt-2">Your best latte art or café exterior</p>
              </div>
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-orange-500/50 hover:bg-white/5 transition-all cursor-pointer">
                <span className="text-4xl block mb-4">☕</span>
                <p className="font-bold">Drink / Food Photos</p>
                <p className="text-sm text-white/50 mt-2">AI will match these to your menu items</p>
              </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">When can customers visit?</h2>
            <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
               <div>
                 <h3 className="font-bold mb-4">Service Options</h3>
                 <div className="space-y-3">
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     Dine-In
                   </label>
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     Takeaway / Pickup
                   </label>
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     Delivery
                   </label>
                 </div>
               </div>

               <div className="pt-4 border-t border-white/10">
                 <h3 className="font-bold mb-4">Seating & Amenities</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {['Free WiFi', 'Power Outlets', 'Pet-Friendly', 'Outdoor Seating'].map(amenity => (
                     <label key={amenity} className="flex items-center gap-3 text-white/80">
                       <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                       {amenity}
                     </label>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Pricing & Payments</h2>
            <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
               <div>
                 <h3 className="font-bold mb-4">Payment Methods</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {['Cash', 'UPI / QR', 'Cards', 'Wallets'].map(method => (
                     <label key={method} className="flex items-center gap-3 text-white/80">
                       <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                       {method}
                     </label>
                   ))}
                 </div>
               </div>

               <div className="pt-4 border-t border-white/10">
                 <h3 className="font-bold mb-4">Pricing Strategies</h3>
                 <div className="space-y-3">
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     Happy Hour Discount
                   </label>
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     Combo Deals (e.g. Coffee + Croissant)
                   </label>
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     Loyalty Program (Punch card system)
                   </label>
                 </div>
               </div>
            </div>
          </div>
        )
      case 8:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Legal paperwork (quick & easy)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">FSSAI License Number</label>
                <input
                  type="text"
                  placeholder="14-digit FSSAI number"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Business PAN</label>
                <input
                  type="text"
                  placeholder="10-character PAN"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl mt-4">
                 <p className="text-sm text-orange-200">🛡️ This ensures tax compliance and enables fast payment settlements.</p>
              </div>
            </div>
          </div>
        )
      case 9:
        return (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              ☕
            </div>
            <h2 className="text-4xl font-black">Your Café is Ready to go Live!</h2>

            <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
              <div className="flex items-center text-green-400 gap-3"><span className="text-xl">✓</span> Café profile complete</div>
              <div className="flex items-center text-green-400 gap-3"><span className="text-xl">✓</span> Menu organized</div>
              <div className="flex items-center text-green-400 gap-3"><span className="text-xl">✓</span> Customizations configured</div>
              <div className="flex items-center text-green-400 gap-3"><span className="text-xl">✓</span> Payments verified</div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl inline-block mt-4">
              <p className="text-sm text-white/50 mb-1">Your auto-generated URL:</p>
              <p className="text-lg font-mono text-orange-400">{formData.name ? formData.name.toLowerCase().replace(/\s+/g, '') : 'yourcafe'}.foodhub.site</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">
      {/* Top Progress Bar */}
      <div className="h-1 bg-white/10 w-full fixed top-0 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8 pt-20">
        {/* Step Indicator */}
        <div className="mb-12">
          <p className="text-orange-500 font-bold tracking-wider text-sm uppercase mb-2">Step {currentStep + 1} of {steps.length}</p>
          <div className="flex gap-2">
            {steps.map((step, idx) => (
              <div
                key={step}
                className={`h-1.5 rounded-full flex-1 transition-colors ${
                  idx <= currentStep ? 'bg-orange-500' : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </button>

          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
          >
            {currentStep === 0
              ? 'Start Brewing'
              : currentStep === steps.length - 1
                ? 'Launch My Café 🚀'
                : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
