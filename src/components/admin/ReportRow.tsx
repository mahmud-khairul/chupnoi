'use client'
import StatusBadge from '@/components/StatusBadge'

interface Submission {
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

interface ReportRowProps {
  submission: Submission
  index: number
  onOpen: () => void
  onAction: () => void
  onRemove?: () => void
}

export default function ReportRow({ submission, index, onOpen, onAction, onRemove }: ReportRowProps) {
  const date = new Date(submission.createdAt).toLocaleDateString('en-GB')

  async function quickApprove() {
    await fetch(`/api/admin/submissions/${submission.id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: 'yellow' }),
    })
    onAction()
  }

  async function quickReject() {
    await fetch(`/api/admin/submissions/${submission.id}/reject`, { method: 'POST' })
    onAction()
  }

  return (
    <tr className={`border-b border-brand-border hover:bg-brand-card transition-colors ${index % 2 === 1 ? 'bg-[#080808]' : 'bg-brand-black'}`}>
      <td className="px-5 py-4">
        <div className="font-display text-[14px] font-bold text-brand-cream">{submission.perpName}</div>
        <div className="text-[11px] text-[#444] mt-0.5">{submission.submitterEmail}</div>
      </td>
      <td className="px-5 py-4 text-[12px] text-brand-muted">{submission.crimeTypes.join(', ')}</td>
      <td className="px-5 py-4 text-[12px] text-brand-muted">{submission.incidentLocation}</td>
      <td className="px-5 py-4 text-[12px] text-[#444] whitespace-nowrap">{date}</td>
      <td className="px-5 py-4"><StatusBadge status={submission.convictionStatus} /></td>
      <td className="px-5 py-4">
        <div className="flex gap-1.5 items-center whitespace-nowrap">
          <button
            onClick={onOpen}
            className="bg-transparent text-brand-cream border border-brand-border px-3 py-1.5 text-[11px] font-bold tracking-wide cursor-pointer hover:border-[#444] transition-all font-sans"
          >
            Review
          </button>
          {onRemove ? (
            <button
              onClick={async () => {
                if (!confirm('Remove this entry from the registry?')) return
                await fetch(`/api/admin/submissions/${submission.id}/remove`, { method: 'POST' })
                onRemove()
              }}
              className="text-brand-red border border-brand-red bg-transparent px-3 py-1.5 text-[11px] font-bold tracking-wide cursor-pointer hover:bg-brand-red hover:text-white transition-all font-sans"
            >
              Remove
            </button>
          ) : (
            <>
              <button
                onClick={quickApprove}
                className="flex items-center gap-1 text-[#27ae60] border border-[#27ae60] bg-transparent px-3 py-1.5 text-[11px] font-bold tracking-wide cursor-pointer hover:bg-[#27ae60] hover:text-white transition-all font-sans"
              >
                ✓
              </button>
              <button
                onClick={quickReject}
                className="flex items-center gap-1 text-brand-red border border-brand-red bg-transparent px-3 py-1.5 text-[11px] font-bold tracking-wide cursor-pointer hover:bg-brand-red hover:text-white transition-all font-sans"
              >
                ✕
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
