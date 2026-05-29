'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

export default function TheProblemPage() {
  const { lang } = useLanguage()
  const T = useT(lang)
  const P = T.theProblem

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />

      <div style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16 pt-32`}>
          <div className="max-w-[800px] mx-auto">

            <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-4">
              {P.eyebrow}
            </p>

            <h1 className="font-display font-black leading-tight tracking-tight mb-8">
              <span className="block text-[clamp(36px,6vw,64px)] text-brand-cream">{P.title}</span>
            </h1>

            <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-10">
              {P.intro}
            </p>

            {/* Case stories */}
            <div className="mb-12 space-y-0 border-l-2 border-brand-red pl-6">
              {P.cases.map((c, i) => (
                <div key={i} className="mb-6">
                  <p className="text-brand-cream text-[16px] font-light leading-relaxed">
                    <span className="font-bold text-brand-cream">{c.bold}</span> {c.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div
              className="grid grid-cols-2 mb-12"
              style={{ gap: '1px', background: '#1a1a1a' }}
            >
              {P.stats.map(s => (
                <div key={s.label} className="bg-brand-black px-6 py-6 hover:bg-brand-card transition-colors">
                  <div className="font-display text-[36px] font-black text-brand-red leading-none mb-2">{s.num}</div>
                  <div className="text-[10px] text-brand-muted font-bold tracking-[1.5px] uppercase">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-border my-12" />

            {/* Comparison section */}
            <div className="mb-12">
              <h2 className="font-display text-[20px] font-bold text-brand-cream mb-3 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
                {P.compTitle}
              </h2>
              <p className="text-brand-muted text-[16px] font-light leading-relaxed mb-8">
                {P.compSub}
              </p>

              <div className="grid grid-cols-1 gap-4">
                {P.compItems.map(({ title, subtitle, body }) => (
                  <div key={title} className="border border-brand-border p-5" style={{ background: 'rgba(192,57,43,0.03)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-display text-[15px] font-bold text-brand-cream">{title}</span>
                      <span className="text-brand-border">→</span>
                      <span className="font-display text-[15px] font-bold text-brand-red">{subtitle}</span>
                    </div>
                    <p className="text-[16px] text-brand-muted font-light leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-brand-border my-12" />

            {/* Closing */}
            <div className="mb-12 space-y-5">
              {P.closingParas.map((p, i) => (
                <p key={i} className="text-[16px] text-brand-muted font-light leading-relaxed">{p}</p>
              ))}
              <p className="font-display text-[20px] font-bold text-brand-cream">{P.closingStrong}</p>
            </div>

            <div className="border border-brand-red/30 p-8" style={{ background: 'rgba(192,57,43,0.04)' }}>
              <p className="font-display text-[28px] font-black text-brand-red italic">{P.closingBox}</p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
