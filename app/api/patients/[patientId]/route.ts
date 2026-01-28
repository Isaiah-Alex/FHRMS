import { NextResponse } from "next/server";
import { getPatientById } from "@/lib/database";

type Params = {
  params: Promise<{
    patientId: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { patientId } = await params;
  const patient = getPatientById(patientId);

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({ data: patient });
}
