'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Button from '@/components/base/Button'

export default function HomeSection({ onNext }: { onNext: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fade-in-up', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-10 py-10 h-full">
      <h2 className="text-3xl font-bagoss text-center max-w-[26ch] fade-in-up">
        Compare your thoughts on{' '}
        <span style={{ color: 'var(--primary)' }}>technology</span> with current industry opinions.
      </h2>

      <Button onClick={onNext} className="fade-in-up cursor-pointer font-medium w-full mt-auto">
        Get a reality check
      </Button>
    </div>
  )
}
