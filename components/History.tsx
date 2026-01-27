import Patient from "./Patient";
import { patients, encounters } from "@/lib/database";

type Props = {
    isEncounters: boolean;
};

const History = ({ isEncounters }: Props) => {
    // Get recent patients (last 5 registrations)
    const recentPatients = patients.slice(0, 5);
    
    // Get recent encounters (last 5 encounters)
    const recentEncounters = encounters.slice(0, 5);

    return (
        <div className="bg-white rounded-lg border-neutral-200 border mt-4 shadow-md">
            <h3 className="font-semibold text-xl py-4 pl-4 border-b border-neutral-200">
                {isEncounters ? "Recent Encounters" : "Recent Patient Registration"}
            </h3>
            {isEncounters ? (
                // Display recent encounters
                recentEncounters.length > 0 ? (
                    recentEncounters.map((encounter) => (
                        <Patient
                            key={encounter.id}
                            patientId={encounter.patientId}
                            encounterId={encounter.id}
                            isEncounter={true}
                        />
                    ))
                ) : (
                    <p className="text-neutral-500 text-center py-8">No recent encounters</p>
                )
            ) : (
                // Display recent patient registrations
                recentPatients.length > 0 ? (
                    recentPatients.map((patient) => (
                        <Patient
                            key={patient.id}
                            patientId={patient.id}
                        />
                    ))
                ) : (
                    <p className="text-neutral-500 text-center py-8">No recent registrations</p>
                )
            )}
        </div>
    );
}

export default History;