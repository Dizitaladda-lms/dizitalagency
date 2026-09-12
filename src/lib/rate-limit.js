const getStore = () => {
  const globalKey = "__APP_RATE_LIMIT_STORE__";
  if (!globalThis[globalKey]) {
    globalThis[globalKey] = new Map();
  }
  return globalThis[globalKey];
};

export function checkRateLimit(key, limit = 5, windowMs = 60 * 1000) {
  const store = getStore();
  const now = Date.now();
  const windowStart = now - windowMs;

  const timestamps = store.get(key) || [];
  const activeHits = timestamps.filter((time) => time > windowStart);

  if (activeHits.length >= limit) {
    const oldestHit = activeHits[0];
    const resetTime = oldestHit + windowMs;
    const retryAfter = Math.max(1, Math.ceil((resetTime - now) / 1000));

    store.set(key, activeHits);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      totalHits: activeHits.length,
    };
  }

  activeHits.push(now);
  store.set(key, activeHits);

  return {
    allowed: true,
    remaining: Math.max(0, limit - activeHits.length),
    retryAfter: 0,
    totalHits: activeHits.length,
  };
}

export const rateLimit = ({ key, limit = 5, windowMs = 60_000 }) => {
  const result = checkRateLimit(key, limit, windowMs);
  return result.allowed;
};
