import { type NextRequest, NextResponse } from "next/server";
import { getAllDuas, getDuasByCategory, getDuasByEmotion } from "@/lib/duas";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  // Rate limit: 60 requests per IP per minute
  const ip = getClientIp(request.headers);
  const rl = rateLimit(`duas:${ip}`, 60, 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const emotion = searchParams.get("emotion");
    const limitParam = searchParams.get("limit");
    let limit: number | undefined;
    if (limitParam !== null) {
      const parsed = parseInt(limitParam, 10);
      if (!Number.isFinite(parsed) || parsed < 1 || parsed > 100) {
        return NextResponse.json(
          { error: "limit must be an integer between 1 and 100" },
          { status: 400 }
        );
      }
      limit = parsed;
    }

    let duas;
    if (category) {
      duas = await getDuasByCategory(category);
    } else if (emotion) {
      duas = await getDuasByEmotion(emotion);
    } else {
      duas = await getAllDuas();
    }

    if (limit !== undefined) {
      duas = duas.slice(0, limit);
    }

    return NextResponse.json(
      { duas, total: duas.length },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
