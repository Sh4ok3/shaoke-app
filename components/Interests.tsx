'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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

// Icon hover motion variants
const ICON_HOVER = [
  { rotate: 10 },   // Globe — slight spin
  { y: -3 },        // Activity — bounce up
  { x: 3 },         // Gamepad — nudge right
  { rotate: -8 },   // Chef — tilt
]

const SECONDARY_ICONS = [ActivityIcon, GamepadIcon, ChefIcon]
const SECONDARY_ICON_HOVER = [ICON_HOVER[1], ICON_HOVER[2], ICON_HOVER[3]]

// ── Spotlight card ─────────────────────────────────────────────────────────────
// Uses direct DOM manipulation for mouse tracking (no re-render per move).

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  bg?: string
  isGaming?: boolean
}

function SpotlightCard({ children, className = '', bg = '#F5F5F7', isGaming = false }: SpotlightCardProps) {
  const cardRef   = useRef<HTMLDivElement>(null)
  const spotRef   = useRef<HTMLDivElement>(null)
  const borderRef = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !spotRef.current || !borderRef.current) return
    const { left, top } = cardRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    spotRef.current.style.backgroundImage =
      `radial-gradient(650px circle at ${x}px ${y}px, rgba(255,255,255,0.11) 0%, transparent 70%)`
    borderRef.current.style.backgroundImage =
      `radial-gradient(280px circle at ${x}px ${y}px, rgba(255,255,255,0.40) 0%, transparent 65%)`
  }, [])

  const onEnter = useCallback(() => {
    if (spotRef.current)   spotRef.current.style.opacity   = '1'
    if (borderRef.current) borderRef.current.style.opacity = '1'
  }, [])

  const onLeave = useCallback(() => {
    if (spotRef.current)   spotRef.current.style.opacity   = '0'
    if (borderRef.current) borderRef.current.style.opacity = '0'
  }, [])

  return (
    // Outer wrapper: 1px gradient border lives in this layer
    <motion.div
      className={`relative rounded-[24px] p-[1px] cursor-default ${className}`}
      style={{ background: 'rgba(0,0,0,0.07)' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {/* Border glow — shows through the 1px wrapper padding */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-[24px] pointer-events-none"
        style={{ opacity: 0, transition: 'opacity 0.5s ease' }}
      />

      {/* Inner card */}
      <div
        ref={cardRef}
        className="relative rounded-[23px] overflow-hidden h-full"
        style={{ background: bg }}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {/* Hover shadow (via motion on inner) */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[23px]"
          initial={{ boxShadow: isGaming
            ? '0 8px 28px rgba(0,0,0,0.08)'
            : '0 8px 24px rgba(0,0,0,0.06)' }}
          whileHover={{ boxShadow: isGaming
            ? '0 16px 48px rgba(0,0,0,0.16), 0 0 40px rgba(0,0,0,0.06)'
            : '0 14px 40px rgba(0,0,0,0.11)' }}
          transition={{ duration: 0.45, ease: EASE }}
        />

        {/* Spotlight glow */}
        <div
          ref={spotRef}
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{ opacity: 0, transition: 'opacity 0.5s ease' }}
        />

        {/* Content */}
        <div className="relative z-[3] h-full">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Interests() {
  const { messages } = useLanguage()
  const m = messages.interests

  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-90px' })

  // Slow parallax inside the featured card background only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  const featured  = m.items[0]
  const secondary = m.items.slice(1)

  return (
    <section
      id="interests"
      ref={sectionRef}
      className="py-28 lg:py-36 bg-white relative"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-14 lg:mb-16">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.22em] text-[#86868B] uppercase mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Beyond Work
          </motion.p>
          <motion.h2
            className="text-5xl md:text-6xl lg:text-[68px] font-bold text-[#111] tracking-[-0.03em] leading-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {m.section_title}
          </motion.h2>
        </div>

        {/* ── Grid ────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-5 lg:items-stretch">

          {/* LEFT — featured card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          >
            <SpotlightCard className="h-full min-h-[420px] lg:min-h-[500px]">
              {/* Parallax background layer */}
              <motion.div
                className="absolute inset-[-18%] pointer-events-none"
                style={{ y: bgY }}
              >
                <div className="absolute inset-0 bg-[#F5F5F7]" />
                <div className="absolute top-[5%] right-[5%] w-[55%] h-[65%] rounded-full
                  bg-[radial-gradient(ellipse,rgba(0,0,0,0.025)_0%,transparent_65%)]" />
                <div className="absolute bottom-[5%] left-[5%] w-[42%] h-[50%] rounded-full
                  bg-[radial-gradient(ellipse,rgba(0,0,0,0.016)_0%,transparent_65%)]" />
              </motion.div>

              {/* Ghost globe */}
              <div className="absolute -bottom-12 -right-12 text-[#1D1D1F] opacity-[0.065]
                pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:opacity-[0.10] group-hover:scale-[1.04]">
                <GlobeIcon size={250} />
              </div>

              {/* Content */}
              <div className="relative z-[4] h-full flex flex-col p-10 lg:p-12">
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#86868B] uppercase mb-6">
                  {featured.label}
                </p>

                <motion.div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/70 text-[#1D1D1F] mb-8"
                  whileHover={ICON_HOVER[0]}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <GlobeIcon size={18} />
                </motion.div>

                <h3 className="text-[26px] lg:text-[32px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-[1.2] max-w-[420px] mb-5">
                  {featured.punchline}
                </h3>

                <p className="text-[15px] text-[#6E6E73] leading-[1.75] max-w-[400px] whitespace-pre-line">
                  {featured.description}
                </p>

                <div className="mt-auto pt-10">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#1D1D1F] uppercase">
                    <GlobeIcon size={11} />
                    {featured.title}
                  </span>
                  <div className="mt-2.5 h-px w-8 bg-[#1D1D1F]/25
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* RIGHT — 3 stacked cards */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {secondary.map((item, i) => {
              const Icon      = SECONDARY_ICONS[i]
              const iconHover = SECONDARY_ICON_HOVER[i]
              const isGaming  = i === 1
              const cardBg    = isGaming ? '#E8E8EA' : '#F5F5F7'
              const iconBg    = isGaming ? '#D4D4D6' : 'rgba(255,255,255,0.8)'

              return (
                <motion.div
                  key={i}
                  className="flex-1"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.18 + i * 0.14 }}
                >
                  <SpotlightCard bg={cardBg} isGaming={isGaming} className="h-full">
                    <div className="h-full flex flex-col p-7 min-h-[152px]">
                      <div className="flex items-center gap-3 mb-4">
                        <motion.div
                          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-[#1D1D1F]"
                          style={{ background: iconBg }}
                          whileHover={iconHover}
                          transition={{ duration: 0.3, ease: EASE }}
                        >
                          <Icon size={15} />
                        </motion.div>
                        <span className="text-[10px] font-semibold tracking-[0.18em] text-[#86868B] uppercase">
                          {item.title}
                        </span>
                      </div>

                      <h3 className="text-[15px] font-semibold text-[#1D1D1F] tracking-[-0.01em] leading-snug mb-2">
                        {item.punchline}
                      </h3>

                      <p className="text-[12.5px] text-[#6E6E73] leading-[1.65] whitespace-pre-line">
                        {item.description}
                      </p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <ScrollArrow direction="up" targetId="skills" />
      <ScrollArrow direction="down" targetId="moments" />
    </section>
  )
}
