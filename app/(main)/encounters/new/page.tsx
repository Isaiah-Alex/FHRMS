"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  encounters,
  doctors,
  patients,
  type Encounter,
  type Patient as PatientType,
  type Diagnosis,
} from "@/lib/database";

const STORAGE_KEY = "fhrmsEncounters";
const PATIENTS_STORAGE_KEY = "fhrmsPatients";

type EncounterForm = {
  patientId: string;
  encounterType: Encounter["encounterType"];
  date: string;
  time: string;
  reasonForVisit: string;
  clinicalNotes: string;
  diagnosisCode: string;
  diagnosisDescription: string;
};

const initialFormState: EncounterForm = {
  patientId: "",
  encounterType: "OPD",
  date: "",
  time: "",
  reasonForVisit: "",
  clinicalNotes: "",
  diagnosisCode: "",
  diagnosisDescription: "",
};

export default function CreateEncounterPage() {
  const router = useRouter();
  const [patientList, setPatientList] = useState<PatientType[]>(patients);
  const [formState, setFormState] = useState<EncounterForm>(initialFormState);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const storedPatients = window.localStorage.getItem(PATIENTS_STORAGE_KEY);
    if (storedPatients) {
      try {
        setPatientList(JSON.parse(storedPatients) as PatientType[]);
      } catch {
        setPatientList(patients);
      }
    }
  }, []);

  const getStoredEncounters = () => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return encounters;
    try {
      return JSON.parse(stored) as Encounter[];
    } catch {
      return encounters;
    }
  };

  const getNextEncounterId = (existingEncounters: Encounter[]) => {
    const numbers = existingEncounters.map((encounter) => {
      const match = encounter.id.match(/ENC-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });
    const maxNumber = numbers.length ? Math.max(...numbers) : 0;
    return `ENC-${String(maxNumber + 1).padStart(3, "0")}`;
  };

  const handleChange = (field: keyof EncounterForm, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const requiredFields: Array<keyof EncounterForm> = [
      "patientId",
      "encounterType",
      "date",
      "time",
      "reasonForVisit",
      "clinicalNotes",
    ];

    const missingField = requiredFields.find((field) => !formState[field].trim());
    if (missingField) {
      setFormError("Please complete all required fields before saving.");
      return;
    }

    const existingEncounters = getStoredEncounters();
    const newDiagnoses: Diagnosis[] = formState.diagnosisCode.trim() && formState.diagnosisDescription.trim()
      ? [{
          id: `DX-${Date.now()}`,
          code: formState.diagnosisCode.trim(),
          description: formState.diagnosisDescription.trim(),
        }]
      : [];

    const newEncounter: Encounter = {
      id: getNextEncounterId(existingEncounters),
      patientId: formState.patientId,
      doctorId: doctors[0]?.id ?? "DOC-001",
      encounterType: formState.encounterType,
      date: formState.date,
      time: formState.time,
      reasonForVisit: formState.reasonForVisit.trim(),
      clinicalNotes: formState.clinicalNotes.trim(),
      diagnoses: newDiagnoses,
      status: "active",
    };

    const updatedEncounters = [newEncounter, ...existingEncounters];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEncounters));
    setFormState(initialFormState);
    router.push(`/encounters/${newEncounter.id}`);
  };

  return (
    <div className="px-4 my-6 space-y-8 sm:px-5 sm:my-10">
      <Hero
        Title="Create Encounter"
        Subtitle="Record a new clinical encounter and tie it to a patient"
        className=""
      />

      <div className="bg-white rounded-lg p-6 shadow-md space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="patientId">Patient *</Label>
              <Select value={formState.patientId} onValueChange={(value) => handleChange("patientId", value)}>
                <SelectTrigger id="patientId">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patientList.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id} className="focus:bg-primary focus:text-white">
                      {patient.firstName} {patient.lastName} ({patient.patientId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="encounterType">Encounter Type *</Label>
              <Select value={formState.encounterType} onValueChange={(value) => handleChange("encounterType", value)}>
                <SelectTrigger id="encounterType">
                  <SelectValue placeholder="Select encounter type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPD" className="focus:bg-primary focus:text-white">OPD (Outpatient)</SelectItem>
                  <SelectItem value="IPD" className="focus:bg-primary focus:text-white">IPD (Inpatient)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formState.date}
                onChange={(event) => handleChange("date", event.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                value={formState.time}
                onChange={(event) => handleChange("time", event.target.value)}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="reasonForVisit">Reason for Visit *</Label>
              <Textarea
                id="reasonForVisit"
                value={formState.reasonForVisit}
                onChange={(event) => handleChange("reasonForVisit", event.target.value)}
                rows={3}
                placeholder="Enter reason for visit"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="clinicalNotes">Clinical Notes *</Label>
              <Textarea
                id="clinicalNotes"
                value={formState.clinicalNotes}
                onChange={(event) => handleChange("clinicalNotes", event.target.value)}
                rows={5}
                placeholder="Enter clinical notes"
                required
              />
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-4">
            <h2 className="text-lg font-semibold">Diagnosis (Optional)</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="diagnosisCode">Diagnosis Code</Label>
                <Input
                  id="diagnosisCode"
                  value={formState.diagnosisCode}
                  onChange={(event) => handleChange("diagnosisCode", event.target.value)}
                  placeholder="ICD-10 code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosisDescription">Diagnosis Description</Label>
                <Input
                  id="diagnosisDescription"
                  value={formState.diagnosisDescription}
                  onChange={(event) => handleChange("diagnosisDescription", event.target.value)}
                  placeholder="Diagnosis description"
                />
              </div>
            </div>
          </div>

          {formError && (
            <p className="text-sm text-warning">{formError}</p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/encounters")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto"
            >
              Save Encounter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
