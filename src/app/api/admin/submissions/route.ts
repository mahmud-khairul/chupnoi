export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') ?? 'pending'
  const [submissions, pendingCount, approvedCount, rejectedCount] = await Promise.all([
    db.submission.findMany({ where: { status }, orderBy: { createdAt: 'desc' } }),
    db.submission.count({ where: { status: 'pending' } }),
    db.submission.count({ where: { status: 'approved' } }),
    db.submission.count({ where: { status: 'rejected' } }),
  ])
  return NextResponse.json({
    submissions,
    stats: { pending: pendingCount, approved: approvedCount, rejected: rejectedCount },
  })
}
