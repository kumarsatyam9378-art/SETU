import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

type BusinessType = 'restaurant' | 'cafe' | null

export default function BusinessOnboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [businessType, setBusinessType] = useState<BusinessType>(null)

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 8))
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1))
  const handleLaunch = () => navigate('/business')

  const StepContainer = ({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) => (
    <motion.div
      key={currentStep}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto w-full"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
      </div>
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        {children}
      </div>
    </motion.div>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepContainer title="Welcome" subtitle="What kind of business are you setting up?">
            <div className="grid md:grid-cols-2 gap-6">
              <div
                onClick={() => setBusinessType('restaurant')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${businessType === 'restaurant' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
              >
                <div className="text-4xl mb-4">🍽️</div>
                <h3 className="text-xl font-bold mb-2">Restaurant / Dhaba</h3>
                <p className="text-gray-500 text-sm">Full service restaurant, cloud kitchen, or traditional dhaba.</p>
              </div>
              <div
                onClick={() => setBusinessType('cafe')}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${businessType === 'cafe' ? 'border-orange-500 bg-orange-50' : 'border-gray-100 hover:border-orange-200'}`}
              >
                <div className="text-4xl mb-4">☕</div>
                <h3 className="text-xl font-bold mb-2">Café / Coffee Shop</h3>
                <p className="text-gray-500 text-sm">Coffee shop, bakery, or specialized beverage cafe.</p>
              </div>
            </div>
          </StepContainer>
        )
      case 2:
        return (
          <StepContainer title="Basic Information" subtitle="Tell us about your business">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                <input type="text" placeholder="e.g., Your Business Name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location / Address</label>
                <input type="text" placeholder="e.g., Street Address, City" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input type="tel" placeholder="e.g., +91 XXXXX XXXXX" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Logo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className="text-2xl mb-2 block">📸</span>
                  Drag &amp; drop your logo here, or click to select
                </div>
              </div>
            </div>
          </StepContainer>
        )
      case 3:
        return (
          <StepContainer title="Design & Theme" subtitle="Pick a look that matches your vibe">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Suggested Themes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {businessType === 'cafe' ? (
                    <>
                      <div className="p-4 border rounded-xl cursor-pointer hover:border-orange-500">Cozy Minimalist</div>
                      <div className="p-4 border rounded-xl cursor-pointer hover:border-orange-500">Industrial Chic</div>
                      <div className="p-4 border rounded-xl cursor-pointer hover:border-orange-500">Scandinavian</div>
                      <div className="p-4 border rounded-xl cursor-pointer hover:border-orange-500">Botanical Garden</div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 border rounded-xl cursor-pointer hover:border-orange-500">Neomorphism</div>
                      <div className="p-4 border rounded-xl cursor-pointer hover:border-orange-500">Glassmorphism</div>
                      <div className="p-4 border rounded-xl cursor-pointer hover:border-orange-500">Flat Design</div>
                      <div className="p-4 border rounded-xl cursor-pointer hover:border-orange-500">Vintage / Heritage</div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Color Palette</h3>
                <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white shadow-md cursor-pointer ring-2 ring-orange-500"></div>
                   <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-white shadow-md cursor-pointer hover:ring-2 ring-green-500"></div>
                   <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white shadow-md cursor-pointer hover:ring-2 ring-blue-500"></div>
                   <div className="w-10 h-10 rounded-full bg-stone-800 border-2 border-white shadow-md cursor-pointer hover:ring-2 ring-stone-800"></div>
                </div>
              </div>
            </div>
          </StepContainer>
        )
      case 4:
        return (
          <StepContainer title="Menu Setup" subtitle="How would you like to add your menu?">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 cursor-pointer flex items-center gap-4">
                <div className="text-3xl">📄</div>
                <div>
                  <h4 className="font-bold">Upload Menu Document</h4>
                  <p className="text-sm text-gray-500">Upload PDF or images of your physical menu</p>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-xl hover:border-orange-500 cursor-pointer flex items-center gap-4">
                <div className="text-3xl">✍️</div>
                <div>
                  <h4 className="font-bold">Add Items Manually</h4>
                  <p className="text-sm text-gray-500">Enter categories and items one by one</p>
                </div>
              </div>
              <div className="mt-6 border-t pt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add Quick Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {businessType === 'cafe' ? (
                    <>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Hot Beverages</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Cold Beverages</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Pastries</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Sandwiches</span>
                    </>
                  ) : (
                    <>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Starters</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Main Course</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Breads</span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Desserts</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </StepContainer>
        )
      case 5:
        return (
          <StepContainer title="Photos & Ambiance" subtitle="Show customers what makes you special">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                <span className="text-2xl mb-2 block">🏪</span>
                <p className="font-medium text-sm">Cover/Exterior Photo</p>
                <p className="text-xs mt-1">Upload 1 high-quality image</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                <span className="text-2xl mb-2 block">🪑</span>
                <p className="font-medium text-sm">Interior/Ambiance</p>
                <p className="text-xs mt-1">Upload up to 5 images</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 hover:bg-gray-50 cursor-pointer md:col-span-2">
                <span className="text-2xl mb-2 block">🥘</span>
                <p className="font-medium text-sm">Food/Drink Photos</p>
                <p className="text-xs mt-1">Upload photos to link with menu items</p>
              </div>
            </div>
          </StepContainer>
        )
      case 6:
        return (
          <StepContainer title="Operating Details" subtitle="When and how do you serve your customers?">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Operating Hours</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Opening Time</label>
                    <input type="time" className="w-full px-3 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Closing Time</label>
                    <input type="time" className="w-full px-3 py-2 border rounded-lg focus:ring-orange-500 focus:border-orange-500" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Service Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                    <span>Dine-In</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                    <span>Takeaway / Pickup</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded text-orange-500 focus:ring-orange-500" />
                    <span>Delivery</span>
                  </label>
                </div>
              </div>
            </div>
          </StepContainer>
        )
      case 7:
        return (
          <StepContainer title="Licensing & Compliance" subtitle="Legal information to verify your business">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">FSSAI License Number</label>
                <input type="text" placeholder="14-digit FSSAI Number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST Number (Optional)</label>
                <input type="text" placeholder="15-digit GSTIN" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business PAN</label>
                <input type="text" placeholder="10-digit PAN" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
              </div>
            </div>
          </StepContainer>
        )
      case 8:
        return (
          <StepContainer title="Review & Launch" subtitle="You are almost ready!">
            <div className="text-center py-8">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-xl font-bold mb-2">Setup Complete!</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Your business profile is ready. You can always edit these details later from your dashboard.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 inline-block text-left mb-6">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">✅ Business Info Added</li>
                  <li className="flex items-center gap-2">✅ Design Configured</li>
                  <li className="flex items-center gap-2">✅ Menu Setup Started</li>
                  <li className="flex items-center gap-2">✅ Operating Details Set</li>
                </ul>
              </div>
            </div>
          </StepContainer>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto mb-8">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Step {currentStep} of 8</span>
          <span className="text-sm font-medium text-orange-500">{Math.round((currentStep / 8) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-orange-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 8) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto mt-8 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-xl font-medium transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
        >
          Back
        </button>

        {currentStep < 8 ? (
          <button
            onClick={handleNext}
            disabled={currentStep === 1 && !businessType}
            className={`px-6 py-2 rounded-xl font-medium text-white transition-colors ${currentStep === 1 && !businessType ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            Next Step
          </button>
        ) : (
          <button
            onClick={handleLaunch}
            className="px-8 py-3 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
          >
            Launch Dashboard 🚀
          </button>
        )}
      </div>
    </div>
  )
}
