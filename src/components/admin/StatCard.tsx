interface StatCardProps {
  value: number
  label: string
  color: string
}

export default function StatCard({ value, label, color }: StatCardProps) {
  return (
    <div className="bg-brand-black p-7">
      <div className="font-display text-[42px] font-black leading-none mb-2" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-brand-muted">{label}</div>
    </div>
  )
}
