import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/request-info'
import { recordAudit } from '@/lib/audit'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional().default(''),
  service: z.string().optional().default('General Inquiry'),
  budget: z.string().optional().default('Not Specified'),
  subject: z.string().optional().default('Project Inquiry'),
  message: z.string().min(1, 'Message is required').max(3000),
})

export async function POST(request: NextRequest) {
  try {
    const ip = await getClientIp(request)

    // 🔒 1. Anti-Spam Rate Limiter (Max 5 submissions per 60 seconds per IP)
    const rateCheck = checkRateLimit(`contact_submit_${ip}`, 5, 60 * 1000)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please wait ${rateCheck.retryAfter} seconds before submitting another inquiry.`,
          retryAfter: rateCheck.retryAfter,
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid form data' },
        { status: 400 }
      )
    }

    const data = parsed.data
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      console.error('WEB3FORMS_ACCESS_KEY is not configured')
      return NextResponse.json({ error: 'Contact delivery is not configured' }, { status: 503 })
    }

    // 🔒 2. Forward to Web3Forms Server-Side (Key is never exposed to browser)
    const formData = new FormData()
    formData.append('access_key', accessKey)
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('service', data.service)
    formData.append('budget', data.budget)
    formData.append('subject', data.subject)
    formData.append('message', data.message)
    formData.append('from_name', 'DigitalAdda Lead Engine')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    if (result.success) {
      await recordAudit('contact.submit_success', {
        actor: data.email,
        ip,
        metadata: {
          name: data.name,
          service: data.service,
          budget: data.budget,
        },
      })

      return NextResponse.json(
        {
          success: true,
          message: 'Thank you! Your inquiry has been sent successfully. Our growth specialist will contact you shortly.',
        },
        { status: 200 }
      )
    } else {
      console.error('Web3Forms Relay Error:', result)
      return NextResponse.json(
        { error: result.message || 'Failed to deliver message. Please try again or email us directly.' },
        { status: 502 }
      )
    }
  } catch (error: any) {
    console.error('POST /api/contact error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
