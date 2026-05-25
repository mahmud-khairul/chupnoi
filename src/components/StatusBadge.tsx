const STATUS_CONFIG: Record<string, { label: string; style: string }> = {
  'Convicted (Court verdict delivered)': { label: 'CONVICTED', style: 'bg-brand-red text-white' },
  'Charged (Case filed, awaiting trial)': { label: 'CHARGED', style: 'bg-status-charged text-white' },
  'Accused (Suspected, not yet arrested)': { label: 'ACCUSED', style: 'bg-[#1a1a1a] text-brand-muted border border-[#333]' },
  'Arrested (In police custody/jail)': { label: 'ARRESTED', style: 'bg-[#78350f] text-[#fbbf24]' },
  'Absconded (Suspect at large)': { label: 'ABSCONDED', style: 'bg-[#1f2937] text-[#9ca3af]' },
  'Released (Was convicted but released)': { label: 'RELEASED', style: 'bg-[#111827] text-[#6b7280] border border-[#374151]' },
  'Outside court settlement': { label: 'SETTLED', style: 'bg-[#1e1b4b] text-[#a5b4fc]' },
}

export default function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] ?? { label: status.toUpperCase(), style: 'bg-[#1a1a1a] text-brand-muted' }
  return (
    <span className={`inline-block px-2 py-0.5 text-[9.5px] font-bold tracking-widest ${cfg.style}`}>
      {cfg.label}
    </span>
  )
}
