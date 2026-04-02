import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  time: string
}

const quickReplies = [
  'Track my order',
  'Cancel order',
  'Refund status',
  'Payment issue',
  'Report a problem',
  'Talk to human',
]

const botResponses: Record<string, string> = {
  'track my order': "🔍 Sure! Please share your order ID (e.g., LFI-AB12) and I'll track it for you.",
  'cancel order': "❌ To cancel your order, go to Orders → Select Order → Cancel. You can cancel within 5 minutes of placing.",
  'refund status': "💰 Refunds are processed within 5-7 business days. Check your bank/UPI for the credit.",
  'payment issue': "💳 If your payment was deducted but order not placed, the amount will be auto-refunded within 24 hours.",
  'report a problem': "🚨 I'm sorry to hear that! Please describe your issue and our team will look into it right away.",
  'talk to human': "👤 Connecting you to a support executive... Please wait. Average wait time: 2 minutes.",
}

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm LFI Support Bot. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `user-\${Date.now()}`,
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      let response = "🤔 I'm not sure about that. Let me connect you with our support team."

      for (const [key, val] of Object.entries(botResponses)) {
        if (lowerText.includes(key)) {
          response = val
          break
        }
      }

      const botMsg: Message = {
        id: `bot-\${Date.now()}`,
        text: response,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
    }, 1000)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/30 flex items-center justify-center"
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-40 right-4 md:bottom-24 md:right-6 z-50 w-[350px] max-h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-sm">LFI Support</h3>
                  <p className="text-[10px] text-white/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    Online • Replies instantly
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[300px]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex \${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm \${
                      msg.sender === 'user'
                        ? 'bg-orange-500 text-white rounded-br-none'
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-[10px] mt-1 \${
                      msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium whitespace-nowrap hover:bg-orange-50 hover:text-orange-600 transition-colors flex-shrink-0"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm outline-none focus:border-orange-300"
                />
                <button
                  onClick={() => sendMessage(input)}
                  className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
                >
                  ➤
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
