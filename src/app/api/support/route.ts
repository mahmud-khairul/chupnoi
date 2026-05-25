export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type } = body

    if (!['ngo', 'lawyer', 'doctor'].includes(type)) {
      return NextResponse.json({ error: 'Invalid submission type' }, { status: 400 })
    }

    const ngoRequired = ['orgName', 'contactPerson', 'email', 'district', 'focusArea', 'howToHelp']
    const lawyerRequired = ['fullName', 'barCouncilId', 'court', 'specialty', 'email', 'phone', 'district', 'supportType']
    const doctorRequired = ['fullName', 'bmdcId', 'specialty', 'email', 'district', 'supportType']

    const required = type === 'ngo' ? ngoRequired : type === 'lawyer' ? lawyerRequired : doctorRequired

    for (const field of required) {
      const val = body[field]
      if (!val || val === '') {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    const record = await db.supportSubmission.create({
      data: {
        type,
        email: body.email,
        phone: body.phone ?? null,
        district: body.district,
        supportType: body.supportType ?? '',
        orgName: body.orgName ?? null,
        regNum: body.regNum ?? null,
        contactPerson: body.contactPerson ?? null,
        contactTitle: body.contactTitle ?? null,
        focusArea: body.focusArea ?? null,
        howToHelp: body.howToHelp ?? null,
        fullName: body.fullName ?? null,
        specialty: body.specialty ?? null,
        barCouncilId: body.barCouncilId ?? null,
        court: body.court ?? null,
        bmdcId: body.bmdcId ?? null,
        institution: body.institution ?? null,
      },
    })

    return NextResponse.json({ id: record.id }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
