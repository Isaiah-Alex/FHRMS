import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import NameProfile from "@/components/NameProfile";
import { Eye } from "lucide-react";
import type { Patient } from "@/lib/mockData";

type PatientRowProps = {
    patient: Patient;
    onViewProfile: (patientId: string) => void;
};

const PatientRow = ({ patient, onViewProfile }: PatientRowProps) => {
    const initials = `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`;

    return (
        <TableRow>
            <TableCell>
                <NameProfile
                    profileDisplay={initials}
                    color={patient.profileColor}
                    rounded={true}
                />
            </TableCell>
            <TableCell className="font-medium">
                {patient.firstName} {patient.lastName}
            </TableCell>
            <TableCell>{patient.sex}</TableCell>
            <TableCell>{patient.age}</TableCell>
            <TableCell className="text-neutral-500">{patient.patientId}</TableCell>
            <TableCell>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(patient.id)}
                    className="flex items-center gap-2 bg-white hover:bg-primary text-neutral-500 hover:text-white rounded-md px-3 py-2.5 cursor-pointer"
                >
                    <Eye className="w-4 h-4" />
                    View Profile
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default PatientRow;