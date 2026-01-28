"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import NameProfile from "@/components/NameProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { patients, type Patient as PatientType, type VitalRecord } from "@/lib/database";

type VitalsForm = {
  systolic: string;
  diastolic: string;
  temperature: string;
  pulse: string;
  weight: string;
  height: string;
  staffId: string;
};

const initialFormState: VitalsForm = {
  systolic: "",
  diastolic: "",
  temperature: "",
  pulse: "",
  weight: "",
  height: "",
  staffId: "Nurse on Duty",
};

const PATIENTS_STORAGE_KEY = "fhrmsPatients";

export default function PatientVitalsPage() {
  const params = useParams<{ patientId?: string }>();
  const router = useRouter();
  const patientId = params.patientId ?? "";
  const [patient, setPatient] = useState<PatientType | undefined>(() =>
    patients.find((item) => item.id === patientId)
  );
  const [vitals, setVitals] = useState<VitalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formState, setFormState] = useState<VitalsForm>(initialFormState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedPatients = window.localStorage.getItem(PATIENTS_STORAGE_KEY);
    if (storedPatients) {
      try {
        const parsed = JSON.parse(storedPatients) as PatientType[];
        const match = parsed.find((item) => item.id === patientId);
        if (match) {
          setPatient(match);
        }
      } catch {
        setPatient(patients.find((item) => item.id === patientId));
      }
    }
  }, [patientId]);

  useEffect(() => {
    const loadVitals = async () => {
      try {
        const response = await fetch(`/api/patients/${patientId}/vitals`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error ?? "Failed to load vitals");
        }
        setVitals(data.data as VitalRecord[]);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Failed to load vitals");
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      loadVitals();
    }
  }, [patientId]);

  const bmi = useMemo(() => {
    const weight = parseFloat(formState.weight);
    const heightMeters = parseFloat(formState.height) / 100;
    if (!weight || !heightMeters) {
      return "";
    }
    return (weight / (heightMeters * heightMeters)).toFixed(1);
  }, [formState.height, formState.weight]);

  const handleFormChange = (field: keyof VitalsForm, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const requiredFields: Array<keyof VitalsForm> = [
      "systolic",
      "diastolic",
      "temperature",
      "pulse",
      "weight",
      "height",
      "staffId",
    ];

    const missingField = requiredFields.find((field) => !formState[field].trim());
    if (missingField) {
      setErrorMessage("Please complete all required fields before saving.");
      return;
    }

    const response = await fetch(`/api/patients/${patientId}/vitals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bloodPressureSystolic: Number(formState.systolic),
        bloodPressureDiastolic: Number(formState.diastolic),
        temperature: Number(formState.temperature),
        pulse: Number(formState.pulse),
        weight: Number(formState.weight),
        bmi: Number(bmi),
        staffId: formState.staffId.trim(),
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setErrorMessage(payload?.error ?? "Failed to save vitals");
      return;
    }

    setVitals((prev) => [payload.data as VitalRecord, ...prev]);
    setFormState(initialFormState);
    setToastMessage("Vitals saved successfully.");
    window.setTimeout(() => setToastMessage(null), 3000);
  };

  if (!patient) {
    return (
      <div className="px-4 my-6 sm:px-5 sm:my-10">
        <div className="bg-white rounded-lg p-8 shadow-md text-center">
          <p className="text-neutral-500">Patient not found</p>
        </div>
      </div>
    );
  }

  const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;

  return (
    <div className="px-4 my-6 space-y-6 sm:px-5 sm:my-10">
      <Hero
        Title="Patient Vitals"
        Subtitle={`Vitals history and new entries for ${patient.firstName} ${patient.lastName}`}
        className=""
      />

      <Card className="shadow-md border-primary/15">
        <CardContent className="py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <NameProfile
                profileDisplay={initials}
                color={patient.profileColor}
                rounded={true}
                className="w-16 h-16 text-xl sm:w-20 sm:h-20 sm:text-2xl"
              />
              <div>
                <h1 className="text-2xl font-semibold sm:text-3xl">
                  {patient.firstName} {patient.lastName}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  <span>
                    Patient ID: <strong className="text-neutral-900">{patient.patientId}</strong>
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-neutral-200 bg-white text-neutral-500 hover:bg-primary hover:text-white"
              onClick={() => router.push(`/patients/${patient.id}`)}
            >
              Back to Patient
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_2fr]">
        <Card className="shadow-md border-primary/15">
          <CardContent className="py-6 space-y-4">
            <h2 className="text-xl font-semibold">Add Vitals</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="systolic">Systolic (mmHg) *</Label>
                  <Input
                    id="systolic"
                    type="number"
                    value={formState.systolic}
                    onChange={(event) => handleFormChange("systolic", event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diastolic">Diastolic (mmHg) *</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    value={formState.diastolic}
                    onChange={(event) => handleFormChange("diastolic", event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (deg C) *</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={formState.temperature}
                    onChange={(event) => handleFormChange("temperature", event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pulse">Pulse (BPM) *</Label>
                  <Input
                    id="pulse"
                    type="number"
                    value={formState.pulse}
                    onChange={(event) => handleFormChange("pulse", event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formState.weight}
                    onChange={(event) => handleFormChange("weight", event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formState.height}
                    onChange={(event) => handleFormChange("height", event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="staffId">Recorded By *</Label>
                <Input
                  id="staffId"
                  value={formState.staffId}
                  onChange={(event) => handleFormChange("staffId", event.target.value)}
                  required
                />
              </div>

              {bmi && (
                <div className="text-sm text-neutral-500">
                  Estimated BMI: <span className="font-semibold text-neutral-900">{bmi}</span>
                </div>
              )}

              {errorMessage && (
                <p className="text-sm text-warning">{errorMessage}</p>
              )}

              <Button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white w-full"
              >
                Save Vitals
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-md border-primary/15">
          <CardContent className="py-6">
            <h2 className="text-xl font-semibold mb-4">Vitals History</h2>
            {isLoading ? (
              <p className="text-sm text-neutral-500">Loading vitals...</p>
            ) : (
              <div className="border rounded-lg overflow-x-auto">
                <Table className="min-w-[760px]">
                  <TableHeader>
                    <TableRow className="bg-primary-light">
                      <TableHead>Date & Time</TableHead>
                      <TableHead>BP (mmHg)</TableHead>
                      <TableHead>Temp</TableHead>
                      <TableHead>Pulse</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead>BMI</TableHead>
                      <TableHead>Staff</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vitals.length > 0 ? (
                      vitals.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="font-medium">{record.date}</div>
                            <div className="text-xs text-neutral-500">{record.time}</div>
                          </TableCell>
                          <TableCell>
                            {record.bloodPressureSystolic}/{record.bloodPressureDiastolic}
                          </TableCell>
                          <TableCell>{record.temperature} deg C</TableCell>
                          <TableCell>{record.pulse} bpm</TableCell>
                          <TableCell>{record.weight} kg</TableCell>
                          <TableCell>{record.bmi}</TableCell>
                          <TableCell className="text-neutral-500">{record.staffId}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                          No vitals recorded for this patient.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border bg-primary/90 text-primary-light">
            <span className="font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-primary-light"
              aria-label="Close notification"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
