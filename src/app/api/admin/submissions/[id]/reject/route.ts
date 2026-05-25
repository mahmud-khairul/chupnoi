export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  await db.submission.update({
    where: { id: params.id },
    data: { status: 'rejected', reviewedAt: new Date() },
  })
  return NextResponse.json({ ok: true })
}
