import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const getSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is required for admin authentication')
  return new TextEncoder().encode(secret)
}
const COOKIE_NAME = 'admin_token'

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload
  } catch {
    return null
  }
}

export async function getAuthToken() {
  try {
    const cookieStore = await cookies()
    return cookieStore.get(COOKIE_NAME)?.value ?? null
  } catch {
    return null
  }
}

export async function verifyAuthRequest(request?: NextRequest) {
  // 1. Check Authorization Bearer header
  if (request) {
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim()
      const payload = await verifyToken(token)
      if (payload) return payload
    }

    const cookieToken = request.cookies.get(COOKIE_NAME)?.value
    if (cookieToken) {
      const payload = await verifyToken(cookieToken)
      if (payload) return payload
    }
  }

  // 2. Check Cookie store fallback
  const token = await getAuthToken()
  if (token) {
    const payload = await verifyToken(token)
    if (payload) return payload
  }

  return null
}

export async function isAuthenticated() {
  const payload = await verifyAuthRequest()
  return payload !== null
}
