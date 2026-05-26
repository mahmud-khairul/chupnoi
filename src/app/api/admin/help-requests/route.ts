export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const requests = await db.helpRequest.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ requests })
}
