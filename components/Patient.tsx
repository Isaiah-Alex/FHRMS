import clsx from "clsx";
import Link from "next/link";
import NameProfile from "./NameProfile";
import {
    getPatientById,
    getDoctorById,
    encounters,
    type Encounter,
    type Patient as PatientType,
} from "@/lib/database";

type Props = {
    patientId: string;
    encounterId?: string;
    isEncounter?: boolean;
    encounter?: Encounter;
    patient?: PatientType;
};

const Patient = ({ patientId, encounterId, isEncounter = false, encounter, patient }: Props) => {
    const resolvedPatient = patient ?? getPatientById(patientId);
    
    if (!resolvedPatient) {
        return null;
    }

    const getInitials = (firstName: string, lastName: string): string => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    // Fetch encounter data if this is an encounter display
    const encounterData = encounter ?? (isEncounter && encounterId 
        ? encounters.find(enc => enc.id === encounterId)
        : null);

    const doctor = encounterData ? getDoctorById(encounterData.doctorId) : null;

    const href = isEncounter && (encounterData?.id ?? encounterId)
        ? `/encounters/${encounterData?.id ?? encounterId}`
        : `/patients/${patientId}`;

    return (
        <Link
            href={href}
            className="flex items-center gap-4 m-4 rounded-lg transition-colors hover:bg-primary-light"
            aria-label={isEncounter ? `View encounter for ${resolvedPatient.firstName} ${resolvedPatient.lastName}` : `View ${resolvedPatient.firstName} ${resolvedPatient.lastName}`}
        >
            <NameProfile 
                profileDisplay={getInitials(resolvedPatient.firstName, resolvedPatient.lastName)} 
                color={resolvedPatient.profileColor} 
            />
            <div className="flex justify-between h-full w-full">
                <div>
                    <h4 className="font-medium">{resolvedPatient.firstName} {resolvedPatient.lastName}</h4>
                    <p className="text-sm text-neutral-500">ID: {resolvedPatient.patientId}</p>
                    {isEncounter && doctor && (
                        <small className="text-neutral-500/80 self-end">
                            {doctor.name}
                        </small>
                    )}
                </div>
                <div className="flex flex-col">
                    {isEncounter && encounterData ? (
                        <>
                            <p className="text-sm text-neutral-500">
                                {encounterData.date}, {encounterData.time}
                            </p>
                            <small className={clsx(
                                "self-end px-2 py-1 rounded-full font-medium",
                                encounterData.status === "active"
                                    ? "text-success bg-success-light"
                                    : "text-neutral-500 bg-neutral-200"
                            )}>
                                {encounterData.status === "active" ? "Active" : "Completed"}
                            </small>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-neutral-500">
                                {resolvedPatient.dateOfBirth}
                            </p>
                            <small className="text-neutral-500/80 self-end">
                                {resolvedPatient.sex}, {resolvedPatient.age} years
                            </small>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default Patient;
