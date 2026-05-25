import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? ''

  const perpetrators = await db.perpetrator.findMany({
    where: {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { location: { contains: search, mode: 'insensitive' } },
            { crimeTypes: { hasSome: [search] } },
          ],
        } : {},
        status ? { convictionStatus: { contains: status, mode: 'insensitive' } } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(perpetrators)
}
