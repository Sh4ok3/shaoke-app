'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

/* ── UCLA wordmark SVG (monochrome, serif) ── */
function UCLALogo() {
  return (
    <svg viewBox="0 0 88 36" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" aria-label="UCLA">
      {/* U */}
      <path d="M2 4 L2 22 Q2 32 12 32 Q22 32 22 22 L22 4" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* C */}
      <path d="M38 8 Q28 8 28 18 Q28 28 38 28" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round"/>
      {/* L */}
      <path d="M44 4 L44 28 L56 28" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* A */}
      <path d="M62 28 L70 4 L78 28 M64.5 20 L75.5 20" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── University of Rochester shield SVG (monochrome) ── */
function URochesterLogo() {
  return (
    <svg viewBox="0 0 56 68" xmlns="http://www.w3.org/2000/svg" className="h-12 w-auto" aria-label="University of Rochester">
      {/* Outer shield */}
      <path
        d="M4 4 H52 V44 Q28 66 4 44 Z"
        fill="none" stroke="currentColor" strokeWidth="1.8"
      />
      {/* Inner shield inset */}
      <path
        d="M9 9 H47 V42 Q28 60 9 42 Z"
        fill="none" stroke="currentColor" strokeWidth="0.7" opacity="0.35"
      />
      {/* Horizontal divider */}
      <line x1="4" y1="24" x2="52" y2="24" stroke="currentColor" strokeWidth="1.2" />
      {/* Crown above divider */}
      <path d="M19 14 L19 10 M28 14 L28 8 M37 14 L37 10 M16 14 H40 L38 20 H18 Z"
        fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" opacity="0.7"/>
      {/* UR monogram */}
      <text
        x="28" y="38"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="13"
        fontWeight="700"
        fill="currentColor"
        textAnchor="middle"
        letterSpacing="1"
      >UR</text>
      {/* Meliora */}
      <text
        x="28" y="53"
        fontFamily="Georgia, serif"
        fontSize="4.8"
        fill="currentColor"
        textAnchor="middle"
        letterSpacing="1.8"
        opacity="0.55"
      >MELIORA</text>
    </svg>
  )
}

const logoMap: Record<string, React.ReactNode> = {
  UCLA: <UCLALogo />,
  UR: <URochesterLogo />,
}

export default function Education() {
  const { messages } = useLanguage()
  const m = messages.education
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="education" ref={ref} className="py-32 bg-white">
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

        {/* Two-column grid — flat editorial, 1px tonal separator */}
        <div className="grid md:grid-cols-2 gap-px bg-[#E8E8ED]">
          {m.items.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white p-10 md:p-12 flex flex-col"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Logo + location */}
              <div className="flex items-start justify-between mb-9">
                <div className="text-[#1D1D1F]">
                  {logoMap[item.abbr] ?? (
                    <span className="text-[13px] font-bold tracking-widest">{item.abbr}</span>
                  )}
                </div>
                <span className="text-[11px] text-[#a1a1a6] tracking-wide mt-1">
                  {item.location}
                </span>
              </div>

              {/* University name */}
              <h3 className="text-[17px] font-semibold text-[#1D1D1F] leading-snug tracking-tight mb-6">
                {item.university}
              </h3>

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
    </section>
  )
}
