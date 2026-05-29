'use client'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StatusBadge from '@/components/StatusBadge'
import HeroSection from '@/components/HeroSection'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

type Record = {
  id: string; name: string; age: string | null
  crimeTypes: string[]; location: string
  incidentDate: string; convictionStatus: string
}

type Props = {
  stats: { totalRecords: number; convictions: number; districts: number; totalReports: number }
  records: Record[]
}

export default function LandingPageContent({ stats, records }: Props) {
  const { lang } = useLanguage()
  const T = useT(lang)
  const H = T.home

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />

      {/* HERO */}
      <HeroSection />

      {/* JUSTICE DELAYED */}
      <div style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-14 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center`}>
          <div className="flex-1 max-w-[480px]">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] font-black text-brand-cream leading-[1.1] mb-5">
              {H.justiceTitle[0]} <span className="text-brand-red italic">{H.justiceTitle[1]}</span> {H.justiceTitle[2]}
            </h2>
            <p className="text-brand-muted text-[16px] leading-relaxed font-light mb-8">
              {H.justiceBody}
            </p>
            <Link
              href="/registry"
              className="inline-block bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:bg-brand-red-dark transition-colors"
            >
              {H.learnMore}
            </Link>
          </div>

          <div
            className="grid grid-cols-2 w-full lg:w-auto lg:flex-shrink-0"
            style={{ gap: '1px', background: '#1e1e2e' }}
          >
            {H.justiceStats.map(s => (
              <div
                key={s.label}
                className="px-5 sm:px-10 py-5 sm:py-8 hover:brightness-110 transition-all"
                style={{ background: 'rgba(192,57,43,0.08)' }}
              >
                <div className="font-display text-[32px] sm:text-[42px] font-black text-brand-red leading-none mb-2">{s.num}</div>
                <div className="text-[9px] text-brand-muted font-bold tracking-[2px] uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* THREE PILLARS */}
      <div className="border-b border-brand-border">
        <div className={C}>
          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '1px', background: '#111' }}>
            {H.pillars.map(p => (
              <div key={p.title} className="bg-brand-black px-8 py-7 border-l-[3px] border-l-transparent hover:border-l-brand-red transition-all">
                <div className="font-display text-[15px] font-bold text-brand-cream mb-2">{p.title}</div>
                <div className="text-[12.5px] text-brand-muted leading-relaxed font-light">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* REGISTRY PREVIEW */}
      <div className="py-12 flex-1">
        <div className={C}>
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-1">{H.registryEyebrow}</p>
              <h2 className="font-display text-[30px] font-black text-brand-cream">{H.registryTitle}</h2>
              <p className="text-[12px] text-brand-muted mt-1">{H.registryShowing(records.length, stats.totalRecords)}</p>
            </div>
            <Link href="/registry" className="text-brand-red text-[10px] font-bold tracking-[1px] uppercase no-underline hover:underline">
              {H.viewAll}
            </Link>
          </div>

          <div className="border border-brand-border overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-brand-card">
                  <th className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border">{H.colName}</th>
                  <th className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border">{H.colOffense}</th>
                  <th className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border">{H.colLocation}</th>
                  <th className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border">{H.colDate}</th>
                  <th className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border">{H.colStatus}</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-brand-muted text-sm">{H.noRecords}</td>
                  </tr>
                )}
                {records.map((r, i) => (
                  <tr key={r.id} className={`border-b border-brand-border hover:bg-brand-card transition-colors ${i % 2 === 1 ? 'bg-[#080808]' : 'bg-brand-black'}`}>
                    <td className="px-5 py-3.5">
                      <div className="font-display text-[14px] font-bold text-brand-cream">{r.name}</div>
                      {r.age && <div className="text-[11px] text-brand-muted mt-0.5">{H.ageLabel} {r.age}</div>}
                    </td>
                    <td className="px-5 py-3.5 text-[12px] text-brand-muted">{r.crimeTypes.join(', ')}</td>
                    <td className="px-5 py-3.5 text-[12px] text-brand-muted">{r.location}</td>
                    <td className="px-5 py-3.5 text-[12px] text-[#444] whitespace-nowrap">{r.incidentDate}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={r.convictionStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* WHAT WE STAND FOR */}
      <div id="what-we-stand-for" style={{ background: '#0b0e18', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16`}>

          <div className="text-center mb-12">
            <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-4">{H.standEyebrow}</p>
            <h2 className="font-display text-[clamp(32px,5vw,52px)] font-black text-brand-cream leading-tight mb-4">
              {H.standTitle[0]} <span className="text-brand-red italic">{H.standTitle[1]}</span>
            </h2>
            <p className="text-brand-muted text-[16px] font-light max-w-[520px] mx-auto leading-relaxed">
              {H.standSub}
            </p>
          </div>

          {/* Government Demands */}
          <div className="mb-12">
            <h3 className="font-display text-[20px] font-bold text-brand-cream mb-1 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
              {H.govTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
              {H.govItems.map(({ n, title, desc }) => (
                <div key={n}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-brand-red font-black text-[14px] mb-3 flex-shrink-0"
                    style={{ border: '2px solid #c0392b' }}
                  >
                    {n}
                  </div>
                  <p className="font-display text-[15px] font-bold text-brand-cream mb-2">{title}</p>
                  <p className="text-[16px] text-brand-muted font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What We Must Do */}
          <div className="mb-12">
            <h3 className="font-display text-[20px] font-bold text-brand-cream mb-1 pb-2" style={{ borderBottom: '2px solid #c0392b', display: 'inline-block' }}>
              {H.mustDoTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {H.mustDoItems.map(({ n, title, desc }) => (
                <div key={n} className="border border-brand-border p-5" style={{ background: 'rgba(192,57,43,0.04)' }}>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-brand-red font-black text-[13px] mb-3"
                    style={{ border: '2px solid #c0392b' }}
                  >
                    {n}
                  </div>
                  <p className="font-display text-[15px] font-bold text-brand-cream mb-2">{title}</p>
                  <p className="text-[16px] text-brand-muted font-light leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-brand-red/30 p-8 text-center" style={{ background: 'rgba(192,57,43,0.04)' }}>
            <p className="text-brand-muted text-[16px] font-light mb-3">{H.quoteBody}</p>
            <p className="font-display text-[24px] font-black text-brand-red">{H.quoteBrand}</p>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/what-we-want"
              className="inline-block border border-brand-border text-brand-cream px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline hover:border-[#444] hover:bg-brand-card transition-all"
            >
              {H.seeDetails}
            </Link>
          </div>

        </div>
      </div>

      {/* WHO ARE WE */}
      <div id="who-are-we" className="bg-brand-black" style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className={`${C} py-16`}>
          <div className="max-w-[760px] mx-auto">
            <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-4">{H.whoEyebrow}</p>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] font-black text-brand-cream leading-tight mb-2">
              {H.whoTitle}
            </h2>
            <p className="font-display text-[22px] font-black text-brand-red italic mb-10">
              {H.whoSub}
            </p>

            <div className="space-y-5 text-[15px] text-brand-muted font-light leading-[1.8]">
              {H.whoParas.map((p, i) => <p key={i}>{p}</p>)}

              <div
                className="border-l-[3px] border-l-brand-red pl-6 py-1 my-8"
                style={{ background: 'rgba(192,57,43,0.04)' }}
              >
                <p className="text-brand-cream font-light text-[16px] leading-[1.8]">
                  {H.whoHighlight}
                </p>
              </div>

              {H.whoParas2.map((p, i) => (
                <p key={i}>
                  {i === 0 ? (
                    <>{p} <span className="text-brand-cream italic">{H.whoInline}</span></>
                  ) : p}
                </p>
              ))}

              <p className="text-brand-cream font-medium text-[16px]">{H.whoStrong}</p>
              <p>{H.whoClosing}</p>
            </div>

            <div className="mt-10 border border-brand-red/30 p-8 text-center" style={{ background: 'rgba(192,57,43,0.04)' }}>
              <p className="font-display text-[22px] font-black text-brand-cream italic mb-3">
                {H.whoQuote}
              </p>
              <p className="font-display text-[20px] font-black text-brand-red">
                {H.whoBrand}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div style={{ background: '#0d0d0d', borderTop: '3px solid #c0392b' }}>
        <div className={`${C} py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 sm:gap-8`}>
          <div>
            <h3 className="font-display text-[24px] font-black text-brand-cream mb-1 italic">
              {H.ctaTitle}
            </h3>
            <p className="text-brand-muted text-[16px] font-light">
              {H.ctaBody}
            </p>
          </div>
          <Link
            href="/seek-help"
            className="bg-brand-red text-brand-cream px-7 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase no-underline whitespace-nowrap flex-shrink-0 hover:bg-brand-red-dark transition-colors"
          >
            {H.ctaBtn}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
