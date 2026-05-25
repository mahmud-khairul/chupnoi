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
        setError(data.error ?? 'কিছু একটা ভুল হয়েছে।')
        setSubmitting(false)
        return
      }
      router.push('/report/success?submitted=1')
    } catch {
      setError('নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।')
      setSubmitting(false)
    }
  }

  const noCase = form.convictionStatus === 'কোনো মামলা করা হয়নি'
  const card = 'border border-brand-border bg-brand-card p-7 mb-3'
  const twoCol = 'grid grid-cols-2 gap-4'
  const field = 'mb-5 last:mb-0'
  const radioList = 'flex flex-col gap-2 mt-1'

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />
      <div className="pt-28 pb-12 flex-1">
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] font-bold tracking-[3.5px] text-brand-red uppercase mb-3">চুপ নই · রিপোর্ট</p>
          <h1 className="font-display text-[clamp(28px,4vw,48px)] font-black text-brand-cream tracking-tight mb-3 max-w-[680px] leading-tight">
            শিশু নির্যাতন ও যৌন সহিংসতার অপরাধীদের তথ্য রিপোর্ট করুন
          </h1>
          <p className="text-[15px] text-brand-muted leading-relaxed max-w-[620px] mb-5 font-light">
            এই ফর্মের মাধ্যমে বাংলাদেশে শিশু যৌন নির্যাতন, ধর্ষণ এবং শ্লীলতাহানির সাথে জড়িত অপরাধীদের যাচাইকৃত তথ্য সংগ্রহ করা হচ্ছে।
            জনসমক্ষে প্রকাশের পূর্বে সকল তথ্য বেসরকারি সংস্থা (NGO) পার্টনারদের দ্বারা পুঙ্খানুপুঙ্খভাবে পর্যালোচনা করা হবে।
            তথ্যের সঠিকতা নিশ্চিত করতে প্রয়োজনীয় প্রমাণ ও তথ্যের উৎস প্রদান করুন।
          </p>
          <div
            className="border-l-[3px] border-l-[#ca8a04] px-4 py-3 text-[12px] text-[#ca8a04] font-medium mb-8"
            style={{ background: '#1a1200' }}
          >
            🚨 জরুরি পরিস্থিতিতে <strong>৯৯৯</strong> নম্বরে ফোন করুন। জাতীয় হেল্পলাইন: <strong>১০৯২১</strong>
          </div>

          <form onSubmit={handleSubmit} className="max-w-[700px]">

            {/* বিভাগ ১: ভুক্তভোগীর তথ্য */}
            <div className={card}>
              <SectionHeader num={1} title="ভুক্তভোগীর তথ্য" />

              <div className={field}>
                <FieldLabel required>ভুক্তভোগীর নাম</FieldLabel>
                <Input value={form.victimName} onChange={v => set('victimName', v)} placeholder="ভুক্তভোগীর পূর্ণ নাম" />
                <label className="flex items-start gap-2.5 mt-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.victimNameHidden}
                    onChange={e => set('victimNameHidden', e.target.checked)}
                    className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5"
                  />
                  <span className="text-[12px] text-brand-muted leading-snug">আমার নাম বা তথ্য জনসমক্ষে প্রকাশ করবেন না</span>
                </label>
                <p className="text-[11px] text-[#444] mt-2 leading-snug">
                  *আপনার নাম এবং বিস্তারিত তথ্য কোনো পাবলিক ফোরামে প্রকাশ করা হবে না এবং সমস্ত ব্যক্তিগত তথ্য গোপন রাখা হবে। তবে, পরবর্তীতে পুলিশ বা এনজিও কর্তৃপক্ষ আপনার সাথে যোগাযোগ করতে পারেন।
                </p>
              </div>

              <div className={twoCol}>
                <div className={field}>
                  <FieldLabel required>ঘটনার সময় ভুক্তভোগীর বয়স</FieldLabel>
                  <div className={radioList}>
                    {VICTIM_AGE_RANGES.map(opt => (
                      <Radio key={opt} name="victimAgeRange" value={opt} checked={form.victimAgeRange === opt} onChange={() => set('victimAgeRange', opt)} label={opt} />
                    ))}
                  </div>
                </div>
                <div className={field}>
                  <FieldLabel required>ভুক্তভোগীর লিঙ্গ</FieldLabel>
                  <div className={radioList}>
                    {['নারী', 'পুরুষ', 'অন্যান্য'].map(opt => (
                      <Radio key={opt} name="victimGender" value={opt} checked={form.victimGender === opt} onChange={() => set('victimGender', opt)} label={opt} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* বিভাগ ২: অপরাধীর বিবরণ */}
            <div className={card}>
              <SectionHeader num={2} title="অপরাধীর বিবরণ" />

              <div className={field}>
                <FieldLabel required>অভিযুক্ত/দোষী ব্যক্তির পূর্ণ নাম</FieldLabel>
                <HelpText>আইনগত পূর্ণ নাম (যদি জানা থাকে)</HelpText>
                <Input value={form.perpName} onChange={v => set('perpName', v)} placeholder="পূর্ণ নাম" />
              </div>

              <div className={twoCol}>
                <div className={field}>
                  <FieldLabel>অপরাধীর বয়স (যদি জানা থাকে)</FieldLabel>
                  <HelpText>আনুমানিক বয়স বা বয়সের সীমা</HelpText>
                  <Input value={form.perpAge} onChange={v => set('perpAge', v)} placeholder="যেমন: ৩৫–৪০" />
                </div>
                <div className={field}>
                  <FieldLabel>পেশা/জীবিকা</FieldLabel>
                  <HelpText>অপরাধী কী ধরনের কাজ করেন বা করতেন?</HelpText>
                  <Input value={form.perpOccupation} onChange={v => set('perpOccupation', v)} placeholder="যেমন: শিক্ষক, ড্রাইভার" />
                </div>
              </div>

              <div className={field}>
                <FieldLabel>সংশ্লিষ্ট ব্যবসা প্রতিষ্ঠান বা সংগঠনের নাম</FieldLabel>
                <HelpText>যে কোম্পানি, সংস্থা, প্রতিষ্ঠান বা ব্যবসায় তিনি কর্মরত আছেন</HelpText>
                <Input value={form.perpOrganization} onChange={v => set('perpOrganization', v)} placeholder="প্রতিষ্ঠানের নাম" />
              </div>

              <div className={field}>
                <FieldLabel>পারিবারিক বা সামাজিক সংযোগ (যদি প্রাসঙ্গিক হয়)</FieldLabel>
                <HelpText>পারিবারিক পটভূমি, সামাজিক মর্যাদা, বা রাজনৈতিক প্রভাব/যোগাযোগ (যদি প্রাসঙ্গিক থাকে)</HelpText>
                <Textarea value={form.perpFamilyConnections} onChange={v => set('perpFamilyConnections', v)} placeholder="বিস্তারিত লিখুন..." />
              </div>
            </div>

            {/* বিভাগ ৩: অপরাধের বিবরণ */}
            <div className={card}>
              <SectionHeader num={3} title="অপরাধের বিবরণ" />

              <div className={field}>
                <FieldLabel required>অপরাধের ধরন (প্রযোজ্য সবকটি টিক দিন)</FieldLabel>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {CRIME_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-2.5 text-[13px] text-brand-muted cursor-pointer hover:text-brand-cream transition-colors">
                      <input type="checkbox" checked={form.crimeTypes.includes(type)} onChange={() => toggleCrimeType(type)} className="accent-brand-red w-3.5 h-3.5 flex-shrink-0" />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className={twoCol}>
                <div className={field}>
                  <FieldLabel required>ঘটনার তারিখ</FieldLabel>
                  <HelpText>সঠিক তারিখ জানা থাকলে লিখুন, অথবা আনুমানিক সময় (যেমন: &lsquo;মে ২০২৬&rsquo;)</HelpText>
                  <Input value={form.incidentDate} onChange={v => set('incidentDate', v)} placeholder="DD/MM/YYYY" />
                </div>
                <div className={field}>
                  <FieldLabel required>ঘটনাস্থল</FieldLabel>
                  <HelpText>জেলা, উপজেলা, এবং সুনির্দিষ্ট এলাকা বা ঠিকানা</HelpText>
                  <Input value={form.incidentLocation} onChange={v => set('incidentLocation', v)} placeholder="যেমন: মিরপুর, ঢাকা" />
                </div>
              </div>

              <div className={field}>
                <FieldLabel required>অপরাধের সংক্ষিপ্ত বিবরণ</FieldLabel>
                <HelpText>ঠিক কী ঘটেছিল? নূন্যতম ২-৩ বাক্যে লিখুন। এই ঘটনাটি আপনি কীভাবে জানতে পারলেন তাও উল্লেখ করুন।</HelpText>
                <Textarea value={form.crimeDescription} onChange={v => set('crimeDescription', v)} placeholder="বিস্তারিত বিবরণ..." rows={4} />
              </div>
            </div>

            {/* বিভাগ ৪: প্রমাণ ও নথিপত্র */}
            <div className={card}>
              <SectionHeader num={4} title="প্রমাণ ও নথিপত্র" />

              <div className={field}>
                <FieldLabel required>মামলার বর্তমান আইনি অবস্থা</FieldLabel>
                <div className={radioList}>
                  {CONVICTION_STATUSES.map(opt => (
                    <Radio key={opt} name="convictionStatus" value={opt} checked={form.convictionStatus === opt} onChange={() => set('convictionStatus', opt)} label={opt} />
                  ))}
                </div>
              </div>

              {!noCase && (
                <>
                  <div className={twoCol}>
                    <div className={field}>
                      <FieldLabel>আদালতের মামলা নম্বর</FieldLabel>
                      <HelpText>যদি জানা থাকে — এটি মামলাটি যাচাই করতে সাহায্য করবে</HelpText>
                      <Input value={form.courtCaseNumber} onChange={v => set('courtCaseNumber', v)} placeholder="মামলা নম্বর" />
                    </div>
                    <div className={field}>
                      <FieldLabel>আদালতের রায়ের তারিখ</FieldLabel>
                      <HelpText>আদালতের রায় কবে দেওয়া হয়েছিল?</HelpText>
                      <Input value={form.verdictDate} onChange={v => set('verdictDate', v)} placeholder="DD/MM/YYYY" />
                    </div>
                  </div>
                  <div className={field}>
                    <FieldLabel>সাজা বা বর্তমান অবস্থা</FieldLabel>
                    <HelpText>অপরাধী কী ধরনের সাজা পেয়েছেন? যেমন: যাবজ্জীবন কারাদণ্ড, মৃত্যুদণ্ড, জামিন ইত্যাদি।</HelpText>
                    <Textarea value={form.sentenceStatus} onChange={v => set('sentenceStatus', v)} placeholder="বিস্তারিত লিখুন..." />
                  </div>
                </>
              )}

              <div className={field}>
                <FieldLabel required>সংবাদের উৎস বা লিংক</FieldLabel>
                <HelpText>এই মামলা সংক্রান্ত ২ বা তার বেশি নিউজ আর্টিকেলের লিংক দিন। সম্পূর্ণ URL পেস্ট করুন।</HelpText>
                <Textarea value={form.newsSources} onChange={v => set('newsSources', v)} placeholder="https://..." rows={3} />
              </div>

              {!noCase && (
                <>
                  <div className={field}>
                    <FieldLabel>আদালতের নথিপত্র/প্রমাণাদি</FieldLabel>
                    <HelpText>মামলার এজাহার (FIR), চার্জশিট, আদালতের রায় বা অন্য কোনো সরকারি নথিপত্রের লিংক পেস্ট করুন</HelpText>
                    <Input value={form.courtDocuments} onChange={v => set('courtDocuments', v)} placeholder="https://..." />
                  </div>
                  <div className={field}>
                    <FieldLabel>পুলিশের এফআইআর (FIR) নম্বর</FieldLabel>
                    <HelpText>থানার এফআইআর (FIR) বা মামলার নম্বর যদি জানা থাকে</HelpText>
                    <Input value={form.firNumber} onChange={v => set('firNumber', v)} placeholder="FIR নম্বর" />
                  </div>
                </>
              )}
            </div>

            {/* বিভাগ ৫: বর্তমান অবস্থা */}
            <div className={card}>
              <SectionHeader num={5} title="বর্তমান অবস্থা" />

              <div className={field}>
                <FieldLabel required>অপরাধীর বর্তমান অবস্থান</FieldLabel>
                <div className={radioList}>
                  {CURRENT_LOCATIONS.map(opt => (
                    <Radio key={opt} name="currentLocation" value={opt} checked={form.currentLocation === opt} onChange={() => set('currentLocation', opt)} label={opt} />
                  ))}
                </div>
              </div>

              <div className={field}>
                <FieldLabel required>মামলাটি কি চলমান নাকি শেষ হয়ে গেছে?</FieldLabel>
                <div className={radioList}>
                  {[
                    'চলমান (বিচার কার্য চলছে)',
                    'সমাপ্ত (চূড়ান্ত রায় দেওয়া হয়েছে)',
                    'স্থগিত (বহু বছর ধরে কোনো অগ্রগতি নেই)',
                    'জানা নেই',
                  ].map(opt => (
                    <Radio key={opt} name="caseStatus" value={opt} checked={form.caseStatus === opt} onChange={() => set('caseStatus', opt)} label={opt} />
                  ))}
                </div>
              </div>

              <div className={field}>
                <FieldLabel>কোনো আপিল করা হয়েছে কি?</FieldLabel>
                <div className={radioList}>
                  {[
                    'হ্যাঁ, আপিল বিচারাধীন আছে',
                    'কোনো আপিল করা হয়নি',
                    'আপিল খারিজ করা হয়েছে',
                    'জানা নেই',
                  ].map(opt => (
                    <Radio key={opt} name="appealsStatus" value={opt} checked={form.appealsStatus === opt} onChange={() => set('appealsStatus', opt)} label={opt} />
                  ))}
                </div>
              </div>

              <div className={field}>
                <FieldLabel>অতিরিক্ত মন্তব্য বা নোট</FieldLabel>
                <HelpText>অন্য কোনো প্রাসঙ্গিক তথ্য, নতুন আপডেট বা পরবর্তী কোনো খবর জানা থাকলে লিখুন।</HelpText>
                <Textarea value={form.additionalNotes} onChange={v => set('additionalNotes', v)} placeholder="অতিরিক্ত তথ্য..." />
              </div>
            </div>

            {/* বিভাগ ৬: তথ্য প্রদানকারীর বিবরণ */}
            <div className={card}>
              <SectionHeader num={6} title="তথ্য প্রদানকারীর বিবরণ" />

              <div className={field}>
                <FieldLabel required>আপনার নাম</FieldLabel>
                <HelpText>আমাদের কাছে আপনার তথ্য সম্পূর্ণ নিরাপদ থাকবে</HelpText>
                <Input value={form.submitterName} onChange={v => set('submitterName', v)} placeholder="আপনার পূর্ণ নাম" />
                <label className="flex items-start gap-2.5 mt-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.submitterAnonymous}
                    onChange={e => set('submitterAnonymous', e.target.checked)}
                    className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5"
                  />
                  <span className="text-[12px] text-brand-muted leading-snug">গোপনে জমা দিতে চাই — ওয়েবসাইটে আমার নাম প্রকাশ করা হবে না</span>
                </label>
              </div>

              <div className={field}>
                <FieldLabel required>আপনার ইমেল ঠিকানা</FieldLabel>
                <HelpText>তথ্য যাচাই করার জন্য আমরা আপনার সাথে যোগাযোগ করতে পারি</HelpText>
                <Input value={form.submitterEmail} onChange={v => set('submitterEmail', v)} placeholder="email@example.com" type="email" />
              </div>

              <div className={field}>
                <FieldLabel required>আপনি এই মামলা সম্পর্কে কীভাবে জেনেছেন?</FieldLabel>
                <div className={radioList}>
                  {KNOWLEDGE_SOURCES.map(opt => (
                    <Radio key={opt} name="knowledgeSource" value={opt} checked={form.knowledgeSource === opt} onChange={() => set('knowledgeSource', opt)} label={opt} />
                  ))}
                </div>
              </div>

              <div className={field}>
                <FieldLabel required>তথ্য যাচাইয়ের জন্য আপনার সাথে যোগাযোগ করা হলে আপনি কি রাজি আছেন?</FieldLabel>
                <div className={radioList}>
                  {[
                    'হ্যাঁ, আমার সাথে যোগাযোগ করতে পারেন',
                    'না, আমি নাম প্রকাশ না করেই এটি জমা দিতে চাই',
                  ].map(opt => (
                    <Radio key={opt} name="willingToContact" value={opt} checked={form.willingToContact === opt} onChange={() => set('willingToContact', opt)} label={opt} />
                  ))}
                </div>
                <p className="text-[11px] text-[#444] mt-2 leading-snug">
                  বিশেষ দ্রষ্টব্য: যেসব তথ্য প্রদানকারী আমাদের সাথে যোগাযোগে এবং সহযোগিতায় রাজি থাকবেন, তাদের দেওয়া মামলাগুলোকে অগ্রাধিকার দেওয়া হবে।
                </p>
              </div>
            </div>

            {/* বিভাগ ৭: যাচাইকরণ ও সম্মতি */}
            <div className={card}>
              <SectionHeader num={7} title="যাচাইকরণ ও সম্মতি" />
              <div className="flex flex-col gap-4">
                <label className="flex items-start gap-3 text-[13px] text-brand-muted leading-relaxed cursor-pointer hover:text-brand-cream transition-colors">
                  <input type="checkbox" checked={form.verifiedConsent} onChange={e => set('verifiedConsent', e.target.checked)} className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5" />
                  আমি নিশ্চিত করছি যে আমার দেওয়া তথ্যগুলো আমার জানামতে সঠিক এবং নির্ভরযোগ্য উৎসের ওপর ভিত্তি করে দেওয়া হয়েছে। আমি বুঝতে পারছি যে জনসমক্ষে প্রকাশের আগে এই তথ্যগুলো পার্টনার এনজিওদের দ্বারা যাচাই ও পর্যালোচনা করা হবে।
                </label>
                <label className="flex items-start gap-3 text-[13px] text-brand-muted leading-relaxed cursor-pointer hover:text-brand-cream transition-colors">
                  <input type="checkbox" checked={form.privacyConsent} onChange={e => set('privacyConsent', e.target.checked)} className="mt-0.5 flex-shrink-0 accent-brand-red w-3.5 h-3.5" />
                  আমি সম্মতি দিচ্ছি যে শিশুদের সুরক্ষার স্বার্থে আমার দেওয়া এই তথ্যগুলো অনুমোদিত এনজিও পার্টনার এবং আইন প্রয়োগকারী সংস্থার সাথে শেয়ার করা যেতে পারে।
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
                {submitting ? 'জমা দেওয়া হচ্ছে...' : 'পর্যালোচনার জন্য রিপোর্ট জমা দিন →'}
              </button>

              <p className="text-[11px] text-[#444] text-center mt-3 leading-relaxed">
                তথ্যটি সঠিকভাবে যাচাই করা সম্ভব হলে, এটি পাবলিক ডাটাবেজে যুক্ত করা হবে।
              </p>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
