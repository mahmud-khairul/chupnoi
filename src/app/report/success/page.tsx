'use client'
import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'

function SuccessContent() {
  const params = useSearchParams()
  const router = useRouter()
  const { lang } = useLanguage()
  const T = useT(lang)
  const S = T.reportSuccess

  useEffect(() => {
    if (params.get('submitted') !== '1') {
      router.replace('/report')
    }
  }, [params, router])

  if (params.get('submitted') !== '1') return null

  return (
    <div className="flex-1 flex items-center justify-center px-10 py-24">
      <div className="max-w-[560px] w-full text-center">
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

        <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-4">{S.eyebrow}</p>
        <h1 className="font-display text-[clamp(36px,6vw,64px)] font-black text-brand-cream tracking-tight leading-[0.95] mb-6">
          {S.title.split('\n').map((line, i) => (
            <span key={i}>{line}{i < S.title.split('\n').length - 1 && <br />}</span>
          ))}
        </h1>

        <div
          className="border border-brand-border p-7 mb-8 text-left"
          style={{ background: '#0f0f0f' }}
        >
          <div className="space-y-4 text-[16px] text-brand-muted leading-relaxed font-light">
            <p>{S.para1}</p>
            <p>
              <span className="text-brand-cream font-medium">{S.para2strong}</span> {S.para2end}
            </p>
            <p>{S.para3}</p>
          </div>
        </div>

        <div
          className="border border-brand-border p-5 mb-10 text-left"
          style={{ background: '#0f0f0f', borderLeft: '3px solid #c0392b' }}
        >
          <p className="text-[11px] text-brand-muted font-light leading-relaxed">
            <span className="text-brand-cream font-medium">{S.urgentLabel}</span>{' '}
            {S.urgentBody}
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            href="/registry"
            className="bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:bg-brand-red-dark transition-colors"
          >
            {S.viewRegistry}
          </Link>
          <Link
            href="/"
            className="text-brand-cream border border-brand-border px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:border-[#444] transition-colors"
          >
            {S.goHome}
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
