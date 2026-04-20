'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

export default function About() {
  const { messages, locale } = useLanguage()
  const m = messages.about
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isZh = locale === 'zh'

  return (
    <section id="about" ref={ref} className="py-32 bg-[#F5F5F7] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── LEFT: Editorial text column ── */}
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0071E3] mb-7"
            >
              {m.eyebrow}
            </motion.p>

            {/* Serif / editorial headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className={
                isZh
                  ? 'font-sans font-bold text-[38px] leading-[1.2] tracking-tight text-[#1D1D1F] mb-10'
                  : 'font-serif italic font-normal text-[42px] leading-[1.18] text-[#1D1D1F] mb-10'
              }
            >
              {m.headline}
            </motion.h2>

            {/* Hairline divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="w-10 h-px bg-[#c7c7cc] mb-10 origin-left"
            />

            {/* Body paragraphs */}
            <div className="space-y-6">
              {[m.paragraph1, m.paragraph2, m.paragraph3].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[#6E6E73] leading-[1.78] text-[16px]"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Visual column ── */}
          <motion.div
            className="flex flex-col gap-6 h-full"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            {/* ── Profile photo ── */}
            <motion.div
              className="relative flex-1 flex items-center justify-center"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/images/profile.jpg"
                alt="Kyle"
                className="w-full max-w-md h-96 object-cover rounded-2xl shadow-lg mx-auto"
              />
            </motion.div>

            {/* ── Journey timeline card ── */}
            <div className="bg-white rounded-[20px] px-6 py-5 border border-black/[0.06]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a1a1a6] mb-4">
                {isZh ? '求学之旅' : 'The Journey'}
              </p>
              <div className="flex items-start">
                {m.journey.map((stop, i) => (
                  <div key={i} className="flex items-start flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.7 + i * 0.15, duration: 0.35, type: 'spring', bounce: 0.5 }}
                        className={`w-2 h-2 rounded-full mt-1 ${
                          i === m.journey.length - 1 ? 'bg-[#0071E3]' : 'bg-[#c7c7cc]'
                        }`}
                      />
                      <div className="mt-2.5 text-center">
                        <p className={`text-[12px] font-semibold leading-tight ${
                          i === m.journey.length - 1 ? 'text-[#1D1D1F]' : 'text-[#6E6E73]'
                        }`}>
                          {stop.city}
                        </p>
                        <p className="text-[10px] text-[#a1a1a6] mt-0.5">{stop.year}</p>
                      </div>
                    </div>
                    {i < m.journey.length - 1 && (
                      <motion.div
                        className="flex-1 h-px bg-[#e5e5e5] mx-3 mt-2"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.8 + i * 0.15, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: 'left' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollArrow direction="up" targetId="hero" />
      <ScrollArrow direction="down" targetId="education" />
    </section>
  )
}
