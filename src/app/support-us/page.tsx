'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'

const C = 'max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8'

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

function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder: string
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-[#0d0d0d] text-brand-cream px-3 py-2.5 text-[14px] outline-none font-sans"
      style={{ border: '1px solid #1e1e1e' }}
    >
      <option value="" disabled>{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

const twoCol = 'grid grid-cols-2 gap-4'
const field = 'mb-4'

const LAWYER_COURTS = ['Supreme Court', 'High Court Division', 'District Court', 'Session Court', 'Other']
const LAWYER_SPECIALTIES = ['Criminal Law', 'Family Law', 'Child Rights', 'Human Rights', 'Women Rights', 'General Practice']
const LAWYER_SUPPORT = ['Free', 'Subsidised', 'Consultation only', 'Case Referral']
const DOCTOR_SUPPORT = ['Free Consultation', 'Subsidized Treatment', 'Forensic Examination', 'Mental Health Support', 'Expert witness in court']

type SU = ReturnType<typeof useT>['supportUs']

type NgoForm = { orgName: string; regNum: string; contactPerson: string; contactTitle: string; email: string; phone: string; district: string; focusArea: string; howToHelp: string }
const NGO_INIT: NgoForm = { orgName: '', regNum: '', contactPerson: '', contactTitle: '', email: '', phone: '', district: '', focusArea: '', howToHelp: '' }

function NgoTab({ onSuccess, lbl }: { onSuccess: () => void; lbl: SU }) {
  const [form, setForm] = useState<NgoForm>(NGO_INIT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  function set(k: keyof NgoForm, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSubmitting(true)
    try {
      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'ngo', ...form }) })
      if (!res.ok) { const d = await res.json(); setError(d.error ?? lbl.errorGeneric); setSubmitting(false); return }
      onSuccess()
    } catch { setError(lbl.errorNetwork); setSubmitting(false) }
  }

  return (
    <form onSubmit={submit}>
      <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
        <p className="text-[14px] text-brand-muted leading-relaxed font-light">
          <strong className="text-brand-cream">{lbl.ngoDescStrong}</strong> {lbl.ngoDesc}
        </p>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.ngoOrgName}</FieldLabel><Input value={form.orgName} onChange={v => set('orgName', v)} placeholder="Full official name" /></div>
        <div className={field}><FieldLabel>{lbl.ngoRegNum}</FieldLabel><Input value={form.regNum} onChange={v => set('regNum', v)} placeholder="NGO Affairs Bureau / Joint Stock" /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.ngoContact}</FieldLabel><Input value={form.contactPerson} onChange={v => set('contactPerson', v)} placeholder="Full name" /></div>
        <div className={field}><FieldLabel>{lbl.ngoTitle}</FieldLabel><Input value={form.contactTitle} onChange={v => set('contactTitle', v)} placeholder="Executive Director, etc." /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.ngoEmail}</FieldLabel><Input value={form.email} onChange={v => set('email', v)} placeholder="official@organization.org" type="email" /></div>
        <div className={field}><FieldLabel>{lbl.ngoPhone}</FieldLabel><Input value={form.phone} onChange={v => set('phone', v)} placeholder="+880" /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.ngoDistrict}</FieldLabel><Input value={form.district} onChange={v => set('district', v)} placeholder="Dhaka, Chittagong, etc." /></div>
        <div className={field}><FieldLabel required>{lbl.ngoFocus}</FieldLabel><Select value={form.focusArea} onChange={v => set('focusArea', v)} options={lbl.ngoFocusOpts as unknown as string[]} placeholder={lbl.ngoSelectPh} /></div>
      </div>
      <div className={field}><FieldLabel required>{lbl.ngoHow}</FieldLabel><Textarea value={form.howToHelp} onChange={v => set('howToHelp', v)} placeholder="Case verification, legal support, survivor services, advocacy..." rows={4} /></div>
      {error && <p className="text-brand-red text-[13px] mb-4 border-l-[3px] border-brand-red pl-3">{error}</p>}
      <SubmitButton submitting={submitting} lbl={lbl} />
    </form>
  )
}

type LawyerForm = { fullName: string; barCouncilId: string; court: string; specialty: string; email: string; phone: string; district: string; supportType: string }
const LAWYER_INIT: LawyerForm = { fullName: '', barCouncilId: '', court: '', specialty: '', email: '', phone: '', district: '', supportType: '' }

function LawyerTab({ onSuccess, lbl }: { onSuccess: () => void; lbl: SU }) {
  const [form, setForm] = useState<LawyerForm>(LAWYER_INIT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  function set(k: keyof LawyerForm, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSubmitting(true)
    try {
      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'lawyer', ...form }) })
      if (!res.ok) { const d = await res.json(); setError(d.error ?? lbl.errorGeneric); setSubmitting(false); return }
      onSuccess()
    } catch { setError(lbl.errorNetwork); setSubmitting(false) }
  }

  return (
    <form onSubmit={submit}>
      <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
        <p className="text-[14px] text-brand-muted leading-relaxed font-light">
          <strong className="text-brand-cream">{lbl.lawyerDescStrong}</strong> {lbl.lawyerDesc}
        </p>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.lawyerName}</FieldLabel><Input value={form.fullName} onChange={v => set('fullName', v)} placeholder="As per Bar Council ID" /></div>
        <div className={field}><FieldLabel required>{lbl.lawyerBarId}</FieldLabel><Input value={form.barCouncilId} onChange={v => set('barCouncilId', v)} placeholder="BBC Registration Number" /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.lawyerCourt}</FieldLabel><Select value={form.court} onChange={v => set('court', v)} options={LAWYER_COURTS} placeholder="— Select —" /></div>
        <div className={field}><FieldLabel required>{lbl.lawyerSpec}</FieldLabel><Select value={form.specialty} onChange={v => set('specialty', v)} options={LAWYER_SPECIALTIES} placeholder="— Select —" /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.lawyerEmail}</FieldLabel><Input value={form.email} onChange={v => set('email', v)} placeholder="your@email.com" type="email" /></div>
        <div className={field}><FieldLabel required>{lbl.lawyerPhone}</FieldLabel><Input value={form.phone} onChange={v => set('phone', v)} placeholder="+880" /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.lawyerDistrict}</FieldLabel><Input value={form.district} onChange={v => set('district', v)} placeholder="Where you practice" /></div>
        <div className={field}><FieldLabel required>{lbl.lawyerSupport}</FieldLabel><Select value={form.supportType} onChange={v => set('supportType', v)} options={LAWYER_SUPPORT} placeholder="— Select —" /></div>
      </div>
      {error && <p className="text-brand-red text-[13px] mb-4 border-l-[3px] border-brand-red pl-3">{error}</p>}
      <SubmitButton submitting={submitting} lbl={lbl} />
    </form>
  )
}

type DoctorForm = { fullName: string; bmdcId: string; specialty: string; institution: string; email: string; phone: string; district: string; supportType: string }
const DOCTOR_INIT: DoctorForm = { fullName: '', bmdcId: '', specialty: '', institution: '', email: '', phone: '', district: '', supportType: '' }

function DoctorTab({ onSuccess, lbl }: { onSuccess: () => void; lbl: SU }) {
  const [form, setForm] = useState<DoctorForm>(DOCTOR_INIT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  function set(k: keyof DoctorForm, v: string) { setForm(p => ({ ...p, [k]: v })) }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSubmitting(true)
    try {
      const res = await fetch('/api/support', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'doctor', ...form }) })
      if (!res.ok) { const d = await res.json(); setError(d.error ?? lbl.errorGeneric); setSubmitting(false); return }
      onSuccess()
    } catch { setError(lbl.errorNetwork); setSubmitting(false) }
  }

  return (
    <form onSubmit={submit}>
      <div className="border-l-[3px] border-l-brand-red pl-5 py-1 mb-8">
        <p className="text-[14px] text-brand-muted leading-relaxed font-light">
          <strong className="text-brand-cream">{lbl.doctorDescStrong}</strong> {lbl.doctorDesc}
        </p>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.doctorName}</FieldLabel><Input value={form.fullName} onChange={v => set('fullName', v)} placeholder="As per BMDC registration" /></div>
        <div className={field}><FieldLabel required>{lbl.doctorBmdc}</FieldLabel><Input value={form.bmdcId} onChange={v => set('bmdcId', v)} placeholder="Bangladesh Medical & Dental Council ID" /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.doctorSpec}</FieldLabel><Input value={form.specialty} onChange={v => set('specialty', v)} placeholder="e.g., Psychiatry, Forensic Medicine" /></div>
        <div className={field}><FieldLabel>{lbl.doctorInstitution}</FieldLabel><Input value={form.institution} onChange={v => set('institution', v)} placeholder="Where you practice" /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.doctorEmail}</FieldLabel><Input value={form.email} onChange={v => set('email', v)} placeholder="your@email.com" type="email" /></div>
        <div className={field}><FieldLabel>{lbl.doctorPhone}</FieldLabel><Input value={form.phone} onChange={v => set('phone', v)} placeholder="+880" /></div>
      </div>
      <div className={twoCol}>
        <div className={field}><FieldLabel required>{lbl.doctorDistrict}</FieldLabel><Input value={form.district} onChange={v => set('district', v)} placeholder="Where you practice" /></div>
        <div className={field}><FieldLabel required>{lbl.doctorSupport}</FieldLabel><Select value={form.supportType} onChange={v => set('supportType', v)} options={DOCTOR_SUPPORT} placeholder="— Select —" /></div>
      </div>
      {error && <p className="text-brand-red text-[13px] mb-4 border-l-[3px] border-brand-red pl-3">{error}</p>}
      <SubmitButton submitting={submitting} lbl={lbl} />
    </form>
  )
}

function SubmitButton({ submitting, lbl }: { submitting: boolean; lbl: SU }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      className="bg-brand-red text-brand-cream px-8 py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase hover:bg-brand-red-dark disabled:opacity-50 cursor-pointer border-none font-sans transition-colors mt-2"
    >
      {submitting ? lbl.submitting : lbl.submitBtn}
    </button>
  )
}

function SuccessMessage({ lbl }: { lbl: SU }) {
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

type Tab = 'ngo' | 'lawyer' | 'doctor'

export default function SupportUsPage() {
  const [tab, setTab] = useState<Tab>('ngo')
  const [success, setSuccess] = useState(false)
  const { lang } = useLanguage()
  const T = useT(lang)
  const SU = T.supportUs

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
            <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-4">{SU.eyebrow}</p>
            <h1 className="font-display font-black leading-[0.92] tracking-tight">
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-cream">{SU.title1}</span>
              <span className="block text-[clamp(48px,7vw,88px)] text-brand-red italic">{SU.title2}</span>
            </h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a' }} className="mb-8 max-w-[860px]">
            {SU.tabs.map(t => (
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
              <SuccessMessage lbl={SU} />
            ) : (
              <>
                {tab === 'ngo' && <NgoTab onSuccess={() => setSuccess(true)} lbl={SU} />}
                {tab === 'lawyer' && <LawyerTab onSuccess={() => setSuccess(true)} lbl={SU} />}
                {tab === 'doctor' && <DoctorTab onSuccess={() => setSuccess(true)} lbl={SU} />}
              </>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
