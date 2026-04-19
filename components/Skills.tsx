'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Skills() {
  const { messages } = useLanguage()
  const m = messages.skills
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" ref={ref} className="py-32 bg-white">
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
          {m.categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#FBFBFD] rounded-2xl p-6 border border-black/[0.06]"
            >
              <h3 className="text-xs font-semibold text-[#1D1D1F] uppercase tracking-[0.12em] mb-4">
                {cat.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 bg-white border border-black/[0.08] text-[#6E6E73] rounded-xl hover:border-black/[0.2] hover:text-[#1D1D1F] transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
