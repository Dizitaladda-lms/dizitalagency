interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfter: number
  totalHits: number
}

const getStore = () => {
  const globalKey = "__APP_RATE_LIMIT_STORE__"
  if (!(globalThis as any)[globalKey]) {
    ;(globalThis as any)[globalKey] = new Map<string, number[]>()
  }
  return (globalThis as any)[globalKey] as Map<string, number[]>
}

export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const store = getStore()
  const now = Date.now()
  const windowStart = now - windowMs

  // Retrieve previous request timestamps for this key
  const timestamps = store.get(key) || []
  
  // Filter out timestamps outside the active time window
  const activeHits = timestamps.filter((time) => time > windowStart)

  if (activeHits.length >= limit) {
    const oldestHit = activeHits[0]
    const resetTime = oldestHit + windowMs
    const retryAfter = Math.max(1, Math.ceil((resetTime - now) / 1000))

    store.set(key, activeHits)
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      totalHits: activeHits.length,
    }
  }

  // Record this hit
  activeHits.push(now)
  store.set(key, activeHits)

  return {
    allowed: true,
    remaining: Math.max(0, limit - activeHits.length),
    retryAfter: 0,
    totalHits: activeHits.length,
  }
}

export const rateLimit = ({ key, limit, windowMs }: { key: string; limit: number; windowMs: number }) => {
  const result = checkRateLimit(key, limit, windowMs)
  return result.allowed
}
