import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, name, location, phone, email, message } = body

    if (!name || !location || !phone || !email || !message || !type) {
      return NextResponse.json({ error: 'সব তথ্য পূরণ করুন।' }, { status: 400 })
    }

    await db.helpRequest.create({
      data: { type, name, location, phone, email, message },
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[help-request]', err)
    return NextResponse.json({ error: 'কিছু একটা ভুল হয়েছে।' }, { status: 500 })
  }
}
