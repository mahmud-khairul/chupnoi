import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const required = [
      'victimName', 'victimAgeRange', 'victimGender',
      'perpName', 'crimeTypes', 'incidentDate', 'incidentLocation',
      'crimeDescription', 'convictionStatus', 'newsSources',
      'currentLocation', 'caseStatus', 'submitterEmail',
      'knowledgeSource', 'willingToContact',
      'verifiedConsent', 'privacyConsent',
    ]

    for (const field of required) {
      const val = body[field]
      if (val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    if (!body.verifiedConsent || !body.privacyConsent) {
      return NextResponse.json({ error: 'Consent is required' }, { status: 400 })
    }

    const submission = await db.submission.create({
      data: {
        victimName: body.victimName,
        victimAgeRange: body.victimAgeRange,
        victimGender: body.victimGender,
        perpName: body.perpName,
        perpAge: body.perpAge ?? null,
        perpOccupation: body.perpOccupation ?? null,
        perpOrganization: body.perpOrganization ?? null,
        perpFamilyConnections: body.perpFamilyConnections ?? null,
        crimeTypes: body.crimeTypes,
        incidentDate: body.incidentDate,
        incidentLocation: body.incidentLocation,
        crimeDescription: body.crimeDescription,
        convictionStatus: body.convictionStatus,
        courtCaseNumber: body.courtCaseNumber ?? null,
        verdictDate: body.verdictDate ?? null,
        sentenceStatus: body.sentenceStatus ?? null,
        newsSources: body.newsSources,
        firNumber: body.firNumber ?? null,
        currentLocation: body.currentLocation,
        caseStatus: body.caseStatus,
        appealsStatus: body.appealsStatus ?? null,
        additionalNotes: body.additionalNotes ?? null,
        submitterName: body.submitterName ?? null,
        submitterEmail: body.submitterEmail,
        knowledgeSource: body.knowledgeSource,
        willingToContact: body.willingToContact,
        verifiedConsent: body.verifiedConsent,
        privacyConsent: body.privacyConsent,
      },
    })

    return NextResponse.json({ id: submission.id }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
