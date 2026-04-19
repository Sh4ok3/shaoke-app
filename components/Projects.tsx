'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const projectIcons = ['📊', '🔗', '🤖']

export default function Projects() {
  const { messages } = useLanguage()
  const m = messages.projects
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} className="py-32 bg-[#F5F5F7]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-[42px] md:text-5xl font-bold text-[#1D1D1F] tracking-tight mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {m.section_title}
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {m.items.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white rounded-2xl p-7 border border-black/[0.06] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-default flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F5F5F7] flex items-center justify-center mb-6 text-xl group-hover:bg-blue-50 transition-colors duration-300">
                {projectIcons[index]}
              </div>

              <h3 className="text-[17px] font-semibold text-[#1D1D1F] leading-snug mb-3">
                {project.title}
              </h3>
              <p className="text-[#6E6E73] text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-[#F5F5F7] text-[#6E6E73] rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
