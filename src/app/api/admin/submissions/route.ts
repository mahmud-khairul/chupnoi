import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const [submissions, approved, rejected] = await Promise.all([
    db.submission.findMany({ where: { status: 'pending' }, orderBy: { createdAt: 'desc' } }),
    db.submission.count({ where: { status: 'approved' } }),
    db.submission.count({ where: { status: 'rejected' } }),
  ])
  return NextResponse.json({
    submissions,
    stats: { pending: submissions.length, approved, rejected },
  })
}
