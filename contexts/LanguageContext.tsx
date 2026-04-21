'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import enMessages from '@/messages/en.json'
import zhMessages from '@/messages/zh.json'

export type Locale = 'en' | 'zh'

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
}

export interface ProjectItem {
  title: string
  impact: string
  context: string
  description: string
  tags: string[]
}

export interface SkillCategory {
  name: string
  statement: string
  items: string[]
}

export interface InterestItem {
  title: string
  punchline: string
  description: string
}

export interface MomentItem {
  caption: string
  location: string
  year: string
  src: string
  alt: string
  hero?: boolean
  wide?: boolean
}

export interface MomentGroup {
  theme: string
  items: MomentItem[]
}

export interface EducationItem {
  abbr: string
  university: string
  location: string
  degree: string
  major: string
  period: string
  gpa?: string
  minor?: string
  courses?: string
  focus?: string
  curriculum?: string
  application?: string
}

export interface Messages {
  nav: {
    about: string
    education: string
    experience: string
    projects: string
    skills: string
    interests: string
    moments: string
  }
  hero: {
    greeting: string
    name: string
    title: string
    subtitle: string
    cta_primary: string
    cta_secondary: string
  }
  about: {
    section_title: string
    eyebrow: string
    headline: string
    paragraph1: string
    paragraph2: string
    paragraph3: string
    stats: Array<{ value: string; label: string }>
    journey: Array<{ city: string; year: string }>
  }
  education: {
    section_title: string
    eyebrow: string
    items: EducationItem[]
  }
  experience: {
    section_title: string
    items: ExperienceItem[]
  }
  projects: {
    section_title: string
    view_project: string
    items: ProjectItem[]
  }
  skills: {
    section_title: string
    categories: SkillCategory[]
  }
  interests: {
    section_title: string
    items: InterestItem[]
  }
  moments: {
    section_title: string
    groups: MomentGroup[]
  }
  footer: {
    contact_cta: string
    contact_sub: string
    rights: string
    made_with: string
  }
}

const messagesMap: Record<Locale, Messages> = {
  en: enMessages as Messages,
  zh: zhMessages as Messages,
}

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: Messages
  isTransitioning: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem('portfolio-locale') as Locale | null
      if (saved === 'en' || saved === 'zh') {
        setLocaleState(saved)
      }
    } catch {
      // localStorage unavailable
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return
    setIsTransitioning(true)
    setTimeout(() => {
      setLocaleState(newLocale)
      try {
        localStorage.setItem('portfolio-locale', newLocale)
      } catch {
        // localStorage unavailable
      }
      setTimeout(() => setIsTransitioning(false), 60)
    }, 180)
  }, [locale])

  const value = useMemo(
    () => ({ locale, setLocale, messages: messagesMap[locale], isTransitioning }),
    [locale, setLocale, isTransitioning]
  )

  // Avoid hydration mismatch — render with 'en' on server
  if (!mounted) {
    return (
      <LanguageContext.Provider
        value={{ locale: 'en', setLocale, messages: messagesMap['en'], isTransitioning: false }}
      >
        {children}
      </LanguageContext.Provider>
    )
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
