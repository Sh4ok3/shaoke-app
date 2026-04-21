'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

const EASE = [0.22, 1, 0.36, 1] as const

// Subtle monochrome icons per project type
function ChartIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  )
}

function NetworkIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="4" height="4" rx="1"/>
      <rect x="10" y="3" width="4" height="4" rx="1"/>
      <rect x="18" y="3" width="4" height="4" rx="1"/>
      <rect x="10" y="17" width="4" height="4" rx="1"/>
      <line x1="12" y1="7" x2="12" y2="17"/>
      <line x1="4" y1="7" x2="12" y2="12"/>
      <line x1="20" y1="7" x2="12" y2="12"/>
    </svg>
  )
}

function BrainIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/>
      <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  )
}

const ICONS = [ChartIcon, NetworkIcon, BrainIcon]

export default function Projects() {
  const { messages } = useLanguage()
  const m = messages.projects
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = m.items[0]
  const FeaturedIcon = ICONS[0]
  const secondary = m.items.slice(1)

  return (
    <section id="projects" ref={ref} className="py-32 bg-white relative overflow-hidden">
      {/* Hairline top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-black/[0.06]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-16 lg:mb-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase mb-5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Case Studies
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

        {/* ── Editorial Grid ───────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-5 lg:items-stretch">

          {/* Featured Project */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div
              className="group h-full relative bg-[#F5F5F7] rounded-[20px] overflow-hidden cursor-default
                shadow-[0_2px_16px_rgba(0,0,0,0.05)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)]
                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-[5px] hover:scale-[1.01]"
            >
              {/* Ghost number decoration */}
              <div
                className="absolute -bottom-8 -right-4 font-bold text-[#1D1D1F] opacity-[0.04] pointer-events-none select-none
                  leading-none text-[160px] lg:text-[200px] tracking-[-0.06em]
                  transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                  group-hover:opacity-[0.06] group-hover:-translate-y-2"
              >
                01
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between p-9 lg:p-12 min-h-[380px] lg:min-h-[480px]">
                {/* Top */}
                <div>
                  <div className="flex items-center gap-3 mb-9 lg:mb-11">
                    <div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white text-[#1D1D1F]
                        shadow-[0_1px_4px_rgba(0,0,0,0.08)]
                        transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105 group-hover:shadow-none"
                    >
                      <FeaturedIcon size={18} />
                    </div>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-[#86868B] uppercase">
                      Featured
                    </span>
                  </div>

                  {/* Impact statement */}
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-[#86868B] uppercase mb-3">
                    Impact
                  </p>
                  <h3 className="text-[30px] lg:text-[38px] font-bold text-[#1D1D1F] tracking-[-0.022em] leading-[1.1] mb-3">
                    {featured.impact}
                  </h3>

                  {/* Project title */}
                  <p className="text-[15px] font-medium text-[#86868B] mb-5 lg:mb-6">
                    {featured.title}
                  </p>

                  {/* Context sentence */}
                  <p className="text-[15px] text-[#6E6E73] leading-relaxed max-w-[380px]">
                    {featured.context}
                  </p>
                </div>

                {/* Bottom: tags */}
                <div className="mt-10 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/[0.055] text-[#6E6E73] tracking-[0.02em]
                        transition-colors duration-300 group-hover:bg-black/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Secondary Stack */}
          <div className="flex flex-col gap-4 lg:gap-5">
            {secondary.map((project, i) => {
              const Icon = ICONS[i + 1]
              const num = String(i + 2).padStart(2, '0')
              return (
                <motion.div
                  key={i}
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.09, ease: EASE }}
                >
                  <div
                    className="group h-full relative bg-[#F5F5F7] rounded-[20px] overflow-hidden cursor-default
                      shadow-[0_2px_12px_rgba(0,0,0,0.04)]
                      hover:shadow-[0_12px_40px_rgba(0,0,0,0.09)]
                      transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                      hover:-translate-y-[4px] hover:scale-[1.02]"
                  >
                    {/* Ghost number */}
                    <div
                      className="absolute -bottom-4 -right-2 font-bold text-[#1D1D1F] opacity-[0.04] pointer-events-none select-none
                        leading-none text-[90px] tracking-[-0.06em]
                        transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                        group-hover:opacity-[0.065] group-hover:-translate-y-1"
                    >
                      {num}
                    </div>

                    <div className="relative z-10 h-full flex flex-col justify-between p-7 min-h-[138px]">
                      {/* Top */}
                      <div>
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white text-[#1D1D1F]
                              shadow-[0_1px_4px_rgba(0,0,0,0.07)]
                              transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                              group-hover:bg-[#1D1D1F] group-hover:text-white group-hover:scale-105 group-hover:shadow-none"
                          >
                            <Icon size={15} />
                          </div>
                          <span className="text-[10px] font-semibold tracking-[0.2em] text-[#86868B] uppercase">
                            {num}
                          </span>
                        </div>

                        <h3 className="text-[16px] font-bold text-[#1D1D1F] tracking-[-0.015em] leading-tight mb-1.5">
                          {project.impact}
                        </h3>
                        <p className="text-[11px] font-medium text-[#86868B] mb-3">
                          {project.title}
                        </p>
                        <p className="text-[12.5px] text-[#6E6E73] leading-relaxed">
                          {project.context}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/[0.05] text-[#86868B] tracking-[0.02em]
                              transition-colors duration-300 group-hover:bg-black/[0.08]"
                          >
                            {tag}
                          </span>
                        ))}
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
      <ScrollArrow direction="down" targetId="skills" />
    </section>
  )
}
