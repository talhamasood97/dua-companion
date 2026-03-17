import { type NextRequest, NextResponse } from "next/server";
import { getDuaBySlug } from "@/lib/duas";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // Rate limit: 60 requests per IP per minute (CDN cache handles most traffic)
  const ip = getClientIp(request.headers);
  const rl = rateLimit(`dua-slug:${ip}`, 60, 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  try {
    const dua = await getDuaBySlug(params.slug);
    if (!dua) {
      return NextResponse.json({ error: "Dua not found" }, { status: 404 });
    }
    return NextResponse.json(dua, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
