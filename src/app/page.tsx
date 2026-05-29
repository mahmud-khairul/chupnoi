export const dynamic = 'force-dynamic'
import LandingPageContent from '@/components/LandingPageContent'
import { db } from '@/lib/db'

type Record = {
  id: string; name: string; age: string | null
  crimeTypes: string[]; location: string
  incidentDate: string; convictionStatus: string
}

async function getStats() {
  try {
    const [totalRecords, convictions, districts, totalReports] = await Promise.all([
      db.perpetrator.count(),
      db.perpetrator.count({ where: { convictionStatus: { contains: 'Convicted' } } }),
      db.perpetrator.findMany({ select: { location: true } }),
      db.submission.count(),
    ])
    const uniqueDistricts = new Set(districts.map((p: { location: string }) => p.location.split(',')[0].trim())).size
    return { totalRecords, convictions, districts: uniqueDistricts, totalReports }
  } catch {
    return { totalRecords: 0, convictions: 0, districts: 0, totalReports: 0 }
  }
}

async function getPreviewRecords(): Promise<Record[]> {
  try {
    return db.perpetrator.findMany({ take: 8, orderBy: { createdAt: 'desc' } })
  } catch {
    return []
  }
}

export default async function LandingPage() {
  const [stats, records] = await Promise.all([getStats(), getPreviewRecords()])
  return <LandingPageContent stats={stats} records={records} />
}
