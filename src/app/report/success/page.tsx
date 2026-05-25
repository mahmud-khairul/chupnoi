'use client'
import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

function SuccessContent() {
  const params = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (params.get('submitted') !== '1') {
      router.replace('/report')
    }
  }, [params, router])

  if (params.get('submitted') !== '1') return null

  return (
    <div className="flex-1 flex items-center justify-center px-10 py-24">
      <div className="max-w-[560px] w-full text-center">
        {/* Check circle */}
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(39,174,96,0.12)', border: '2px solid #27ae60' }}
          >
            <svg width="36" height="36" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        <p className="text-[10px] text-brand-red font-bold tracking-[3px] uppercase mb-4">Submitted Successfully</p>
        <h1 className="font-display text-[clamp(36px,6vw,64px)] font-black text-brand-cream tracking-tight leading-[0.95] mb-6">
          Report<br />Received.
        </h1>

        <div
          className="border border-brand-border p-7 mb-8 text-left"
          style={{ background: '#0f0f0f' }}
        >
          <div className="space-y-4 text-[16px] text-brand-muted leading-relaxed font-light">
            <p>
              Thank you for submitting this report. Our review team will carefully verify the information
              against public records, law enforcement data, and available documentation.
            </p>
            <p>
              <span className="text-brand-cream font-medium">Review timeline:</span> Reports are typically
              reviewed within <span className="text-brand-cream font-medium">5–7 business days</span>. You
              will not receive an automated confirmation email, but your submission has been recorded.
            </p>
            <p>
              Records are only published after verification. If additional information is needed and you
              provided contact details, our team may reach out.
            </p>
          </div>
        </div>

        <div
          className="border border-brand-border p-5 mb-10 text-left"
          style={{ background: '#0f0f0f', borderLeft: '3px solid #c0392b' }}
        >
          <p className="text-[11px] text-brand-muted font-light leading-relaxed">
            <span className="text-brand-cream font-medium">Need immediate help?</span>{' '}
            Contact Ain o Salish Kendra at{' '}
            <span className="text-brand-cream">01779-554391</span> or Bangladesh National
            Women Lawyers Association at <span className="text-brand-cream">01711-664165</span>.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            href="/registry"
            className="bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:bg-brand-red-dark transition-colors"
          >
            View Registry
          </Link>
          <Link
            href="/"
            className="text-brand-cream border border-brand-border px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:border-[#444] transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />
      <Suspense fallback={null}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  )
}
