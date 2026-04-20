'use client'

import Link from 'next/link'

type SectionArrowProps = {
  href: string
  label: string
  className?: string
}

export default function SectionArrow({ href, label, className = '' }: SectionArrowProps) {
  return (
    <Link
      href={href}
      className={`${className} inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-[#1D1D1F] font-semibold transition hover:text-[#0071E3]`}
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  )
}
