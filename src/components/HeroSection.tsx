'use client'
import { useRef, useCallback } from 'react'
import Link from 'next/link'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

export default function HeroSection() {
  const flareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    if (flareRef.current) {
      flareRef.current.style.background = `radial-gradient(circle 60% at ${x}% ${y}%, rgba(192,57,43,0.18) 0%, rgba(192,57,43,0.06) 45%, transparent 75%)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (flareRef.current) {
      flareRef.current.style.background = 'radial-gradient(circle 60% at 20% 50%, rgba(192,57,43,0.10) 0%, rgba(192,57,43,0.03) 45%, transparent 75%)'
    }
  }, [])

  return (
    <div
      className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* cursor-following flare */}
      <div
        ref={flareRef}
        className="absolute pointer-events-none transition-[background] duration-75"
        style={{
          inset: '-80px',
          filter: 'blur(60px)',
          background: 'radial-gradient(circle 60% at 20% 50%, rgba(192,57,43,0.10) 0%, rgba(192,57,43,0.03) 45%, transparent 75%)',
        }}
      />

      <div className={`${C} pt-28 pb-16 flex flex-col justify-center relative`}>
        <div className="text-[10px] text-brand-red font-bold tracking-[3.5px] uppercase mb-8 flex items-center gap-1.5">
          <svg viewBox="0 0 20 20" fill="currentColor" width="10" height="10">
            <path d="M10 1L3 4v5c0 4.4 3 8.5 7 9.9C14 17.5 17 13.4 17 9V4L10 1z" />
          </svg>
          বাংলাদেশ শিশু সুরক্ষা উদ্যোগ
        </div>

        <h1 className="font-display font-black leading-[0.92] tracking-tight mb-8 max-w-[820px]">
          <span className="block text-[clamp(64px,10vw,120px)] text-brand-cream">চুপ নই।</span>
          <span className="block text-[clamp(64px,10vw,120px)] text-brand-red italic">Not Silent.</span>
        </h1>

        <div className="mb-10 max-w-[480px]">
          <p className="text-brand-cream text-[15px] mb-2 font-light">আমরা দেখছি। আমরা বলবো।</p>
          <p className="text-brand-muted text-[15px] leading-relaxed font-light">
            আমরা সাধারণ মানুষ। একটা শিশু কষ্ট পেলে ঘুমাতে পারি না। তাই এটা বানিয়েছি।
          </p>
        </div>

        <div
          className="grid grid-cols-3 mb-12 max-w-[680px]"
          style={{ gap: '1px', background: '#1a1a1a' }}
        >
          {[
            { num: '৭,০৬৮', label: '২০২৫ সালে ধর্ষণের মামলা' },
            { num: '২৭%', label: '২০২৪ থেকে বৃদ্ধি' },
            { num: '৯৯%', label: 'মামলা জনসমক্ষে অদৃশ্য' },
          ].map(s => (
            <div key={s.label} className="bg-brand-black px-6 py-5 hover:bg-brand-card transition-colors">
              <div className="font-display text-[36px] font-black text-brand-red leading-none mb-2">{s.num}</div>
              <div className="text-[14px] text-brand-muted font-bold tracking-[1.5px] uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-brand-muted font-light tracking-wide mb-8 -mt-8">*ইন্টারনেট থেকে সংগৃহীত</p>

        <div className="flex gap-3">
          <Link
            href="/report"
            className="bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:bg-brand-red-dark transition-colors"
          >
            Report a Case →
          </Link>
          <Link
            href="/registry"
            className="text-brand-cream border border-[#2a2a2a] px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:border-[#444] transition-colors"
          >
            View Registry
          </Link>
        </div>
      </div>
    </div>
  )
}
