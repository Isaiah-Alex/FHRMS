import { NextResponse } from "next/server";
import { getVitalsByPatient } from "@/lib/database";

type Params = {
  params: Promise<{
    patientId: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { patientId } = await params;
  const vitals = getVitalsByPatient(patientId);

  return NextResponse.json({ data: vitals });
}
