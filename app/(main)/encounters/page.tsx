"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Patient from "@/components/Patient";
import { Card } from "@/components/ui/card";
import { encounters, patients, type Encounter, type Patient as PatientType } from "@/lib/database";

const STORAGE_KEY = "fhrmsEncounters";
const PATIENTS_STORAGE_KEY = "fhrmsPatients";

export default function EncountersPage() {
  const [encounterList, setEncounterList] = useState<Encounter[]>(encounters);
  const [patientList, setPatientList] = useState<PatientType[]>(patients);

  useEffect(() => {
    const storedEncounters = window.localStorage.getItem(STORAGE_KEY);
    if (storedEncounters) {
      try {
        setEncounterList(JSON.parse(storedEncounters) as Encounter[]);
      } catch {
        setEncounterList(encounters);
      }
    }

    const storedPatients = window.localStorage.getItem(PATIENTS_STORAGE_KEY);
    if (storedPatients) {
      try {
        setPatientList(JSON.parse(storedPatients) as PatientType[]);
      } catch {
        setPatientList(patients);
      }
    }
  }, []);

  return (
    <div className="px-4 my-6 space-y-6 sm:px-5 sm:my-10">
      <Hero
        Title="Encounters"
        Subtitle="Review and open encounter records for all patients"
        className=""
      />

      <Card className="bg-white rounded-lg border-neutral-200 border shadow-md">
        <h3 className="font-semibold text-xl py-4 pl-4 border-b border-neutral-200">
          All Encounters
        </h3>
        {encounterList.length > 0 ? (
          encounterList.map((encounter) => (
            <Patient
              key={encounter.id}
              patientId={encounter.patientId}
              encounterId={encounter.id}
              isEncounter={true}
              encounter={encounter}
              patient={patientList.find((patient) => patient.id === encounter.patientId)}
            />
          ))
        ) : (
          <p className="text-neutral-500 text-center py-8">No encounters available</p>
        )}
      </Card>
    </div>
  );
}
