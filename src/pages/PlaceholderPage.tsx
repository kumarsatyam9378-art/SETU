import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function PlaceholderPage({ title }: { title: string }) {
  const navigate = useNavigate()

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center text-5xl mb-6"
      >
        🚧
      </motion.div>
      <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
        {title}
      </h1>
      <p className="text-gray-500 max-w-md mb-8">
        We are working hard to bring this feature to you. Stay tuned for updates!
      </p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors"
      >
        Go Back
      </button>
    </div>
  )
}
