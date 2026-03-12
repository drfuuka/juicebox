"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HomeSection from "./HomeSection";
import WalkthroughSlider from "./WalkthroughSection";
import Header from "./Header";
import gsap from "gsap";
import FormSteps from "./FormSection";
import Lottie from "lottie-react";
import animationData from "../../../public/lotties/hexa.json";
import { cn } from "@/libs/utils";

type TStep = "home" | "walkthrough" | "form";

export default function MainSlider() {
	const [step, setStep] = useState<TStep>("home");
	const hexagonRef = useRef<HTMLDivElement>(null);
	const isHome = step === "home";
	const isWalkthrough = step === "walkthrough";
	const isForm = step === "form";

	useEffect(() => {
		const hexagon = hexagonRef.current;
		if (!hexagon) return;

		const image = hexagon.querySelector(".hexagon-image");
		const lottieImage = hexagon.querySelector(".hexagon-lottie");
		const texts = hexagon.querySelectorAll(".insight-text");

		if (step === "walkthrough") {
			if (image) {
				gsap.to(image, {
					scale: 0.92,
					y: 0,
					duration: 0.5,
					ease: "power2.inOut",
				});
			}

			gsap.to(texts, {
				opacity: 0,
				y: "+=10",
				duration: 0.4,
				stagger: 0.1,
				ease: "power2.out",
			});

		} else if (step === "form") {
			if (image) {
				gsap.to(image, {
					scale: 0.2,
					y: 0,
					duration: 0.5,
					ease: "power2.inOut",
				});
			}
			if (lottieImage) {
				gsap.to(lottieImage, {
					scale: 1,
					y: 0,
					duration: 0.5,
					ease: "power2.inOut",
				});
			}

			gsap.to(texts, {
				opacity: 0,
				y: "+=10",
				duration: 0.4,
				stagger: 0.05,
				ease: "power2.out",
			});

		} else {
			if (image) {
				gsap.to(image, {
					scale: 1,
					y: 0,
					duration: 0.5,
					ease: "power2.inOut",
				});
			}

			const ctx = gsap.context(() => {
				const tl = gsap.timeline();
				const textEls = gsap.utils.toArray(
					".insight-text"
				) as HTMLElement[];

				textEls.forEach((el, i) => {
					tl.fromTo(
						el,
						{ opacity: 0, y: 30 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							ease: "power2.out",
						},
						i * 0.25
					);

					gsap.to(el, {
						y: "+=8",
						repeat: -1,
						yoyo: true,
						duration: 2,
						ease: "sine.inOut",
						delay: i * 0.25 + 0.6,
					});
				});
			}, hexagonRef);

			return () => ctx.revert();
		}
	}, [step]);

	const handleBack = () => {
		const stepMap: Record<string, TStep> = {
			walkthrough: "home",
			form: "walkthrough",
		};

		const nextStep = stepMap[step];
		if (nextStep) setStep(nextStep);
	};

	const handleRefresh = () => {
		setStep("home");
	};

	return (
		<main className="relative min-h-[100svh]">
			<div className="absolute inset-0 z-0 rounded-full bg-backdrop/10 blur-[100px]" />

			<Header
				onBack={step === "home" ? undefined : handleBack}
				onRefresh={step === "home" ? undefined : handleRefresh}
			/>

			<div className="mx-auto flex w-full max-w-full flex-col px-4 pb-8 md:max-w-[60vw] md:px-0 min-h-[calc(100svh-136px)]">
				{/* Hexagon Section */}
				<motion.div
					layout
					className={cn(
						"w-full flex items-center justify-center",
						isHome ? "pt-6 md:pt-10" : "pt-3 md:pt-4"
					)}
					transition={{ duration: 0.5, ease: "easeInOut" }}
				>
					<motion.div
						layout
						ref={hexagonRef}
						className={cn(
							"relative z-10 flex items-center justify-center aspect-[5/6] rounded-[32px]",
							isHome && "w-[240px] sm:w-[280px] md:w-[360px]",
							isWalkthrough && "w-[160px] sm:w-[190px] md:w-[240px]",
							isForm && "w-[110px] sm:w-[120px] md:w-[140px]"
						)}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
						<div className="absolute inset-0 -z-10 rounded-[32px] bg-backdrop/15 blur-2xl" />
						<AnimatePresence mode="wait">
							{step === "form" ? (
								<motion.div
									key="lottie"
									initial={{
										opacity: 0,
										scale: 0.3,
										rotate: -5,
									}}
									animate={{
										opacity: 1,
										scale: 1,
										rotate: 0,
									}}
									exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
									transition={{
										duration: 0.4,
										ease: "easeInOut",
									}}
									className="absolute inset-0 hexagon-lottie flex items-center justify-center"
								>
									<Lottie
										animationData={animationData}
										loop
										autoplay
										className="w-full h-full max-w-[70%] max-h-[70%]"
									/>
								</motion.div>
							) : (
								<motion.div
									key="image"
									initial={{
										opacity: 0,
										scale: 0.8,
										rotate: 5,
									}}
									animate={{
										opacity: 1,
										scale: 1,
										rotate: 0,
									}}
									exit={{
										opacity: 0,
										scale: 1.2,
										rotate: -5,
									}}
									transition={{
										duration: 0.6,
										ease: "easeInOut",
									}}
									className="absolute inset-0 hexagon-image"
								>
									<Image
										src="/images/hexagon.png"
										alt="Featured image"
										fill
										priority
										className="object-contain"
									/>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Animated Texts */}
						<span className="absolute top-[10%] left-[-4%] sm:left-[-10%] text-[10px] sm:text-xs max-w-[10rem] leading-snug insight-text text-shadow-lg/20">
							WA businesses feel confident about future growth
						</span>
						<span className="absolute top-[25%] right-[-4%] sm:right-[-10%] text-[10px] sm:text-xs max-w-[10rem] text-right leading-snug insight-text text-shadow-lg/20">
							AI can’t replace creativity
						</span>
						<span className="absolute bottom-[55%] left-[-4%] sm:left-[-10%] text-[10px] sm:text-xs max-w-[10rem] leading-snug insight-text text-shadow-lg/20">
							Sales measure true success
						</span>
						<span className="absolute bottom-[40%] right-[-4%] sm:right-[-10%] text-[10px] sm:text-xs max-w-[10rem] text-right leading-snug insight-text text-shadow-lg/20">
							Human connection drives WA business
						</span>
						<span className="absolute bottom-[20%] left-[-4%] sm:left-[-10%] text-[10px] sm:text-xs w-[12rem] sm:w-60 text-left leading-snug insight-text text-shadow-lg/20">
							The primary barrier to digital transformation is
							financial investment
						</span>
					</motion.div>
				</motion.div>

				{/* Main Step Content */}
				<div className="relative w-full flex-1 overflow-hidden flex items-start justify-center">
					<AnimatePresence mode="wait">
						{step === "home" && (
							<motion.div
								key="home"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{
									duration: 0.4,
									ease: "easeInOut",
								}}
								className="w-full flex flex-col items-center h-full"
							>
								<HomeSection
									onNext={() => setStep("walkthrough")}
								/>
							</motion.div>
						)}

						{step === "walkthrough" && (
							<motion.div
								key="walkthrough"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{
									duration: 0.4,
									ease: "easeInOut",
								}}
								className="w-full flex flex-col items-center"
							>
								<WalkthroughSlider
									onNext={() => setStep("form")}
								/>
							</motion.div>
						)}

						{step === "form" && (
							<motion.div
								key="form"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{
									duration: 0.4,
									ease: "easeInOut",
								}}
								className="w-full flex flex-col items-center"
							>
								<FormSteps onDone={() => setStep("home")} />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</main>
	);
}
