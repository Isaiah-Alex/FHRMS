"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NameProfile from "@/components/NameProfile";
import {
    Activity,
    FlaskConical,
    History,
    Pill,
    Stethoscope,
    User,
} from "lucide-react";
import clsx from "clsx";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getMedicalHistoryByPatient, getPatientById } from "@/lib/database";

const tabs = [
    { id: "demographics", label: "Demographics", icon: User, path: (id: string) => `/patients/${id}` },
    { id: "encounters", label: "Encounters", icon: Stethoscope, path: (id: string) => `/patients/${id}/encounters` },
    { id: "vitals", label: "Vitals", icon: Activity, path: (id: string) => `/patients/${id}/vitals` },
    { id: "lab-results", label: "Lab Results", icon: FlaskConical, path: (id: string) => `/patients/${id}/laboratory` },
    { id: "medications", label: "Medications", icon: Pill, path: (id: string) => `/patients/${id}/medications` },
    { id: "medical-history", label: "Medical History", icon: History, path: (id: string) => `/patients/${id}/history` },
];

export default function PatientHistoryPage() {
    const params = useParams<{ patientId?: string }>();
    const router = useRouter();
    const patientId = params.patientId;
    const patient = patientId ? getPatientById(patientId) : undefined;
    const historyEntries = patientId ? getMedicalHistoryByPatient(patientId) : [];

    if (!patientId || !patient) {
        return (
            <div className="px-4 my-6 sm:px-5 sm:my-10">
                <div className="bg-white rounded-lg p-8 shadow-md text-center">
                    <p className="text-neutral-500">Patient not found</p>
                </div>
            </div>
        );
    }

    const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;

    const getStatusClasses = (status: "active" | "resolved" | "chronic") => {
        if (status === "resolved") return "bg-success-light text-success";
        if (status === "chronic") return "bg-primary-middle text-primary";
        return "bg-warning-light text-warning";
    };

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
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-md border-primary/15">
                <CardContent className="p-0">
                    <div className="flex border-b border-neutral-200 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = tab.id === "medical-history";
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

            <Card className="shadow-md border-primary/15">
                <CardContent className="py-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-semibold">Medical History</h2>
                            <p className="text-sm text-neutral-500">
                                {historyEntries.length} total entries
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 border rounded-lg overflow-x-auto">
                        <Table className="min-w-[720px]">
                            <TableHeader>
                                <TableRow className="bg-primary-light">
                                    <TableHead>Date</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Notes</TableHead>
                                    <TableHead>Recorded By</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {historyEntries.length > 0 ? (
                                    historyEntries.map((entry) => (
                                        <TableRow key={entry.id}>
                                            <TableCell className="text-sm text-neutral-500">
                                                {entry.date}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {entry.condition}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={clsx("border-0 uppercase text-xs font-semibold px-2 py-1", getStatusClasses(entry.status))}>
                                                    {entry.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-neutral-500">
                                                {entry.notes}
                                            </TableCell>
                                            <TableCell className="text-neutral-500">
                                                {entry.recordedBy}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-neutral-500">
                                            No medical history entries found for this patient.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
