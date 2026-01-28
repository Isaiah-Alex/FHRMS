import { NextResponse } from "next/server";
import { getVitalsByPatient, type VitalRecord } from "@/lib/database";

type Params = {
  params: Promise<{
    patientId: string;
  }>;
};

const vitalsStore: Record<string, VitalRecord[]> = {};

const normalizeVitals = (patientId: string) => {
  const baseVitals = getVitalsByPatient(patientId);
  const storedVitals = vitalsStore[patientId] ?? [];
  return [...storedVitals, ...baseVitals];
};

const calculateStatus = (record: VitalRecord) => {
  if (record.temperature >= 39 || record.bloodPressureSystolic >= 160 || record.bloodPressureDiastolic >= 100) {
    return "critical";
  }
  if (record.temperature >= 37.5 || record.bloodPressureSystolic >= 140 || record.bloodPressureDiastolic >= 90) {
    return "warning";
  }
  return "normal";
};

export async function GET(_: Request, { params }: Params) {
  const { patientId } = await params;
  const vitals = normalizeVitals(patientId);
  return NextResponse.json({ data: vitals });
}

export async function POST(request: Request, { params }: Params) {
  const { patientId } = await params;
  const body = await request.json();

  const requiredFields = [
    "bloodPressureSystolic",
    "bloodPressureDiastolic",
    "temperature",
    "pulse",
    "weight",
    "bmi",
    "staffId",
  ];

  const missingField = requiredFields.find((field) => body[field] === undefined || body[field] === null);
  if (missingField) {
    return NextResponse.json({ error: "Missing required vitals fields" }, { status: 400 });
  }

  const now = new Date();
  const date = body.date ?? now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  const time = body.time ?? now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  const newRecord: VitalRecord = {
    id: `VR-${Date.now()}`,
    patientId,
    date,
    time,
    bloodPressureSystolic: Number(body.bloodPressureSystolic),
    bloodPressureDiastolic: Number(body.bloodPressureDiastolic),
    temperature: Number(body.temperature),
    pulse: Number(body.pulse),
    weight: Number(body.weight),
    bmi: Number(body.bmi),
    staffId: String(body.staffId),
    status: "normal",
  };

  newRecord.status = calculateStatus(newRecord);
  vitalsStore[patientId] = [newRecord, ...(vitalsStore[patientId] ?? [])];

  return NextResponse.json({ data: newRecord }, { status: 201 });
}
