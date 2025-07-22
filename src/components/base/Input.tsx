import { cn } from "@/libs/utils";
import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	rightIcon?: React.ReactNode;
	onRightIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, type, label, error, rightIcon, onRightIconClick, ...props }, ref) => {
		return (
			<div className="w-full space-y-2">
				{label && (
					<label className="text-sm font-medium text-white">
						{label}
					</label>
				)}

				<div
					className={cn(
						"relative rounded-2xl border border-white/20 bg-white/5 transition",
						error ? "border-red-500" : "focus-within:border-white/40"
					)}
				>
					<input
						type={type}
						ref={ref}
						className={cn(
							"peer w-full px-4 py-5 pr-12 text-sm text-white placeholder:text-white/40 bg-transparent focus:outline-none",
							className
						)}
						{...props}
					/>

					{/* Right icon button */}
					{rightIcon && (
						<button
							type="button"
							onClick={onRightIconClick}
							className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white cursor-pointer"
						>
							{rightIcon}
						</button>
					)}
				</div>

				{error && (
					<p className="text-sm text-red-500 font-medium">
						{error}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
