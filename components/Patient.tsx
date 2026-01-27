import clsx from "clsx";
import NameProfile from "./NameProfile";
import { getPatientById, getDoctorById, encounters } from "@/lib/database";

type Props = {
    patientId: string;
    encounterId?: string;
    isEncounter?: boolean;
};

const Patient = ({ patientId, encounterId, isEncounter = false }: Props) => {
    const patient = getPatientById(patientId);
    
    if (!patient) {
        return null;
    }

    const getInitials = (firstName: string, lastName: string): string => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    // Fetch encounter data if this is an encounter display
    const encounter = isEncounter && encounterId 
        ? encounters.find(enc => enc.id === encounterId)
        : null;

    const doctor = encounter ? getDoctorById(encounter.doctorId) : null;

    return (
        <div className="flex items-center gap-4 m-4">
            <NameProfile 
                profileDisplay={getInitials(patient.firstName, patient.lastName)} 
                color={patient.profileColor} 
            />
            <div className="flex justify-between h-full w-full">
                <div>
                    <h4 className="font-medium">{patient.firstName} {patient.lastName}</h4>
                    <p className="text-sm text-neutral-500">ID: {patient.patientId}</p>
                    {isEncounter && doctor && (
                        <small className="text-neutral-500/80 self-end">
                            {doctor.name}
                        </small>
                    )}
                </div>
                <div className="flex flex-col">
                    {isEncounter && encounter ? (
                        <>
                            <p className="text-sm text-neutral-500">
                                {encounter.date}, {encounter.time}
                            </p>
                            <small className={clsx(
                                "self-end px-2 py-1 rounded-full font-medium",
                                encounter.status === "active"
                                    ? "text-success bg-success-light"
                                    : "text-neutral-500 bg-neutral-200"
                            )}>
                                {encounter.status === "active" ? "Active" : "Completed"}
                            </small>
                        </>
                    ) : (
                        <>
                            <p className="text-sm text-neutral-500">
                                {patient.dateOfBirth}
                            </p>
                            <small className="text-neutral-500/80 self-end">
                                {patient.sex}, {patient.age} years
                            </small>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Patient;
