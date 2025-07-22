interface SlideContentProps {
  text: string
}

export default function SlideContent({ text }: SlideContentProps) {
  return (
    <div className="flex items-center justify-center h-full px-6">
      <p className="text-xl font-agrandir text-center leading-relaxed">
        {text}
      </p>
    </div>
  )
}
