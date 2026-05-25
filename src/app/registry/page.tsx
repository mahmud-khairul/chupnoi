'use client'
import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StatusBadge from '@/components/StatusBadge'

type Perpetrator = {
  id: string; name: string; age: string | null; crimeTypes: string[]
  location: string; incidentDate: string; convictionStatus: string
}

const STATUS_OPTIONS = ['Convicted', 'Charged', 'Accused', 'Arrested', 'Absconded', 'Released']

export default function RegistryPage() {
  const [records, setRecords] = useState<Perpetrator[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (status) params.set('status', status)
    fetch(`/api/perpetrators?${params}`)
      .then(r => r.json())
      .then(data => { setRecords(data); setLoading(false) })
  }, [search, status])

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      <Nav />
      <div className="pt-28 pb-12 flex-1">
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-7">
          <div>
            <p className="text-[10px] text-brand-red font-bold tracking-[3px] uppercase mb-1">Public Record</p>
            <h1 className="font-display text-[clamp(32px,5vw,56px)] font-black text-brand-cream tracking-tight">
              Perpetrator Registry
            </h1>
            <p className="text-[12px] text-brand-muted mt-1">{records.length} records</p>
          </div>
          <div className="flex gap-2">
            <div
              className="flex items-center gap-2 border border-brand-border px-3 py-2.5 min-w-[280px]"
              style={{ background: '#0f0f0f' }}
            >
              <svg width="13" height="13" fill="none" stroke="#444" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, offense, location..."
                className="border-none outline-none text-[13px] text-brand-cream bg-transparent flex-1 font-sans placeholder:text-[#444]"
              />
            </div>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="border border-brand-border px-3 py-2.5 text-[12px] text-brand-muted outline-none cursor-pointer font-sans"
              style={{ background: '#0f0f0f' }}
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="border border-brand-border overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-brand-card">
                {['Name', 'Offense', 'Location', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[9px] font-bold tracking-[2px] text-[#444] uppercase border-b border-brand-border">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-brand-muted text-sm">Loading...</td></tr>
              )}
              {!loading && records.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-12 text-center text-brand-muted text-sm">No records found.</td></tr>
              )}
              {records.map((r, i) => (
                <tr key={r.id} className={`border-b border-brand-border hover:bg-brand-card transition-colors ${i % 2 === 1 ? 'bg-[#080808]' : 'bg-brand-black'}`}>
                  <td className="px-5 py-4">
                    <div className="font-display text-[14px] font-bold text-brand-cream">{r.name}</div>
                    {r.age && <div className="text-[11px] text-brand-muted mt-0.5">Age {r.age}</div>}
                  </td>
                  <td className="px-5 py-4 text-[12px] text-brand-muted">{r.crimeTypes.join(', ')}</td>
                  <td className="px-5 py-4 text-[12px] text-brand-muted">{r.location}</td>
                  <td className="px-5 py-4 text-[12px] text-[#444] whitespace-nowrap">{r.incidentDate}</td>
                  <td className="px-5 py-4"><StatusBadge status={r.convictionStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
