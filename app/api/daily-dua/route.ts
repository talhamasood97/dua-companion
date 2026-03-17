import { type NextRequest, NextResponse } from "next/server";
import { getDailyDua } from "@/lib/duas";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  // Rate limit: 60 requests per IP per minute (CDN cache handles most traffic)
  const ip = getClientIp(request.headers);
  const rl = rateLimit(`daily-dua:${ip}`, 60, 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  try {
    const dua = await getDailyDua();
    return NextResponse.json(dua, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
