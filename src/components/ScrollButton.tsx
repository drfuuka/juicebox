'use client'

import { MouseEvent } from 'react'
import Lenis from '@studio-freight/lenis'
import { cn } from '@/libs/utils'

interface ScrollButtonProps {
  targetId: string
  children: React.ReactNode
  className?: string
}

export default function ScrollButton({ targetId, children, className }: ScrollButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      const lenis = new Lenis()
      lenis.scrollTo(target, {
        offset: -40,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    }
  }

  return (
    <button onClick={handleClick} className={cn(className)}>
      {children}
    </button>
  )
}
