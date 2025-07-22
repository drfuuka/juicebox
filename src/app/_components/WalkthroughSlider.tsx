"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Button from "@/components/base/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper as SwiperClass } from "swiper";

const slides = [
	"Professionals around the world shared how they feel about technology and I’ve listened. Now it’s your turn.",
	"I’ll ask you a handful of meaningful questions and compare your responses with people in your industry.",
	"You’ll get insights into current industry sentiments and a reality check about technology in a few minutes. Deal? Great!",
];

const container = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.015,
		},
	},
};

const char = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

export default function WalkthroughSlider({ onNext }: { onNext: () => void }) {
	const swiperRef = useRef<SwiperClass | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<div className="w-full max-w-xl mx-auto px-4 py-10 flex flex-col items-center justify-center">
			<Swiper
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
				slidesPerView={1}
				className="w-full"
				autoHeight
			>
				{slides.map((text, idx) => (
					<SwiperSlide key={idx}>
						<AnimatePresence mode="wait">
							<motion.div
								key={text}
								className="flex flex-col items-center justify-center h-full gap-8 text-center w-full"
								initial="hidden"
								animate="visible"
								exit="hidden"
								variants={container}
							>
								<motion.p
									className="text-2xl font-agrandir break-words text-balance leading-relaxed whitespace-pre-wrap"
									variants={container}
								>
									{text.split(" ").map((word, i) => (
										<motion.span
											key={i}
											variants={char}
											className="inline-block mr-1"
										>
											{word}
										</motion.span>
									))}
								</motion.p>
							</motion.div>
						</AnimatePresence>
					</SwiperSlide>
				))}
			</Swiper>


			{/* Custom Pagination */}
			<div className="mt-24 mb-8 flex gap-2">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => swiperRef.current?.slideTo(i)}
						className={`w-2 h-2 rounded-full cursor-pointer ${
							activeIndex === i ? "bg-primary" : "bg-white/20"
						} transition-colors duration-300`}
						aria-label={`Go to slide ${i + 1}`}
					/>
				))}
			</div>

			{/* Button di bawah slider */}
			<div className="flex w-full mt-6">
				{activeIndex === slides.length - 1 ? (
					<Button onClick={onNext} className="w-full">
						Get Started
					</Button>
				) : (
					<Button variant="outline" onClick={() => swiperRef.current?.slideNext()} className="w-full">
						Continue
					</Button>
				)}
			</div>
		</div>
	);
}
