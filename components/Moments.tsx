'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { MomentItem } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Single image + caption block ─────────────────────────────────────────────

function MomentPhoto({
  item,
  delay,
  inView,
}: {
  item: MomentItem
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      className="group cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {/* Image — no card, sits directly on page */}
      <div
        className="aspect-[4/5] overflow-hidden rounded-[20px]
          transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-[1.02] group-hover:shadow-lg"
      >
        <img
          src={item.src}
          alt={item.alt}
          draggable={false}
          className="w-full h-full object-cover object-center
            filter saturate-[.90] brightness-[.96]
            transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      </div>

      {/* Caption — always visible, left-aligned */}
      <div className="mt-4">
        <p className="text-[13.5px] font-medium text-[#1D1D1F] tracking-[-0.01em] leading-snug">
          {item.caption}
        </p>
        {(item.location || item.year) && (
          <p className="mt-1.5 text-[10px] font-semibold tracking-[0.12em] text-[#AEAEB2] uppercase">
            {[item.location, item.year].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Moments() {
  const { messages } = useLanguage()
  const m = messages.moments
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="moments"
      ref={sectionRef}
      className="pt-32 pb-24 bg-white relative"
    >
      {/* Hairline top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── Section header ───────────────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase mb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Life in Frame
          </motion.p>
          <motion.h2
            className="text-5xl md:text-[60px] lg:text-[68px] font-bold text-[#1D1D1F] tracking-[-0.03em] leading-[1.02]"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {m.section_title}
          </motion.h2>
        </div>

        {/* ── Groups ───────────────────────────────────────────────── */}
        {m.groups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-20 lg:mt-24' : ''}>

            {/* Divider + theme label */}
            {gi > 0 && (
              <motion.div
                className="mb-10"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="h-px bg-black/[0.07] mb-8" />
              </motion.div>
            )}

            <motion.p
              className="text-[11px] font-semibold tracking-[0.18em] text-[#86868B] uppercase mb-8 lg:mb-10"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + gi * 0.15 }}
            >
              {group.theme}
            </motion.p>

            {/* Image grid — clean and balanced */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {group.items.map((item, ii) => (
                <MomentPhoto
                  key={ii}
                  item={item}
                  delay={0.12 + gi * 0.15 + ii * 0.10}
                  inView={inView}
                />
              ))}
            </div>

          </div>
        ))}

      </div>

      <ScrollArrow direction="up" targetId="interests" />
    </section>
  )
}
