"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Input from "@/components/base/Input";
import Button from "@/components/base/Button";

export default function FormSection({ onDone }: { onDone: () => void }) {
	const [step, setStep] = useState<0 | 1 | 2>(0);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleNext = () => {
		if (step === 0 && !name) return;
		if (step === 1 && !email) return;
		if (step === 2) onDone();
		else setStep((prev) => (prev + 1) as 0 | 1 | 2);
	};

	const prompt = [
		"Let’s start with the basics. Type in your first name.",
		"How should we contact you? Type in your email address.",
		`Thanks, ${name}! Now, it’s time to get a reality check.`,
	];

	return (
		<div className="w-full flex flex-col justify-center text-center relative h-full pt-6 pb-28 px-4">
			{/* Prompt Text */}
			<div className="w-full mt-10 h-24 relative">
				<AnimatePresence mode="wait">
					<motion.span
						key={step}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.35 }}
						className="absolute left-0 right-0 text-2xl max-w-xl mx-auto"
					>
						{prompt[step]}
                        {
                            step === 2 && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-2xl mt-3"
                                >
                                    This will take 2–3 minutes.
                                </motion.p>
                            )
                        }
					</motion.span>
				</AnimatePresence>
			</div>

			{/* Input / Button */}
			<div className="flex mt-auto w-full">
				<div className="mx-auto w-full max-w-md relative">
					<AnimatePresence mode="wait">
						{step < 2 ? (
							<motion.div
								key="input"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.35 }}
							>
								<Input
									type={step === 0 ? "text" : "email"}
									placeholder={
										step === 0
											? "First name"
											: "Email address"
									}
									value={step === 0 ? name : email}
									onChange={(e) =>
										step === 0
											? setName(e.target.value)
											: setEmail(e.target.value)
									}
                                    onKeyDown={(e) => e.key === "Enter" && handleNext()}
									rightIcon={
										<ArrowUp className="w-5 h-5" />
									}
									onRightIconClick={handleNext}
								/>
							</motion.div>
						) : (
							<motion.div
								key="button"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.35 }}
							>
								<Button
									onClick={handleNext}
									variant="white"
									className="mt-12 text-black font-medium w-full"
								>
									Start
								</Button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
