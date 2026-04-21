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

export default function Interests() {
  const { messages } = useLanguage()
  const m = messages.interests

  const sectionRef  = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Subtle parallax only inside the featured card background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const featured  = m.items[0]
  const secondary = m.items.slice(1)

  return (
    <section
      id="interests"
      ref={sectionRef}
      className="py-28 lg:py-36 bg-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* ── Section header ─────────────────────────────────────────── */}
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

        {/* ── Grid ───────────────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-5 lg:items-stretch">

          {/* LEFT — featured card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          >
            <div
              className="group relative h-full min-h-[420px] lg:min-h-[480px] rounded-[24px] overflow-hidden cursor-default
                bg-[#F5F5F7]
                shadow-[0_8px_24px_rgba(0,0,0,0.07)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.13)]
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:scale-[1.01]"
            >
              {/* Parallax background (slow scroll) */}
              <motion.div
                className="absolute inset-[-18%] will-change-transform pointer-events-none"
                style={{ y: bgY }}
              >
                <div className="absolute inset-0 bg-[#F5F5F7]" />
                <div className="absolute top-[5%] right-[5%] w-[55%] h-[65%] rounded-full
                  bg-[radial-gradient(ellipse,rgba(0,0,0,0.03)_0%,transparent_65%)]" />
                <div className="absolute bottom-[5%] left-[5%] w-[45%] h-[50%] rounded-full
                  bg-[radial-gradient(ellipse,rgba(0,0,0,0.02)_0%,transparent_65%)]" />
              </motion.div>

              {/* Ghost globe */}
              <div
                className="absolute -bottom-12 -right-12 text-[#1D1D1F] opacity-[0.07] pointer-events-none
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:opacity-[0.11] group-hover:scale-[1.05] group-hover:-translate-x-2 group-hover:-translate-y-3"
              >
                <GlobeIcon size={240} />
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col p-10 lg:p-12">
                <p className="text-[10px] font-semibold tracking-[0.22em] text-[#86868B] uppercase mb-6">
                  {featured.label}
                </p>
                <h3 className="text-[28px] lg:text-[34px] font-bold text-[#1D1D1F] tracking-[-0.025em] leading-[1.13] max-w-[420px] mb-5">
                  {featured.punchline}
                </h3>
                <p className="text-[15px] text-[#6E6E73] leading-relaxed max-w-[390px]">
                  {featured.description}
                </p>
                <div className="mt-auto pt-10">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#1D1D1F] uppercase">
                    <GlobeIcon size={12} />
                    {featured.title}
                  </span>
                  <div
                    className="mt-2.5 h-px w-8 bg-[#1D1D1F]/30
                      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:w-16 group-hover:bg-[#1D1D1F]/60"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — 3 stacked cards */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {secondary.map((item, i) => {
              const Icon    = SECONDARY_ICONS[i]
              const isGaming = i === 1

              return (
                <motion.div
                  key={i}
                  className="flex-1"
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.18 + i * 0.14 }}
                >
                  <div
                    className={[
                      'group h-full relative rounded-[20px] overflow-hidden cursor-default',
                      'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                      'hover:scale-[1.02] hover:-translate-y-1',
                      isGaming
                        ? 'bg-[#E8E8EA] shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:bg-[#EFEFEF] hover:shadow-[0_12px_40px_rgba(0,0,0,0.14),0_0_40px_rgba(0,0,0,0.06)]'
                        : 'bg-[#F5F5F7] shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:bg-white hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)]',
                    ].join(' ')}
                  >
                    <div className="h-full flex flex-col p-7 min-h-[145px]">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={[
                            'inline-flex items-center justify-center w-9 h-9 rounded-xl text-[#1D1D1F]',
                            'transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                            'group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-[1.08]',
                            isGaming ? 'bg-[#D6D6D8]' : 'bg-white',
                          ].join(' ')}
                        >
                          <Icon size={15} />
                        </div>
                        <span className="text-[10px] font-semibold tracking-[0.18em] text-[#86868B] uppercase">
                          {item.title}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-[#1D1D1F] tracking-[-0.01em] leading-snug mb-2">
                        {item.punchline}
                      </h3>
                      <p className="text-[12.5px] text-[#6E6E73] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
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
