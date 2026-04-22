'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import ScrollArrow from './ScrollArrow'

export default function Hero() {
  const { messages } = useLanguage()
  const m = messages.hero
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.classList.add('active')
            const delay = el.dataset.animationDelay || '0ms'
            el.style.animationDelay = delay
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = heroRef.current?.querySelectorAll('[data-animation]')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-50 opacity-60 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-50 opacity-40 blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-20">
        <p
          data-animation
          data-animation-delay="0ms"
          className="animate-hero text-[#6E6E73] text-lg mb-3 tracking-wide"
        >
          {m.greeting}
        </p>

        <h1
          data-animation
          data-animation-delay="120ms"
          className="animate-hero text-[80px] sm:text-[100px] md:text-[120px] font-bold text-[#1D1D1F] tracking-[-0.04em] leading-none mb-6"
        >
          {m.name}
        </h1>

        <p
          data-animation
          data-animation-delay="240ms"
          className="animate-hero text-2xl md:text-[28px] text-[#6E6E73] font-light tracking-tight mb-4"
        >
          {m.title}
        </p>

        <p
          data-animation
          data-animation-delay="360ms"
          className="animate-hero text-base md:text-lg text-[#6E6E73] max-w-lg mx-auto leading-relaxed mb-12"
        >
          {m.subtitle}
        </p>

        <div
          data-animation
          data-animation-delay="480ms"
          className="animate-hero flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 bg-[#1D1D1F] text-white text-sm font-medium rounded-full hover:bg-[#3a3a3c] active:scale-[0.97] transition-all duration-200"
          >
            {m.cta_primary}
          </a>
          <a
            href="#about"
            className="px-8 py-3.5 border border-[#d2d2d7] text-[#1D1D1F] text-sm font-medium rounded-full hover:border-[#6E6E73] active:scale-[0.97] transition-all duration-200"
          >
            {m.cta_secondary}
          </a>
        </div>
      </div>

      <ScrollArrow direction="down" targetId="about" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#d2d2d7] animate-pulse" />
      </div>
    </section>
  )
}
