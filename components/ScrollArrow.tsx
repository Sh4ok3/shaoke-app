'use client'

import { motion } from 'framer-motion'

interface ScrollArrowProps {
  direction: 'up' | 'down'
  targetId: string
  className?: string
}

export default function ScrollArrow({ direction, targetId, className = '' }: ScrollArrowProps) {
  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const arrowPath = direction === 'up'
    ? 'M17 14L12 9L7 14'
    : 'M7 10L12 15L17 10'

  const positionClass = direction === 'up'
    ? 'top-8'
    : 'bottom-8'

  return (
    <motion.button
      onClick={scrollToTarget}
      className={`absolute ${positionClass} left-1/2 transform -translate-x-1/2 opacity-50 hover:opacity-80 transition-opacity duration-300 ${className}`}
      whileHover={{ y: direction === 'up' ? -2 : 2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Scroll ${direction} to ${targetId}`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        className="text-[#6E6E73]"
      >
        <path
          d={arrowPath}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.button>
  )
}