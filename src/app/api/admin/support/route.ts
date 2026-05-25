export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const submissions = await db.supportSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ submissions })
}
