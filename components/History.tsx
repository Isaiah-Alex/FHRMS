import Patient from "./Patient";
import data from "@/public/data/patients.json";

type Props = {
    isEncounters: boolean;
};

const History = ({ isEncounters }: Props) => {
    const calculateAge = (dateOfBirth: string): number => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date: Date): string => {
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    const mockDate = new Date("2024-01-21");
    const mockTime = new Date("2024-01-21T06:34:00");
    
    const patients = data.patients.slice(0, 4);
    
    const clinicians = ["Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Kim"];

    return (
        <div className="bg-white rounded-lg border border-neutral-200 shadow-md">
            <h3 className="font-semibold text-xl py-4 pl-4 border-b border-neutral-200">
                {isEncounters ? "Recent Encounters" : "Recent Patient Registration"}
            </h3>
            {patients.length > 0 ? (
                patients.map((patient, index) => (
                    <Patient
                        key={patient.id}
                        name={patient.name}
                        id={patient.id}
                        date={formatDate(mockDate)}
                        time={formatTime(mockTime)}
                        gender={patient.gender === "M" ? "Male" : "Female"}
                        age={calculateAge(patient.dateOfBirth)}
                        colorIndex={index}
                        doctorName={isEncounters ? clinicians[index % clinicians.length] : ""}
                        isEncounter={isEncounters}
                        isActive={isEncounters && index % 2 === 0}
                    />
                ))
            ) : (
                <div className="p-4 text-neutral-500 text-sm">
                    No {isEncounters ? "encounters" : "registrations"} available.
                </div>
            )}
        </div>
    );
};

export default History;