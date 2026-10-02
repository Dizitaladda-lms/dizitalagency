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

    // 🔒 2. Send Lead directly to DizitalAdda CRM System
    let crmSuccess = false
    try {
      const crmPayload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        budget: data.budget,
        message: data.message,
        subject: data.subject || 'Agency Website Inquiry',
        domain: 'clients',
        domains: 'clients',
        source: 'Agency website',
      }

      const crmRes = await fetch('https://leads.dizitaladda.com/api/public/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(crmPayload),
      })

      const crmResult = await crmRes.json().catch(() => null)
      console.log('CRM API Status:', crmRes.status, crmResult)
      if (crmRes.ok || crmRes.status === 200 || crmRes.status === 201) {
        crmSuccess = true
      }
    } catch (crmError) {
      console.error('CRM API Post Error:', crmError)
    }

    // 🔒 3. Optional Backup Web3Forms Relay
    let web3FormsSuccess = false
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY
    if (accessKey) {
      try {
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
        if (result.success) web3FormsSuccess = true
      } catch (err) {
        console.error('Web3Forms backup relay failed:', err)
      }
    }

    // Record audit event
    await recordAudit('contact.submit_success', {
      actor: data.email,
      ip,
      metadata: {
        name: data.name,
        service: data.service,
        budget: data.budget,
        crmSuccess,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your inquiry has been sent successfully. Our growth specialist will contact you shortly.',
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('POST /api/contact error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
