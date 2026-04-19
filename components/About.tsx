'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { messages, locale } = useLanguage()
  const m = messages.about
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isZh = locale === 'zh'

  return (
    <section id="about" ref={ref} className="py-32 bg-[#F5F5F7]">
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
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          >
            {/* ── Dark gradient card ── */}
            <div className="relative rounded-[24px] overflow-hidden bg-[#0d0d1a] p-8 md:p-10">
              {/* Ambient glow */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-600/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-indigo-500/20 blur-2xl" />

              {/* Stat numbers */}
              <div className="relative z-10 grid grid-cols-3 gap-2 mb-8">
                {m.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                  >
                    <p className="text-[44px] font-bold text-white leading-none tracking-tight tabular-nums">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-blue-200/60 mt-2 font-medium uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Divider */}
              <div className="relative z-10 w-full h-px bg-white/8 mb-8" />

              {/* Abstract data network — SVG */}
              <motion.div
                className="relative z-10"
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              >
                <svg viewBox="0 0 320 110" className="w-full" aria-hidden="true">
                  <defs>
                    <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Connection lines */}
                  {[
                    [40, 55, 110, 25], [110, 25, 200, 60], [200, 60, 280, 30],
                    [40, 55, 110, 85], [110, 85, 200, 60], [200, 60, 280, 85],
                    [110, 25, 110, 85], [280, 30, 280, 85],
                  ].map(([x1, y1, x2, y2], i) => (
                    <motion.line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="white"
                      strokeWidth="0.6"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={inView ? { pathLength: 1, opacity: 0.18 } : {}}
                      transition={{ delay: 0.7 + i * 0.06, duration: 0.5 }}
                    />
                  ))}

                  {/* Nodes */}
                  {[
                    [40, 55, 3.5], [110, 25, 2.5], [110, 85, 2.5],
                    [200, 60, 4.5], [280, 30, 2.5], [280, 85, 2.5],
                  ].map(([cx, cy, r], i) => (
                    <motion.circle
                      key={i}
                      cx={cx} cy={cy} r={r}
                      fill="white"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: i === 3 ? 0.9 : 0.45, scale: 1 } : {}}
                      transition={{ delay: 0.9 + i * 0.08, duration: 0.4, type: 'spring', bounce: 0.4 }}
                    />
                  ))}

                  {/* Pulse ring on central node */}
                  <motion.circle
                    cx={200} cy={60} r={10}
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="0.8"
                    animate={{ r: [8, 16], opacity: [0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut', delay: 1.2 }}
                  />
                </svg>
              </motion.div>
            </div>

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
    </section>
  )
}
