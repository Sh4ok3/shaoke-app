'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const { messages } = useLanguage()
  const m = messages.hero

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-50 opacity-60 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-50 opacity-40 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={fadeUp}
          className="text-[#6E6E73] text-lg mb-3 tracking-wide"
        >
          {m.greeting}
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-[80px] sm:text-[100px] md:text-[120px] font-bold text-[#1D1D1F] tracking-[-0.04em] leading-none mb-6"
        >
          {m.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-2xl md:text-[28px] text-[#6E6E73] font-light tracking-tight mb-4"
        >
          {m.title}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="text-base md:text-lg text-[#6E6E73] max-w-lg mx-auto leading-relaxed mb-12"
        >
          {m.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 bg-[#1D1D1F] text-white text-sm font-medium rounded-full hover:bg-[#3a3a3c] active:scale-[0.97] transition-all duration-200"
          >
            {m.cta_primary}
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 border border-[#d2d2d7] text-[#1D1D1F] text-sm font-medium rounded-full hover:border-[#6E6E73] active:scale-[0.97] transition-all duration-200"
          >
            {m.cta_secondary}
          </a>
        </motion.div>
      </motion.div>

      <ScrollArrow direction="down" targetId="about" />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#d2d2d7]"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
