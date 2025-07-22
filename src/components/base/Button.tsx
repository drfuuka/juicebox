import { cn } from '@/libs/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium text-sm px-[8px] py-[16px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
  {
    variants: {
      variant: {
        solid: 'bg-primary text-black hover:bg-primary/90',
        outline: 'border border-white text-white bg-transparent hover:bg-white/10',
        white: 'bg-white text-black hover:bg-white/90',
        whiteOutline: 'border border-white text-white bg-transparent hover:bg-white/10',
        black: 'bg-black text-white hover:bg-black/90',
        blackOutline: 'border border-black text-black bg-transparent hover:bg-black/10',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  className,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  )
}
