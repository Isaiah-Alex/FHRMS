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

    // Extended demographic fields (ADD THESE)
    dateOfBirth: string;
    status: "active" | "inactive";
    maritalStatus: "Single" | "Married" | "Divorced" | "Widowed" | "Not Specified";
    preferredLanguage: string;
    nationality: string;
    ethnicity: string;

    // Contact information (KEEP phoneNumber, email, address but ADD these)
    phoneNumber: string;  // This was optional, now required
    primaryPhone: string; // NEW - same as phoneNumber for now
    secondaryPhone?: string; // NEW
    email: string;
    address: string;
    residentialAddress: string; // NEW - same as address

    // Emergency contact (ALREADY EXISTS - just ensure it's required)
    emergencyContact: {
        name: string;
        relationship: string;
        phone: string;
    };

    // Administrative info (ADD THESE)
    primaryCareProvider: string;
    insuranceProvider: string;
    policyNumber: string;

    // Audit info (ADD THESE)
    lastUpdatedBy: string;
    lastUpdatedDate: string;
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

export type MedicalHistoryEntry = {
    id: string;
    patientId: string;
    date: string;
    condition: string;
    status: "active" | "resolved" | "chronic";
    notes: string;
    recordedBy: string;
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
// COMPLETE PATIENTS ARRAY - Replace your entire patients array with this

export const patients: Patient[] = [
    {
        id: "1",
        firstName: "Chinedu",
        lastName: "Okafor",
        sex: "Male",
        age: 45,
        patientId: "FAC-UBTH-4QV0ZJ",
        profileColor: "blue",
        dateOfBirth: "1979-03-15",
        phoneNumber: "+1-555-0123",
        email: "john.doe@email.com",
        address: "123 Main St, City, State 12345",
        emergencyContact: {
            name: "Jane Doe",
            relationship: "Wife",
            phone: "+1-555-0124"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1 (555) 123-4567",
        secondaryPhone: undefined,
        residentialAddress: "123 Healthway Blvd, Suite 402, Metro City, NY 10001, USA",
        primaryCareProvider: "Dr. Amina Yusuf",
        insuranceProvider: "BlueShield Health Plan",
        policyNumber: "BSP-449-1120-X",
        lastUpdatedBy: "Admin (ID: 4421)",
        lastUpdatedDate: "Oct 12, 2023 - 09:42 AM"
    },
    {
        id: "2",
        firstName: "Aisha",
        lastName: "Bello",
        sex: "Female",
        age: 32,
        patientId: "FAC-UBTH-VNFXO1",
        profileColor: "green",
        dateOfBirth: "1992-07-22",
        phoneNumber: "+1-555-0125",
        email: "jane.smith@email.com",
        address: "456 Oak Ave, City, State 12345",
        emergencyContact: {
            name: "John Smith",
            relationship: "Brother",
            phone: "+1-555-0126"
        },
        status: "active",
        maritalStatus: "Single",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0125",
        secondaryPhone: undefined,
        residentialAddress: "456 Oak Ave, City, State 12345",
        primaryCareProvider: "Dr. Chukwuemeka Onah",
        insuranceProvider: "HealthFirst Insurance",
        policyNumber: "HF-223-8891-Y",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 5, 2024 - 02:15 PM"
    },
    {
        id: "3",
        firstName: "Tunde",
        lastName: "Adeyemi",
        sex: "Male",
        age: 58,
        patientId: "FAC-UBTH-OCTTCB",
        profileColor: "purple",
        dateOfBirth: "1966-11-08",
        phoneNumber: "+1-555-0126",
        email: "michael.johnson@email.com",
        address: "789 Pine St, City, State 12345",
        emergencyContact: {
            name: "Amina Yusuf",
            relationship: "Wife",
            phone: "+1-555-0127"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0126",
        secondaryPhone: undefined,
        residentialAddress: "789 Pine St, City, State 12345",
        primaryCareProvider: "Dr. Amina Yusuf",
        insuranceProvider: "Medicare Plus",
        policyNumber: "MP-567-4432-Z",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 3, 2024 - 10:30 AM"
    },
    {
        id: "4",
        firstName: "Ifeoma",
        lastName: "Nwosu",
        sex: "Female",
        age: 27,
        patientId: "FAC-UBTH-7P2KQ9",
        profileColor: "yellow",
        dateOfBirth: "1997-01-30",
        phoneNumber: "+1-555-0127",
        email: "emily.williams@email.com",
        address: "321 Elm St, City, State 12345",
        emergencyContact: {
            name: "Mary Williams",
            relationship: "Mother",
            phone: "+1-555-0128"
        },
        status: "active",
        maritalStatus: "Single",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0127",
        secondaryPhone: undefined,
        residentialAddress: "321 Elm St, City, State 12345",
        primaryCareProvider: "Dr. Hadiza Sule",
        insuranceProvider: "Young Adults Health",
        policyNumber: "YAH-890-2231-A",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 8, 2024 - 03:45 PM"
    },
    {
        id: "5",
        firstName: "Emeka",
        lastName: "Eze",
        sex: "Male",
        age: 41,
        patientId: "FAC-UBTH-1R9XMD",
        profileColor: "blue",
        dateOfBirth: "1983-09-12",
        phoneNumber: "+1-555-0128",
        email: "david.brown@email.com",
        address: "654 Maple Dr, City, State 12345",
        emergencyContact: {
            name: "Lisa Brown",
            relationship: "Wife",
            phone: "+1-555-0129"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0128",
        secondaryPhone: undefined,
        residentialAddress: "654 Maple Dr, City, State 12345",
        primaryCareProvider: "Dr. Segun Ajayi",
        insuranceProvider: "Family Care Insurance",
        policyNumber: "FCI-445-7723-B",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 2, 2024 - 09:20 AM"
    },
    // Continue for patients 6-25 with similar pattern
    {
        id: "6",
        firstName: "Kemi",
        lastName: "Adebayo",
        sex: "Female",
        age: 35,
        patientId: "FAC-UBTH-L8T3WN",
        profileColor: "green",
        dateOfBirth: "1989-05-18",
        phoneNumber: "+1-555-0129",
        email: "sarah.davis@email.com",
        address: "987 Cedar Ln, City, State 12345",
        emergencyContact: {
            name: "Tom Davis",
            relationship: "Husband",
            phone: "+1-555-0130"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0129",
        secondaryPhone: undefined,
        residentialAddress: "987 Cedar Ln, City, State 12345",
        primaryCareProvider: "Dr. Amina Yusuf",
        insuranceProvider: "United Health",
        policyNumber: "UH-778-9954-C",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 6, 2024 - 11:15 AM"
    },
    // ADD THESE PATIENTS TO YOUR patients ARRAY (after patient #6)

    {
        id: "7",
        firstName: "Bamidele",
        lastName: "Ogunleye",
        sex: "Male",
        age: 63,
        patientId: "FAC-UBTH-5GZ7QH",
        profileColor: "purple",
        dateOfBirth: "1961-12-03",
        phoneNumber: "+1-555-0130",
        email: "james.miller@email.com",
        address: "234 Birch Rd, City, State 12345",
        emergencyContact: {
            name: "Linda Miller",
            relationship: "Wife",
            phone: "+1-555-0131"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0130",
        secondaryPhone: undefined,
        residentialAddress: "234 Birch Rd, City, State 12345",
        primaryCareProvider: "Dr. Amina Yusuf",
        insuranceProvider: "Senior Care Plus",
        policyNumber: "SCP-112-5564-D",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 7, 2024 - 04:20 PM"
    },
    {
        id: "8",
        firstName: "Zainab",
        lastName: "Abdullahi",
        sex: "Female",
        age: 29,
        patientId: "FAC-UBTH-N4J2S8",
        profileColor: "yellow",
        dateOfBirth: "1995-08-25",
        phoneNumber: "+1-555-0131",
        email: "maria.garcia@email.com",
        address: "567 Willow St, City, State 12345",
        emergencyContact: {
            name: "Carlos Garcia",
            relationship: "Father",
            phone: "+1-555-0132"
        },
        status: "active",
        maritalStatus: "Single",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Hispanic",
        primaryPhone: "+1-555-0131",
        secondaryPhone: undefined,
        residentialAddress: "567 Willow St, City, State 12345",
        primaryCareProvider: "Dr. Hadiza Sule",
        insuranceProvider: "Community Health",
        policyNumber: "CH-334-7712-E",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 9, 2024 - 09:10 AM"
    },
    {
        id: "9",
        firstName: "Uche",
        lastName: "Obi",
        sex: "Male",
        age: 50,
        patientId: "FAC-UBTH-0MZ6KP",
        profileColor: "blue",
        dateOfBirth: "1974-04-17",
        phoneNumber: "+1-555-0132",
        email: "robert.martinez@email.com",
        address: "890 Spruce Ave, City, State 12345",
        emergencyContact: {
            name: "Anna Martinez",
            relationship: "Wife",
            phone: "+1-555-0133"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Hispanic",
        primaryPhone: "+1-555-0132",
        secondaryPhone: undefined,
        residentialAddress: "890 Spruce Ave, City, State 12345",
        primaryCareProvider: "Dr. Segun Ajayi",
        insuranceProvider: "Premier Health",
        policyNumber: "PH-556-9983-F",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 4, 2024 - 01:35 PM"
    },
    {
        id: "10",
        firstName: "Ngozi",
        lastName: "Okoro",
        sex: "Female",
        age: 38,
        patientId: "FAC-UBTH-T9Q1VX",
        profileColor: "green",
        dateOfBirth: "1986-06-09",
        phoneNumber: "+1-555-0133",
        email: "lisa.anderson@email.com",
        address: "111 Aspen Ct, City, State 12345",
        emergencyContact: {
            name: "Mark Anderson",
            relationship: "Husband",
            phone: "+1-555-0134"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0133",
        secondaryPhone: undefined,
        residentialAddress: "111 Aspen Ct, City, State 12345",
        primaryCareProvider: "Dr. Chukwuemeka Onah",
        insuranceProvider: "Family Health Network",
        policyNumber: "FHN-667-1124-G",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 10, 2024 - 10:50 AM"
    },
    {
        id: "11",
        firstName: "Ibrahim",
        lastName: "Musa",
        sex: "Male",
        age: 44,
        patientId: "FAC-UBTH-3W7LNR",
        profileColor: "purple",
        dateOfBirth: "1980-02-28",
        phoneNumber: "+1-555-0134",
        email: "christopher.taylor@email.com",
        address: "222 Poplar Dr, City, State 12345",
        emergencyContact: {
            name: "Jennifer Taylor",
            relationship: "Wife",
            phone: "+1-555-0135"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0134",
        secondaryPhone: undefined,
        residentialAddress: "222 Poplar Dr, City, State 12345",
        primaryCareProvider: "Dr. Amina Yusuf",
        insuranceProvider: "Nationwide Health",
        policyNumber: "NWH-778-3345-H",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 11, 2024 - 02:15 PM"
    },
    {
        id: "12",
        firstName: "Amaka",
        lastName: "Nwachukwu",
        sex: "Female",
        age: 31,
        patientId: "FAC-UBTH-K6P2YB",
        profileColor: "yellow",
        dateOfBirth: "1993-10-14",
        phoneNumber: "+1-555-0135",
        email: "amanda.thomas@email.com",
        address: "333 Hickory Ln, City, State 12345",
        emergencyContact: {
            name: "Robert Thomas",
            relationship: "Father",
            phone: "+1-555-0136"
        },
        status: "active",
        maritalStatus: "Single",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0135",
        secondaryPhone: undefined,
        residentialAddress: "333 Hickory Ln, City, State 12345",
        primaryCareProvider: "Dr. Hadiza Sule",
        insuranceProvider: "Young Professional Health",
        policyNumber: "YPH-889-5576-I",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 12, 2024 - 11:25 AM"
    },
    {
        id: "13",
        firstName: "Segun",
        lastName: "Balogun",
        sex: "Male",
        age: 55,
        patientId: "FAC-UBTH-8D4HQT",
        profileColor: "blue",
        dateOfBirth: "1969-07-06",
        phoneNumber: "+1-555-0136",
        email: "daniel.moore@email.com",
        address: "444 Redwood Blvd, City, State 12345",
        emergencyContact: {
            name: "Patricia Moore",
            relationship: "Wife",
            phone: "+1-555-0137"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0136",
        secondaryPhone: undefined,
        residentialAddress: "444 Redwood Blvd, City, State 12345",
        primaryCareProvider: "Dr. Segun Ajayi",
        insuranceProvider: "Executive Health Plan",
        policyNumber: "EHP-990-6687-J",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 13, 2024 - 03:40 PM"
    },
    {
        id: "14",
        firstName: "Hadiza",
        lastName: "Sule",
        sex: "Female",
        age: 26,
        patientId: "FAC-UBTH-Z1C7MV",
        profileColor: "green",
        dateOfBirth: "1998-03-21",
        phoneNumber: "+1-555-0137",
        email: "jessica.jackson@email.com",
        address: "555 Magnolia St, City, State 12345",
        emergencyContact: {
            name: "Susan Jackson",
            relationship: "Mother",
            phone: "+1-555-0138"
        },
        status: "active",
        maritalStatus: "Single",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0137",
        secondaryPhone: undefined,
        residentialAddress: "555 Magnolia St, City, State 12345",
        primaryCareProvider: "Dr. Chukwuemeka Onah",
        insuranceProvider: "Student Health Plus",
        policyNumber: "SHP-101-7798-K",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 14, 2024 - 08:55 AM"
    },
    {
        id: "15",
        firstName: "Nnamdi",
        lastName: "Eze",
        sex: "Male",
        age: 47,
        patientId: "FAC-UBTH-R5V9AS",
        profileColor: "purple",
        dateOfBirth: "1977-11-19",
        phoneNumber: "+1-555-0138",
        email: "matthew.white@email.com",
        address: "666 Sequoia Way, City, State 12345",
        emergencyContact: {
            name: "Michelle White",
            relationship: "Wife",
            phone: "+1-555-0139"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0138",
        secondaryPhone: undefined,
        residentialAddress: "666 Sequoia Way, City, State 12345",
        primaryCareProvider: "Dr. Amina Yusuf",
        insuranceProvider: "Premium Care Insurance",
        policyNumber: "PCI-212-8809-L",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 15, 2024 - 01:30 PM"
    },
    {
        id: "16",
        firstName: "Fatima",
        lastName: "Yusuf",
        sex: "Female",
        age: 33,
        patientId: "FAC-UBTH-6X2GJF",
        profileColor: "yellow",
        dateOfBirth: "1991-01-08",
        phoneNumber: "+1-555-0139",
        email: "ashley.harris@email.com",
        address: "777 Dogwood Dr, City, State 12345",
        emergencyContact: {
            name: "Brian Harris",
            relationship: "Husband",
            phone: "+1-555-0140"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0139",
        secondaryPhone: undefined,
        residentialAddress: "777 Dogwood Dr, City, State 12345",
        primaryCareProvider: "Dr. Hadiza Sule",
        insuranceProvider: "HealthChoice Network",
        policyNumber: "HCN-323-9910-M",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 16, 2024 - 09:45 AM"
    },
    {
        id: "17",
        firstName: "Kunle",
        lastName: "Ojo",
        sex: "Male",
        age: 52,
        patientId: "FAC-UBTH-Q8N3LP",
        profileColor: "blue",
        dateOfBirth: "1972-05-27",
        phoneNumber: "+1-555-0140",
        email: "joshua.martin@email.com",
        address: "888 Sycamore Rd, City, State 12345",
        emergencyContact: {
            name: "Rebecca Martin",
            relationship: "Wife",
            phone: "+1-555-0141"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0140",
        secondaryPhone: undefined,
        residentialAddress: "888 Sycamore Rd, City, State 12345",
        primaryCareProvider: "Dr. Segun Ajayi",
        insuranceProvider: "Midlife Health Coverage",
        policyNumber: "MHC-434-1021-N",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 17, 2024 - 02:20 PM"
    },
    {
        id: "18",
        firstName: "Chiamaka",
        lastName: "Iloh",
        sex: "Female",
        age: 40,
        patientId: "FAC-UBTH-2B6YTW",
        profileColor: "green",
        dateOfBirth: "1984-09-04",
        phoneNumber: "+1-555-0141",
        email: "melissa.thompson@email.com",
        address: "999 Walnut Ave, City, State 12345",
        emergencyContact: {
            name: "Kevin Thompson",
            relationship: "Husband",
            phone: "+1-555-0142"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0141",
        secondaryPhone: undefined,
        residentialAddress: "999 Walnut Ave, City, State 12345",
        primaryCareProvider: "Dr. Chukwuemeka Onah",
        insuranceProvider: "Family First Insurance",
        policyNumber: "FFI-545-2132-O",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 18, 2024 - 10:05 AM"
    },
    {
        id: "19",
        firstName: "Suleiman",
        lastName: "Adamu",
        sex: "Male",
        age: 36,
        patientId: "FAC-UBTH-U7M4KD",
        profileColor: "purple",
        dateOfBirth: "1988-12-16",
        phoneNumber: "+1-555-0142",
        email: "andrew.lee@email.com",
        address: "101 Chestnut Ln, City, State 12345",
        emergencyContact: {
            name: "Grace Lee",
            relationship: "Wife",
            phone: "+1-555-0143"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Asian",
        primaryPhone: "+1-555-0142",
        secondaryPhone: undefined,
        residentialAddress: "101 Chestnut Ln, City, State 12345",
        primaryCareProvider: "Dr. Amina Yusuf",
        insuranceProvider: "Tech Workers Health",
        policyNumber: "TWH-656-3243-P",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 19, 2024 - 03:50 PM"
    },
    {
        id: "20",
        firstName: "Oluwaseun",
        lastName: "Ajayi",
        sex: "Female",
        age: 28,
        patientId: "FAC-UBTH-9F1ZHG",
        profileColor: "yellow",
        dateOfBirth: "1996-08-13",
        phoneNumber: "+1-555-0143",
        email: "stephanie.walker@email.com",
        address: "202 Beech St, City, State 12345",
        emergencyContact: {
            name: "Laura Walker",
            relationship: "Mother",
            phone: "+1-555-0144"
        },
        status: "active",
        maritalStatus: "Single",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0143",
        secondaryPhone: undefined,
        residentialAddress: "202 Beech St, City, State 12345",
        primaryCareProvider: "Dr. Hadiza Sule",
        insuranceProvider: "Millennial Health",
        policyNumber: "MH-767-4354-Q",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 20, 2024 - 11:30 AM"
    },
    {
        id: "21",
        firstName: "Maryam",
        lastName: "Ibrahim",
        sex: "Male",
        age: 59,
        patientId: "FAC-UBTH-S3T8VN",
        profileColor: "blue",
        dateOfBirth: "1965-04-29",
        phoneNumber: "+1-555-0144",
        email: "brian.hall@email.com",
        address: "303 Cypress Ct, City, State 12345",
        emergencyContact: {
            name: "Donna Hall",
            relationship: "Wife",
            phone: "+1-555-0145"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0144",
        secondaryPhone: undefined,
        residentialAddress: "303 Cypress Ct, City, State 12345",
        primaryCareProvider: "Dr. Segun Ajayi",
        insuranceProvider: "Senior Health Plus",
        policyNumber: "SHP-878-5465-R",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 21, 2024 - 08:15 AM"
    },
    {
        id: "22",
        firstName: "Chukwuemeka",
        lastName: "Onah",
        sex: "Female",
        age: 34,
        patientId: "FAC-UBTH-Y5R0CJ",
        profileColor: "green",
        dateOfBirth: "1990-06-11",
        phoneNumber: "+1-555-0145",
        email: "nicole.allen@email.com",
        address: "404 Fir Dr, City, State 12345",
        emergencyContact: {
            name: "James Allen",
            relationship: "Husband",
            phone: "+1-555-0146"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0145",
        secondaryPhone: undefined,
        residentialAddress: "404 Fir Dr, City, State 12345",
        primaryCareProvider: "Dr. Chukwuemeka Onah",
        insuranceProvider: "Modern Family Health",
        policyNumber: "MFH-989-6576-S",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 22, 2024 - 01:40 PM"
    },
    {
        id: "23",
        firstName: "Halima",
        lastName: "Garba",
        sex: "Male",
        age: 48,
        patientId: "FAC-UBTH-H7K2LM",
        profileColor: "purple",
        dateOfBirth: "1976-01-23",
        phoneNumber: "+1-555-0146",
        email: "kevin.young@email.com",
        address: "505 Alder Rd, City, State 12345",
        emergencyContact: {
            name: "Carol Young",
            relationship: "Wife",
            phone: "+1-555-0147"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0146",
        secondaryPhone: undefined,
        residentialAddress: "505 Alder Rd, City, State 12345",
        primaryCareProvider: "Dr. Amina Yusuf",
        insuranceProvider: "Professional Health Network",
        policyNumber: "PHN-090-7687-T",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 23, 2024 - 09:25 AM"
    },
    {
        id: "24",
        firstName: "Olayinka",
        lastName: "Olatunji",
        sex: "Female",
        age: 30,
        patientId: "FAC-UBTH-W9Q4BX",
        profileColor: "yellow",
        dateOfBirth: "1994-07-30",
        phoneNumber: "+1-555-0147",
        email: "rachel.king@email.com",
        address: "606 Hawthorn Way, City, State 12345",
        emergencyContact: {
            name: "David King",
            relationship: "Brother",
            phone: "+1-555-0148"
        },
        status: "active",
        maritalStatus: "Single",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0147",
        secondaryPhone: undefined,
        residentialAddress: "606 Hawthorn Way, City, State 12345",
        primaryCareProvider: "Dr. Hadiza Sule",
        insuranceProvider: "Young Adult Care",
        policyNumber: "YAC-191-8798-U",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 24, 2024 - 02:55 PM"
    },
    {
        id: "25",
        firstName: "Aminu",
        lastName: "Lawal",
        sex: "Male",
        age: 42,
        patientId: "FAC-UBTH-M2P6DZ",
        profileColor: "blue",
        dateOfBirth: "1982-03-07",
        phoneNumber: "+1-555-0148",
        email: "steven.wright@email.com",
        address: "707 Juniper Blvd, City, State 12345",
        emergencyContact: {
            name: "Angela Wright",
            relationship: "Wife",
            phone: "+1-555-0149"
        },
        status: "active",
        maritalStatus: "Married",
        preferredLanguage: "English",
        nationality: "American",
        ethnicity: "Not Specified",
        primaryPhone: "+1-555-0148",
        secondaryPhone: undefined,
        residentialAddress: "707 Juniper Blvd, City, State 12345",
        primaryCareProvider: "Dr. Segun Ajayi",
        insuranceProvider: "Complete Health Solutions",
        policyNumber: "CHS-292-9809-V",
        lastUpdatedBy: "System",
        lastUpdatedDate: "Jan 25, 2024 - 10:10 AM"
    }

];

// NOTE: For patients 7-25, follow the same pattern:
// - Use existing data (id, firstName, lastName, etc.)
// - Generate unique localId (L-XXXXX)
// - Generate unique federatedId (FED-XXX-YYZ)
// - Set status: "active"
// - Set maritalStatus based on age (Single for <30, Married for 30+, or "Not Specified")
// - Set primaryPhone = phoneNumber
// - Set residentialAddress = address
// - Assign one of the 4 doctors as primaryCareProvider
// - Create realistic insurance data
// - Set lastUpdatedBy: "System" and recent lastUpdatedDate

// Doctors data
export const doctors: Doctor[] = [
    {
        id: "DOC-001",
        name: "Dr. Amina Yusuf",
        department: "General Medicine",
        qualification: "MBBS, MD",
        staffId: "STF156",
        isAuthorized: true,
        profileColor: "blue",
    },
    {
        id: "DOC-002",
        name: "Dr. Chukwuemeka Onah",
        department: "Cardiology",
        qualification: "MBBS, MD, DM",
        staffId: "STF157",
        isAuthorized: true,
        profileColor: "green",
    },
    {
        id: "DOC-003",
        name: "Dr. Hadiza Sule",
        department: "Pediatrics",
        qualification: "MBBS, MD",
        staffId: "STF158",
        isAuthorized: true,
        profileColor: "purple",
    },
    {
        id: "DOC-004",
        name: "Dr. Segun Ajayi",
        department: "Orthopedics",
        qualification: "MBBS, MS",
        staffId: "STF159",
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
    {
        id: "ENC-003",
        patientId: "3",
        doctorId: "DOC-003",
        encounterType: "OPD",
        date: "2024-01-20",
        time: "02:00 PM",
        reasonForVisit: "Follow-up for diabetes management",
        clinicalNotes: "HbA1c levels improved. Continue current medication. Dietary counseling provided.",
        diagnoses: [diagnoses[2]], // Type 2 diabetes
        status: "completed"
    },
    {
        id: "ENC-004",
        patientId: "4",
        doctorId: "DOC-004",
        encounterType: "OPD",
        date: "2024-01-19",
        time: "11:00 AM",
        reasonForVisit: "Back pain consultation",
        clinicalNotes: "Patient complains of lower back pain. Physical examination performed. X-ray ordered.",
        diagnoses: [diagnoses[3]], // Low back pain
        status: "active"
    },
    {
        id: "ENC-005",
        patientId: "5",
        doctorId: "DOC-001",
        encounterType: "OPD",
        date: "2024-01-18",
        time: "03:30 PM",
        reasonForVisit: "Fever and respiratory symptoms",
        clinicalNotes: "Fever present for 3 days. Throat examination normal. Advised rest and hydration.",
        diagnoses: [diagnoses[0]], // Acute upper respiratory infection
        status: "completed"
    },
    {
        id: "ENC-006",
        patientId: "6",
        doctorId: "DOC-002",
        encounterType: "IPD",
        date: "2024-01-17",
        time: "08:00 AM",
        reasonForVisit: "Chest pain admission",
        clinicalNotes: "Patient admitted for observation. ECG and cardiac enzymes monitoring initiated.",
        diagnoses: [],
        status: "completed"
    },
    {
        id: "ENC-007",
        patientId: "7",
        doctorId: "DOC-001",
        encounterType: "OPD",
        date: "2024-01-16",
        time: "10:30 AM",
        reasonForVisit: "Hypertension review",
        clinicalNotes: "BP controlled well on current antihypertensive. Continue same medication.",
        diagnoses: [diagnoses[1]], // Hypertension
        status: "completed"
    },
    {
        id: "ENC-008",
        patientId: "8",
        doctorId: "DOC-003",
        encounterType: "OPD",
        date: "2024-01-15",
        time: "01:15 PM",
        reasonForVisit: "Urinary tract infection symptoms",
        clinicalNotes: "Dysuria and frequency reported. Urinalysis shows infection. Antibiotics prescribed.",
        diagnoses: [diagnoses[7]], // UTI
        status: "completed"
    },
    {
        id: "ENC-009",
        patientId: "9",
        doctorId: "DOC-004",
        encounterType: "OPD",
        date: "2024-01-14",
        time: "04:45 PM",
        reasonForVisit: "Joint pain and stiffness",
        clinicalNotes: "Patient reports knee pain. Range of motion assessment done. Physical therapy recommended.",
        diagnoses: [diagnoses[3]], // Low back pain (orthopedic)
        status: "completed"
    }
];

// Medical history data
export const medicalHistoryEntries: MedicalHistoryEntry[] = [
    {
        id: "MH-001",
        patientId: "1",
        date: "2022-05-14",
        condition: "Hypertension",
        status: "chronic",
        notes: "BP controlled with medication and diet adjustments.",
        recordedBy: "Dr. Amina Yusuf",
    },
    {
        id: "MH-002",
        patientId: "2",
        date: "2023-02-09",
        condition: "Migraine",
        status: "active",
        notes: "Recurring headaches; monitoring triggers and response to therapy.",
        recordedBy: "Dr. Chukwuemeka Onah",
    },
    {
        id: "MH-003",
        patientId: "3",
        date: "2021-10-18",
        condition: "Type 2 diabetes mellitus",
        status: "chronic",
        notes: "On oral hypoglycemics with periodic HbA1c review.",
        recordedBy: "Dr. Hadiza Sule",
    },
    {
        id: "MH-004",
        patientId: "4",
        date: "2023-07-12",
        condition: "Low back pain",
        status: "active",
        notes: "Physical therapy recommended; follow-up scheduled.",
        recordedBy: "Dr. Segun Ajayi",
    },
    {
        id: "MH-005",
        patientId: "5",
        date: "2022-11-05",
        condition: "Asthma",
        status: "chronic",
        notes: "Uses rescue inhaler as needed; annual review.",
        recordedBy: "Dr. Amina Yusuf",
    },
    {
        id: "MH-006",
        patientId: "6",
        date: "2023-03-27",
        condition: "Gastro-esophageal reflux disease",
        status: "active",
        notes: "Dietary changes advised; started proton pump inhibitor.",
        recordedBy: "Dr. Chukwuemeka Onah",
    },
    {
        id: "MH-007",
        patientId: "7",
        date: "2021-08-20",
        condition: "Hypertension",
        status: "chronic",
        notes: "Stable on current regimen.",
        recordedBy: "Dr. Amina Yusuf",
    },
    {
        id: "MH-008",
        patientId: "8",
        date: "2023-01-16",
        condition: "Urinary tract infection",
        status: "resolved",
        notes: "Completed antibiotics; symptoms resolved.",
        recordedBy: "Dr. Hadiza Sule",
    },
    {
        id: "MH-009",
        patientId: "9",
        date: "2022-09-04",
        condition: "Osteoarthritis",
        status: "chronic",
        notes: "Knee pain managed with physiotherapy and NSAIDs.",
        recordedBy: "Dr. Segun Ajayi",
    },
    {
        id: "MH-010",
        patientId: "10",
        date: "2023-04-30",
        condition: "Anemia",
        status: "active",
        notes: "Investigations ongoing; iron supplementation started.",
        recordedBy: "Dr. Chukwuemeka Onah",
    },
    {
        id: "MH-011",
        patientId: "11",
        date: "2022-12-11",
        condition: "Hyperlipidemia",
        status: "active",
        notes: "Lifestyle modification and statin therapy initiated.",
        recordedBy: "Dr. Amina Yusuf",
    },
    {
        id: "MH-012",
        patientId: "12",
        date: "2021-06-23",
        condition: "Allergic rhinitis",
        status: "resolved",
        notes: "Seasonal symptoms; resolved with antihistamines.",
        recordedBy: "Dr. Hadiza Sule",
    },
    {
        id: "MH-013",
        patientId: "13",
        date: "2020-10-15",
        condition: "Chronic kidney disease stage 2",
        status: "chronic",
        notes: "Regular monitoring of renal function.",
        recordedBy: "Dr. Segun Ajayi",
    },
    {
        id: "MH-014",
        patientId: "14",
        date: "2022-03-03",
        condition: "Iron deficiency",
        status: "resolved",
        notes: "Completed supplementation course.",
        recordedBy: "Dr. Chukwuemeka Onah",
    },
    {
        id: "MH-015",
        patientId: "15",
        date: "2023-06-19",
        condition: "Peptic ulcer disease",
        status: "active",
        notes: "On treatment; follow-up endoscopy planned.",
        recordedBy: "Dr. Amina Yusuf",
    },
    {
        id: "MH-016",
        patientId: "16",
        date: "2021-02-26",
        condition: "Anxiety disorder",
        status: "active",
        notes: "Referred for counseling; monitoring response.",
        recordedBy: "Dr. Hadiza Sule",
    },
    {
        id: "MH-017",
        patientId: "17",
        date: "2022-08-28",
        condition: "Hypertension",
        status: "active",
        notes: "Medication adjusted due to elevated readings.",
        recordedBy: "Dr. Amina Yusuf",
    },
    {
        id: "MH-018",
        patientId: "18",
        date: "2023-05-09",
        condition: "Dermatitis",
        status: "resolved",
        notes: "Topical therapy effective.",
        recordedBy: "Dr. Chukwuemeka Onah",
    },
    {
        id: "MH-019",
        patientId: "19",
        date: "2020-11-30",
        condition: "Type 2 diabetes mellitus",
        status: "chronic",
        notes: "Dietary counseling and medication review ongoing.",
        recordedBy: "Dr. Hadiza Sule",
    },
    {
        id: "MH-020",
        patientId: "20",
        date: "2022-01-17",
        condition: "Asthma",
        status: "active",
        notes: "Inhaler technique reviewed; follow-up planned.",
        recordedBy: "Dr. Segun Ajayi",
    },
    {
        id: "MH-021",
        patientId: "21",
        date: "2021-09-06",
        condition: "Thyroid disorder",
        status: "active",
        notes: "Monitoring thyroid function tests.",
        recordedBy: "Dr. Amina Yusuf",
    },
    {
        id: "MH-022",
        patientId: "22",
        date: "2023-08-02",
        condition: "Gastritis",
        status: "resolved",
        notes: "Symptoms improved with medication.",
        recordedBy: "Dr. Chukwuemeka Onah",
    },
    {
        id: "MH-023",
        patientId: "23",
        date: "2022-04-25",
        condition: "Low back pain",
        status: "active",
        notes: "Exercises prescribed; re-evaluation planned.",
        recordedBy: "Dr. Segun Ajayi",
    },
    {
        id: "MH-024",
        patientId: "24",
        date: "2023-10-11",
        condition: "Migraine",
        status: "active",
        notes: "Started preventive therapy.",
        recordedBy: "Dr. Hadiza Sule",
    },
    {
        id: "MH-025",
        patientId: "25",
        date: "2021-12-22",
        condition: "Hypertension",
        status: "chronic",
        notes: "Stable; ongoing monitoring.",
        recordedBy: "Dr. Amina Yusuf",
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
        staffId: "STF157",
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

export const getMedicalHistoryByPatient = (patientId: string): MedicalHistoryEntry[] => {
    return medicalHistoryEntries.filter(entry => entry.patientId === patientId);
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



