import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 🔒 1. Public JSON API Exposure Prevention: Redirect to visual pages
  if (pathname === '/api/blogs' || pathname === '/api/blog') {
    return NextResponse.redirect(new URL('/blogs', request.url), 307)
  }

  if (pathname.startsWith('/api/blog/')) {
    const slug = pathname.replace('/api/blog/', '')
    return NextResponse.redirect(new URL(`/blog/${slug}`, request.url), 307)
  }

  // 🔒 2. Check if the path requires Admin protection
  const isAdminPage = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isAdminApi =
    pathname.startsWith('/api/admin') &&
    !pathname.startsWith('/api/admin/login')

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next()
  }

  // 3. Extract Token from Cookie OR Authorization Header
  let token = request.cookies.get('admin_token')?.value

  if (!token) {
    const authHeader = request.headers.get('authorization')
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim()
    }
  }

  // 4. If no token found
  if (!token) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: 'Unauthorized: Valid Admin authentication token required' },
        { status: 401 }
      )
    }
    // Redirect UI users to login
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 5. Verify Cryptographic JWT Signature
  try {
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is required for admin authentication')
    }
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))

    // Attach verified user info to request headers for downstream handlers
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-email', String(payload.email || 'admin'))
    requestHeaders.set('x-user-role', String(payload.role || 'admin'))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: 'Unauthorized: Session expired or invalid signature' },
        { status: 401 }
      )
    }
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/api/blogs',
    '/api/blog/:path*',
  ],
}
