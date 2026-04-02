import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface FooterSectionProps {
  onGetStarted: () => void
}

export default function FooterSection({ onGetStarted }: FooterSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div ref={ref}>
      {/* Giant CTA Section */}
      <div className="relative px-4 py-32 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-full blur-[120px]" />
        </div>

        <motion.div
          className="relative max-w-4xl mx-auto text-center"
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-black leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-white">Ready to Go</span>
            <br />
            <span className="gradient-text">Line-Free?</span>{' '}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            >
              🚀
            </motion.span>
          </motion.h2>

          <motion.p
            className="mt-6 text-xl text-white/50 max-w-xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Join 15,000+ businesses and 5 lakh+ customers already on Line-Free India. 
            Start your journey today — it's free!
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="px-12 py-5 rounded-2xl text-lg font-bold text-white gradient-bg-animated animate-pulse-glow"
            >
              🇮🇳 Start for Free — No Credit Card
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-6 text-white/30 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <span className="flex items-center gap-1">🔒 100% Secure</span>
            <span className="flex items-center gap-1">⚡ Setup in 5 minutes</span>
            <span className="flex items-center gap-1">🆓 Free forever plan</span>
            <span className="flex items-center gap-1">🇮🇳 Made in India</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-bg-animated flex items-center justify-center">
                  <span className="text-white font-black text-sm">LFI</span>
                </div>
                <span className="text-xl font-black text-white">Line-Free India</span>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                India's first Super App for every business. 
                One platform, infinite possibilities. 🇮🇳
              </p>
            </div>

            {/* For Customers */}
            <div>
              <h4 className="font-bold text-white/80 mb-3">For Customers</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#" className="hover:text-white/70 transition-colors">Browse Categories</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">Track Orders</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">Offers & Deals</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">Help Center</a></li>
              </ul>
            </div>

            {/* For Businesses */}
            <div>
              <h4 className="font-bold text-white/80 mb-3">For Business Owners</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#" className="hover:text-white/70 transition-colors">Register Business</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">Pricing Plans</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">API Docs</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white/80 mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="#" className="hover:text-white/70 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/30">
              © 2024 Line-Free India. Made with ❤️ in India
            </p>
            <div className="flex gap-4 text-white/30">
              {['Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-sm hover:text-white/60 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
