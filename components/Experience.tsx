'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

export default function Experience() {
  const { messages, locale } = useLanguage()
  const m = messages.experience
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.9', 'end 0.5'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const eyebrow = locale === 'zh' ? '工作经历' : 'Work Experience'

  return (
    <section id="experience" ref={ref} className="py-32 bg-[#F5F5F7] relative">
      <div className="max-w-3xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0071E3] mb-5">
            {eyebrow}
          </p>
          <h2 className="font-serif italic font-normal text-[42px] leading-[1.18] text-[#1D1D1F]">
            {m.section_title}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Animated vertical line — desktop only */}
          <div
            className="absolute top-0 bottom-0 w-px overflow-hidden hidden md:block"
            style={{ left: '6rem' }}
          >
            <div className="absolute inset-0 bg-[#E8E8ED]" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#C7C7CC]"
              style={{ scaleY: lineScaleY, transformOrigin: 'top', height: '100%' }}
            />
          </div>

          {m.items.map((item, index) => (
            <motion.article
              key={index}
              className="grid grid-cols-1 md:grid-cols-[5rem_2rem_1fr] mb-14 last:mb-0"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -2 }}
            >
              {/* Period — desktop only */}
              <div className="hidden md:flex flex-col items-end pt-[3px] pr-5">
                {item.period.split(' – ').map((part, j) => (
                  <span
                    key={j}
                    className={`block text-[11px] leading-[2] tabular-nums ${
                      j === 0 ? 'text-[#3a3a3c] font-medium' : 'text-[#b0b0b5]'
                    }`}
                  >
                    {part}
                  </span>
                ))}
              </div>

              {/* Dot */}
              <div className="hidden md:flex justify-center pt-[3px]">
                <div className="w-[7px] h-[7px] rounded-full bg-[#C7C7CC] ring-4 ring-offset-[3px] ring-offset-[#F5F5F7] ring-[#C7C7CC]/20" />
              </div>

              {/* Content */}
              <div className="md:pl-8">
                {/* Mobile period */}
                <p className="text-[11px] tabular-nums text-[#a1a1a6] mb-3 md:hidden">
                  {item.period}
                </p>

                {/* Company + location */}
                <div className="flex items-baseline justify-between mb-2 gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a1a1a6]">
                    {item.company}
                  </span>
                  <span className="text-[11px] text-[#b0b0b5] shrink-0">{item.location}</span>
                </div>

                {/* Role — primary focus */}
                <h3 className="text-[20px] font-medium text-[#1D1D1F] leading-snug mb-6 tracking-[-0.01em]">
                  {item.role}
                </h3>

                {/* Bullets */}
                <ul className="space-y-3">
                  {item.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <span className="mt-[9px] w-[3px] h-[3px] rounded-full bg-[#c7c7cc] shrink-0" />
                      <motion.span
                        className="text-[14px] text-[#6E6E73] leading-[1.8] cursor-default"
                        whileHover={{ color: '#3a3a3c' }}
                        transition={{ duration: 0.2 }}
                      >
                        {bullet}
                      </motion.span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ScrollArrow direction="up" targetId="hero" />
      <ScrollArrow direction="down" targetId="projects" />
    </section>
  )
}
