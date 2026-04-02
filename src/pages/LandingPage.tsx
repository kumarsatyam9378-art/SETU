import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../stores/useAppStore'
import SplashSequence from '../components/landing/SplashSequence'
import HeroSection from '../components/landing/HeroSection'
import ParticleBackground from '../components/landing/ParticleBackground'
import FloatingCards from '../components/landing/FloatingCards'
import AnimatedCounter from '../components/landing/AnimatedCounter'
import CategoryShowcase from '../components/landing/CategoryShowcase'
import TestimonialCarousel from '../components/landing/TestimonialCarousel'
import FooterSection from '../components/landing/FooterSection'

export default function LandingPage() {
  const navigate = useNavigate()
  const { hasVisited, setHasVisited } = useAppStore()
  const [showSplash, setShowSplash] = useState(!hasVisited)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleGetStarted = () => {
    setHasVisited(true)
    navigate('/language')
  }

  return (
    <main className="relative bg-[#0A0A0F] text-white overflow-hidden min-h-screen">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100]"
          >
            <SplashSequence onComplete={() => setShowSplash(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && (
        <>
          <section className="relative min-h-screen flex items-center justify-center">
            <ParticleBackground />
            <HeroSection onGetStarted={handleGetStarted} scrollY={scrollY} />
          </section>

          <section className="relative py-20 md:py-32">
            <FloatingCards />
          </section>

          <section className="relative py-20">
            <AnimatedCounter />
          </section>

          <section className="relative py-20">
            <CategoryShowcase />
          </section>

          <section className="relative py-20">
            <TestimonialCarousel />
          </section>

          <section className="relative">
            <FooterSection onGetStarted={handleGetStarted} />
          </section>
        </>
      )}
    </main>
  )
}
