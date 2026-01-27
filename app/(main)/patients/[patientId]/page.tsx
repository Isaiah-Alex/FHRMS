"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NameProfile from "@/components/NameProfile";
import {
    User,
    Calendar,
    Activity,
    FlaskConical,
    Pill,
    History,
    Pencil,
    Upload,
    Eye,
    Printer,
    IdCard,
    Phone,
    Asterisk,
    Stethoscope
} from "lucide-react";
import { getPatientById } from "@/lib/database";
import clsx from "clsx";

type PageProps = {
    params: Promise<{ patientId: string }>;
};

export default function PatientProfilePage({ params }: PageProps) {
    const { patientId } = use(params);
    const router = useRouter();
    const patient = getPatientById(patientId);

    if (!patient) {
        return (
            <div className="px-5 my-10">
                <div className="bg-white rounded-lg p-8 shadow-md text-center">
                    <p className="text-neutral-500">Patient not found</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "demographics", label: "Demographics", icon: User, path: null },
        { id: "encounters", label: "Encounters", icon: Stethoscope, path: `/patients/${patientId}/encounters` },
        { id: "vitals", label: "Vitals", icon: Activity, path: `/patients/${patientId}/vitals` },
        { id: "lab-results", label: "Lab Results", icon: FlaskConical, path: `/patients/${patientId}/laboratory` },
        { id: "medications", label: "Medications", icon: Pill, path: `/patients/${patientId}/medications` },
        { id: "medical-history", label: "Medical History", icon: History, path: `/patients/${patientId}/history` },
    ];

    const activeTab = "demographics";

    const handleTabClick = (tab: typeof tabs[0]) => {
        if (tab.path) {
            router.push(tab.path);
        }
    };

    const handleEditProfile = () => {
        console.log("Edit profile");
    };

    const handleExportRecord = () => {
        console.log("Export record");
    };

    const handleViewAuditLog = () => {
        console.log("View audit log");
    };

    const handlePrintProfile = () => {
        window.print();
    };

    const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;

    return (
        <div className="px-5 my-10 space-y-6">
            {/* Header Section */}
            <Card className="shadow-md border-primary/15">
                <CardContent className="py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <NameProfile
                                profileDisplay={initials}
                                color={patient.profileColor}
                                rounded={true}
                                className="w-24 h-24 text-2xl"
                            />
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-semibold">
                                        {patient.firstName} {patient.lastName}
                                    </h1>
                                    <Badge className="bg-success-light text-success border-0 uppercase text-xs font-semibold px-2 py-1">
                                        {patient.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-neutral-500">
                                    <span>
                                        Patient ID: <strong className="text-neutral-900">{patient.patientId}</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={handleEditProfile}
                                className="flex items-center gap-2 border-neutral-200 hover:bg-neutral-200"
                            >
                                <Pencil className="w-4 h-4" />
                                Edit Profile
                            </Button>
                            <Button
                                onClick={handleExportRecord}
                                className="bg-primary hover:bg-primary-hover text-white flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Export Record
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs Navigation */}
            <Card className="shadow-md border-primary/15">
                <CardContent className="p-0">
                    <div className="flex border-b border-neutral-200">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabClick(tab)}
                                    className={clsx(
                                        "flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative",
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

            {/* Demographics Content */}
            <div className="space-y-6">
                {/* Personal Information */}
                <Card className="shadow-md border-primary/15">
                    <CardContent className="py-6">
                        <div className="flex items-center gap-2 mb-6">
                            <IdCard className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Date of Birth</p>
                                <p className="text-sm font-medium">
                                    {patient.dateOfBirth} ({patient.age} years)
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Biological Sex</p>
                                <p className="text-sm font-medium">{patient.sex}</p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Marital Status</p>
                                <p className="text-sm font-medium">{patient.maritalStatus}</p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Preferred Language</p>
                                <p className="text-sm font-medium">{patient.preferredLanguage}</p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Nationality</p>
                                <p className="text-sm font-medium">{patient.nationality}</p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Ethnicity</p>
                                <p className="text-sm font-medium">{patient.ethnicity}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="shadow-md border-primary/15">
                    <CardContent className="py-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Phone className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-semibold">Contact Information</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Primary Phone</p>
                                <p className="text-sm font-medium">{patient.primaryPhone}</p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Secondary Phone</p>
                                <p className="text-sm font-medium italic text-neutral-500">
                                    {patient.secondaryPhone || "None"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500 uppercase mb-1">Email Address</p>
                                <p className="text-sm font-medium">{patient.email}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-xs text-neutral-500 uppercase mb-1">Residential Address</p>
                            <p className="text-sm font-medium">{patient.residentialAddress}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Emergency Contact & Administrative Info */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Emergency Contact */}
                    <Card className="shadow-md border-primary/15 bg-primary-light/30">
                        <CardContent className="py-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Asterisk className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-semibold">Emergency Contact</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-sm text-neutral-500">Name</p>
                                    <p className="text-sm font-medium">{patient.emergencyContact.name}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-neutral-500">Relationship</p>
                                    <p className="text-sm font-medium">{patient.emergencyContact.relationship}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-neutral-500">Phone</p>
                                    <p className="text-sm font-medium">{patient.emergencyContact.phone}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Administrative Info */}
                    <Card className="shadow-md border-primary/15 bg-primary-light/30">
                        <CardContent className="py-6">
                            <div className="flex items-center gap-2 mb-6">
                                <IdCard className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-semibold">Administrative Info</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <p className="text-sm text-neutral-500">Primary Care Provider (PCP)</p>
                                    <p className="text-sm font-medium">{patient.primaryCareProvider}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-neutral-500">Insurance Provider</p>
                                    <p className="text-sm font-medium">{patient.insuranceProvider}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm text-neutral-500">Policy Number</p>
                                    <p className="text-sm font-medium">{patient.policyNumber}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between py-4">
                <p className="text-sm text-neutral-500">
                    Last updated by {patient.lastUpdatedBy} on {patient.lastUpdatedDate}
                </p>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleViewAuditLog}
                        className="text-sm text-primary hover:text-primary-hover flex items-center gap-1 font-medium"
                    >
                        <Eye className="w-4 h-4" />
                        View Audit Log
                    </button>
                    <button
                        onClick={handlePrintProfile}
                        className="text-sm text-primary hover:text-primary-hover flex items-center gap-1 font-medium"
                    >
                        <Printer className="w-4 h-4" />
                        Print Profile
                    </button>
                </div>
            </div>
        </div>
    );
}