import { NextResponse } from "next/server";
import { FACILITY_CODE, FACILITY_API_KEY, HIE_BASE_URL } from "@/lib/config";

export async function POST() {
  try {
    const response = await fetch(`${HIE_BASE_URL}/API/AUTH/FACILITY/TOKEN`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        facility_code: FACILITY_CODE,
        api_key: FACILITY_API_KEY,
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { error: payload?.error ?? "Facility authentication failed." },
        { status: response.status }
      );
    }

    return NextResponse.json(payload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Facility authentication failed." },
      { status: 500 }
    );
  }
}
