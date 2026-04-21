'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

// ── Minimal monochrome icons (SF Symbols style) ───────────────────────────────

function CameraIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}

function GlobeIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}

function BookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
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

const ICONS = [CameraIcon, GlobeIcon, BookIcon, ActivityIcon]
const EASE = [0.22, 1, 0.36, 1] as const

export default function Interests() {
  const { messages } = useLanguage()
  const m = messages.interests
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = m.items[0]
  const FeaturedIcon = ICONS[0]
  const secondary = m.items.slice(1)

  return (
    <section id="interests" ref={ref} className="py-32 bg-[#F5F5F7] relative overflow-hidden">
      {/* Subtle radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(0,0,0,0.018)_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase mb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Beyond Work
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

        {/* ── Editorial Grid ───────────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-5 lg:items-stretch">

          {/* Featured Card */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div
              className="group h-full relative bg-white rounded-[20px] overflow-hidden cursor-default
                shadow-[0_2px_16px_rgba(0,0,0,0.06)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-[5px] hover:scale-[1.01]"
            >
              {/* Ghost decoration icon */}
              <div
                className="absolute -bottom-6 -right-6 text-[#1D1D1F] opacity-[0.032] pointer-events-none
                  transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:opacity-[0.055] group-hover:scale-[1.06] group-hover:-translate-x-1 group-hover:-translate-y-3"
              >
                <CameraIcon size={210} />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-9 lg:p-12 min-h-[380px] lg:min-h-[480px]">
                {/* Top section */}
                <div>
                  <div className="flex items-center gap-3 mb-9 lg:mb-11">
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F5F5F7] text-[#1D1D1F]
                        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105"
                    >
                      <FeaturedIcon size={18} />
                    </div>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase">
                      Featured
                    </span>
                  </div>

                  <h3 className="text-[28px] lg:text-[36px] font-bold text-[#1D1D1F] tracking-[-0.022em] leading-[1.12] mb-5 lg:mb-6 max-w-[400px]">
                    {featured.punchline}
                  </h3>

                  <p className="text-[15px] text-[#6E6E73] leading-relaxed max-w-[360px]">
                    {featured.description}
                  </p>
                </div>

                {/* Bottom: category label + animated rule */}
                <div className="mt-10">
                  <span className="text-[13px] font-medium text-[#1D1D1F]">{featured.title}</span>
                  <div
                    className="mt-2.5 h-px w-8 bg-[#1D1D1F]/25
                      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                      group-hover:w-16 group-hover:bg-[#1D1D1F]/55"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Stack */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {secondary.map((item, i) => {
              const Icon = ICONS[i + 1]
              return (
                <motion.div
                  key={i}
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.09, ease: EASE }}
                >
                  <div
                    className="group h-full relative bg-white rounded-[20px] overflow-hidden cursor-default
                      shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                      hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)]
                      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                      hover:-translate-y-[4px] hover:scale-[1.02]"
                  >
                    <div className="h-full flex flex-col justify-between p-7 min-h-[138px]">
                      <div className="flex items-start gap-4">
                        <div
                          className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#F5F5F7] text-[#1D1D1F]
                            transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105"
                        >
                          <Icon size={15} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-[14px] font-semibold text-[#1D1D1F] tracking-[-0.01em] leading-snug mb-1.5">
                            {item.punchline}
                          </h3>
                          <p className="text-[12.5px] text-[#6E6E73] leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <span className="text-[11px] font-medium text-[#86868B]">{item.title}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <ScrollArrow direction="up" targetId="hero" />
    </section>
  )
}
