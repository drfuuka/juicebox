'use client'

import { useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'

interface HexaAnimationProps {
  src: string
  className?: string
}

export default function HexaAnimation({ src, className }: HexaAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        animationRef.current = lottie.loadAnimation({
          container: containerRef.current!,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: data,
        })
      })

    return () => {
      animationRef.current?.destroy()
    }
  }, [src])

  return <div ref={containerRef} className={className} />
}
