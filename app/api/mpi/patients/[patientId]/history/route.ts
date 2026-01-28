import { NextResponse } from "next/server";
import { getMedicalHistoryByPatient } from "@/lib/database";

type Params = {
  params: Promise<{
    patientId: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { patientId } = await params;
  const history = getMedicalHistoryByPatient(patientId);

  return NextResponse.json({ data: history });
}
