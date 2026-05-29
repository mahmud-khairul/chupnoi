'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

export default function WhatWeWantPage() {
  const { lang } = useLanguage()
  const T = useT(lang)
  const W = T.whatWeWant

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />

      <div style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16 pt-32`}>
          <div className="max-w-[800px] mx-auto">

            <h1 className="font-display font-black leading-[0.92] tracking-tight mb-8">
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-cream">{W.title1}</span>
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-red italic">{W.title2}</span>
            </h1>
            <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-12 max-w-[680px]">
              {W.intro} <strong className="text-brand-cream">{W.introStrong}</strong> {W.introEnd}
            </p>

            {/* Government Demands */}
            <div className="mb-12">
              <h3 className="font-display text-[20px] font-bold text-brand-cream mb-3 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
                {W.govTitle}
              </h3>
              <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-8">
                {W.govSub}
              </p>

              <div className="space-y-8">
                {W.govItems.map(({ n, title, body }) => (
                  <div key={n} className="flex gap-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-brand-red font-black text-[14px] flex-shrink-0 mt-0.5"
                      style={{ border: '2px solid #c0392b' }}
                    >
                      {n}
                    </div>
                    <div>
                      <p className="font-display text-[17px] font-bold text-brand-cream mb-2">{title}</p>
                      <p className="text-[16px] text-brand-muted font-light leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-brand-border my-12" />

            {/* People's Appeal */}
            <div className="mb-12">
              <h3 className="font-display text-[20px] font-bold text-brand-cream mb-3 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
                {W.peopleTitle}
              </h3>
              <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-8">
                {W.peopleSub}
              </p>

              <div className="space-y-8">
                {W.peopleItems.map(({ n, title, body }) => (
                  <div key={n} className="flex gap-5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-brand-red font-black text-[14px] flex-shrink-0 mt-0.5"
                      style={{ border: '2px solid #c0392b' }}
                    >
                      {n}
                    </div>
                    <div>
                      <p className="font-display text-[17px] font-bold text-brand-cream mb-2">{title}</p>
                      <p className="text-[16px] text-brand-muted font-light leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing statement */}
            <div className="border border-brand-red/30 p-8" style={{ background: 'rgba(192,57,43,0.04)' }}>
              <h3 className="font-display text-[20px] font-bold text-brand-cream mb-5">{W.bangladeshTitle}</h3>
              <div className="space-y-2 text-[16px] text-brand-muted font-light leading-relaxed mb-6">
                {W.bangladeshLines.map((line, i) => <p key={i}>{line}</p>)}
              </div>
              <p className="text-brand-cream text-[15px] font-medium mb-4">{W.bangladeshStrong}</p>
              <p className="font-display text-[24px] font-black text-brand-red">{W.bangladeshBrand}</p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
