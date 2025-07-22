"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HomeSection from "./HomeSection";
import WalkthroughSlider from "./WalkthroughSlider";
import Header from "./Header";
import gsap from "gsap";
import FormSteps from "./FormStep";

type TStep = "home" | "walkthrough" | "form";

export default function HomeSlider() {
	const [step, setStep] = useState<TStep>("home");
	const hexagonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const hexagon = hexagonRef.current;
		if (!hexagon) return;

		const image = hexagon.querySelector("img");
		const texts = hexagon.querySelectorAll(".insight-text");

		if (step === "walkthrough") {
			gsap.to(image, {
				scale: 0.75,
				y: 0,
				duration: 0.5,
				ease: "power2.inOut",
			});

			gsap.to(texts, {
				opacity: 0,
				y: "+=10",
				duration: 0.4,
				stagger: 0.1,
				ease: "power2.out",
			});

			gsap.to(hexagon, {
				height: 350,
				duration: 0.5,
				ease: "power2.inOut",
			});
		} else if (step === "form") {
			gsap.to(image, {
				scale: 0.15,
				y: 0,
				duration: 0.5,
				ease: "power2.inOut",
			});

			gsap.to(texts, {
				opacity: 0,
				y: "+=10",
				duration: 0.4,
				stagger: 0.05,
				ease: "power2.out",
			});

			gsap.to(hexagon, {
				height: 100,
				duration: 0.5,
				ease: "power2.inOut",
			});
		} else {
			gsap.to(image, {
				scale: 1,
				y: 0,
				duration: 0.5,
				ease: "power2.inOut",
			});

			gsap.to(hexagon, {
				height: 350,
				duration: 0.5,
				ease: "power2.inOut",
			});

			const ctx = gsap.context(() => {
				const tl = gsap.timeline();
				const textEls = gsap.utils.toArray(".insight-text") as HTMLElement[];

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

	return (
		<main className="relative h-full">
			<div className="absolute inset-0 z-0 rounded-full bg-backdrop/10 blur-[100px]"/>

			<Header onBack={step === "home" ? undefined : handleBack} />

			<div className="p-4 w-full max-w-[60vw] mx-auto h-[calc(100vh-136px)]">
				{/* Hexagon Section */}
				<div className="w-full flex items-center justify-center overflow-hidden">
					<div
						ref={hexagonRef}
						className="relative z-10 w-[350px] flex items-center justify-center"
						style={{ height: 350 }}
					>
						<Image
							src="/images/hexagon.png"
							alt="Featured image"
							width={300}
							height={300}
							priority
						/>

						{/* Animated Texts */}
						<span className="absolute top-[10%] left-[-10%] text-xs insight-text text-shadow-lg/20">
							WA businesses feel confident about future growth
						</span>
						<span className="absolute top-[30%] right-[-10%] text-xs insight-text text-shadow-lg/20">
							AI can’t replace creativity
						</span>
						<span className="absolute bottom-[50%] left-[-10%] text-xs insight-text text-shadow-lg/20">
							Sales measure true success
						</span>
						<span className="absolute bottom-[35%] right-[-10%] text-xs insight-text text-shadow-lg/20">
							Human connection drives WA business
						</span>
						<span className="absolute bottom-[10%] left-[-10%] text-xs w-60 text-left insight-text text-shadow-lg/20">
							The primary barrier to digital transformation is financial investment
						</span>
					</div>
				</div>

				{/* Main Step Content */}
				<div className="relative w-full overflow-hidden">
					<AnimatePresence mode="wait">
						{step === "home" && (
							<motion.div
								key="home"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.4, ease: "easeInOut" }}
								className="w-full flex flex-col items-center h-full"
							>
								<HomeSection onNext={() => setStep("walkthrough")} />
							</motion.div>
						)}

						{step === "walkthrough" && (
							<motion.div
								key="walkthrough"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.4, ease: "easeInOut" }}
								className="w-full flex flex-col items-center"
							>
								<WalkthroughSlider onNext={() => setStep("form")} />
							</motion.div>
						)}

						{step === "form" && (
							<motion.div
								key="form"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 0.4, ease: "easeInOut" }}
								className="w-full flex flex-col items-center"
							>
								<FormSteps onDone={() => console.log("te")} />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</main>
	);
}
