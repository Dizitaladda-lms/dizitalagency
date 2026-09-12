import { NextResponse } from 'next/server'
import { clearAdminSessionCookie, ensureAdminApi } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const session = await ensureAdminApi(request)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const response = NextResponse.json({ success: true }, { status: 200 })
    response.cookies.set('admin_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })
    
    // Clear legacy session cookie
    clearAdminSessionCookie(response)
    
    return response
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
