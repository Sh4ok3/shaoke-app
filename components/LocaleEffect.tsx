'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LocaleEffect() {
  const { locale } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
