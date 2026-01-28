import { NextResponse } from "next/server";
import { getPatientById, patients } from "@/lib/database";

type Params = {
  params: Promise<{
    patientId: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { patientId } = await params;
  const matched = patients.find((item) => item.patientId === patientId);
  const patient = matched ? getPatientById(matched.id) : undefined;

  if (!patient) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  return NextResponse.json({ data: patient });
}
