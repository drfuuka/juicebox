'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import Button from '@/components/base/Button'
import { useRef } from 'react'
import { Swiper as SwiperType } from 'swiper'

const slides = [
  'Professionals around the world shared how they feel about technology in WA.',
  'I’ll ask you a handful of meaningful questions that will take less than a minute.',
  'You’ll get insights into current industry sentiments—and see how your views compare.',
]

export default function WalkthroughSlider({
  onNext,
}: {
  onNext: () => void
}) {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 py-10">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full max-w-md h-[300px]"
      >
        {slides.map((text, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col items-center justify-center h-full gap-8 text-center">
              <p className="text-xl font-agrandir leading-relaxed">{text}</p>

              <div className="flex gap-4 justify-center">
                {idx > 0 && (
                  <Button variant="outline" onClick={() => swiperRef.current?.slidePrev()}>
                    Back
                  </Button>
                )}
                {idx === slides.length - 1 ? (
                  <Button onClick={onNext}>Get Started</Button>
                ) : (
                  <Button onClick={() => swiperRef.current?.slideNext()}>
                    Next
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
