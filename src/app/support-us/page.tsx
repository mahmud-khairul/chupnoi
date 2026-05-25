'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

// ── shared primitives ──────────────────────────────────────────────────────────

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-bold tracking-[2px] uppercase mb-1.5 text-brand-muted">
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
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
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
    />
  )
}

function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: string[]
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-[#0d0d0d] text-brand-cream px-3 py-2.5 text-[14px] outline-none font-sans"
      style={{ border: '1px solid #1e1e1e' }}
    >
      <option value="" disabled>— বেছে নিন —</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

const twoCol = 'grid grid-cols-2 gap-4'
const field = 'mb-4'

// ── NGO form ──────────────────────────────────────────────────────────────────

const NGO_FOCUS = ['শিশু সুরক্ষা', 'নারী অধিকার', 'আইনি সহায়তা', 'মানসিক স্বাস্থ্য', 'মানবাধিকার', 'অন্যান্য']

type NgoForm = {
  orgName: string; regNum: string; contactPerson: string; contactTitle: string
  email: string; phone: string; district: string; focusArea: string; howToHelp: string
}
const NGO_INIT: NgoForm = { orgName: '', regNum: '', contactPerson: '', contactTitle: '', email: '', phone: '', district: '', focusArea: '', howToHelp: '' }

function NgoTab({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<NgoForm>(NGO_INIT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  function set(k: keyof NgoForm, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSubmitting(true)
    try {
      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'ngo', ...form }) })
      if (!res.ok) { const d = await res.json(); setError(d.error ?? 'কিছু একটা ভুল হয়েছে।'); setSubmitting(false); return }
      onSuccess()
    } catch { setError('নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।'); setSubmitting(false) }
  }

  return (
    <form onSubmit={submit}>
      <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
        <p className="text-[14px] text-brand-muted leading-relaxed font-light">
          <strong className="text-brand-cream">এনজিও ও সংস্থাগুলোর জন্য</strong> যারা শিশু সুরক্ষা, নারী অধিকার ও জবাবদিহিতায় প্রতিশ্রুতিবদ্ধ। আপনার সংস্থা যাচাইকৃত সমর্থক হিসেবে প্রকাশ্য তালিকাভুক্ত হবে।
        </p>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>সংস্থার নাম</FieldLabel>
          <Input value={form.orgName} onChange={v => set('orgName', v)} placeholder="Full official name" />
        </div>
        <div className={field}>
          <FieldLabel>নিবন্ধন নম্বর</FieldLabel>
          <Input value={form.regNum} onChange={v => set('regNum', v)} placeholder="NGO Affairs Bureau / Joint Stock" />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>যোগাযোগের ব্যক্তি</FieldLabel>
          <Input value={form.contactPerson} onChange={v => set('contactPerson', v)} placeholder="Full name" />
        </div>
        <div className={field}>
          <FieldLabel>পদবি</FieldLabel>
          <Input value={form.contactTitle} onChange={v => set('contactTitle', v)} placeholder="Executive Director, etc." />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>ইমেইল</FieldLabel>
          <Input value={form.email} onChange={v => set('email', v)} placeholder="official@organization.org" type="email" />
        </div>
        <div className={field}>
          <FieldLabel>ফোন নম্বর</FieldLabel>
          <Input value={form.phone} onChange={v => set('phone', v)} placeholder="+880" />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>কার্যক্ষেত্র জেলা</FieldLabel>
          <Input value={form.district} onChange={v => set('district', v)} placeholder="Dhaka, Chittagong, etc." />
        </div>
        <div className={field}>
          <FieldLabel required>মনোযোগের ক্ষেত্র</FieldLabel>
          <Select value={form.focusArea} onChange={v => set('focusArea', v)} options={NGO_FOCUS} />
        </div>
      </div>

      <div className={field}>
        <FieldLabel required>চুপ নই-কে কীভাবে সহযোগিতা করবেন?</FieldLabel>
        <Textarea value={form.howToHelp} onChange={v => set('howToHelp', v)} placeholder="Case verification, legal support, survivor services, advocacy..." rows={4} />
      </div>

      {error && <p className="text-brand-red text-[13px] mb-4 border-l-[3px] border-brand-red pl-3">{error}</p>}
      <SubmitButton submitting={submitting} />
    </form>
  )
}

// ── Lawyer form ───────────────────────────────────────────────────────────────

const LAWYER_COURTS = ['Supreme Court', 'High Court Division', 'District Court', 'Session Court', 'Other']
const LAWYER_SPECIALTIES = ['Criminal Law', 'Family Law', 'Child Rights', 'Human Rights', 'Women Rights', 'General Practice']
const LAWYER_SUPPORT = ['Free', 'Subsidised', 'Consultation only', 'Case Referral']

type LawyerForm = {
  fullName: string; barCouncilId: string; court: string; specialty: string
  email: string; phone: string; district: string; supportType: string
}
const LAWYER_INIT: LawyerForm = { fullName: '', barCouncilId: '', court: '', specialty: '', email: '', phone: '', district: '', supportType: '' }

function LawyerTab({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<LawyerForm>(LAWYER_INIT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  function set(k: keyof LawyerForm, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSubmitting(true)
    try {
      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'lawyer', ...form }) })
      if (!res.ok) { const d = await res.json(); setError(d.error ?? 'কিছু একটা ভুল হয়েছে।'); setSubmitting(false); return }
      onSuccess()
    } catch { setError('নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।'); setSubmitting(false) }
  }

  return (
    <form onSubmit={submit}>
      <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
        <p className="text-[14px] text-brand-muted leading-relaxed font-light">
          <strong className="text-brand-cream">আইনজীবীদের জন্য</strong> যারা বিনামূল্যে বা ভর্তুকিমূলক আইনি সহায়তা দিতে ইচ্ছুক। আপনি আমাদের নেটওয়ার্কে যাচাইকৃত আইনি সহায়তাকারী হিসেবে তালিকাভুক্ত হবেন।
        </p>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>পুরো নাম</FieldLabel>
          <Input value={form.fullName} onChange={v => set('fullName', v)} placeholder="As per Bar Council ID" />
        </div>
        <div className={field}>
          <FieldLabel required>বাংলাদেশ বার কাউন্সিল আইডি</FieldLabel>
          <Input value={form.barCouncilId} onChange={v => set('barCouncilId', v)} placeholder="BBC Registration Number" />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>অনুশীলনের আদালত</FieldLabel>
          <Select value={form.court} onChange={v => set('court', v)} options={LAWYER_COURTS} />
        </div>
        <div className={field}>
          <FieldLabel required>বিশেষজ্ঞতা</FieldLabel>
          <Select value={form.specialty} onChange={v => set('specialty', v)} options={LAWYER_SPECIALTIES} />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>ইমেইল</FieldLabel>
          <Input value={form.email} onChange={v => set('email', v)} placeholder="your@email.com" type="email" />
        </div>
        <div className={field}>
          <FieldLabel required>ফোন নম্বর</FieldLabel>
          <Input value={form.phone} onChange={v => set('phone', v)} placeholder="+880" />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>জেলা</FieldLabel>
          <Input value={form.district} onChange={v => set('district', v)} placeholder="Where you practice" />
        </div>
        <div className={field}>
          <FieldLabel required>সহায়তার ধরন</FieldLabel>
          <Select value={form.supportType} onChange={v => set('supportType', v)} options={LAWYER_SUPPORT} />
        </div>
      </div>

      {error && <p className="text-brand-red text-[13px] mb-4 border-l-[3px] border-brand-red pl-3">{error}</p>}
      <SubmitButton submitting={submitting} />
    </form>
  )
}

// ── Doctor form ───────────────────────────────────────────────────────────────

const DOCTOR_SUPPORT = ['Free Consultation', 'Subsidized Treatment', 'Forensic Examination', 'Mental Health Support', 'Expert witness in court']

type DoctorForm = {
  fullName: string; bmdcId: string; specialty: string; institution: string
  email: string; phone: string; district: string; supportType: string
}
const DOCTOR_INIT: DoctorForm = { fullName: '', bmdcId: '', specialty: '', institution: '', email: '', phone: '', district: '', supportType: '' }

function DoctorTab({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState<DoctorForm>(DOCTOR_INIT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  function set(k: keyof DoctorForm, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSubmitting(true)
    try {
      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'doctor', ...form }) })
      if (!res.ok) { const d = await res.json(); setError(d.error ?? 'কিছু একটা ভুল হয়েছে।'); setSubmitting(false); return }
      onSuccess()
    } catch { setError('নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।'); setSubmitting(false) }
  }

  return (
    <form onSubmit={submit}>
      <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
        <p className="text-[14px] text-brand-muted leading-relaxed font-light">
          <strong className="text-brand-cream">ডাক্তার ও মনোবিজ্ঞানীদের জন্য</strong> যারা ভুক্তভোগীদের চিকিৎসা ও মানসিক সহায়তা দিতে ইচ্ছুক। ফরেনসিক বিশেষজ্ঞ, মনোরোগ বিশেষজ্ঞ সহ সবাইকে স্বাগত।
        </p>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>পুরো নাম</FieldLabel>
          <Input value={form.fullName} onChange={v => set('fullName', v)} placeholder="As per BMDC registration" />
        </div>
        <div className={field}>
          <FieldLabel required>বিএমডিসি নিবন্ধন নম্বর</FieldLabel>
          <Input value={form.bmdcId} onChange={v => set('bmdcId', v)} placeholder="Bangladesh Medical & Dental Council ID" />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>বিশেষজ্ঞতা</FieldLabel>
          <Input value={form.specialty} onChange={v => set('specialty', v)} placeholder="যেমন: Psychiatry, Forensic Medicine" />
        </div>
        <div className={field}>
          <FieldLabel>প্রতিষ্ঠান / হাসপাতাল</FieldLabel>
          <Input value={form.institution} onChange={v => set('institution', v)} placeholder="Where you practice" />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>ইমেইল</FieldLabel>
          <Input value={form.email} onChange={v => set('email', v)} placeholder="your@email.com" type="email" />
        </div>
        <div className={field}>
          <FieldLabel>ফোন নম্বর</FieldLabel>
          <Input value={form.phone} onChange={v => set('phone', v)} placeholder="+880" />
        </div>
      </div>

      <div className={twoCol}>
        <div className={field}>
          <FieldLabel required>জেলা</FieldLabel>
          <Input value={form.district} onChange={v => set('district', v)} placeholder="Where you practice" />
        </div>
        <div className={field}>
          <FieldLabel required>সহায়তার ধরন</FieldLabel>
          <Select value={form.supportType} onChange={v => set('supportType', v)} options={DOCTOR_SUPPORT} />
        </div>
      </div>

      {error && <p className="text-brand-red text-[13px] mb-4 border-l-[3px] border-brand-red pl-3">{error}</p>}
      <SubmitButton submitting={submitting} />
    </form>
  )
}

// ── shared submit button ───────────────────────────────────────────────────────

function SubmitButton({ submitting }: { submitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="bg-brand-red text-brand-cream px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase hover:bg-brand-red-dark disabled:opacity-50 cursor-pointer border-none font-sans transition-colors mt-2"
    >
      {submitting ? 'জমা দেওয়া হচ্ছে...' : 'সহযোগিতার প্রতিশ্রুতি দিন →'}
    </button>
  )
}

// ── success state ─────────────────────────────────────────────────────────────

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
      <p className="text-[12px] text-brand-red font-bold tracking-[3px] uppercase mb-3">সফলভাবে জমা হয়েছে</p>
      <p className="font-display text-[32px] font-black text-brand-cream leading-tight mb-4">ধন্যবাদ।<br />পাশে আছেন।</p>
      <p className="text-brand-muted text-[14px] font-light leading-relaxed">
        আমরা তথ্যটি যাচাই করে শীঘ্রই যোগাযোগ করব। আপনার সহযোগিতা এই উদ্যোগকে আরও শক্তিশালী করবে।
      </p>
    </div>
  )
}

// ── page ──────────────────────────────────────────────────────────────────────

type Tab = 'ngo' | 'lawyer' | 'doctor'

const TABS: { id: Tab; label: string }[] = [
  { id: 'ngo', label: 'এনজিও ও সংস্থা' },
  { id: 'lawyer', label: 'আইনজীবী' },
  { id: 'doctor', label: 'ডাক্তার ও মনোবিজ্ঞানী' },
]

export default function SupportUsPage() {
  const [tab, setTab] = useState<Tab>('ngo')
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
            <p className="text-[10px] font-bold tracking-[3.5px] text-brand-red uppercase mb-4">চুপ নই · সহায়তা · নেটওয়ার্ক</p>
            <h1 className="font-display font-black leading-[0.92] tracking-tight">
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-cream">আপনার সহযোগিতা দিন।</span>
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-red italic">পাশে দাঁড়ান।</span>
            </h1>
          </div>

          {/* Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a' }} className="mb-8 max-w-[860px]">
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
                {tab === 'ngo' && <NgoTab onSuccess={() => setSuccess(true)} />}
                {tab === 'lawyer' && <LawyerTab onSuccess={() => setSuccess(true)} />}
                {tab === 'doctor' && <DoctorTab onSuccess={() => setSuccess(true)} />}
              </>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
