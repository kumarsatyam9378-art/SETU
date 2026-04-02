import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    name: 'Rajesh Sharma',
    role: 'Restaurant Owner, Delhi',
    text: 'Line-Free India changed my business completely. My orders tripled in just 2 months! No need for separate website or app — everything is here.',
    rating: 5,
    avatar: '👨‍🍳',
    category: 'Food & Restaurant',
  },
  {
    name: 'Dr. Priya Patel',
    role: 'Dentist, Mumbai',
    text: 'Patient booking is so smooth now. No more phone calls and confusion. My patients love the video consultation feature!',
    rating: 5,
    avatar: '👩‍⚕️',
    category: 'Healthcare',
  },
  {
    name: 'Anita Kumari',
    role: 'Beauty Salon Owner, Jaipur',
    text: 'From zero online presence to 200+ bookings/month. The portfolio showcase feature helped me get bridal clients from other cities too!',
    rating: 5,
    avatar: '💃',
    category: 'Beauty & Wellness',
  },
  {
    name: 'Mohammad Arif',
    role: 'Customer, Lucknow',
    text: 'Best app ever! I order food, book doctor appointments, get my AC serviced, and even pay my insurance — all from one app. Love it! 🙌',
    rating: 5,
    avatar: '🙋‍♂️',
    category: 'Customer',
  },
  {
    name: 'Sunita Devi',
    role: 'Farmer, Varanasi',
    text: 'Mandi ke bhav ghar baithe pata chal jaate hain. Ab sahi daam milta hai meri fasal ka. Bahut achha app hai! 🌾',
    rating: 5,
    avatar: '👩‍🌾',
    category: 'Agriculture',
  },
  {
    name: 'Vikram Singh',
    role: 'Gym Owner, Chandigarh',
    text: 'Member management ab itna easy hai! QR code entry, automatic renewal reminders, and I can see all analytics on my phone.',
    rating: 5,
    avatar: '💪',
    category: 'Fitness & Sports',
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div ref={ref} className="px-4 max-w-5xl mx-auto">
      {/* Section Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold mb-4">
          💬 What People Say
        </span>
        <h2 className="text-4xl md:text-5xl font-black">
          <span className="text-white">Loved by</span>{' '}
          <span className="gradient-text">Thousands</span>
        </h2>
      </motion.div>

      {/* Carousel */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            {/* Quote mark */}
            <span className="absolute top-6 left-8 text-6xl text-white/10 font-serif">"</span>

            {/* Content */}
            <div className="relative flex flex-col items-center text-center">
              {/* Avatar */}
              <motion.div
                className="text-6xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
              >
                {testimonials[current].avatar}
              </motion.div>

              {/* Category badge */}
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold mb-4">
                {testimonials[current].category}
              </span>

              {/* Text */}
              <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Stars */}
              <div className="mt-4 flex gap-1">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-yellow-400 text-xl"
                  >
                    ★
                  </motion.span>
                ))}
              </div>

              {/* Name */}
              <h4 className="mt-4 text-lg font-bold text-white">
                {testimonials[current].name}
              </h4>
              <p className="text-sm text-white/40">{testimonials[current].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 \${
                index === current
                  ? 'w-8 bg-orange-500'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
