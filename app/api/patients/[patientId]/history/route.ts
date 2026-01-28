import { NextResponse } from "next/server";
import { getMedicalHistoryByPatient, patients } from "@/lib/database";

type Params = {
  params: Promise<{
    patientId: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { patientId } = await params;
  const matched = patients.find((item) => item.patientId === patientId);
  const history = matched ? getMedicalHistoryByPatient(matched.id) : [];

  return NextResponse.json({ data: history });
}
