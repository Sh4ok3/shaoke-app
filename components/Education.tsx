'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useLanguage, type EducationItem } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

function TimelineEntry({
  item,
  index,
  inView,
}: {
  item: EducationItem
  index: number
  inView: boolean
}) {
  const isMaster = index === 0
  const courses = item.courses
    ? item.courses.split(',').map(c => c.trim()).filter(Boolean)
    : []

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-[5rem_2rem_1fr] mb-16 last:mb-0"
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Period — desktop only */}
      <div className="hidden md:flex flex-col items-end pt-[5px] pr-5">
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

      {/* Timeline dot */}
      <div className="hidden md:flex justify-center pt-[5px]">
        <div
          className={`w-[7px] h-[7px] rounded-full ring-4 ring-offset-[3px] ring-offset-white ${
            isMaster
              ? 'bg-[#0071E3] ring-[#0071E3]/20'
              : 'bg-[#C7C7CC] ring-[#C7C7CC]/20'
          }`}
        />
      </div>

      {/* Content */}
      <div className="md:pl-9">
        {/* Mobile period */}
        <p className="text-[11px] tabular-nums text-[#a1a1a6] mb-4 md:hidden">
          {item.period}
        </p>

        {/* Location */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#b0b0b5] mb-3">
          {item.location}
        </p>

        {/* University name — hover underline */}
        <div className="group inline-block cursor-default mb-2">
          <h3
            className="relative font-serif italic font-normal text-[#1D1D1F] leading-[1.18] text-[26px] md:text-[28px]"
          >
            {item.university}
            <span className="absolute -bottom-px left-0 h-px bg-[#1D1D1F] w-0 transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-full block" />
          </h3>
        </div>

        {/* Degree line */}
        <p className="text-[13px] text-[#8e8e93] mt-3 mb-8 leading-relaxed">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#c7c7cc] mr-2.5">
            {item.degree}
          </span>
          {item.major}
        </p>

        {/* GPA + Minor */}
        {(item.gpa || item.minor) && (
          <div className="flex flex-wrap gap-x-8 gap-y-1.5 mb-8">
            {item.gpa && (
              <span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c7c7cc] mr-2.5">
                  GPA
                </span>
                <span className="text-[13px] text-[#3a3a3c] font-medium">{item.gpa}</span>
              </span>
            )}
            {item.minor && (
              <span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c7c7cc] mr-2.5">
                  Minor
                </span>
                <span className="text-[13px] text-[#6e6e73]">{item.minor}</span>
              </span>
            )}
          </div>
        )}

        {/* Focus areas / Coursework */}
        {courses.length > 0 && (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c7c7cc] mb-4">
              {isMaster ? 'Focus Areas' : 'Coursework'}
            </p>
            <ul className="space-y-2">
              {courses.map((course, j) => (
                <motion.li
                  key={j}
                  className="text-[13px] text-[#8e8e93] cursor-default w-fit leading-relaxed"
                  whileHover={{ x: 5, color: '#3a3a3c' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {course}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Education() {
  const { messages, locale } = useLanguage()
  const m = messages.education
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.45'],
  })
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const narrative =
    locale === 'zh'
      ? '商业分析双学位基础，跨越美国两所顶尖大学。'
      : 'Dual-degree foundation in business analytics, spanning two leading U.S. universities.'

  return (
    <section id="education" ref={ref} className="py-32 bg-white relative">
      <div className="max-w-3xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0071E3] mb-5">
            {m.eyebrow}
          </p>
          <h2 className="font-serif italic font-normal text-[42px] leading-[1.18] text-[#1D1D1F] mb-5">
            {m.section_title}
          </h2>
          <p className="text-[15px] text-[#8e8e93] leading-[1.75] max-w-sm">
            {narrative}
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Animated vertical line — desktop only */}
          <div
            className="absolute top-0 bottom-0 w-px overflow-hidden hidden md:block"
            style={{ left: '6rem' }}
          >
            <div className="absolute inset-0 bg-[#F2F2F7]" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#D1D1D6]"
              style={{ scaleY: lineScaleY, transformOrigin: 'top', height: '100%' }}
            />
          </div>

          {m.items.map((item, i) => (
            <TimelineEntry key={i} item={item} index={i} inView={inView} />
          ))}
        </div>

      </div>

      <ScrollArrow direction="up" targetId="hero" />
      <ScrollArrow direction="down" targetId="experience" />
    </section>
  )
}
