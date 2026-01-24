// Re-export from the unified database
export type {
    EncounterType,
    Doctor,
    Diagnosis,
    EncounterFormData,
    EncounterFormSchema,
    Encounter
} from "./database";

export {
    mockDoctor,
    mockPatientForEncounter,
    mockICD10Codes,
    encounterFormSchema,
    doctors,
    diagnoses,
    encounters
} from "./database";