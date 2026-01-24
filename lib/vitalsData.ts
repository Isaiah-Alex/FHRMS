// Re-export from the unified database
export type {
    VitalRecord,
    PatientVitalsInfo,
    VitalsSummary
} from "./database";

export {
    mockPatientVitals,
    mockVitalsHistory,
    mockVitalsSummary,
    vitals
} from "./database";