'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import StatCard from '@/components/admin/StatCard'
import ReportRow from '@/components/admin/ReportRow'
import DetailPanel from '@/components/admin/DetailPanel'

type Submission = {
  id: string
  perpName: string
  crimeTypes: string[]
  incidentLocation: string
  incidentDate: string
  convictionStatus: string
  submitterEmail: string
  createdAt: string
  status: string
}

type SupportSubmission = {
  id: string
  type: string
  createdAt: string
  email: string
  phone: string | null
  district: string
  supportType: string
  orgName: string | null
  contactPerson: string | null
  focusArea: string | null
  fullName: string | null
  barCouncilId: string | null
  court: string | null
  specialty: string | null
  bmdcId: string | null
  institution: string | null
  howToHelp: string | null
  regNum: string | null
  contactTitle: string | null
}

type Stats = { pending: number; approved: number; rejected: number }

const TYPE_LABELS: Record<string, string> = { ngo: 'এনজিও', lawyer: 'আইনজীবী', doctor: 'ডাক্তার' }
const TYPE_COLORS: Record<string, string> = { ngo: '#3b82f6', lawyer: '#8b5cf6', doctor: '#10b981' }

function AdminContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get('report')

  const [panel, setPanel] = useState<'reports' | 'support'>('reports')
  const [statusFilter, setStatusFilter] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rejected: 0 })
  const [support, setSupport] = useState<SupportSubmission[]>([])
  const [filterType, setFilterType] = useState<'all' | 'ngo' | 'lawyer' | 'doctor'>('all')
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function loadReports(status?: 'pending' | 'approved' | 'rejected') {
    const s = status ?? statusFilter
    setLoading(true)
    fetch(`/api/admin/submissions?status=${s}`)
      .then(r => r.json())
      .then(data => {
        setSubmissions(data.submissions ?? [])
        setStats(data.stats ?? { pending: 0, approved: 0, rejected: 0 })
        setLoading(false)
      })
  }

  function loadSupport() {
    setLoading(true)
    fetch('/api/admin/support')
      .then(r => r.json())
      .then(data => { setSupport(data.submissions ?? []); setLoading(false) })
  }

  useEffect(() => { loadReports() }, [])

  function switchPanel(p: 'reports' | 'support') {
    setPanel(p)
    setExpandedId(null)
    if (p === 'reports') { setStatusFilter('pending'); loadReports('pending') }
    else loadSupport()
  }

  function openDetail(id: string) { router.push(`/admin?report=${id}`) }
  function closeDetail() { router.push('/admin'); loadReports() }

  const filteredSupport = filterType === 'all' ? support : support.filter(s => s.type === filterType)

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Admin nav */}
      <div
        className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border"
        style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          <Link href="/" className="font-display text-xl font-black text-brand-cream no-underline">
            চুপ <span className="text-brand-red">নই</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchPanel('reports')}
              className={`text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-1.5 border transition-colors cursor-pointer ${panel === 'reports' ? 'border-brand-red text-brand-red' : 'border-brand-border text-brand-muted hover:text-brand-cream'}`}
            >
              Submissions
            </button>
            <button
              onClick={() => switchPanel('support')}
              className={`text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-1.5 border transition-colors cursor-pointer ${panel === 'support' ? 'border-brand-red text-brand-red' : 'border-brand-border text-brand-muted hover:text-brand-cream'}`}
            >
              Support Network
            </button>
            <button
              onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); router.push('/admin/login') }}
              className="text-[11px] text-brand-muted hover:text-brand-cream font-bold tracking-[1.5px] uppercase transition-colors border border-brand-border px-3 py-1.5 ml-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-12">
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8">

          {/* ── REPORTS PANEL ── */}
          {panel === 'reports' && (
            <>
              <div className="mb-6 pt-6">
                <p className="text-[12px] text-brand-red font-bold tracking-[3px] uppercase mb-1">Review Panel</p>
                <h1 className="font-display text-[clamp(28px,4vw,48px)] font-black text-brand-cream tracking-tight">
                  Submission Queue
                </h1>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a', marginBottom: '24px' }}>
                <StatCard value={stats.pending} label="Pending Review" color="#e67e22" />
                <StatCard value={stats.approved} label="Approved" color="#27ae60" />
                <StatCard value={stats.rejected} label="Rejected" color="#c0392b" />
              </div>
              <div className="flex gap-1 mb-6">
                {(['pending', 'approved', 'rejected'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); loadReports(s) }}
                    className={`text-[10px] font-bold tracking-[1.5px] uppercase px-4 py-1.5 border cursor-pointer transition-colors ${statusFilter === s ? 'bg-brand-red border-brand-red text-white' : 'border-brand-border text-brand-muted hover:text-brand-cream bg-transparent'}`}
                  >
                    {s === 'pending' ? 'Pending' : s === 'approved' ? 'Approved' : 'Rejected'}
                    <span className="ml-1.5 opacity-60">{stats[s]}</span>
                  </button>
                ))}
              </div>
              <div className="border border-brand-border overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-brand-card">
                      {['Perpetrator', 'Offense', 'Location', 'Submitted', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {loading && <tr><td colSpan={6} className="px-5 py-12 text-center text-brand-muted text-sm">Loading...</td></tr>}
                    {!loading && submissions.length === 0 && (
                      <tr><td colSpan={6} className="px-5 py-12 text-center text-brand-muted text-sm">
                        No {statusFilter} submissions.
                      </td></tr>
                    )}
                    {submissions.map((s, i) => (
                      <ReportRow
                        key={s.id}
                        submission={s}
                        index={i}
                        onOpen={() => openDetail(s.id)}
                        onAction={loadReports}
                        onRemove={statusFilter === 'approved' ? loadReports : undefined}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── SUPPORT NETWORK PANEL ── */}
          {panel === 'support' && (
            <>
              <div className="mb-8 pt-6 flex items-end justify-between">
                <div>
                  <p className="text-[12px] text-brand-red font-bold tracking-[3px] uppercase mb-1">Support Network</p>
                  <h1 className="font-display text-[clamp(28px,4vw,48px)] font-black text-brand-cream tracking-tight">
                    সহযোগিতার আবেদন
                  </h1>
                  <p className="text-brand-muted text-[13px] mt-1">{filteredSupport.length} submission{filteredSupport.length !== 1 ? 's' : ''}</p>
                </div>
                {/* Filter */}
                <div className="flex gap-1">
                  {(['all', 'ngo', 'lawyer', 'doctor'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`text-[10px] font-bold tracking-[1.5px] uppercase px-3 py-1.5 border cursor-pointer transition-colors ${filterType === t ? 'bg-brand-red border-brand-red text-white' : 'border-brand-border text-brand-muted bg-transparent hover:text-brand-cream'}`}
                    >
                      {t === 'all' ? 'সব' : TYPE_LABELS[t]}
                    </button>
                  ))}
                </div>
              </div>

              {loading && <p className="text-brand-muted text-sm py-12 text-center">Loading...</p>}
              {!loading && filteredSupport.length === 0 && <p className="text-brand-muted text-sm py-12 text-center">No submissions yet.</p>}

              <div className="flex flex-col gap-px" style={{ background: '#1a1a1a' }}>
                {filteredSupport.map(s => (
                  <div key={s.id} className="bg-brand-black">
                    {/* Row */}
                    <button
                      onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-brand-card transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <span
                        className="text-[9px] font-black tracking-[1.5px] uppercase px-2 py-1 flex-shrink-0"
                        style={{ background: `${TYPE_COLORS[s.type]}22`, color: TYPE_COLORS[s.type], border: `1px solid ${TYPE_COLORS[s.type]}44` }}
                      >
                        {TYPE_LABELS[s.type] ?? s.type}
                      </span>
                      <span className="font-display text-[14px] font-bold text-brand-cream flex-1">
                        {s.fullName ?? s.orgName ?? '—'}
                      </span>
                      <span className="text-[12px] text-brand-muted">{s.email}</span>
                      <span className="text-[12px] text-brand-muted">{s.district}</span>
                      <span className="text-[11px] text-[#444]">{new Date(s.createdAt).toLocaleDateString('bn-BD')}</span>
                      <span className="text-brand-muted text-[10px] ml-2">{expandedId === s.id ? '▲' : '▼'}</span>
                    </button>

                    {/* Expanded detail */}
                    {expandedId === s.id && (
                      <div className="px-5 pb-5 border-t border-brand-border" style={{ background: '#080808' }}>
                        <div className="grid grid-cols-3 gap-4 pt-4">
                          {s.type === 'ngo' && <>
                            <Detail label="সংস্থার নাম" value={s.orgName} />
                            <Detail label="নিবন্ধন নম্বর" value={s.regNum} />
                            <Detail label="যোগাযোগের ব্যক্তি" value={s.contactPerson} />
                            <Detail label="পদবি" value={s.contactTitle} />
                            <Detail label="ইমেইল" value={s.email} />
                            <Detail label="ফোন" value={s.phone} />
                            <Detail label="জেলা" value={s.district} />
                            <Detail label="মনোযোগের ক্ষেত্র" value={s.focusArea} />
                          </>}
                          {s.type === 'lawyer' && <>
                            <Detail label="পুরো নাম" value={s.fullName} />
                            <Detail label="বার কাউন্সিল আইডি" value={s.barCouncilId} />
                            <Detail label="আদালত" value={s.court} />
                            <Detail label="বিশেষজ্ঞতা" value={s.specialty} />
                            <Detail label="ইমেইল" value={s.email} />
                            <Detail label="ফোন" value={s.phone} />
                            <Detail label="জেলা" value={s.district} />
                            <Detail label="সহায়তার ধরন" value={s.supportType} />
                          </>}
                          {s.type === 'doctor' && <>
                            <Detail label="পুরো নাম" value={s.fullName} />
                            <Detail label="বিএমডিসি নম্বর" value={s.bmdcId} />
                            <Detail label="বিশেষজ্ঞতা" value={s.specialty} />
                            <Detail label="প্রতিষ্ঠান" value={s.institution} />
                            <Detail label="ইমেইল" value={s.email} />
                            <Detail label="ফোন" value={s.phone} />
                            <Detail label="জেলা" value={s.district} />
                            <Detail label="সহায়তার ধরন" value={s.supportType} />
                          </>}
                        </div>
                        {s.howToHelp && (
                          <div className="mt-4 pt-4 border-t border-brand-border">
                            <p className="text-[9px] text-[#444] font-bold tracking-[1.5px] uppercase mb-1">কীভাবে সহযোগিতা করবেন</p>
                            <p className="text-[13px] text-brand-muted leading-relaxed">{s.howToHelp}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {selectedId && panel === 'reports' && (
        <DetailPanel id={selectedId} onClose={closeDetail} />
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-[9px] text-[#444] font-bold tracking-[1.5px] uppercase mb-0.5">{label}</p>
      <p className="text-[13px] text-brand-cream">{value || '—'}</p>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-black flex items-center justify-center">
        <p className="text-brand-muted text-sm">Loading...</p>
      </div>
    }>
      <AdminContent />
    </Suspense>
  )
}
