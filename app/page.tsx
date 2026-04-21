'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Education from '@/components/Education'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Interests from '@/components/Interests'
import Moments from '@/components/Moments'
import Footer from '@/components/Footer'

export default function Page() {
  const { isTransitioning } = useLanguage()

  return (
    <>
      {/* Navbar sits outside the fade wrapper so it stays visible during transition */}
      <Navbar />

      <motion.div
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{ duration: 0.18, ease: 'easeInOut' }}
      >
        <main>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Interests />
          <Moments />
          <Footer />
        </main>
      </motion.div>
    </>
  )
}
