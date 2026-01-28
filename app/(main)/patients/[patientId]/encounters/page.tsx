"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import NameProfile from "@/components/NameProfile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { encounters, patients, type Encounter, type Patient as PatientType } from "@/lib/database";
import Patient from "@/components/Patient";
import clsx from "clsx";
import { Stethoscope, Activity, History, User } from "lucide-react";

const PATIENTS_STORAGE_KEY = "fhrmsPatients";
const ENCOUNTERS_STORAGE_KEY = "fhrmsEncounters";

const tabs = [
  { id: "demographics", label: "Demographics", icon: User, path: (id: string) => `/patients/${id}` },
  { id: "encounters", label: "Encounters", icon: Stethoscope, path: (id: string) => `/patients/${id}/encounters` },
  { id: "vitals", label: "Vitals", icon: Activity, path: (id: string) => `/patients/${id}/vitals` },
  { id: "medical-history", label: "Medical History", icon: History, path: (id: string) => `/patients/${id}/history` },
];

export default function PatientEncountersPage() {
  const params = useParams<{ patientId?: string }>();
  const router = useRouter();
  const patientId = params.patientId ?? "";
  const [patient, setPatient] = useState<PatientType | undefined>(() =>
    patients.find((item) => item.id === patientId)
  );
  const [encounterList, setEncounterList] = useState<Encounter[]>(() =>
    encounters.filter((item) => item.patientId === patientId)
  );

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

    const storedEncounters = window.localStorage.getItem(ENCOUNTERS_STORAGE_KEY);
    if (storedEncounters) {
      try {
        const parsed = JSON.parse(storedEncounters) as Encounter[];
        setEncounterList(parsed.filter((item) => item.patientId === patientId));
      } catch {
        setEncounterList(encounters.filter((item) => item.patientId === patientId));
      }
    }
  }, [patientId]);

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
        Title="Patient Encounters"
        Subtitle={`Encounter records for ${patient.firstName} ${patient.lastName}`}
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
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-2xl font-semibold sm:text-3xl">
                    {patient.firstName} {patient.lastName}
                  </h1>
                  <Badge className="bg-success-light text-success border-0 uppercase text-xs font-semibold px-2 py-1">
                    {patient.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                  <span>
                    Patient ID: <strong className="text-neutral-900">{patient.patientId}</strong>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <button
                onClick={() => router.push(`/patients/${patient.id}`)}
                className="border border-neutral-200 bg-white text-neutral-500 hover:bg-primary hover:text-white rounded-md px-4 py-2 text-sm font-medium"
              >
                Back to Patient
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-primary/15">
        <CardContent className="p-0">
          <div className="flex border-b border-neutral-200 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === "encounters";
              return (
                <button
                  key={tab.id}
                  onClick={() => router.push(tab.path(patientId))}
                  className={clsx(
                    "flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors relative whitespace-nowrap",
                    isActive
                      ? "text-primary"
                      : "text-neutral-500 hover:text-neutral-700 hover:bg-neutral-200/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg border-neutral-200 border shadow-md">
        <h3 className="font-semibold text-xl py-4 pl-4 border-b border-neutral-200">
          Encounter History
        </h3>
        {encounterList.length > 0 ? (
          encounterList.map((encounter) => (
            <Patient
              key={encounter.id}
              patientId={patient.id}
              encounterId={encounter.id}
              isEncounter={true}
              encounter={encounter}
              patient={patient}
            />
          ))
        ) : (
          <p className="text-neutral-500 text-center py-8">No encounters found for this patient.</p>
        )}
      </Card>
    </div>
  );
}
