'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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
const field = 'mb-4'
const twoCol = 'grid grid-cols-1 sm:grid-cols-2 gap-4'

function HelpForm({ type, onSuccess }: { type: 'legal' | 'medical'; onSuccess: () => void }) {
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
        setError(d.error ?? 'কিছু একটা ভুল হয়েছে।')
        setSubmitting(false)
        return
      }
      onSuccess()
    } catch {
      setError('নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।')
      setSubmitting(false)
    }
  }

  const descPlaceholder = type === 'legal'
    ? 'আপনার পরিস্থিতি বিস্তারিত বর্ণনা করুন — কী ঘটেছে, কোনো মামলা আছে কিনা, কী ধরনের আইনি সহায়তা দরকার...'
    : 'আপনার পরিস্থিতি বিস্তারিত বর্ণনা করুন — কী ধরনের মানসিক বা শারীরিক সহায়তা দরকার, কতদিন ধরে সমস্যা হচ্ছে...'

  return (
    <form onSubmit={submit}>
      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>নাম</FieldLabel>
          <Input value={form.name} onChange={v => set('name', v)} placeholder="আপনার পূর্ণ নাম" />
        </div>
        <div className={field}>
          <FieldLabel required>লোকেশন</FieldLabel>
          <Input value={form.location} onChange={v => set('location', v)} placeholder="জেলা / উপজেলা" />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>ফোন নম্বর</FieldLabel>
          <Input value={form.phone} onChange={v => set('phone', v)} placeholder="+880" type="tel" />
        </div>
        <div className={field}>
          <FieldLabel required>ই-মেইল আইডি</FieldLabel>
          <Input value={form.email} onChange={v => set('email', v)} placeholder="email@example.com" type="email" />
        </div>
      </div>

      <div className={field}>
        <FieldLabel required>আমাদের কাছে কি সহায়তা চান? ডিটেল-এ বলুন</FieldLabel>
        <Textarea value={form.message} onChange={v => set('message', v)} placeholder={descPlaceholder} rows={6} />
      </div>

      {error && <p className="text-brand-red text-[13px] mb-4 border-l-[3px] border-brand-red pl-3">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="bg-brand-red text-brand-cream px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase hover:bg-brand-red-dark disabled:opacity-50 cursor-pointer border-none font-sans transition-colors mt-2"
      >
        {submitting ? 'জমা দেওয়া হচ্ছে...' : 'সহায়তার অনুরোধ পাঠান →'}
      </button>
    </form>
  )
}

function SuccessMessage() {
  return (
    <div className="py-16 text-center max-w-[480px] mx-auto">
      <div className="flex justify-center mb-8">
        <div className="w-16 h-16 flex items-center justify-center" style={{ background: 'rgba(39,174,96,0.10)', border: '2px solid #27ae60' }}>
          <svg width="28" height="28" fill="none" stroke="#27ae60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      </div>
      <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-3">সফলভাবে জমা হয়েছে</p>
      <p className="font-display text-[32px] font-black text-brand-cream leading-tight mb-4">ধন্যবাদ।<br />আমরা শীঘ্রই যোগাযোগ করব।</p>
      <p className="text-brand-muted text-[14px] font-light leading-relaxed">
        আপনার অনুরোধটি পেয়েছি। আমরা যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।
      </p>
    </div>
  )
}

type Tab = 'legal' | 'medical'

const TABS: { id: Tab; label: string }[] = [
  { id: 'legal', label: 'আইনি সহায়তা' },
  { id: 'medical', label: 'ডাক্তার বা মনোবিজ্ঞানী এর সহায়তা' },
]

export default function SeekHelpPage() {
  const [tab, setTab] = useState<Tab>('legal')
  const [success, setSuccess] = useState(false)

  function handleTabChange(t: Tab) {
    setTab(t)
    setSuccess(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />

      <div className="pt-28 pb-16 flex-1">
        <div className={C}>

          {/* Header */}
          <div className="mb-12">
            <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-4">চুপ নই · সহায়তা</p>
            <h1 className="font-display font-black leading-[0.92] tracking-tight">
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-cream">হাত বারান।</span>
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-red italic">আমরা আছি।</span>
            </h1>
          </div>

          {/* Tabs */}
          <div
            className="mb-8 max-w-[860px] grid grid-cols-2"
            style={{ gap: '1px', background: '#1a1a1a' }}
          >
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => handleTabChange(t.id)}
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

          {/* Form area */}
          <div className="max-w-[860px]">
            {success ? (
              <SuccessMessage />
            ) : (
              <>
                {tab === 'legal' && (
                  <>
                    <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
                      <p className="text-[14px] text-brand-muted leading-relaxed font-light">
                        <strong className="text-brand-cream">আইনি সহায়তার জন্য</strong> — আপনি বা আপনার পরিচিত কেউ যদি নির্যাতনের শিকার হন এবং আইনি পদক্ষেপ নিতে চান, আমরা সঠিক আইনজীবীর সাথে যোগাযোগ করিয়ে দেওয়ার চেষ্টা করব।
                      </p>
                    </div>
                    <HelpForm key="legal" type="legal" onSuccess={() => setSuccess(true)} />
                  </>
                )}
                {tab === 'medical' && (
                  <>
                    <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
                      <p className="text-[14px] text-brand-muted leading-relaxed font-light">
                        <strong className="text-brand-cream">মানসিক ও চিকিৎসা সহায়তার জন্য</strong> — ট্রমা, উদ্বেগ বা অন্য কোনো মানসিক সমস্যায় সাহায্য দরকার হলে আমরা প্রশিক্ষিত ডাক্তার বা মনোবিজ্ঞানীর সাথে সংযোগ করিয়ে দেব।
                      </p>
                    </div>
                    <HelpForm key="medical" type="medical" onSuccess={() => setSuccess(true)} />
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
