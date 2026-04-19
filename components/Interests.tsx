'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const icons = ['📷', '✈️', '📚', '🏃']
const gradients = [
  'from-amber-50 to-orange-50',
  'from-sky-50 to-blue-50',
  'from-violet-50 to-purple-50',
  'from-green-50 to-emerald-50',
]

export default function Interests() {
  const { messages } = useLanguage()
  const m = messages.interests
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="interests" ref={ref} className="py-32 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-[42px] md:text-5xl font-bold text-[#1D1D1F] tracking-tight mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {m.section_title}
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {m.items.map((interest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-gradient-to-br ${gradients[i]} rounded-2xl p-7 text-center border border-black/[0.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300`}
            >
              <div className="text-4xl mb-4 leading-none">{icons[i]}</div>
              <h3 className="font-semibold text-[#1D1D1F] mb-2.5">{interest.title}</h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
