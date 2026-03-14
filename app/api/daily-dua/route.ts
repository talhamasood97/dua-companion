import { NextResponse } from "next/server";
import { getDailyDua } from "@/lib/duas";

export const runtime = "edge";

export async function GET() {
  const dua = await getDailyDua();
  return NextResponse.json(dua, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
