'use client'

import { RefreshCw, ArrowLeft } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  onBack?: () => void
  onRefresh?: () => void
}

export default function Header({ onBack, onRefresh }: HeaderProps) {
  return (
    <header className="flex items-center justify-between z-10 w-full py-4 md:py-10 px-4">
      {onBack ? (
        <button
          className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center cursor-pointer"
          aria-label="Go back"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      ) : (
        <div className="w-14 h-14" />
      )}

      <div>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={0}
          height={0}
          style={{ width: '150px', height: 'auto' }}
        />
      </div>

      <button
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center cursor-pointer"
        aria-label="Refresh page"
        onClick={onRefresh}
      >
        <RefreshCw className="w-5 h-5 text-white" />
      </button>
    </header>
  )
}
