/**
 * Lightweight in-memory rate limiter.
 *
 * Works on a per-process basis — good enough for Vercel serverless where each
 * warm instance handles many requests. Does NOT persist across cold starts or
 * multiple instances, but significantly reduces abuse within a given instance.
 *
 * For true cross-instance limiting, swap this for an Upstash Redis sliding
 * window when the traffic warrants it.
 */

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();
const MAX_STORE_SIZE = 5_000;

/** Returns true if the request is allowed, false if it should be rate-limited. */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // First hit in this window (or window expired) — allow and start counter
    store.set(key, { count: 1, resetAt: now + windowMs });

    // Periodically evict expired entries to prevent unbounded growth
    if (store.size > MAX_STORE_SIZE) {
      for (const [k, v] of store) {
        if (now > v.resetAt) store.delete(k);
      }
    }

    return { allowed: true, retryAfterSec: 0 };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count++;
  return { allowed: true, retryAfterSec: 0 };
}

/** Extract the first meaningful IP from x-forwarded-for or fall back to a sentinel. */
export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0].trim();
    if (first) return first;
  }
  return "unknown";
}
