'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Icons ─────────────────────────────────────────────────────────────────────

function DataIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9"/>
      <path d="M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4"/>
    </svg>
  )
}

function CodeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )
}

function BriefcaseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="12"/>
      <path d="M2 12h20"/>
    </svg>
  )
}

function GlobeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

const ICONS = [DataIcon, CodeIcon, BriefcaseIcon, GlobeIcon]

export default function Skills() {
  const { messages } = useLanguage()
  const m = messages.skills
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [primary, ...rest] = m.categories
  const PrimaryIcon = ICONS[0]

  return (
    <section id="skills" ref={ref} className="py-32 bg-[#F5F5F7] relative overflow-hidden">
      {/* Hairline top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase mb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            How I Work
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

        {/* ── Staggered Grid ───────────────────────────────────────────
             lg: [Primary col-span-2] [Block-1 col-span-1]
                 [Block-2 col-span-1] [Block-3 col-span-2]
        ─────────────────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-5">

          {/* ── Primary Block (Analytics & Data) ──────────────────── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div
              className="group h-full relative bg-white rounded-[20px] overflow-hidden cursor-default
                shadow-[0_2px_16px_rgba(0,0,0,0.055)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-[5px] hover:scale-[1.01]"
            >
              {/* Ghost number */}
              <div className="absolute -bottom-6 -right-2 font-bold text-[#1D1D1F] opacity-[0.035] pointer-events-none select-none
                leading-none text-[160px] lg:text-[200px] tracking-[-0.06em]
                transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:opacity-[0.055] group-hover:-translate-y-2">
                01
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-9 lg:p-12 min-h-[300px] lg:min-h-[340px]">
                <div>
                  {/* Label row */}
                  <div className="flex items-center gap-3 mb-9 lg:mb-10">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F5F5F7] text-[#1D1D1F]
                      transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105">
                      <PrimaryIcon size={18} />
                    </div>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase">
                      {primary.name}
                    </span>
                  </div>

                  {/* Capability statement — the hero */}
                  <h3 className="text-[26px] lg:text-[32px] font-bold text-[#1D1D1F] tracking-[-0.022em] leading-[1.15] max-w-[420px]">
                    {primary.statement}
                  </h3>
                </div>

                {/* Tools as metadata */}
                <p className="mt-10 text-[12px] text-[#86868B] tracking-[0.01em] leading-relaxed">
                  {primary.items.join(' · ')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Block 1 (Development) — col-span-1 ─────────────────── */}
          <CapabilityBlock
            cat={rest[0]}
            Icon={ICONS[1]}
            num="02"
            delay={0.1}
            inView={inView}
          />

          {/* ── Block 2 (Business) — col-span-1 ────────────────────── */}
          <CapabilityBlock
            cat={rest[1]}
            Icon={ICONS[2]}
            num="03"
            delay={0.18}
            inView={inView}
          />

          {/* ── Block 3 (Languages) — col-span-2 ───────────────────── */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
          >
            <div
              className="group h-full relative bg-white rounded-[20px] overflow-hidden cursor-default
                shadow-[0_2px_12px_rgba(0,0,0,0.045)]
                hover:shadow-[0_16px_48px_rgba(0,0,0,0.09)]
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-[4px] hover:scale-[1.015]"
            >
              {/* Ghost number */}
              <div className="absolute -bottom-4 -right-2 font-bold text-[#1D1D1F] opacity-[0.035] pointer-events-none select-none
                leading-none text-[90px] tracking-[-0.06em]
                transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:opacity-[0.055] group-hover:-translate-y-1">
                04
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 p-7 lg:px-10 lg:py-8">
                {/* Left: label + statement */}
                <div className="flex items-start gap-3 flex-1">
                  <div className="inline-flex items-center justify-center w-9 h-9 flex-shrink-0 rounded-xl bg-[#F5F5F7] text-[#1D1D1F]
                    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105">
                    <GlobeIcon size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[#86868B] uppercase block mb-1.5">
                      {rest[2].name}
                    </span>
                    <h3 className="text-[17px] lg:text-[20px] font-bold text-[#1D1D1F] tracking-[-0.018em] leading-snug">
                      {rest[2].statement}
                    </h3>
                  </div>
                </div>

                {/* Right: language items as pills */}
                <div className="flex flex-wrap gap-2 lg:flex-shrink-0">
                  {rest[2].items.map((lang) => (
                    <span key={lang} className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[#F5F5F7] text-[#6E6E73]
                      transition-colors duration-300 group-hover:bg-[#EBEBEB]">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <ScrollArrow direction="up" targetId="hero" />
      <ScrollArrow direction="down" targetId="interests" />
    </section>
  )
}

// ── Secondary capability block ─────────────────────────────────────────────────

type IconComponent = ({ size }: { size?: number }) => React.JSX.Element

function CapabilityBlock({
  cat,
  Icon,
  num,
  delay,
  inView,
}: {
  cat: { name: string; statement: string; items: string[] }
  Icon: IconComponent
  num: string
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <div
        className="group h-full relative bg-white rounded-[20px] overflow-hidden cursor-default
          shadow-[0_2px_12px_rgba(0,0,0,0.045)]
          hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)]
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:-translate-y-[4px] hover:scale-[1.02]"
      >
        {/* Ghost number */}
        <div className="absolute -bottom-4 -right-2 font-bold text-[#1D1D1F] opacity-[0.035] pointer-events-none select-none
          leading-none text-[90px] tracking-[-0.06em]
          transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:opacity-[0.055] group-hover:-translate-y-1">
          {num}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-between p-7 min-h-[200px]">
          <div>
            {/* Label row */}
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#F5F5F7] text-[#1D1D1F]
                transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105">
                <Icon size={15} />
              </div>
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#86868B] uppercase">
                {cat.name}
              </span>
            </div>

            {/* Capability statement */}
            <h3 className="text-[17px] font-bold text-[#1D1D1F] tracking-[-0.015em] leading-snug">
              {cat.statement}
            </h3>
          </div>

          {/* Tools as dot-separated metadata */}
          <p className="mt-6 text-[11px] text-[#86868B] tracking-[0.01em] leading-relaxed">
            {cat.items.join(' · ')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
