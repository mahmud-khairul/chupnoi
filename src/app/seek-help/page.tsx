'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[14px] font-bold tracking-normal uppercase mb-1.5 text-brand-muted">
      {children}{required && <span className="text-brand-red ml-1">*</span>}
    </label>
  )
}

function Input({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#0d0d0d] text-brand-cream px-3 py-2.5 text-[14px] outline-none font-sans placeholder:text-[#2a2a2a]"
      style={{ border: '1px solid #1e1e1e' }}
      onFocus={e => e.currentTarget.style.borderColor = '#444'}
      onBlur={e => e.currentTarget.style.borderColor = '#1e1e1e'}
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 5 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#0d0d0d] text-brand-cream px-3 py-2.5 text-[14px] outline-none font-sans resize-none placeholder:text-[#2a2a2a]"
      style={{ border: '1px solid #1e1e1e' }}
      onFocus={e => e.currentTarget.style.borderColor = '#444'}
      onBlur={e => e.currentTarget.style.borderColor = '#1e1e1e'}
    />
  )
}

type FormData = { name: string; location: string; phone: string; email: string; message: string }
const INIT: FormData = { name: '', location: '', phone: '', email: '', message: '' }
const fieldCls = 'mb-4'
const twoCol = 'grid grid-cols-1 sm:grid-cols-2 gap-4'

type Tab = 'legal' | 'medical'

function HelpForm({ type, onSuccess, lbl }: { type: Tab; onSuccess: () => void; lbl: ReturnType<typeof useT>['seekHelp'] }) {
  const [form, setForm] = useState<FormData>(INIT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  function set(k: keyof FormData, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/help-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...form }),
      })
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? lbl.errorGeneric)
        setSubmitting(false)
        return
      }
      onSuccess()
    } catch {
      setError(lbl.errorNetwork)
      setSubmitting(false)
    }
  }

  const ph = type === 'legal' ? lbl.legalPh : lbl.medicalPh

  return (
    <form onSubmit={submit}>
      <div className={twoCol}>
        <div className={fieldCls}>
          <FieldLabel required>{lbl.nameLbl}</FieldLabel>
          <Input value={form.name} onChange={v => set('name', v)} placeholder={lbl.namePh} />
        </div>
        <div className={fieldCls}>
          <FieldLabel required>{lbl.locationLbl}</FieldLabel>
          <Input value={form.location} onChange={v => set('location', v)} placeholder={lbl.locationPh} />
        </div>
      </div>

      <div className={twoCol}>
        <div className={fieldCls}>
          <FieldLabel required>{lbl.phoneLbl}</FieldLabel>
          <Input value={form.phone} onChange={v => set('phone', v)} placeholder="+880" type="tel" />
        </div>
        <div className={fieldCls}>
          <FieldLabel required>{lbl.emailLbl}</FieldLabel>
          <Input value={form.email} onChange={v => set('email', v)} placeholder="email@example.com" type="email" />
        </div>
      </div>

      <div className={fieldCls}>
        <FieldLabel required>{lbl.messageLbl}</FieldLabel>
        <Textarea value={form.message} onChange={v => set('message', v)} placeholder={ph} rows={6} />
      </div>

      {error && <p className="text-brand-red text-[13px] mb-4 border-l-[3px] border-brand-red pl-3">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-brand-red text-brand-cream px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase hover:bg-brand-red-dark disabled:opacity-50 cursor-pointer border-none font-sans transition-colors mt-2"
      >
        {submitting ? lbl.submitting : lbl.submitBtn}
      </button>
    </form>
  )
}

function SuccessMessage({ lbl }: { lbl: ReturnType<typeof useT>['seekHelp'] }) {
  return (
    <div className="py-16 text-center max-w-[480px] mx-auto">
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 flex items-center justify-center" style={{ background: 'rgba(39,174,96,0.10)', border: '2px solid #27ae60' }}>
          <svg width="28" height="28" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>
      <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-3">{lbl.successEyebrow}</p>
      <p className="font-display text-[32px] font-black text-brand-cream leading-tight mb-4">
        {lbl.successTitle.split('\n').map((line, i) => (
          <span key={i}>{line}{i < lbl.successTitle.split('\n').length - 1 && <br />}</span>
        ))}
      </p>
      <p className="text-brand-muted text-[14px] font-light leading-relaxed">{lbl.successBody}</p>
    </div>
  )
}

export default function SeekHelpPage() {
  const [tab, setTab] = useState<Tab>('legal')
  const [success, setSuccess] = useState(false)
  const { lang } = useLanguage()
  const T = useT(lang)
  const SH = T.seekHelp

  function handleTabChange(t: Tab) {
    setTab(t)
    setSuccess(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />

      <div className="pt-28 pb-16 flex-1">
        <div className={C}>

          <div className="mb-12">
            <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-4">{SH.eyebrow}</p>
            <h1 className="font-display font-black leading-[0.92] tracking-tight">
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-cream">{SH.title1}</span>
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-red italic">{SH.title2}</span>
            </h1>
          </div>

          <div
            className="mb-8 max-w-[860px] grid grid-cols-2"
            style={{ gap: '1px', background: '#1a1a1a' }}
          >
            {SH.tabs.map(t => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id as Tab)}
                className={`py-3.5 text-[12px] font-bold tracking-[1.5px] uppercase cursor-pointer border-none transition-colors ${
                  tab === t.id
                    ? 'bg-brand-red text-brand-cream'
                    : 'bg-brand-black text-brand-muted hover:text-brand-cream'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="max-w-[860px]">
            {success ? (
              <SuccessMessage lbl={SH} />
            ) : (
              <>
                {tab === 'legal' && (
                  <>
                    <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
                      <p className="text-[14px] text-brand-muted leading-relaxed font-light">
                        <strong className="text-brand-cream">{SH.legalDescStrong}</strong> {SH.legalDesc}
                      </p>
                    </div>
                    <HelpForm key="legal" type="legal" onSuccess={() => setSuccess(true)} lbl={SH} />
                  </>
                )}
                {tab === 'medical' && (
                  <>
                    <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
                      <p className="text-[14px] text-brand-muted leading-relaxed font-light">
                        <strong className="text-brand-cream">{SH.medicalDescStrong}</strong> {SH.medicalDesc}
                      </p>
                    </div>
                    <HelpForm key="medical" type="medical" onSuccess={() => setSuccess(true)} lbl={SH} />
                  </>
                )}
              </>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
