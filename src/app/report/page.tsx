'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  CRIME_TYPES, VICTIM_AGE_RANGES, CONVICTION_STATUSES,
  CURRENT_LOCATIONS, KNOWLEDGE_SOURCES
} from '@/lib/constants'

type FormData = {
  victimName: string; victimAgeRange: string; victimGender: string
  perpName: string; perpAge: string; perpOccupation: string
  perpOrganization: string; perpFamilyConnections: string
  crimeTypes: string[]; incidentDate: string; incidentLocation: string; crimeDescription: string
  convictionStatus: string; courtCaseNumber: string; verdictDate: string
  sentenceStatus: string; newsSources: string; firNumber: string
  currentLocation: string; caseStatus: string; appealsStatus: string; additionalNotes: string
  submitterName: string; submitterEmail: string; knowledgeSource: string; willingToContact: string
  verifiedConsent: boolean; privacyConsent: boolean
}

const INITIAL: FormData = {
  victimName: '', victimAgeRange: '', victimGender: '',
  perpName: '', perpAge: '', perpOccupation: '', perpOrganization: '', perpFamilyConnections: '',
  crimeTypes: [], incidentDate: '', incidentLocation: '', crimeDescription: '',
  convictionStatus: '', courtCaseNumber: '', verdictDate: '', sentenceStatus: '', newsSources: '', firNumber: '',
  currentLocation: '', caseStatus: '', appealsStatus: '', additionalNotes: '',
  submitterName: '', submitterEmail: '', knowledgeSource: '', willingToContact: '',
  verifiedConsent: false, privacyConsent: false,
}

function SectionHeader({ num, title }: { num: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
      <div className="w-6 h-6 bg-brand-red text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">
        {String(num).padStart(2, '0')}
      </div>
      <span className="font-display text-[16px] font-bold text-brand-cream tracking-wider uppercase">{title}</span>
    </div>
  )
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[16px] font-bold tracking-[2px] uppercase mb-2" style={{ color: '#FFFAFA' }}>
      {children}{required && <span className="text-brand-red ml-1">*</span>}
    </label>
  )
}

function HelpText({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] text-[#444] mb-2 leading-snug">{children}</p>
}

function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-brand-card text-brand-cream px-3 py-2.5 text-[13px] outline-none font-sans placeholder:text-[#333]" style={{ border: '1px solid #E0E0E0' }}
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-brand-card text-brand-cream px-3 py-2.5 text-[13px] outline-none font-sans resize-none placeholder:text-[#333]" style={{ border: '1px solid #E0E0E0' }}
    />
  )
}

function Radio({ name, value, checked, onChange, label }: { name: string; value: string; checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 text-[13px] text-brand-muted cursor-pointer hover:text-brand-cream transition-colors">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="accent-brand-red w-3.5 h-3.5 flex-shrink-0" />
      {label}
    </label>
  )
}

export default function ReportPage() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function toggleCrimeType(type: string) {
    set('crimeTypes', form.crimeTypes.includes(type)
      ? form.crimeTypes.filter(t => t !== type)
      : [...form.crimeTypes, type])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Something went wrong.')
        setSubmitting(false)
        return
      }
      router.push('/report/success?submitted=1')
    } catch {
      setError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  const card = 'border border-brand-border bg-brand-card p-7 mb-3'
  const twoCol = 'grid grid-cols-2 gap-4'
  const field = 'mb-5 last:mb-0'
  const radioList = 'flex flex-col gap-2 mt-1'

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />
      <div className="pt-28 pb-12 flex-1">
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <p className="text-[10px] font-bold tracking-[3.5px] text-brand-red uppercase mb-3">SafeGuard BD · Report</p>
        <h1 className="font-display text-[clamp(32px,5vw,56px)] font-black text-brand-cream tracking-tight mb-3">
          Report an Abuse
        </h1>
        <p className="text-[13px] text-brand-muted leading-relaxed max-w-[560px] mb-5 font-light">
          Submit information about perpetrators of child abuse and sexual violence in Bangladesh.
          All submissions are reviewed and verified by NGO partners before publication.
        </p>
        <div
          className="border-l-[3px] border-l-[#ca8a04] px-4 py-3 text-[12px] text-[#ca8a04] font-medium mb-8"
          style={{ background: '#1a1200' }}
        >
          🚨 If this is an emergency, call <strong>999</strong> immediately. National helpline: <strong>10921</strong>
        </div>

        <form onSubmit={handleSubmit} className="max-w-[700px]">

          {/* S1: Victim */}
          <div className={card}>
            <SectionHeader num={1} title="Victim Information" />
            <div className={field}>
              <FieldLabel required>Victim Name</FieldLabel>
              <HelpText>Your name and details won&apos;t be published. Police or NGO authority may contact you.</HelpText>
              <Input value={form.victimName} onChange={v => set('victimName', v)} placeholder="Full name of victim" />
            </div>
            <div className={twoCol}>
              <div className={field}>
                <FieldLabel required>Victim Age at Incident</FieldLabel>
                <div className={radioList}>
                  {VICTIM_AGE_RANGES.map(opt => (
                    <Radio key={opt} name="victimAgeRange" value={opt} checked={form.victimAgeRange === opt} onChange={() => set('victimAgeRange', opt)} label={opt} />
                  ))}
                </div>
              </div>
              <div className={field}>
                <FieldLabel required>Victim Gender</FieldLabel>
                <div className={radioList}>
                  {['Female', 'Male', 'Other'].map(opt => (
                    <Radio key={opt} name="victimGender" value={opt} checked={form.victimGender === opt} onChange={() => set('victimGender', opt)} label={opt} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* S2: Perpetrator */}
          <div className={card}>
            <SectionHeader num={2} title="Perpetrator Details" />
            <div className={field}>
              <FieldLabel required>Full Name of Accused / Convicted Person</FieldLabel>
              <HelpText>Full legal name if available</HelpText>
              <Input value={form.perpName} onChange={v => set('perpName', v)} placeholder="Full name" />
            </div>
            <div className={twoCol}>
              <div className={field}>
                <FieldLabel>Age of Perpetrator</FieldLabel>
                <Input value={form.perpAge} onChange={v => set('perpAge', v)} placeholder="e.g. 35–40" />
              </div>
              <div className={field}>
                <FieldLabel>Occupation / Profession</FieldLabel>
                <Input value={form.perpOccupation} onChange={v => set('perpOccupation', v)} placeholder="e.g. Teacher, Driver" />
              </div>
            </div>
            <div className={field}>
              <FieldLabel>Associated Organization</FieldLabel>
              <Input value={form.perpOrganization} onChange={v => set('perpOrganization', v)} placeholder="Organization name" />
            </div>
            <div className={field}>
              <FieldLabel>Family Connections</FieldLabel>
              <Textarea value={form.perpFamilyConnections} onChange={v => set('perpFamilyConnections', v)} placeholder="Family background, social status, political connections..." />
            </div>
          </div>

          {/* S3: Crime */}
          <div className={card}>
            <SectionHeader num={3} title="Crime Details" />
            <div className={field}>
              <FieldLabel required>Type of Crime</FieldLabel>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {CRIME_TYPES.map(type => (
                  <label key={type} className="flex items-center gap-2.5 text-[12.5px] text-brand-muted cursor-pointer hover:text-brand-cream transition-colors">
                    <input type="checkbox" checked={form.crimeTypes.includes(type)} onChange={() => toggleCrimeType(type)} className="accent-brand-red w-3.5 h-3.5 flex-shrink-0" />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div className={twoCol}>
              <div className={field}>
                <FieldLabel required>Date of Incident</FieldLabel>
                <HelpText>Exact date or approximate (e.g. May 2024)</HelpText>
                <Input value={form.incidentDate} onChange={v => set('incidentDate', v)} placeholder="DD/MM/YYYY" />
              </div>
              <div className={field}>
                <FieldLabel required>Location of Incident</FieldLabel>
                <HelpText>District, Upazila, area/address</HelpText>
                <Input value={form.incidentLocation} onChange={v => set('incidentLocation', v)} placeholder="e.g. Mirpur, Dhaka" />
              </div>
            </div>
            <div className={field}>
              <FieldLabel required>Brief Description of Crime</FieldLabel>
              <HelpText>What happened? 2–3 sentences minimum.</HelpText>
              <Textarea value={form.crimeDescription} onChange={v => set('crimeDescription', v)} placeholder="Describe what happened..." rows={4} />
            </div>
          </div>

          {/* S4: Proof */}
          <div className={card}>
            <SectionHeader num={4} title="Proof & Documentation" />
            <div className={field}>
              <FieldLabel required>Conviction Status</FieldLabel>
              <div className={radioList}>
                {CONVICTION_STATUSES.map(opt => (
                  <Radio key={opt} name="convictionStatus" value={opt} checked={form.convictionStatus === opt} onChange={() => set('convictionStatus', opt)} label={opt} />
                ))}
              </div>
            </div>
            <div className={twoCol}>
              <div className={field}>
                <FieldLabel>Court Case Number</FieldLabel>
                <Input value={form.courtCaseNumber} onChange={v => set('courtCaseNumber', v)} placeholder="Case number" />
              </div>
              <div className={field}>
                <FieldLabel>Court Verdict Date</FieldLabel>
                <Input value={form.verdictDate} onChange={v => set('verdictDate', v)} placeholder="DD/MM/YYYY" />
              </div>
            </div>
            <div className={field}>
              <FieldLabel>Sentence / Status</FieldLabel>
              <Textarea value={form.sentenceStatus} onChange={v => set('sentenceStatus', v)} placeholder="Describe the sentence or current legal status..." />
            </div>
            <div className={field}>
              <FieldLabel required>News Sources (Links)</FieldLabel>
              <HelpText>Provide 2 or more news article links. Paste full URLs.</HelpText>
              <Textarea value={form.newsSources} onChange={v => set('newsSources', v)} placeholder="https://..." rows={3} />
            </div>
            <div className={field}>
              <FieldLabel>Police FIR Number</FieldLabel>
              <Input value={form.firNumber} onChange={v => set('firNumber', v)} placeholder="FIR number" />
            </div>
          </div>

          {/* S5: Current Status */}
          <div className={card}>
            <SectionHeader num={5} title="Current Status" />
            <div className={field}>
              <FieldLabel required>Current Location of Perpetrator</FieldLabel>
              <div className={radioList}>
                {CURRENT_LOCATIONS.map(opt => (
                  <Radio key={opt} name="currentLocation" value={opt} checked={form.currentLocation === opt} onChange={() => set('currentLocation', opt)} label={opt} />
                ))}
              </div>
            </div>
            <div className={field}>
              <FieldLabel required>Is Case Ongoing or Closed?</FieldLabel>
              <div className={radioList}>
                {['Ongoing (trial still proceeding)', 'Closed (verdict delivered)', 'Stalled (no progress for years)', 'Unknown'].map(opt => (
                  <Radio key={opt} name="caseStatus" value={opt} checked={form.caseStatus === opt} onChange={() => set('caseStatus', opt)} label={opt} />
                ))}
              </div>
            </div>
            <div className={field}>
              <FieldLabel>Any Appeals Filed?</FieldLabel>
              <div className={radioList}>
                {['Yes, appeal pending', 'No appeals filed', 'Appeal rejected', 'Unknown'].map(opt => (
                  <Radio key={opt} name="appealsStatus" value={opt} checked={form.appealsStatus === opt} onChange={() => set('appealsStatus', opt)} label={opt} />
                ))}
              </div>
            </div>
            <div className={field}>
              <FieldLabel>Additional Notes</FieldLabel>
              <Textarea value={form.additionalNotes} onChange={v => set('additionalNotes', v)} placeholder="Any additional details..." />
            </div>
          </div>

          {/* S6: Submitter */}
          <div className={card}>
            <SectionHeader num={6} title="Submitter Information" />
            <div className={twoCol}>
              <div className={field}>
                <FieldLabel>Your Name</FieldLabel>
                <HelpText>Optional — for contact purposes only</HelpText>
                <Input value={form.submitterName} onChange={v => set('submitterName', v)} placeholder="Your full name" />
              </div>
              <div className={field}>
                <FieldLabel required>Your Email Address</FieldLabel>
                <HelpText>Required — we may contact you to verify</HelpText>
                <Input value={form.submitterEmail} onChange={v => set('submitterEmail', v)} placeholder="email@example.com" type="email" />
              </div>
            </div>
            <div className={field}>
              <FieldLabel required>How Do You Know About This Case?</FieldLabel>
              <div className={radioList}>
                {KNOWLEDGE_SOURCES.map(opt => (
                  <Radio key={opt} name="knowledgeSource" value={opt} checked={form.knowledgeSource === opt} onChange={() => set('knowledgeSource', opt)} label={opt} />
                ))}
              </div>
            </div>
            <div className={field}>
              <FieldLabel required>Willing to be Contacted for Verification?</FieldLabel>
              <HelpText>Cases with a contact person willing to cooperate are given priority review.</HelpText>
              <div className={radioList}>
                {['Yes, contact me', 'No, anonymous submission'].map(opt => (
                  <Radio key={opt} name="willingToContact" value={opt} checked={form.willingToContact === opt} onChange={() => set('willingToContact', opt)} label={opt} />
                ))}
              </div>
            </div>
          </div>

          {/* S7: Consent */}
          <div className={card}>
            <SectionHeader num={7} title="Verification & Consent" />
            <div className="flex flex-col gap-4">
              <label className="flex items-start gap-3 text-[12.5px] text-brand-muted leading-relaxed cursor-pointer hover:text-brand-cream transition-colors">
                <input type="checkbox" checked={form.verifiedConsent} onChange={e => set('verifiedConsent', e.target.checked)} className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5" />
                I confirm that the information I have provided is accurate to my knowledge and based on credible sources. I understand this information will be reviewed by NGO partners before publication.
              </label>
              <label className="flex items-start gap-3 text-[12.5px] text-brand-muted leading-relaxed cursor-pointer hover:text-brand-cream transition-colors">
                <input type="checkbox" checked={form.privacyConsent} onChange={e => set('privacyConsent', e.target.checked)} className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5" />
                I agree that my submission may be shared with verified NGO partners and law enforcement for child protection purposes.
              </label>
            </div>
            {error && (
              <p className="text-brand-red text-[12.5px] mt-4 border-l-[3px] border-brand-red pl-3">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-red text-brand-cream py-4 text-[12px] font-bold tracking-[1.5px] uppercase mt-6 hover:bg-brand-red-dark disabled:opacity-50 cursor-pointer border-none font-sans transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit Report for Review'}
            </button>
            <p className="text-[11px] text-[#444] text-center mt-3 leading-relaxed">
              Your information will be reviewed within 5–7 days. If verified, it will be added to the public registry.
            </p>
          </div>

        </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
