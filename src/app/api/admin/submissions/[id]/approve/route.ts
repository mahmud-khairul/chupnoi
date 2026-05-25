export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const submission = await db.submission.findUnique({ where: { id: params.id } })
  if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await _req.json().catch(() => ({}))
  const tier = body.tier ?? 'yellow'

  await db.$transaction([
    db.submission.update({
      where: { id: params.id },
      data: { status: 'approved', reviewedAt: new Date(), tier },
    }),
    db.perpetrator.create({
      data: {
        submissionId: params.id,
        name: submission.perpName,
        age: submission.perpAge,
        occupation: submission.perpOccupation,
        organization: submission.perpOrganization,
        crimeTypes: submission.crimeTypes,
        incidentDate: submission.incidentDate,
        location: submission.incidentLocation,
        convictionStatus: submission.convictionStatus,
        currentStatus: submission.currentLocation,
        sentence: submission.sentenceStatus,
        newsSources: submission.newsSources,
        tier,
      },
    }),
  ])

  return NextResponse.json({ ok: true })
}
