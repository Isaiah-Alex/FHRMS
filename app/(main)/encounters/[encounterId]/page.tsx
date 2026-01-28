"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NameProfile from "@/components/NameProfile";
import {
  Calendar,
  ClipboardList,
  Stethoscope,
  UserRound,
  FileText,
} from "lucide-react";
import {
  encounters,
  patients,
  getDoctorById,
  type Encounter,
  type Patient as PatientType,
} from "@/lib/database";

const STORAGE_KEY = "fhrmsEncounters";
const PATIENTS_STORAGE_KEY = "fhrmsPatients";

export default function EncounterDetailPage() {
  const params = useParams<{ encounterId?: string }>();
  const router = useRouter();
  const encounterId = params.encounterId;
  const [encounter, setEncounter] = useState<Encounter | undefined>(() =>
    encounterId ? encounters.find((item) => item.id === encounterId) : undefined
  );
  const [patient, setPatient] = useState<PatientType | undefined>(() =>
    encounter ? patients.find((item) => item.id === encounter.patientId) : undefined
  );

  useEffect(() => {
    if (!encounterId) return;
    let resolvedEncounter = encounterId
      ? encounters.find((item) => item.id === encounterId)
      : undefined;
    const storedEncounters = window.localStorage.getItem(STORAGE_KEY);
    if (storedEncounters) {
      try {
        const parsed = JSON.parse(storedEncounters) as Encounter[];
        resolvedEncounter = parsed.find((item) => item.id === encounterId) ?? resolvedEncounter;
      } catch {
        resolvedEncounter = encounterId ? encounters.find((item) => item.id === encounterId) : undefined;
      }
    }

    let resolvedPatient = resolvedEncounter
      ? patients.find((item) => item.id === resolvedEncounter.patientId)
      : undefined;
    const storedPatients = window.localStorage.getItem(PATIENTS_STORAGE_KEY);
    if (storedPatients) {
      try {
        const parsed = JSON.parse(storedPatients) as PatientType[];
        resolvedPatient = resolvedEncounter
          ? parsed.find((item) => item.id === resolvedEncounter.patientId) ?? resolvedPatient
          : resolvedPatient;
      } catch {
        resolvedPatient = resolvedPatient ?? undefined;
      }
    }

    setEncounter(resolvedEncounter);
    setPatient(resolvedPatient);
  }, [encounterId]);

  const doctor = encounter ? getDoctorById(encounter.doctorId) : undefined;

  if (!encounter || !patient) {
    return (
      <div className="px-4 my-6 sm:px-5 sm:my-10">
        <div className="bg-white rounded-lg p-8 shadow-md text-center">
          <p className="text-neutral-500">Encounter not found</p>
        </div>
      </div>
    );
  }

  const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;

  return (
    <div className="px-4 my-6 space-y-6 sm:px-5 sm:my-10">
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
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-semibold sm:text-3xl">
                    {patient.firstName} {patient.lastName}
                  </h1>
                  <Badge className="bg-success-light text-success border-0 uppercase text-xs font-semibold px-2 py-1">
                    {encounter.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  <span>
                    Patient ID: <strong className="text-neutral-900">{patient.patientId}</strong>
                  </span>
                  <span>
                    Encounter ID: <strong className="text-neutral-900">{encounter.id}</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button
                variant="outline"
                className="border-neutral-200 bg-white text-neutral-500 hover:bg-primary hover:text-white"
                onClick={() => router.push(`/patients/${patient.id}`)}
              >
                View Patient Profile
              </Button>
              <Button
                className="bg-primary hover:bg-primary-hover text-white"
                onClick={() => router.push("/encounters")}
              >
                Back to Encounters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="shadow-md border-primary/15 lg:col-span-2">
          <CardContent className="py-6 space-y-6">
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Encounter Summary</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-xs text-neutral-500 uppercase">Encounter Type</p>
                <p className="text-sm font-medium">{encounter.encounterType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-neutral-500 uppercase">Date & Time</p>
                <p className="text-sm font-medium">{encounter.date}, {encounter.time}</p>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <p className="text-xs text-neutral-500 uppercase">Reason for Visit</p>
                <p className="text-sm font-medium">{encounter.reasonForVisit}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Clinical Notes</h3>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {encounter.clinicalNotes}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-primary/15">
          <CardContent className="py-6 space-y-4">
            <div className="flex items-center gap-2">
              <UserRound className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Clinician</h2>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">{doctor?.name || "Assigned clinician"}</p>
              <p className="text-sm text-neutral-500">{doctor?.department || "Department not listed"}</p>
              <p className="text-sm text-neutral-500">{doctor?.staffId || "Staff ID unavailable"}</p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Status</h2>
            </div>
            <Badge className="bg-primary-middle text-primary border-0 uppercase text-xs font-semibold px-2 py-1 w-fit">
              {encounter.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md border-primary/15">
        <CardContent className="py-6">
          <div className="flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Diagnoses</h2>
          </div>
          {encounter.diagnoses.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {encounter.diagnoses.map((diagnosis) => (
                <div
                  key={diagnosis.id}
                  className="border border-neutral-200 rounded-lg p-3"
                >
                  <p className="text-sm font-semibold text-neutral-900">{diagnosis.code}</p>
                  <p className="text-sm text-neutral-500">{diagnosis.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">No diagnoses recorded for this encounter.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
