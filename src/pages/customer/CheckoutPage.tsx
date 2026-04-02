import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../../stores/useCartStore'
import { formatPrice } from '../../lib/utils'

const PAYMENT_METHODS = [
  { id: 'upi', name: 'UPI', icon: '📱', description: 'Google Pay, PhonePe, Paytm' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, RuPay' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵', description: 'Pay when you receive' },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { getTotal, clearCart } = useCartStore()
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      clearCart()
      navigate('/customer/orders', { state: { success: true } })
    }, 2000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
        >
          ←
        </button>
        <h1 className="text-2xl font-black text-gray-900">Checkout</h1>
      </div>

      {/* Delivery Address */}
      <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <span>📍</span> Delivery Address
          </h2>
          <button className="text-sm text-orange-500 font-bold">Change</button>
        </div>
        <div className="p-4 rounded-xl border border-orange-100 bg-orange-50/50">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-900">Home</span>
            <span className="text-[10px] bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-bold">Default</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            123, Block A, Tech Park Road, Sector 45,
            <br />
            Gurugram, Haryana - 122003
          </p>
          <p className="text-sm text-gray-900 font-medium mt-2">+91 98765 43210</p>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
          <span>💳</span> Payment Method
        </h2>
        <div className="space-y-3">
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.id}
              className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-colors \${
                selectedMethod === method.id
                  ? 'border-orange-500 bg-orange-50/30'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center h-5">
                <input
                  type="radio"
                  name="payment_method"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-bold text-gray-900">{method.name}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{method.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Pay Button */}
      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl font-black text-lg text-white shadow-xl transition-all flex items-center justify-center gap-2 \${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-500/30 hover:shadow-orange-500/40'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Pay {formatPrice(getTotal())}</span>
              <span>🔒</span>
            </>
          )}
        </motion.button>
        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          <span>🛡️</span> 100% Secure Payments
        </p>
      </div>
    </div>
  )
}
