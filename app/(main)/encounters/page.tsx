"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Hero from "@/components/Hero";
import DoctorSessionCard from "@/components/DoctorSessionCard";
import DiagnosisInput from "@/components/DiagonosisInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, Trash2, Save, Database, AlertCircle, Calendar } from "lucide-react";
import {
  mockDoctor,
  mockPatientForEncounter,
  mockICD10Codes,
  encounterFormSchema,
  type EncounterFormSchema,
  type Diagnosis
} from "@/lib/mockEncounterData";

export default function EncountersPage() {
  const [patientSearch, setPatientSearch] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
    control
  } = useForm<EncounterFormSchema>({
    resolver: zodResolver(encounterFormSchema),
    defaultValues: {
      encounterType: "OPD",
      date: "",
      time: "",
      reasonForVisit: "",
      clinicalNotes: "",
      diagnoses: [],
    },
  });

  const watchedDiagnoses = watch("diagnoses");

  const handleAddDiagnosis = (diagnosis: Diagnosis) => {
    const currentDiagnoses = watch("diagnoses") || [];
    if (!currentDiagnoses.some((d) => d.id === diagnosis.id)) {
      setValue("diagnoses", [...currentDiagnoses, diagnosis]);
    }
  };

  const handleRemoveDiagnosis = (diagnosisId: string) => {
    const currentDiagnoses = watch("diagnoses") || [];
    setValue("diagnoses", currentDiagnoses.filter((d) => d.id !== diagnosisId));
  };

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard all changes?")) {
      reset({
        encounterType: "OPD",
        date: "",
        time: "",
        reasonForVisit: "",
        clinicalNotes: "",
        diagnoses: [],
      });
    }
  };

  const onSubmit = async (data: EncounterFormSchema) => {
    try {
      console.log("Saving encounter:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Encounter saved and synced to patient records successfully");
    } catch (error) {
      console.error("Error saving encounter:", error);
      alert("Failed to save encounter. Please try again.");
    }
  };

  const handleSaveDraft = async () => {
    const data = watch();
    try {
      console.log("Saving as draft:", data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      alert("Draft saved successfully");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    }
  };

  return (
    <div className="px-5 my-10 space-y-6">
      {/* Page Header with Search */}
      <div className="flex items-start gap-6">
        <div className="flex-1">
          <Hero
            Title="Encounter Detail Entry"
            Subtitle={`Record clinical encounter details for the patient: ${mockPatientForEncounter.name} (${mockPatientForEncounter.patientId})`}
            className=""
          />
        </div>

        {/* Patient Search */}
        {/* <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <Input
            type="text"
            placeholder="Search patient by ID or name"
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            className="pl-10"
          />
        </div> */}
      </div>

      {/* Section 1: Doctor Session */}
      <DoctorSessionCard doctor={mockDoctor} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 2: Encounter Classification */}
        <Card className="shadow-md border-primary/15">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Encounter Classification</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-start gap-6">
              {/* Encounter Type Toggle */}
              <div className="flex-1 space-y-3">
                <Label className="text-sm font-medium">Encounter Type *</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setValue("encounterType", "OPD")}
                    className={`px-4 py-2 rounded-md border transition-colors ${watch("encounterType") === "OPD"
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-neutral-700 border-neutral-200"
                      }`}
                  >
                    OPD (Outpatient)
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("encounterType", "IPD")}
                    className={`px-4 py-2 rounded-md border transition-colors ${watch("encounterType") === "IPD"
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-neutral-700 border-neutral-200"
                      }`}
                  >
                    IPD (Inpatient)
                  </button>
                </div>
                {errors.encounterType && (
                  <p className="text-sm text-warning flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.encounterType.message}
                  </p>
                )}
              </div>

              {/* Date & Time */}
              <div className="flex-1 space-y-3">
                <Label className="text-sm font-medium">Date & Time of Entry *</Label>
                <div className="relative">
                  <Input
                    type="datetime-local"
                    {...register("date")}
                    className={`pr-10 ${errors.date ? "border-warning" : ""}`}
                  />
                  {/* <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" /> */}
                </div>
                {errors.date && (
                  <p className="text-sm text-warning flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Clinical Assessment */}
        <Card className="shadow-md border-primary/15">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Clinical Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Reason for Visit */}
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-medium">
                Reason for Visit *
              </Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for visit (minimum 10 characters)"
                {...register("reasonForVisit")}
                className={errors.reasonForVisit ? "border-warning" : ""}
                rows={3}
              />
              {errors.reasonForVisit && (
                <p className="text-sm text-warning flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.reasonForVisit.message}
                </p>
              )}
            </div>

            {/* Clinical Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Clinical Notes *
              </Label>
              <Textarea
                id="notes"
                placeholder="Enter detailed clinical observations and notes (minimum 20 characters)"
                {...register("clinicalNotes")}
                className={`resize-none ${errors.clinicalNotes ? "border-warning" : ""}`}
                rows={6}
              />
              {errors.clinicalNotes && (
                <p className="text-sm text-warning flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.clinicalNotes.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handleDiscard}
                className="flex items-center gap-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200"
                disabled={isSubmitting}
              >
                <Trash2 className="w-4 h-4" />
                Discard Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveDraft}
                className="border-neutral-200 text-neutral-700 hover:bg-neutral-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save as Draft"}
              </Button>
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white ml-auto"
                disabled={isSubmitting}
              >
                <Database className="w-4 h-4" />
                {isSubmitting ? "Saving..." : "Save & Sync to Records"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Diagnosis */}
        <Card className="shadow-md border-primary/15">
          <CardHeader>
            <div>
              <CardTitle className="text-xl font-semibold">Diagnosis</CardTitle>
              <p className="text-sm text-neutral-500 mt-1">Diagnosis & Conclusion</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Diagnosis Summary *</Label>
              <DiagnosisInput
                diagnoses={watchedDiagnoses || []}
                onAdd={handleAddDiagnosis}
                onRemove={handleRemoveDiagnosis}
                availableDiagnoses={mockICD10Codes}
              />
              {errors.diagnoses && (
                <p className="text-sm text-warning flex items-center gap-1 mt-2">
                  <AlertCircle className="w-4 h-4" />
                  {errors.diagnoses.message}
                </p>
              )}
              <p className="text-xs text-neutral-500 mt-2">
                Type to search ICD-10 codes and press Enter to add. At least one diagnosis is required.
              </p>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}