'use client'

import { motion } from 'framer-motion'
import { useLanguage, type Locale } from '@/contexts/LanguageContext'

const labels: Record<Locale, string> = {
  en: 'EN',
  zh: '中文',
}

export default function LanguageToggle() {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className="flex items-center gap-0.5 bg-gray-100 rounded-full p-1"
      role="group"
      aria-label="Language selector"
    >
      {(['en', 'zh'] as Locale[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setLocale(lang)}
          aria-pressed={locale === lang}
          className="relative px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]"
        >
          {locale === lang && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 bg-[#1D1D1F] rounded-full"
              transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors duration-200 ${
              locale === lang ? 'text-white' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            {labels[lang]}
          </span>
        </button>
      ))}
    </div>
  )
}
