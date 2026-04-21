'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

// ── Icons ──────────────────────────────────────────────────────────────────────

function GlobeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

function ActivityIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}

function GamepadIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="12" x2="10" y2="12"/>
      <line x1="8" y1="10" x2="8" y2="14"/>
      <circle cx="15" cy="13" r="0.7" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="11" r="0.7" fill="currentColor" stroke="none"/>
      <rect x="2" y="6" width="20" height="12" rx="2"/>
    </svg>
  )
}

function ChefIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/>
      <line x1="10" y1="1" x2="10" y2="4"/>
      <line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  )
}

const EASE = [0.22, 1, 0.36, 1] as const
const SECONDARY_ICONS = [ActivityIcon, GamepadIcon, ChefIcon]

// ── Mobile layout ──────────────────────────────────────────────────────────────

function MobileInterests({ m }: { m: any }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const featured = m.items[0]
  const secondary = m.items.slice(1)

  return (
    <div ref={ref} className="py-24 px-6 bg-white">
      <motion.p
        className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase mb-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        Beyond Work
      </motion.p>
      <motion.h2
        className="text-5xl font-bold text-[#1D1D1F] tracking-[-0.03em] leading-[1.02] mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {m.section_title}
      </motion.h2>

      {/* Featured */}
      <motion.div
        className="relative rounded-[24px] overflow-hidden bg-[#F5F5F7] mb-4"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      >
        <div className="relative z-10 p-8 min-h-[320px] flex flex-col">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[#86868B] uppercase mb-5">
            {featured.label}
          </p>
          <h3 className="text-[26px] font-bold text-[#1D1D1F] tracking-[-0.022em] leading-[1.15] mb-4">
            {featured.punchline}
          </h3>
          <p className="text-[14px] text-[#6E6E73] leading-relaxed flex-1">
            {featured.description}
          </p>
          <div className="mt-8">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#1D1D1F] uppercase">
              <GlobeIcon size={12} />
              {featured.title}
            </span>
            <div className="mt-2 h-px w-8 bg-[#1D1D1F]/25" />
          </div>
        </div>
        <div className="absolute -bottom-8 -right-8 text-[#1D1D1F] opacity-[0.04] pointer-events-none">
          <GlobeIcon size={180} />
        </div>
      </motion.div>

      {/* Secondary cards */}
      {secondary.map((item: any, i: number) => {
        const Icon = SECONDARY_ICONS[i]
        const isGaming = i === 1
        return (
          <motion.div
            key={i}
            className={`rounded-[20px] mb-3 overflow-hidden ${isGaming ? 'bg-[#E8E8EA]' : 'bg-[#F5F5F7]'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.08 }}
          >
            <div className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${isGaming ? 'bg-[#D8D8DA]' : 'bg-white'} text-[#1D1D1F]`}>
                  <Icon size={16} />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#86868B] uppercase">{item.title}</span>
              </div>
              <h3 className="text-[15px] font-semibold text-[#1D1D1F] tracking-[-0.01em] leading-snug mb-2">
                {item.punchline}
              </h3>
              <p className="text-[13px] text-[#6E6E73] leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Desktop layout (scroll-driven) ────────────────────────────────────────────

function DesktopInterests({ m }: { m: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const featured = m.items[0]
  const secondary = m.items.slice(1)

  // Section header
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1])
  const titleOpacity   = useTransform(scrollYProgress, [0.04, 0.13], [0, 1])
  const titleY         = useTransform(scrollYProgress, [0.04, 0.13], [20, 0])

  // Featured card content — progressive reveal
  const labelOpacity    = useTransform(scrollYProgress, [0.11, 0.19], [0, 1])
  const featTitleOpacity = useTransform(scrollYProgress, [0.17, 0.29], [0, 1])
  const featTitleY       = useTransform(scrollYProgress, [0.17, 0.29], [16, 0])
  const featDescOpacity  = useTransform(scrollYProgress, [0.27, 0.39], [0, 1])
  const featTagOpacity   = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])

  // Featured card parallax background
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])

  // Featured card exit
  const featOpacity = useTransform(scrollYProgress, [0.82, 0.95], [1, 0])
  const featScale   = useTransform(scrollYProgress, [0.82, 0.95], [1, 0.986])

  // Right cards — staggered reveal
  const card1Opacity = useTransform(scrollYProgress, [0.33, 0.47], [0, 1])
  const card1Y       = useTransform(scrollYProgress, [0.33, 0.47], [30, 0])
  const card2Opacity = useTransform(scrollYProgress, [0.47, 0.61], [0, 1])
  const card2Y       = useTransform(scrollYProgress, [0.47, 0.61], [30, 0])
  const card3Opacity = useTransform(scrollYProgress, [0.61, 0.75], [0, 1])
  const card3Y       = useTransform(scrollYProgress, [0.61, 0.75], [30, 0])

  // Right stack exit
  const rightOpacity = useTransform(scrollYProgress, [0.86, 0.96], [1, 0.55])
  const rightScale   = useTransform(scrollYProgress, [0.86, 0.97], [1, 0.977])

  return (
    <div ref={containerRef} className="relative" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-white">
        <div className="max-w-6xl mx-auto px-8 w-full">

          {/* Section header */}
          <div className="mb-14">
            <motion.p
              className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase mb-4"
              style={{ opacity: eyebrowOpacity }}
            >
              Beyond Work
            </motion.p>
            <motion.h2
              className="text-[68px] font-bold text-[#1D1D1F] tracking-[-0.03em] leading-[1.02]"
              style={{ opacity: titleOpacity, y: titleY }}
            >
              {m.section_title}
            </motion.h2>
          </div>

          {/* 2-column grid */}
          <div className="grid grid-cols-3 gap-5 items-stretch">

            {/* ── Left: featured card ───────────────────────────── */}
            <motion.div
              className="col-span-2"
              style={{ opacity: featOpacity, scale: featScale }}
            >
              <div
                className="group relative rounded-[24px] overflow-hidden h-[420px] cursor-default
                  shadow-[0_2px_20px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_28px_80px_rgba(0,0,0,0.13)]
                  transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:scale-[1.01] transition-transform"
              >
                {/* Parallax background */}
                <motion.div
                  className="absolute inset-0 will-change-transform"
                  style={{ y: bgY }}
                >
                  <div className="absolute inset-[-15%] bg-[#F5F5F7]" />
                  <div className="absolute top-[-10%] right-[-5%] w-[55%] h-[70%] rounded-full bg-[radial-gradient(ellipse,rgba(0,0,0,0.022)_0%,transparent_65%)]" />
                  <div className="absolute bottom-[-5%] left-[-8%] w-[45%] h-[55%] rounded-full bg-[radial-gradient(ellipse,rgba(0,0,0,0.016)_0%,transparent_65%)]" />
                </motion.div>

                {/* Ghost globe decoration */}
                <div
                  className="absolute -bottom-12 -right-12 text-[#1D1D1F] opacity-[0.035] pointer-events-none
                    transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    group-hover:opacity-[0.058] group-hover:scale-[1.04] group-hover:-translate-x-2 group-hover:-translate-y-3"
                >
                  <GlobeIcon size={240} />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col p-11">
                  <motion.p
                    className="text-[10px] font-semibold tracking-[0.22em] text-[#86868B] uppercase"
                    style={{ opacity: labelOpacity }}
                  >
                    {featured.label}
                  </motion.p>

                  <motion.h3
                    className="mt-6 text-[34px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-[1.13] max-w-[420px]"
                    style={{ opacity: featTitleOpacity, y: featTitleY }}
                  >
                    {featured.punchline}
                  </motion.h3>

                  <motion.p
                    className="mt-5 text-[15px] text-[#6E6E73] leading-relaxed max-w-[390px]"
                    style={{ opacity: featDescOpacity }}
                  >
                    {featured.description}
                  </motion.p>

                  <motion.div className="mt-auto" style={{ opacity: featTagOpacity }}>
                    <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#1D1D1F] uppercase">
                      <GlobeIcon size={12} />
                      {featured.title}
                    </span>
                    <div
                      className="mt-2.5 h-px w-8 bg-[#1D1D1F]/25
                        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:w-16 group-hover:bg-[#1D1D1F]/50"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ── Right: 3 stacked cards ────────────────────────── */}
            <motion.div
              className="flex flex-col gap-4"
              style={{ scale: rightScale, opacity: rightOpacity }}
            >
              {/* Card 1 — Sports */}
              <motion.div style={{ opacity: card1Opacity, y: card1Y }} className="flex-1">
                <div
                  className="group h-full relative bg-[#F5F5F7] rounded-[20px] overflow-hidden cursor-default
                    shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                    hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="h-full flex flex-col p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white text-[#1D1D1F]
                          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                          group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105"
                      >
                        <ActivityIcon size={15} />
                      </div>
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-[#86868B] uppercase">{secondary[0].title}</span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#1D1D1F] tracking-[-0.01em] leading-snug mb-2">
                      {secondary[0].punchline}
                    </h3>
                    <p className="text-[12.5px] text-[#6E6E73] leading-relaxed">
                      {secondary[0].description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 — Gaming (darker tone + glow) */}
              <motion.div style={{ opacity: card2Opacity, y: card2Y }} className="flex-1">
                <div
                  className="group h-full relative bg-[#E8E8EA] rounded-[20px] overflow-hidden cursor-default
                    shadow-[0_2px_12px_rgba(0,0,0,0.07)]
                    hover:shadow-[0_16px_48px_rgba(0,0,0,0.16),0_0_40px_rgba(0,0,0,0.07)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="h-full flex flex-col p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#D6D6D8] text-[#1D1D1F]
                          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                          group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105"
                      >
                        <GamepadIcon size={15} />
                      </div>
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-[#86868B] uppercase">{secondary[1].title}</span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#1D1D1F] tracking-[-0.01em] leading-snug mb-2">
                      {secondary[1].punchline}
                    </h3>
                    <p className="text-[12.5px] text-[#6E6E73] leading-relaxed">
                      {secondary[1].description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 — Cooking */}
              <motion.div style={{ opacity: card3Opacity, y: card3Y }} className="flex-1">
                <div
                  className="group h-full relative bg-[#F5F5F7] rounded-[20px] overflow-hidden cursor-default
                    shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                    hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <div className="h-full flex flex-col p-7">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white text-[#1D1D1F]
                          transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                          group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105"
                      >
                        <ChefIcon size={15} />
                      </div>
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-[#86868B] uppercase">{secondary[2].title}</span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-[#1D1D1F] tracking-[-0.01em] leading-snug mb-2">
                      {secondary[2].punchline}
                    </h3>
                    <p className="text-[12.5px] text-[#6E6E73] leading-relaxed">
                      {secondary[2].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Navigation arrows inside sticky container */}
        <ScrollArrow direction="up" targetId="skills" />
        <ScrollArrow direction="down" targetId="moments" />
      </div>
    </div>
  )
}

// ── Main export ────────────────────────────────────────────────────────────────

export default function Interests() {
  const { messages } = useLanguage()
  const m = messages.interests

  return (
    <section id="interests" className="relative">
      <div className="block lg:hidden">
        <MobileInterests m={m} />
        <ScrollArrow direction="up" targetId="skills" />
        <ScrollArrow direction="down" targetId="moments" />
      </div>
      <div className="hidden lg:block">
        <DesktopInterests m={m} />
      </div>
    </section>
  )
}
