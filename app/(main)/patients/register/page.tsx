"use client";

import { useState } from "react";
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
import { mockPatients, type Patient } from "@/lib/mockData";
import { FACILITY_ID } from "@/lib/config";

const STORAGE_KEY = "fhrmsPatients";
const TOAST_KEY = "fhrmsPatientToast";

type NewPatientForm = {
  firstName: string;
  lastName: string;
  sex: Patient["sex"];
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  maritalStatus: Patient["maritalStatus"];
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
};

const initialFormState: NewPatientForm = {
  firstName: "",
  lastName: "",
  sex: "Male",
  dateOfBirth: "",
  phoneNumber: "",
  email: "",
  address: "",
  maritalStatus: "Not Specified",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhone: "",
};

export default function PatientRegistrationPage() {
  const router = useRouter();
  const [formState, setFormState] = useState<NewPatientForm>(initialFormState);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormChange = (field: keyof NewPatientForm, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const calculateAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const formatLastUpdatedDate = () => {
    const now = new Date();
    const date = now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${date} - ${time}`;
  };

  const getStoredPatients = () => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return mockPatients;
    try {
      return JSON.parse(stored) as Patient[];
    } catch {
      return mockPatients;
    }
  };

  const getNextPatientId = (patients: Patient[]) => {
    const prefix = `${FACILITY_ID}-`;
    const existing = new Set(patients.map((patient) => patient.patientId));
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let candidate = "";
    do {
      candidate = Array.from({ length: 6 }, () =>
        alphabet[Math.floor(Math.random() * alphabet.length)]
      ).join("");
    } while (existing.has(`${prefix}${candidate}`));
    return `${prefix}${candidate}`;
  };

  const getNextProfileColor = (patients: Patient[]) => {
    const colors: Patient["profileColor"][] = ["blue", "green", "purple", "yellow"];
    return colors[patients.length % colors.length];
  };

  const handleSubmitNewPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const requiredFields: Array<keyof NewPatientForm> = [
      "firstName",
      "lastName",
      "dateOfBirth",
      "phoneNumber",
      "email",
      "address",
      "emergencyContactName",
      "emergencyContactRelationship",
      "emergencyContactPhone",
    ];

    const missingField = requiredFields.find((field) => !formState[field].trim());
    if (missingField) {
      setFormError("Please complete all required fields before saving.");
      return;
    }

    const existingPatients = getStoredPatients();
    const newPatient: Patient = {
      id: String(existingPatients.length + 1),
      firstName: formState.firstName.trim(),
      lastName: formState.lastName.trim(),
      sex: formState.sex,
      age: calculateAge(formState.dateOfBirth),
      patientId: getNextPatientId(existingPatients),
      profileColor: getNextProfileColor(existingPatients),
      dateOfBirth: formState.dateOfBirth,
      status: "active",
      maritalStatus: formState.maritalStatus,
      preferredLanguage: "English",
      nationality: "Nigerian",
      ethnicity: "Not Specified",
      phoneNumber: formState.phoneNumber.trim(),
      primaryPhone: formState.phoneNumber.trim(),
      secondaryPhone: undefined,
      email: formState.email.trim(),
      address: formState.address.trim(),
      residentialAddress: formState.address.trim(),
      emergencyContact: {
        name: formState.emergencyContactName.trim(),
        relationship: formState.emergencyContactRelationship.trim(),
        phone: formState.emergencyContactPhone.trim(),
      },
      primaryCareProvider: "Dr. Amina Yusuf",
      insuranceProvider: "Not Specified",
      policyNumber: "Not Specified",
      lastUpdatedBy: "System",
      lastUpdatedDate: formatLastUpdatedDate(),
    };

    const updatedPatients = [newPatient, ...existingPatients];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPatients));
    window.sessionStorage.setItem(
      TOAST_KEY,
      `${newPatient.firstName} ${newPatient.lastName} registered successfully.`
    );
    router.push("/patients");
  };

  return (
    <div className="px-4 my-6 space-y-8 sm:px-5 sm:my-10">
      <Hero
        Title="Register Patient"
        Subtitle="Create a new patient record in the system"
        className=""
      />

      <div className="bg-white rounded-lg p-6 shadow-md space-y-6">
        <form onSubmit={handleSubmitNewPatient} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formState.firstName}
                onChange={(event) => handleFormChange("firstName", event.target.value)}
                placeholder="Enter first name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formState.lastName}
                onChange={(event) => handleFormChange("lastName", event.target.value)}
                placeholder="Enter last name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex *</Label>
              <Select value={formState.sex} onValueChange={(value) => handleFormChange("sex", value)}>
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male" className="focus:bg-primary focus:text-white">Male</SelectItem>
                  <SelectItem value="Female" className="focus:bg-primary focus:text-white">Female</SelectItem>
                  <SelectItem value="Other" className="focus:bg-primary focus:text-white">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formState.dateOfBirth}
                onChange={(event) => handleFormChange("dateOfBirth", event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formState.phoneNumber}
                onChange={(event) => handleFormChange("phoneNumber", event.target.value)}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formState.email}
                onChange={(event) => handleFormChange("email", event.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Marital Status *</Label>
              <Select value={formState.maritalStatus} onValueChange={(value) => handleFormChange("maritalStatus", value)}>
                <SelectTrigger id="maritalStatus">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single" className="focus:bg-primary focus:text-white">Single</SelectItem>
                  <SelectItem value="Married" className="focus:bg-primary focus:text-white">Married</SelectItem>
                  <SelectItem value="Divorced" className="focus:bg-primary focus:text-white">Divorced</SelectItem>
                  <SelectItem value="Widowed" className="focus:bg-primary focus:text-white">Widowed</SelectItem>
                  <SelectItem value="Not Specified" className="focus:bg-primary focus:text-white">Not Specified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Residential Address *</Label>
              <Textarea
                id="address"
                value={formState.address}
                onChange={(event) => handleFormChange("address", event.target.value)}
                placeholder="Enter address"
                rows={3}
                required
              />
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-4 space-y-4">
            <h2 className="text-lg font-semibold">Emergency Contact</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Full Name *</Label>
                <Input
                  id="emergencyContactName"
                  value={formState.emergencyContactName}
                  onChange={(event) => handleFormChange("emergencyContactName", event.target.value)}
                  placeholder="Enter contact name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship">Relationship *</Label>
                <Input
                  id="emergencyContactRelationship"
                  value={formState.emergencyContactRelationship}
                  onChange={(event) => handleFormChange("emergencyContactRelationship", event.target.value)}
                  placeholder="Relationship"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Phone Number *</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formState.emergencyContactPhone}
                  onChange={(event) => handleFormChange("emergencyContactPhone", event.target.value)}
                  placeholder="Enter phone number"
                  required
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
              onClick={() => router.push("/patients")}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto"
            >
              Save Patient
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
