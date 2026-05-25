'use client'
import { useEffect, useState } from 'react'

type Submission = Record<string, unknown>

interface DetailPanelProps {
  id: string
  onClose: () => void
}

function Row({ label, value }: { label: string; value: unknown }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null
  return (
    <div className="grid border-b border-brand-border" style={{ gridTemplateColumns: '130px 1fr' }}>
      <div className="text-[9px] font-bold tracking-[2px] text-[#555] uppercase px-3.5 py-2.5 bg-brand-card">
        {label}
      </div>
      <div className="text-[13px] text-brand-cream px-3.5 py-2.5 leading-relaxed border-l border-brand-border">
        {Array.isArray(value) ? (value as string[]).join(', ') : String(value)}
      </div>
    </div>
  )
}

function Section({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-6 h-6 bg-brand-red text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">
          {num}
        </div>
        <span className="font-display text-[13px] font-bold text-brand-cream tracking-wider uppercase">
          {title}
        </span>
      </div>
      <div className="border border-brand-border overflow-hidden">{children}</div>
    </div>
  )
}

export default function DetailPanel({ id, onClose }: DetailPanelProps) {
  const [data, setData] = useState<Submission | null>(null)
  const [tier, setTier] = useState('yellow')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setData(null)
    fetch(`/api/admin/submissions/${id}`)
      .then(r => r.json())
      .then(d => { setData(d); setTier((d.tier as string) ?? 'yellow') })
  }, [id])

  async function handleApprove() {
    setBusy(true)
    await fetch(`/api/admin/submissions/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier }),
    })
    setBusy(false)
    onClose()
  }

  async function handleReject() {
    setBusy(true)
    await fetch(`/api/admin/submissions/${id}/reject`, { method: 'POST' })
    setBusy(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60" onClick={onClose} />
      <div className="w-[520px] bg-brand-black flex flex-col shadow-2xl border-l border-brand-border">
        {/* Header */}
        <div className="px-6 py-5 flex justify-between items-start flex-shrink-0 border-b border-brand-border">
          <div>
            <p className="text-[9px] font-bold tracking-[3px] text-brand-red uppercase mb-1">
              Report #{id.slice(0, 8).toUpperCase()}
            </p>
            <h2 className="font-display text-[24px] font-bold text-brand-cream">
              {data ? String(data.perpName ?? '—') : '...'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-brand-muted text-[22px] bg-transparent border-none cursor-pointer hover:text-brand-cream leading-none px-1"
          >
            ×
          </button>
        </div>

        {!data ? (
          <div className="flex-1 flex items-center justify-center text-brand-muted text-sm">
            Loading...
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5">
            <Section num="01" title="Victim">
              <Row label="Age at Incident" value={data.victimAgeRange} />
              <Row label="Gender" value={data.victimGender} />
            </Section>

            <Section num="02" title="Perpetrator">
              <Row label="Full Name" value={data.perpName} />
              <Row label="Age" value={data.perpAge} />
              <Row label="Occupation" value={data.perpOccupation} />
              <Row label="Organization" value={data.perpOrganization} />
              <Row label="Family Connections" value={data.perpFamilyConnections} />
            </Section>

            <Section num="03" title="Crime Details">
              <Row label="Crime Type(s)" value={data.crimeTypes} />
              <Row label="Date" value={data.incidentDate} />
              <Row label="Location" value={data.incidentLocation} />
              <Row label="Description" value={data.crimeDescription} />
              <Row label="Conviction Status" value={data.convictionStatus} />
              <Row label="Court Case No." value={data.courtCaseNumber} />
              <Row label="Verdict Date" value={data.verdictDate} />
              <Row label="Sentence" value={data.sentenceStatus} />
              <Row label="FIR Number" value={data.firNumber} />
              <Row label="News Sources" value={data.newsSources} />
            </Section>

            <Section num="04" title="Current Status">
              <Row label="Perp. Location" value={data.currentLocation} />
              <Row label="Case Status" value={data.caseStatus} />
              <Row label="Appeals" value={data.appealsStatus} />
              <Row label="Notes" value={data.additionalNotes} />
            </Section>

            <Section num="05" title="Submitter">
              <Row label="Name" value={data.submitterName} />
              <Row label="Email" value={data.submitterEmail} />
              <Row label="Source" value={data.knowledgeSource} />
              <Row label="Willing to Contact" value={data.willingToContact} />
            </Section>

            {/* Tier selector */}
            <div className="mt-2">
              <label className="block text-[10px] font-bold tracking-[2px] text-[#555] uppercase mb-2">
                Verification Tier
              </label>
              <select
                value={tier}
                onChange={e => setTier(e.target.value)}
                className="w-full bg-brand-card border border-brand-border text-brand-cream px-3 py-2.5 text-[13px] outline-none cursor-pointer font-sans"
              >
                <option value="green">Green — Court-verified conviction</option>
                <option value="yellow">Yellow — Multiple credible sources</option>
                <option value="red">Red — Needs more verification</option>
              </select>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex border-t border-brand-border flex-shrink-0">
          <button
            onClick={handleApprove}
            disabled={busy || !data}
            className="flex-1 bg-[#27ae60] text-white border-none py-4 text-[13px] font-bold cursor-pointer hover:opacity-90 flex items-center justify-center gap-2 font-sans tracking-wide disabled:opacity-40"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Approve &amp; Publish
          </button>
          <button
            onClick={handleReject}
            disabled={busy || !data}
            className="flex-1 bg-transparent text-brand-red border-none border-l border-brand-border py-4 text-[13px] font-bold cursor-pointer hover:bg-brand-red hover:text-white transition-all flex items-center justify-center gap-2 font-sans tracking-wide disabled:opacity-40"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}
