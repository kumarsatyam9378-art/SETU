import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const steps = [
  'Welcome',
  'Basic Info',
  'Website Style',
  'Menu Upload',
  'Photos',
  'Operating Details',
  'Compliance',
  'Review & Launch'
]

const designStyles = [
  { id: 'neomorphism', name: 'Neomorphism (Soft UI)', desc: 'Premium fine dining, family restaurants', color: '#FAF7F2' },
  { id: 'glassmorphism', name: 'Glassmorphism', desc: 'Modern cafes, cloud kitchens', color: '#E0E7FF' },
  { id: 'flat', name: 'Flat Design', desc: 'Fast food, burger shops', color: '#FEE2E2' },
  { id: 'material', name: 'Material Design', desc: 'Multi-cuisine, food courts', color: '#F3F4F6' },
  { id: 'dark', name: 'Neumorphism Dark', desc: 'Late-night eateries, pubs', color: '#1E1E1E', isDark: true }
]

export default function RestaurantOnboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    style: 'flat',
    cuisine: [] as string[]
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
            <h1 className="text-4xl md:text-5xl font-black">Launch Your Restaurant Online in 10 Minutes ⚡</h1>
            <p className="text-white/60 text-lg">No coding needed. No website knowledge required. Just answer a few questions.</p>
            <div className="flex justify-center gap-8 text-sm text-white/40 mt-12">
              <span>✓ 10,000+ Restaurants Live</span>
              <span>✓ Average setup: 8 mins</span>
              <span>✓ Free for first month</span>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">What's your restaurant name?</label>
              <input
                type="text"
                placeholder="Your Restaurant Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Where is your restaurant located?</label>
              <input
                type="text"
                placeholder="Full Address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Contact number</label>
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
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Choose Your Website Style</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    className={`h-24 rounded-lg mb-4`}
                    style={{ backgroundColor: style.color }}
                  />
                  <h3 className="font-bold text-lg">{style.name}</h3>
                  <p className="text-sm text-white/50">{style.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Menu Upload</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 text-center">
                <span className="text-4xl block mb-4">📄</span>
                <h3 className="text-xl font-bold mb-2">Upload My Full Menu</h3>
                <p className="text-sm text-white/50">Upload PDF or Images. Our AI will automatically extract items and prices.</p>
              </button>
              <button className="p-8 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 text-center">
                <span className="text-4xl block mb-4">✍️</span>
                <h3 className="text-xl font-bold mb-2">Add Items Manually</h3>
                <p className="text-sm text-white/50">Enter items one by one with a simple form.</p>
              </button>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Restaurant Photos</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-orange-500/50 hover:bg-white/5 transition-all cursor-pointer">
                <span className="text-4xl block mb-4">📸</span>
                <p className="font-bold">Upload Exterior & Interior Photos</p>
                <p className="text-sm text-white/50 mt-2">Drag & drop or click to browse</p>
              </div>
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-orange-500/50 hover:bg-white/5 transition-all cursor-pointer">
                <span className="text-4xl block mb-4">🍔</span>
                <p className="font-bold">Upload Food Photos</p>
                <p className="text-sm text-white/50 mt-2">AI will automatically match these to your menu items</p>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Operating Details</h2>
            <div className="space-y-6 bg-white/5 p-6 rounded-2xl border border-white/10">
               <div>
                 <h3 className="font-bold mb-4">Delivery Options</h3>
                 <div className="space-y-3">
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     Yes, I deliver (Self)
                   </label>
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     Yes, through third-party (Swiggy/Zomato)
                   </label>
                   <label className="flex items-center gap-3 text-white/80">
                     <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                     No, only pickup/dine-in
                   </label>
                 </div>
               </div>

               <div className="pt-4 border-t border-white/10">
                 <h3 className="font-bold mb-4">Payment Methods</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {['Cash on Delivery', 'UPI / QR', 'Cards', 'Wallets'].map(method => (
                     <label key={method} className="flex items-center gap-3 text-white/80">
                       <input type="checkbox" className="w-5 h-5 rounded border-white/20 bg-transparent text-orange-500 focus:ring-orange-500" />
                       {method}
                     </label>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Licensing & Compliance</h2>
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
                <label className="block text-sm font-medium text-white/80 mb-2">GST Number (optional)</label>
                <input
                  type="text"
                  placeholder="15-character GSTIN"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-orange-500"
                />
              </div>
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl mt-4">
                 <p className="text-sm text-orange-200">🛡️ Your data is encrypted and secure. We need this to process payments directly to your bank account.</p>
              </div>
            </div>
          </div>
        )
      case 7:
        return (
          <div className="text-center space-y-8">
            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              🎉
            </div>
            <h2 className="text-4xl font-black">Your Website is Ready!</h2>

            <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4">
              <div className="flex items-center text-green-400 gap-3"><span className="text-xl">✓</span> Business info added</div>
              <div className="flex items-center text-green-400 gap-3"><span className="text-xl">✓</span> Menu uploaded</div>
              <div className="flex items-center text-green-400 gap-3"><span className="text-xl">✓</span> Photos added</div>
              <div className="flex items-center text-green-400 gap-3"><span className="text-xl">✓</span> Payment methods configured</div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl inline-block mt-4">
              <p className="text-sm text-white/50 mb-1">Your auto-generated URL:</p>
              <p className="text-lg font-mono text-orange-400">{formData.name ? formData.name.toLowerCase().replace(/\s+/g, '') : 'yourrestaurant'}.foodhub.site</p>
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
              ? 'Start Free Setup'
              : currentStep === steps.length - 1
                ? 'Publish My Website 🚀'
                : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
