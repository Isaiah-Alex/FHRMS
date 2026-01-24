// Comprehensive Mock Database - Acts as a single source of truth
// This file consolidates all mock data that would normally come from a database

// ================================
// TYPES
// ================================


// Add these types and data to your existing database.ts file

// ================================
// LABORATORY TYPES (add to existing types section)
// ================================

export type LabTestStatus = "completed" | "pending" | "critical";

export type LabTest = {
    id: string;
    testName: string;
    encounterId: string;
    patientId: string;
    result: string;
    status: LabTestStatus;
    date: string;
    normalRange?: string;
};




export type Patient = {
    id: string;
    firstName: string;
    lastName: string;
    sex: "Male" | "Female" | "Other";
    age: number;
    patientId: string;
    profileColor: "blue" | "green" | "purple" | "yellow";
    // Extended fields for comprehensive patient data
    dateOfBirth?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
    };
};

export type Doctor = {
    id: string;
    name: string;
    department: string;
    qualification: string;
    staffId: string;
    isAuthorized: boolean;
    profileColor: "blue" | "green" | "purple" | "yellow";
};

export type Diagnosis = {
    id: string;
    code: string;
    description: string;
};

export type EncounterType = "OPD" | "IPD";

export type Encounter = {
    id: string;
    patientId: string;
    doctorId: string;
    encounterType: EncounterType;
    date: string;
    time: string;
    reasonForVisit: string;
    clinicalNotes: string;
    diagnoses: Diagnosis[];
    status: "active" | "completed";
};

export type VitalRecord = {
    id: string;
    patientId: string;
    date: string;
    time: string;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    temperature: number;
    pulse: number;
    weight: number;
    bmi: number;
    staffId: string;
    status: "normal" | "warning" | "critical";
};

export type PatientVitalsInfo = {
    id: string;
    name: string;
    patientId: string;
    age: number;
    gender: string;
    profileColor: "blue" | "green" | "purple" | "yellow";
};

export type VitalsSummary = {
    avgBloodPressure: {
        systolic: number;
        diastolic: number;
        status: string;
    };
    weightTrend: {
        change: number;
        status: string;
    };
    restingPulse: {
        value: number;
        status: string;
    };
};

// ================================
// MOCK DATABASE DATA
// ================================

// Patients data
export const patients: Patient[] = [
    {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        sex: "Male",
        age: 45,
        patientId: "PT-2024-001",
        profileColor: "blue",
        dateOfBirth: "1979-03-15",
        phoneNumber: "+1-555-0123",
        email: "john.doe@email.com",
        address: "123 Main St, City, State 12345",
        emergencyContact: {
            name: "Jane Doe",
            relationship: "Wife",
            phone: "+1-555-0124"
        }
    },
    {
        id: "2",
        firstName: "Jane",
        lastName: "Smith",
        sex: "Female",
        age: 32,
        patientId: "PT-2024-002",
        profileColor: "green",
        dateOfBirth: "1992-07-22",
        phoneNumber: "+1-555-0125",
        email: "jane.smith@email.com"
    },
    {
        id: "3",
        firstName: "Michael",
        lastName: "Johnson",
        sex: "Male",
        age: 58,
        patientId: "PT-2024-003",
        profileColor: "purple",
        dateOfBirth: "1966-11-08",
        phoneNumber: "+1-555-0126",
        email: "michael.johnson@email.com"
    },
    {
        id: "4",
        firstName: "Emily",
        lastName: "Williams",
        sex: "Female",
        age: 27,
        patientId: "PT-2024-004",
        profileColor: "yellow",
        dateOfBirth: "1997-01-30",
        phoneNumber: "+1-555-0127",
        email: "emily.williams@email.com"
    },
    {
        id: "5",
        firstName: "David",
        lastName: "Brown",
        sex: "Male",
        age: 41,
        patientId: "PT-2024-005",
        profileColor: "blue",
        dateOfBirth: "1983-09-12",
        phoneNumber: "+1-555-0128",
        email: "david.brown@email.com"
    },
    {
        id: "6",
        firstName: "Sarah",
        lastName: "Davis",
        sex: "Female",
        age: 35,
        patientId: "PT-2024-006",
        profileColor: "green",
        dateOfBirth: "1989-05-18",
        phoneNumber: "+1-555-0129",
        email: "sarah.davis@email.com"
    },
    {
        id: "7",
        firstName: "James",
        lastName: "Miller",
        sex: "Male",
        age: 63,
        patientId: "PT-2024-007",
        profileColor: "purple",
        dateOfBirth: "1961-12-03",
        phoneNumber: "+1-555-0130",
        email: "james.miller@email.com"
    },
    {
        id: "8",
        firstName: "Maria",
        lastName: "Garcia",
        sex: "Female",
        age: 29,
        patientId: "PT-2024-008",
        profileColor: "yellow",
        dateOfBirth: "1995-08-25",
        phoneNumber: "+1-555-0131",
        email: "maria.garcia@email.com"
    },
    {
        id: "9",
        firstName: "Robert",
        lastName: "Martinez",
        sex: "Male",
        age: 50,
        patientId: "PT-2024-009",
        profileColor: "blue",
        dateOfBirth: "1974-04-17",
        phoneNumber: "+1-555-0132",
        email: "robert.martinez@email.com"
    },
    {
        id: "10",
        firstName: "Lisa",
        lastName: "Anderson",
        sex: "Female",
        age: 38,
        patientId: "PT-2024-010",
        profileColor: "green",
        dateOfBirth: "1986-06-09",
        phoneNumber: "+1-555-0133",
        email: "lisa.anderson@email.com"
    },
    {
        id: "11",
        firstName: "Christopher",
        lastName: "Taylor",
        sex: "Male",
        age: 44,
        patientId: "PT-2024-011",
        profileColor: "purple",
        dateOfBirth: "1980-02-28",
        phoneNumber: "+1-555-0134",
        email: "christopher.taylor@email.com"
    },
    {
        id: "12",
        firstName: "Amanda",
        lastName: "Thomas",
        sex: "Female",
        age: 31,
        patientId: "PT-2024-012",
        profileColor: "yellow",
        dateOfBirth: "1993-10-14",
        phoneNumber: "+1-555-0135",
        email: "amanda.thomas@email.com"
    },
    {
        id: "13",
        firstName: "Daniel",
        lastName: "Moore",
        sex: "Male",
        age: 55,
        patientId: "PT-2024-013",
        profileColor: "blue",
        dateOfBirth: "1969-07-06",
        phoneNumber: "+1-555-0136",
        email: "daniel.moore@email.com"
    },
    {
        id: "14",
        firstName: "Jessica",
        lastName: "Jackson",
        sex: "Female",
        age: 26,
        patientId: "PT-2024-014",
        profileColor: "green",
        dateOfBirth: "1998-03-21",
        phoneNumber: "+1-555-0137",
        email: "jessica.jackson@email.com"
    },
    {
        id: "15",
        firstName: "Matthew",
        lastName: "White",
        sex: "Male",
        age: 47,
        patientId: "PT-2024-015",
        profileColor: "purple",
        dateOfBirth: "1977-11-19",
        phoneNumber: "+1-555-0138",
        email: "matthew.white@email.com"
    },
    {
        id: "16",
        firstName: "Ashley",
        lastName: "Harris",
        sex: "Female",
        age: 33,
        patientId: "PT-2024-016",
        profileColor: "yellow",
        dateOfBirth: "1991-01-08",
        phoneNumber: "+1-555-0139",
        email: "ashley.harris@email.com"
    },
    {
        id: "17",
        firstName: "Joshua",
        lastName: "Martin",
        sex: "Male",
        age: 52,
        patientId: "PT-2024-017",
        profileColor: "blue",
        dateOfBirth: "1972-05-27",
        phoneNumber: "+1-555-0140",
        email: "joshua.martin@email.com"
    },
    {
        id: "18",
        firstName: "Melissa",
        lastName: "Thompson",
        sex: "Female",
        age: 40,
        patientId: "PT-2024-018",
        profileColor: "green",
        dateOfBirth: "1984-09-04",
        phoneNumber: "+1-555-0141",
        email: "melissa.thompson@email.com"
    },
    {
        id: "19",
        firstName: "Andrew",
        lastName: "Lee",
        sex: "Male",
        age: 36,
        patientId: "PT-2024-019",
        profileColor: "purple",
        dateOfBirth: "1988-12-16",
        phoneNumber: "+1-555-0142",
        email: "andrew.lee@email.com"
    },
    {
        id: "20",
        firstName: "Stephanie",
        lastName: "Walker",
        sex: "Female",
        age: 28,
        patientId: "PT-2024-020",
        profileColor: "yellow",
        dateOfBirth: "1996-08-13",
        phoneNumber: "+1-555-0143",
        email: "stephanie.walker@email.com"
    },
    {
        id: "21",
        firstName: "Brian",
        lastName: "Hall",
        sex: "Male",
        age: 59,
        patientId: "PT-2024-021",
        profileColor: "blue",
        dateOfBirth: "1965-04-29",
        phoneNumber: "+1-555-0144",
        email: "brian.hall@email.com"
    },
    {
        id: "22",
        firstName: "Nicole",
        lastName: "Allen",
        sex: "Female",
        age: 34,
        patientId: "PT-2024-022",
        profileColor: "green",
        dateOfBirth: "1990-06-11",
        phoneNumber: "+1-555-0145",
        email: "nicole.allen@email.com"
    },
    {
        id: "23",
        firstName: "Kevin",
        lastName: "Young",
        sex: "Male",
        age: 48,
        patientId: "PT-2024-023",
        profileColor: "purple",
        dateOfBirth: "1976-01-23",
        phoneNumber: "+1-555-0146",
        email: "kevin.young@email.com"
    },
    {
        id: "24",
        firstName: "Rachel",
        lastName: "King",
        sex: "Female",
        age: 30,
        patientId: "PT-2024-024",
        profileColor: "yellow",
        dateOfBirth: "1994-07-30",
        phoneNumber: "+1-555-0147",
        email: "rachel.king@email.com"
    },
    {
        id: "25",
        firstName: "Steven",
        lastName: "Wright",
        sex: "Male",
        age: 42,
        patientId: "PT-2024-025",
        profileColor: "blue",
        dateOfBirth: "1982-03-07",
        phoneNumber: "+1-555-0148",
        email: "steven.wright@email.com"
    },
];

// Doctors data
export const doctors: Doctor[] = [
    {
        id: "DOC-001",
        name: "Dr. Sarah Johnson",
        department: "General Medicine",
        qualification: "MBBS, MD",
        staffId: "STF-2024-156",
        isAuthorized: true,
        profileColor: "blue",
    },
    {
        id: "DOC-002",
        name: "Dr. Michael Chen",
        department: "Cardiology",
        qualification: "MBBS, MD, DM",
        staffId: "STF-2024-157",
        isAuthorized: true,
        profileColor: "green",
    },
    {
        id: "DOC-003",
        name: "Dr. Emily Rodriguez",
        department: "Pediatrics",
        qualification: "MBBS, MD",
        staffId: "STF-2024-158",
        isAuthorized: true,
        profileColor: "purple",
    },
    {
        id: "DOC-004",
        name: "Dr. David Kim",
        department: "Orthopedics",
        qualification: "MBBS, MS",
        staffId: "STF-2024-159",
        isAuthorized: true,
        profileColor: "yellow",
    },
];

// Diagnoses/ICD codes
export const diagnoses: Diagnosis[] = [
    { id: "1", code: "J06.9", description: "Acute upper respiratory infection, unspecified" },
    { id: "2", code: "I10", description: "Essential (primary) hypertension" },
    { id: "3", code: "E11.9", description: "Type 2 diabetes mellitus without complications" },
    { id: "4", code: "M54.5", description: "Low back pain" },
    { id: "5", code: "R50.9", description: "Fever, unspecified" },
    { id: "6", code: "K21.9", description: "Gastro-esophageal reflux disease without esophagitis" },
    { id: "7", code: "J45.9", description: "Asthma, unspecified" },
    { id: "8", code: "N39.0", description: "Urinary tract infection, site not specified" },
];

// Encounters data
export const encounters: Encounter[] = [
    {
        id: "ENC-001",
        patientId: "1",
        doctorId: "DOC-001",
        encounterType: "OPD",
        date: "2024-01-21",
        time: "09:30 AM",
        reasonForVisit: "Regular checkup and blood pressure monitoring",
        clinicalNotes: "Patient reports feeling well. BP slightly elevated. Advised lifestyle modifications.",
        diagnoses: [diagnoses[1]], // Hypertension
        status: "completed"
    },
    {
        id: "ENC-002",
        patientId: "2",
        doctorId: "DOC-002",
        encounterType: "OPD",
        date: "2024-01-21",
        time: "10:15 AM",
        reasonForVisit: "Chest pain evaluation",
        clinicalNotes: "ECG normal. Stress test recommended. Follow up in 2 weeks.",
        diagnoses: [],
        status: "active"
    },
];

// Vitals data
export const vitals: VitalRecord[] = [
    {
        id: "1",
        patientId: "1",
        date: "Oct 24, 2023",
        time: "09:15 AM",
        bloodPressureSystolic: 120,
        bloodPressureDiastolic: 80,
        temperature: 36.5,
        pulse: 72,
        weight: 75.5,
        bmi: 23.8,
        staffId: "Nurse Sarah J.",
        status: "normal",
    },
    {
        id: "2",
        patientId: "1",
        date: "Oct 22, 2023",
        time: "02:30 PM",
        bloodPressureSystolic: 145,
        bloodPressureDiastolic: 95,
        temperature: 38.2,
        pulse: 88,
        weight: 75.8,
        bmi: 23.9,
        staffId: "Dr. Michael R.",
        status: "warning",
    },
    {
        id: "3",
        patientId: "1",
        date: "Oct 20, 2023",
        time: "10:00 AM",
        bloodPressureSystolic: 122,
        bloodPressureDiastolic: 82,
        temperature: 36.7,
        pulse: 70,
        weight: 76.2,
        bmi: 24.0,
        staffId: "Nurse Sarah J.",
        status: "normal",
    },
    {
        id: "4",
        patientId: "1",
        date: "Oct 15, 2023",
        time: "11:45 AM",
        bloodPressureSystolic: 118,
        bloodPressureDiastolic: 78,
        temperature: 36.4,
        pulse: 68,
        weight: 76.5,
        bmi: 24.1,
        staffId: "Nurse David K.",
        status: "normal",
    },
];

// ================================
// LABORATORY DATA (add to existing data section)
// ================================

export const labTests: LabTest[] = [
    {
        id: "LAB-001",
        testName: "Complete Blood Count",
        encounterId: "ENC-9402",
        patientId: "1",
        result: "14.2 g/dL",
        status: "completed",
        date: "Oct 24, 2023",
        normalRange: "12-16 g/dL",
    },
    {
        id: "LAB-002",
        testName: "Lipid Panel",
        encounterId: "ENC-8812",
        patientId: "2",
        result: "Processing...",
        status: "pending",
        date: "Oct 25, 2023",
    },
    {
        id: "LAB-003",
        testName: "Basic Metabolic Panel",
        encounterId: "ENC-7734",
        patientId: "3",
        result: "Normal Range",
        status: "completed",
        date: "Oct 23, 2023",
        normalRange: "Within normal limits",
    },
    {
        id: "LAB-004",
        testName: "Urinalysis",
        encounterId: "ENC-6621",
        patientId: "4",
        result: "Trace Protein",
        status: "critical",
        date: "Oct 22, 2023",
        normalRange: "Negative",
    },
    {
        id: "LAB-005",
        testName: "Hemoglobin A1c",
        encounterId: "ENC-5509",
        patientId: "5",
        result: "6.1%",
        status: "completed",
        date: "Oct 21, 2023",
        normalRange: "4-5.6%",
    },
    {
        id: "LAB-006",
        testName: "Thyroid Function Test",
        encounterId: "ENC-4421",
        patientId: "6",
        result: "3.2 mIU/L",
        status: "completed",
        date: "Oct 20, 2023",
        normalRange: "0.4-4.0 mIU/L",
    },
    {
        id: "LAB-007",
        testName: "Liver Function Test",
        encounterId: "ENC-3312",
        patientId: "7",
        result: "Processing...",
        status: "pending",
        date: "Oct 19, 2023",
    },
    {
        id: "LAB-008",
        testName: "Blood Glucose",
        encounterId: "ENC-2234",
        patientId: "8",
        result: "198 mg/dL",
        status: "critical",
        date: "Oct 18, 2023",
        normalRange: "70-100 mg/dL",
    },
    {
        id: "LAB-009",
        testName: "Chest X-Ray",
        encounterId: "ENC-1123",
        patientId: "9",
        result: "Clear",
        status: "completed",
        date: "Oct 17, 2023",
    },
    {
        id: "LAB-010",
        testName: "COVID-19 PCR",
        encounterId: "ENC-0012",
        patientId: "10",
        result: "Negative",
        status: "completed",
        date: "Oct 16, 2023",
    },
    {
        id: "LAB-011",
        testName: "Electrolyte Panel",
        encounterId: "ENC-9876",
        patientId: "11",
        result: "Normal Range",
        status: "completed",
        date: "Oct 15, 2023",
        normalRange: "Within normal limits",
    },
    {
        id: "LAB-012",
        testName: "D-Dimer Test",
        encounterId: "ENC-8765",
        patientId: "12",
        result: "Processing...",
        status: "pending",
        date: "Oct 14, 2023",
    },
];

// ================================
// LEGACY EXPORTS (for backward compatibility)
// ================================

// From mockData.ts
export const mockPatients = patients;

// From mockEncounterData.tsx
export const mockDoctor = doctors[0];
export const mockPatientForEncounter = {
    name: `${patients[0].firstName} ${patients[0].lastName}`,
    patientId: patients[0].patientId,
};
export const mockICD10Codes = diagnoses;

// From vitalsData.ts
export const mockPatientVitals: PatientVitalsInfo = {
    id: patients[0].id,
    name: `${patients[0].firstName} ${patients[0].lastName}`,
    patientId: patients[0].patientId,
    age: patients[0].age,
    gender: patients[0].sex,
    profileColor: patients[0].profileColor,
};
export const mockVitalsHistory = vitals;
export const mockVitalsSummary: VitalsSummary = {
    avgBloodPressure: {
        systolic: 124,
        diastolic: 82,
        status: "Normal",
    },
    weightTrend: {
        change: -1.2,
        status: "Losing",
    },
    restingPulse: {
        value: 71,
        status: "Stable",
    },
};

// ================================
// DATABASE UTILITY FUNCTIONS
// ================================

export const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

export const getDoctorById = (id: string): Doctor | undefined => {
    return doctors.find(doctor => doctor.id === id);
};

export const getPatientsByDoctor = (doctorId: string): Patient[] => {
    const doctorEncounters = encounters.filter(enc => enc.doctorId === doctorId);
    const patientIds = [...new Set(doctorEncounters.map(enc => enc.patientId))];
    return patients.filter(patient => patientIds.includes(patient.id));
};

export const getVitalsByPatient = (patientId: string): VitalRecord[] => {
    return vitals.filter(vital => vital.patientId === patientId);
};

export const getEncountersByPatient = (patientId: string): Encounter[] => {
    return encounters.filter(encounter => encounter.patientId === patientId);
};

// ================================
// ZOD SCHEMAS (from mockEncounterData.tsx)
// ================================

import { z } from "zod";

export type EncounterFormData = {
    encounterType: EncounterType;
    date: string;
    time: string;
    reasonForVisit: string;
    clinicalNotes: string;
    diagnoses: Diagnosis[];
};

export const encounterFormSchema = z.object({
    encounterType: z.enum(["OPD", "IPD"], {
        message: "Please select an encounter type",
    }),
    date: z.string().min(1, "Date is required").refine((date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    }, "Date cannot be in the past"),
    time: z.string().min(1, "Time is required"),
    reasonForVisit: z.string()
        .min(1, "Reason for visit is required")
        .min(10, "Reason for visit must be at least 10 characters")
        .max(500, "Reason for visit cannot exceed 500 characters"),
    clinicalNotes: z.string()
        .min(1, "Clinical notes are required")
        .min(20, "Clinical notes must be at least 20 characters")
        .max(2000, "Clinical notes cannot exceed 2000 characters"),
    diagnoses: z.array(z.object({
        id: z.string(),
        code: z.string(),
        description: z.string(),
    })).min(1, "At least one diagnosis is required"),
});

// ================================
// UTILITY FUNCTIONS (add to existing utility section)
// ================================

export const getLabTestsByPatient = (patientId: string): LabTest[] => {
    return labTests.filter(test => test.patientId === patientId);
};

export const getLabTestsByStatus = (status: LabTestStatus): LabTest[] => {
    return labTests.filter(test => test.status === status);
};

export const getLabTestById = (id: string): LabTest | undefined => {
    return labTests.find(test => test.id === id);
};

export type EncounterFormSchema = z.infer<typeof encounterFormSchema>;