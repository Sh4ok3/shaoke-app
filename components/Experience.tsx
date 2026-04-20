'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

const companyAccent: Record<string, string> = {
  RideTandem: 'bg-violet-50 text-violet-700',
  'UBS Business Solutions': 'bg-red-50 text-red-700',
  'Frost & Sullivan': 'bg-sky-50 text-sky-700',
  'Lighthouse Capital': 'bg-amber-50 text-amber-700',
  'DataMINO LLC': 'bg-emerald-50 text-emerald-700',
}

export default function Experience() {
  const { messages } = useLanguage()
  const m = messages.experience
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" ref={ref} className="py-32 bg-[#F5F5F7] relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-[42px] md:text-5xl font-bold text-[#1D1D1F] tracking-tight mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {m.section_title}
        </motion.h2>

        <div className="space-y-5">
          {m.items.map((item, index) => {
            const accentClass = companyAccent[item.company] ?? 'bg-gray-50 text-gray-700'
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl p-7 md:p-8 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
                  <div>
                    <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full mb-2 ${accentClass}`}>
                      {item.company}
                    </span>
                    <h3 className="text-[16px] font-semibold text-[#1D1D1F] leading-snug">
                      {item.role}
                    </h3>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <p className="text-[13px] text-[#6E6E73]">{item.period}</p>
                    <p className="text-[13px] text-[#a1a1a6] mt-0.5">{item.location}</p>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2">
                  {item.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <span className="mt-[7px] w-1 h-1 rounded-full bg-[#c7c7cc] shrink-0" />
                      <span className="text-[14px] text-[#6E6E73] leading-[1.7]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </div>
      </div>

      <ScrollArrow direction="up" targetId="hero" />
      <ScrollArrow direction="down" targetId="projects" />
    </section>
  )
}
