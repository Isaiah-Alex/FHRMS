import { NextResponse } from "next/server";
import { HIE_BASE_URL } from "@/lib/config";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const keyword = url.searchParams.get("keyword") ?? "";
  const authorization = request.headers.get("authorization") ?? "";

  try {
    const response = await fetch(
      `${HIE_BASE_URL}/api/hie/queries?keyword=${encodeURIComponent(keyword)}`,
      {
        headers: authorization ? { Authorization: authorization } : undefined,
      }
    );

    const payload = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error ?? "Unable to fetch records." },
        { status: response.status }
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to fetch records." },
      { status: 500 }
    );
  }
}
