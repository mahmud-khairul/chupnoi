'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
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

type Stats = { pending: number; approved: number; rejected: number }

function AdminContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const selectedId = searchParams.get('report')

  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rejected: 0 })
  const [loading, setLoading] = useState(true)

  function load() {
    setLoading(true)
    fetch('/api/admin/submissions')
      .then(r => r.json())
      .then(data => {
        setSubmissions(data.submissions ?? [])
        setStats(data.stats ?? { pending: 0, approved: 0, rejected: 0 })
        setLoading(false)
      })
  }

  useEffect(() => { load() }, [])

  function openDetail(id: string) {
    router.push(`/admin?report=${id}`)
  }

  function closeDetail() {
    router.push('/admin')
    load()
  }

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Top bar */}
      <div
        className="fixed top-0 left-0 right-0 z-40 border-b border-brand-border"
        style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(12px)' }}
      >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="text-[10px] text-brand-red font-bold tracking-[3px] uppercase flex items-center gap-1.5">
            <svg viewBox="0 0 20 20" fill="currentColor" width="10" height="10">
              <path d="M10 1L3 4v5c0 4.4 3 8.5 7 9.9C14 17.5 17 13.4 17 9V4L10 1z" />
            </svg>
            SafeGuard BD
          </div>
          <span className="text-[#333] text-[10px]">/</span>
          <span className="text-[10px] text-brand-muted tracking-[1px] uppercase font-bold">Admin</span>
        </div>
        <button
          onClick={async () => {
            await fetch('/api/admin/logout', { method: 'POST' })
            router.push('/admin/login')
          }}
          className="text-[11px] text-brand-muted hover:text-brand-cream transition-colors font-bold tracking-[1px] uppercase"
        >
          Sign Out
        </button>
      </div>
      </div>

      {/* Main content */}
      <div className="pt-20 pb-12">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pt-6">
          <p className="text-[10px] text-brand-red font-bold tracking-[3px] uppercase mb-1">Review Panel</p>
          <h1 className="font-display text-[clamp(28px,4vw,48px)] font-black text-brand-cream tracking-tight">
            Submission Queue
          </h1>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a', marginBottom: '32px' }}>
          <StatCard value={stats.pending} label="Pending Review" color="#e67e22" />
          <StatCard value={stats.approved} label="Approved" color="#27ae60" />
          <StatCard value={stats.rejected} label="Rejected" color="#c0392b" />
        </div>

        {/* Table */}
        <div className="border border-brand-border overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-card">
                {['Perpetrator', 'Offense', 'Location', 'Submitted', 'Status', 'Actions'].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-brand-muted text-sm">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && submissions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-brand-muted text-sm">
                    No pending submissions.
                  </td>
                </tr>
              )}
              {submissions.map((s, i) => (
                <ReportRow
                  key={s.id}
                  submission={s}
                  index={i}
                  onOpen={() => openDetail(s.id)}
                  onAction={load}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Detail panel */}
      {selectedId && (
        <DetailPanel id={selectedId} onClose={closeDetail} />
      )}
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
