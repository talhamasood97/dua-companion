import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      site: process.env.NEXT_PUBLIC_SITE_URL ?? "not set",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
