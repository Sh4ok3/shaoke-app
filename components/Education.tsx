'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionArrow from '@/components/SectionArrow'
import ScrollArrow from './ScrollArrow'

export default function Education() {
  const { messages } = useLanguage()
  const m = messages.education
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" ref={ref} className="py-32 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0071E3] mb-5">
            {m.eyebrow}
          </p>
          <h2 className="font-serif italic font-normal text-[42px] leading-[1.18] text-[#1D1D1F]">
            {m.section_title}
          </h2>
        </motion.div>

        {/* Two-column grid — no divider, use whitespace */}
        <div className="grid md:grid-cols-2 gap-8">
          {m.items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-10 md:p-12 flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* University name + location */}
              <div className="flex items-center justify-between mb-6 gap-6">
                <div className="flex items-center gap-3">
                  {item.abbr === 'UCLA' && (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/0d/UCLA_Bruins_logo.svg"
                      alt="UCLA logo"
                      className="h-4 w-auto opacity-70"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  )}
                  {item.abbr === 'UR' && (
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/05/University_of_Rochester_seal.svg"
                      alt="University of Rochester logo"
                      className="h-4 w-auto opacity-70"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  )}
                  <h3 className="text-[18px] font-semibold text-[#1D1D1F] leading-snug tracking-tight">
                    {item.university}
                  </h3>
                </div>
                <span className="text-[12px] text-[#6E6E73] font-medium tracking-wide">
                  {item.location}
                </span>
              </div>

              {/* Thin rule */}
              <div className="w-8 h-px bg-[#E5E5EA] mb-6" />

              {/* Degree */}
              <div className="mb-6">
                <p className="text-[15px] font-medium text-[#1D1D1F] mb-0.5">{item.degree}</p>
                <p className="text-[15px] text-[#6E6E73]">{item.major}</p>
              </div>

              {/* Metadata */}
              <div className="mt-auto space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#c7c7cc] w-14 shrink-0">Period</span>
                  <span className="text-[13px] text-[#6E6E73]">{item.period}</span>
                </div>
                {item.gpa && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#c7c7cc] w-14 shrink-0">GPA</span>
                    <span className="text-[13px] text-[#1D1D1F] font-semibold">{item.gpa}</span>
                  </div>
                )}
                {item.minor && (
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#c7c7cc] w-14 shrink-0">Minor</span>
                    <span className="text-[13px] text-[#6E6E73]">{item.minor}</span>
                  </div>
                )}
                {item.courses && (
                  <div className="flex items-start gap-2 pt-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#c7c7cc] w-14 shrink-0 mt-px">Courses</span>
                    <span className="text-[12px] text-[#a1a1a6] leading-relaxed">{item.courses}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        </div>
      </div>

      <ScrollArrow direction="up" targetId="hero" />
      <ScrollArrow direction="down" targetId="experience" />
    </section>
  )
}
