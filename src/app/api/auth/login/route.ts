import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth-jwt'
import { setAdminSessionCookie } from '@/lib/auth'
import { checkRateLimit } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/request-info'
import { recordAudit } from '@/lib/audit'

export async function POST(request: NextRequest) {
  try {
    const ip = await getClientIp(request)
    const rateLimitKey = `login_${ip}`

    // 🔒 1. Anti-Brute-Force Rate Limiter (Max 5 attempts / 60s per IP)
    const rateCheck = checkRateLimit(rateLimitKey, 5, 60 * 1000)
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `Too many login attempts. For security, please wait ${rateCheck.retryAfter} seconds before trying again.`,
          retryAfter: rateCheck.retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateCheck.retryAfter),
          },
        }
      )
    }

    const body = await request.json()
    const { email, password } = body as { email: string; password: string }

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword || !process.env.JWT_SECRET || !process.env.ADMIN_SESSION_SECRET) {
      console.error('Admin authentication environment is incomplete')
      return NextResponse.json({ error: 'Admin authentication is not configured' }, { status: 503 })
    }

    if (email.trim().toLowerCase() !== adminEmail.toLowerCase() || password !== adminPassword) {
      await recordAudit('auth.login_failed', {
        actor: email,
        ip,
        metadata: { reason: 'invalid_credentials', attemptsRemaining: rateCheck.remaining },
      })

      return NextResponse.json(
        {
          error: 'Invalid email or password',
          attemptsRemaining: rateCheck.remaining,
        },
        { status: 401 }
      )
    }

    // 🔒 2. Generate Cryptographic JOSE JWT Token
    const token = await signToken({ email: adminEmail, role: 'admin' })

    const response = NextResponse.json({ success: true }, { status: 200 })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    // Bridge to legacy session cookie
    setAdminSessionCookie(response)

    await recordAudit('auth.login_success', {
      actor: adminEmail,
      ip,
      metadata: { role: 'admin' },
    })

    return response
  } catch (error: any) {
    console.error('Login API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
