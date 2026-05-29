'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'
import {
  CRIME_TYPES, CRIME_TYPES_EN,
  VICTIM_AGE_RANGES, VICTIM_AGE_RANGES_EN,
  CONVICTION_STATUSES, CONVICTION_STATUSES_EN,
  CURRENT_LOCATIONS, CURRENT_LOCATIONS_EN,
  KNOWLEDGE_SOURCES, KNOWLEDGE_SOURCES_EN,
} from '@/lib/constants'

type FormData = {
  victimName: string; victimNameHidden: boolean; victimAgeRange: string; victimGender: string
  perpName: string; perpAge: string; perpOccupation: string
  perpOrganization: string; perpFamilyConnections: string
  crimeTypes: string[]; incidentDate: string; incidentLocation: string; crimeDescription: string
  convictionStatus: string; courtCaseNumber: string; verdictDate: string
  sentenceStatus: string; courtDocuments: string; newsSources: string; firNumber: string
  currentLocation: string; caseStatus: string; appealsStatus: string; additionalNotes: string
  submitterName: string; submitterAnonymous: boolean; submitterEmail: string
  knowledgeSource: string; willingToContact: string
  verifiedConsent: boolean; privacyConsent: boolean
}

const INITIAL: FormData = {
  victimName: '', victimNameHidden: false, victimAgeRange: '', victimGender: '',
  perpName: '', perpAge: '', perpOccupation: '', perpOrganization: '', perpFamilyConnections: '',
  crimeTypes: [], incidentDate: '', incidentLocation: '', crimeDescription: '',
  convictionStatus: '', courtCaseNumber: '', verdictDate: '', sentenceStatus: '', courtDocuments: '', newsSources: '', firNumber: '',
  currentLocation: '', caseStatus: '', appealsStatus: '', additionalNotes: '',
  submitterName: '', submitterAnonymous: false, submitterEmail: '',
  knowledgeSource: '', willingToContact: '',
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
      className="w-full bg-brand-card text-brand-cream px-3 py-2.5 text-[16px] outline-none font-sans placeholder:text-[#333]" style={{ border: '1px solid #E0E0E0' }}
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
    <label className="flex items-center gap-2.5 text-[16px] text-brand-muted cursor-pointer hover:text-brand-cream transition-colors">
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
  const { lang } = useLanguage()
  const T = useT(lang)
  const RP = T.report
  const isEn = lang === 'en'

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
        setError(data.error ?? RP.errorGeneric)
        setSubmitting(false)
        return
      }
      router.push('/report/success?submitted=1')
    } catch {
      setError(RP.errorNetwork)
      setSubmitting(false)
    }
  }

  const noCase = form.convictionStatus === 'কোনো মামলা করা হয়নি' || form.convictionStatus === 'No case filed'
  const card = 'border border-brand-border bg-brand-card p-7 mb-3'
  const twoCol = 'grid grid-cols-1 sm:grid-cols-2 gap-4'
  const field = 'mb-5 last:mb-0'
  const radioList = 'flex flex-col gap-2 mt-1'

  const crimeLabels = isEn ? CRIME_TYPES_EN : CRIME_TYPES
  const ageLabels = isEn ? VICTIM_AGE_RANGES_EN : VICTIM_AGE_RANGES
  const convLabels = isEn ? CONVICTION_STATUSES_EN : CONVICTION_STATUSES
  const locLabels = isEn ? CURRENT_LOCATIONS_EN : CURRENT_LOCATIONS
  const knowLabels = isEn ? KNOWLEDGE_SOURCES_EN : KNOWLEDGE_SOURCES

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />
      <div className="pt-28 pb-12 flex-1">
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <p className="text-[12px] text-brand-red font-bengali font-bold tracking-normal uppercase mb-3">{RP.eyebrow}</p>
          <h1 className="font-display text-[clamp(28px,4vw,48px)] font-black text-brand-cream tracking-tight mb-3 max-w-[680px] leading-tight">
            {RP.title}
          </h1>
          <p className="text-[15px] text-brand-muted leading-relaxed max-w-[620px] mb-5 font-light">
            {RP.intro}
          </p>
          <div
            className="border-l-[3px] border-l-[#ca8a04] px-4 py-3 text-[12px] text-[#ca8a04] font-medium mb-8"
            style={{ background: '#1a1200' }}
            dangerouslySetInnerHTML={{ __html: RP.emergency }}
          />

          <form onSubmit={handleSubmit} className="max-w-[700px]">

            {/* Section 1: Victim */}
            <div className={card}>
              <SectionHeader num={1} title={RP.sec1Title} />

              <div className={field}>
                <FieldLabel required>{RP.victimName}</FieldLabel>
                <Input value={form.victimName} onChange={v => set('victimName', v)} placeholder={RP.victimNamePh} />
                <label className="flex items-start gap-2.5 mt-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.victimNameHidden}
                    onChange={e => set('victimNameHidden', e.target.checked)}
                    className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5"
                  />
                  <span className="text-[12px] text-brand-muted leading-snug">{RP.victimHideLabel}</span>
                </label>
                <p className="text-[11px] text-[#444] mt-2 leading-snug">{RP.victimPrivacy}</p>
              </div>

              <div className={twoCol}>
                <div className={field}>
                  <FieldLabel required>{RP.victimAge}</FieldLabel>
                  <div className={radioList}>
                    {VICTIM_AGE_RANGES.map((opt, i) => (
                      <Radio key={opt} name="victimAgeRange" value={opt} checked={form.victimAgeRange === opt} onChange={() => set('victimAgeRange', opt)} label={ageLabels[i]} />
                    ))}
                  </div>
                </div>
                <div className={field}>
                  <FieldLabel required>{RP.victimGender}</FieldLabel>
                  <div className={radioList}>
                    {['নারী', 'পুরুষ', 'অন্যান্য'].map((opt, i) => (
                      <Radio key={opt} name="victimGender" value={opt} checked={form.victimGender === opt} onChange={() => set('victimGender', opt)} label={RP.genderOpts[i]} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Perpetrator */}
            <div className={card}>
              <SectionHeader num={2} title={RP.sec2Title} />

              <div className={field}>
                <FieldLabel required>{RP.perpName}</FieldLabel>
                <HelpText>{RP.perpNameHelp}</HelpText>
                <Input value={form.perpName} onChange={v => set('perpName', v)} placeholder={RP.perpNamePh} />
              </div>

              <div className={twoCol}>
                <div className={field}>
                  <FieldLabel>{RP.perpAge}</FieldLabel>
                  <HelpText>{RP.perpAgeHelp}</HelpText>
                  <Input value={form.perpAge} onChange={v => set('perpAge', v)} placeholder={RP.perpAgePh} />
                </div>
                <div className={field}>
                  <FieldLabel>{RP.perpOcc}</FieldLabel>
                  <HelpText>{RP.perpOccHelp}</HelpText>
                  <Input value={form.perpOccupation} onChange={v => set('perpOccupation', v)} placeholder={RP.perpOccPh} />
                </div>
              </div>

              <div className={field}>
                <FieldLabel>{RP.perpOrg}</FieldLabel>
                <HelpText>{RP.perpOrgHelp}</HelpText>
                <Input value={form.perpOrganization} onChange={v => set('perpOrganization', v)} placeholder={RP.perpOrgPh} />
              </div>

              <div className={field}>
                <FieldLabel>{RP.perpFamily}</FieldLabel>
                <HelpText>{RP.perpFamilyHelp}</HelpText>
                <Textarea value={form.perpFamilyConnections} onChange={v => set('perpFamilyConnections', v)} placeholder={RP.perpFamilyPh} />
              </div>
            </div>

            {/* Section 3: Crime */}
            <div className={card}>
              <SectionHeader num={3} title={RP.sec3Title} />

              <div className={field}>
                <FieldLabel required>{RP.crimeType}</FieldLabel>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {CRIME_TYPES.map((type, i) => (
                    <label key={type} className="flex items-center gap-2.5 text-[13px] text-brand-muted cursor-pointer hover:text-brand-cream transition-colors">
                      <input type="checkbox" checked={form.crimeTypes.includes(type)} onChange={() => toggleCrimeType(type)} className="accent-brand-red w-3.5 h-3.5 flex-shrink-0" />
                      {crimeLabels[i]}
                    </label>
                  ))}
                </div>
              </div>

              <div className={twoCol}>
                <div className={field}>
                  <FieldLabel required>{RP.incidentDate}</FieldLabel>
                  <HelpText>{RP.incidentDateHelp}</HelpText>
                  <Input value={form.incidentDate} onChange={v => set('incidentDate', v)} placeholder="DD/MM/YYYY" />
                </div>
                <div className={field}>
                  <FieldLabel required>{RP.incidentLoc}</FieldLabel>
                  <HelpText>{RP.incidentLocHelp}</HelpText>
                  <Input value={form.incidentLocation} onChange={v => set('incidentLocation', v)} placeholder={RP.incidentLocPh} />
                </div>
              </div>

              <div className={field}>
                <FieldLabel required>{RP.crimeDesc}</FieldLabel>
                <HelpText>{RP.crimeDescHelp}</HelpText>
                <Textarea value={form.crimeDescription} onChange={v => set('crimeDescription', v)} placeholder={RP.crimeDescPh} rows={4} />
              </div>
            </div>

            {/* Section 4: Evidence */}
            <div className={card}>
              <SectionHeader num={4} title={RP.sec4Title} />

              <div className={field}>
                <FieldLabel required>{RP.convStatus}</FieldLabel>
                <div className={radioList}>
                  {CONVICTION_STATUSES.map((opt, i) => (
                    <Radio key={opt} name="convictionStatus" value={opt} checked={form.convictionStatus === opt} onChange={() => set('convictionStatus', opt)} label={convLabels[i]} />
                  ))}
                </div>
              </div>

              {!noCase && (
                <>
                  <div className={twoCol}>
                    <div className={field}>
                      <FieldLabel>{RP.courtCase}</FieldLabel>
                      <HelpText>{RP.courtCaseHelp}</HelpText>
                      <Input value={form.courtCaseNumber} onChange={v => set('courtCaseNumber', v)} placeholder={RP.courtCasePh} />
                    </div>
                    <div className={field}>
                      <FieldLabel>{RP.verdictDate}</FieldLabel>
                      <HelpText>{RP.verdictDateHelp}</HelpText>
                      <Input value={form.verdictDate} onChange={v => set('verdictDate', v)} placeholder="DD/MM/YYYY" />
                    </div>
                  </div>
                  <div className={field}>
                    <FieldLabel>{RP.sentence}</FieldLabel>
                    <HelpText>{RP.sentenceHelp}</HelpText>
                    <Textarea value={form.sentenceStatus} onChange={v => set('sentenceStatus', v)} placeholder={RP.sentencePh} />
                  </div>
                </>
              )}

              <div className={field}>
                <FieldLabel required>{RP.newsSrc}</FieldLabel>
                <HelpText>{RP.newsSrcHelp}</HelpText>
                <Textarea value={form.newsSources} onChange={v => set('newsSources', v)} placeholder="https://..." rows={3} />
              </div>

              {!noCase && (
                <>
                  <div className={field}>
                    <FieldLabel>{RP.courtDocs}</FieldLabel>
                    <HelpText>{RP.courtDocsHelp}</HelpText>
                    <Input value={form.courtDocuments} onChange={v => set('courtDocuments', v)} placeholder="https://..." />
                  </div>
                  <div className={field}>
                    <FieldLabel>{RP.firNum}</FieldLabel>
                    <HelpText>{RP.firNumHelp}</HelpText>
                    <Input value={form.firNumber} onChange={v => set('firNumber', v)} placeholder={RP.firNumPh} />
                  </div>
                </>
              )}
            </div>

            {/* Section 5: Current Status */}
            <div className={card}>
              <SectionHeader num={5} title={RP.sec5Title} />

              <div className={field}>
                <FieldLabel required>{RP.perpLoc}</FieldLabel>
                <div className={radioList}>
                  {CURRENT_LOCATIONS.map((opt, i) => (
                    <Radio key={opt} name="currentLocation" value={opt} checked={form.currentLocation === opt} onChange={() => set('currentLocation', opt)} label={locLabels[i]} />
                  ))}
                </div>
              </div>

              <div className={field}>
                <FieldLabel required>{RP.caseStatus}</FieldLabel>
                <div className={radioList}>
                  {RP.caseStatusOpts.map(opt => (
                    <Radio key={opt} name="caseStatus" value={opt} checked={form.caseStatus === opt} onChange={() => set('caseStatus', opt)} label={opt} />
                  ))}
                </div>
              </div>

              <div className={field}>
                <FieldLabel>{RP.appeals}</FieldLabel>
                <div className={radioList}>
                  {RP.appealsOpts.map(opt => (
                    <Radio key={opt} name="appealsStatus" value={opt} checked={form.appealsStatus === opt} onChange={() => set('appealsStatus', opt)} label={opt} />
                  ))}
                </div>
              </div>

              <div className={field}>
                <FieldLabel>{RP.addNotes}</FieldLabel>
                <HelpText>{RP.addNotesHelp}</HelpText>
                <Textarea value={form.additionalNotes} onChange={v => set('additionalNotes', v)} placeholder={RP.addNotesPh} />
              </div>
            </div>

            {/* Section 6: Submitter */}
            <div className={card}>
              <SectionHeader num={6} title={RP.sec6Title} />

              <div className={field}>
                <FieldLabel required>{RP.subName}</FieldLabel>
                <HelpText>{RP.subNameHelp}</HelpText>
                <Input value={form.submitterName} onChange={v => set('submitterName', v)} placeholder={RP.subNamePh} />
                <label className="flex items-start gap-2.5 mt-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.submitterAnonymous}
                    onChange={e => set('submitterAnonymous', e.target.checked)}
                    className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5"
                  />
                  <span className="text-[12px] text-brand-muted leading-snug">{RP.subAnonLabel}</span>
                </label>
              </div>

              <div className={field}>
                <FieldLabel required>{RP.subEmail}</FieldLabel>
                <HelpText>{RP.subEmailHelp}</HelpText>
                <Input value={form.submitterEmail} onChange={v => set('submitterEmail', v)} placeholder="email@example.com" type="email" />
              </div>

              <div className={field}>
                <FieldLabel required>{RP.knowSource}</FieldLabel>
                <div className={radioList}>
                  {KNOWLEDGE_SOURCES.map((opt, i) => (
                    <Radio key={opt} name="knowledgeSource" value={opt} checked={form.knowledgeSource === opt} onChange={() => set('knowledgeSource', opt)} label={knowLabels[i]} />
                  ))}
                </div>
              </div>

              <div className={field}>
                <FieldLabel required>{RP.willing}</FieldLabel>
                <div className={radioList}>
                  {['হ্যাঁ, আমার সাথে যোগাযোগ করতে পারেন', 'না, আমি নাম প্রকাশ না করেই এটি জমা দিতে চাই'].map((opt, i) => (
                    <Radio key={opt} name="willingToContact" value={opt} checked={form.willingToContact === opt} onChange={() => set('willingToContact', opt)} label={RP.willingOpts[i]} />
                  ))}
                </div>
                <p className="text-[11px] text-[#444] mt-2 leading-snug">{RP.willingNote}</p>
              </div>
            </div>

            {/* Section 7: Consent */}
            <div className={card}>
              <SectionHeader num={7} title={RP.sec7Title} />
              <div className="flex flex-col gap-4">
                <label className="flex items-start gap-3 text-[13px] text-brand-muted leading-relaxed cursor-pointer hover:text-brand-cream transition-colors">
                  <input type="checkbox" checked={form.verifiedConsent} onChange={e => set('verifiedConsent', e.target.checked)} className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5" />
                  {RP.consent1}
                </label>
                <label className="flex items-start gap-3 text-[13px] text-brand-muted leading-relaxed cursor-pointer hover:text-brand-cream transition-colors">
                  <input type="checkbox" checked={form.privacyConsent} onChange={e => set('privacyConsent', e.target.checked)} className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5" />
                  {RP.consent2}
                </label>
              </div>

              {error && (
                <p className="text-brand-red text-[13px] mt-4 border-l-[3px] border-brand-red pl-3">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-red text-brand-cream py-4 text-[12px] font-bold tracking-[1.5px] uppercase mt-6 hover:bg-brand-red-dark disabled:opacity-50 cursor-pointer border-none font-sans transition-colors"
              >
                {submitting ? RP.submitting : RP.submitBtn}
              </button>

              <p className="text-[11px] text-[#444] text-center mt-3 leading-relaxed">
                {RP.submitNote}
              </p>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
