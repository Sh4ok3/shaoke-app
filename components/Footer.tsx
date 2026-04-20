'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { messages } = useLanguage()
  const m = messages.footer
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <footer id="footer" ref={ref} className="bg-[#1D1D1F] text-white py-28">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-[42px] md:text-5xl font-bold tracking-tight mb-4">
            {m.contact_cta}
          </h2>
          <p className="text-[#a1a1a6] mb-10 max-w-md mx-auto leading-relaxed">
            {m.contact_sub}
          </p>
          <a
            href="mailto:shaoke@example.com"
            className="inline-block px-8 py-3.5 border border-white/25 text-sm font-medium rounded-full hover:bg-white hover:text-[#1D1D1F] active:scale-[0.97] transition-all duration-200"
          >
            shaoke@example.com
          </a>

          {/* Social links */}
          <div className="flex justify-center gap-5 mt-10">
            {[
              { label: 'LinkedIn', href: '#' },
              { label: 'GitHub', href: '#' },
              { label: 'Resume', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-[#6E6E73] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#48484a]">
            <p>© 2025 Kyle. {m.rights}</p>
            <p>
              {m.made_with}{' '}
              <span className="text-[#6E6E73]">Next.js & Tailwind CSS</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
