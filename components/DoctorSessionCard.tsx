import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NameProfile from "@/components/NameProfile";
import { ShieldCheck } from "lucide-react";
import type { Doctor } from "@/lib/mockEncounterData"

type DoctorSessionCardProps = {
    doctor: Doctor;
};

const DoctorSessionCard = ({ doctor }: DoctorSessionCardProps) => {
    const nameParts = doctor.name.split(" ").filter(part => !part.includes("."));
    const initials = nameParts.length > 1
        ? nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
        : nameParts[0]?.charAt(0) || "";

    return (
        <Card className="shadow-md border-primary/15">
            <CardContent>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <NameProfile
                            profileDisplay={initials}
                            color={doctor.profileColor}
                            rounded={true}
                            className="w-16 h-16"
                        />
                        <div className="flex-1 space-y-2">
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-neutral-500">
                                {doctor.department} | {doctor.qualification}
                            </p>
                            <p className="text-xs text-neutral-500">Staff ID: {doctor.staffId}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary">Authorized</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DoctorSessionCard;