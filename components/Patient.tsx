import clsx from "clsx";
import NameProfile from "./NameProfile";

type Props = {
    name: string;
    id: string;
    date: string;
    time: string;
    gender: string;
    age: number;
    colorIndex?: number;
    doctorName: string;
    isEncounter: boolean;
    isActive: boolean;
};

const Patient = ({ name, id, date, gender, age, time, doctorName, colorIndex = 0, isEncounter = false, isActive }: Props) => {
    const colorSchemes: Array<"blue" | "green" | "purple" | "yellow"> = [
        'blue',
        'green',
        'purple',
        'yellow'
    ];

    const getInitials = (fullName: string): string => {
        const names = fullName.trim().split(' ');
        if (names.length >= 2) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return fullName.substring(0, 2).toUpperCase();
    };

    // Cycle through colors based on index
    const color = colorSchemes[colorIndex % colorSchemes.length];

    return (
        <div className="flex items-center gap-4 m-4">
            <NameProfile profileDisplay={getInitials(name)} color={color} />
            <div className="flex justify-between h-full w-full">
                <div>
                    <h4 className="font-medium">{name}</h4>
                    <p className="text-sm text-neutral-500">ID: PAT-{id}</p>
                    {isEncounter && <small className="text-neutral-500/80 self-end">Dr. {doctorName}</small>}
                </div>
                <div className="flex flex-col">
                    <p className="text-sm text-neutral-500">{date} {time}</p>
                    {!isEncounter && <small className="text-neutral-500/80 self-end">{gender}, {age} years</small>}
                    {isEncounter && (
                        <small className={clsx(
                            "self-end px-2 py-1 rounded-full font-medium",
                            isActive
                                ? "text-success bg-success-light"
                                : "text-neutral-500 bg-neutral-200"
                        )}>
                            {isActive ? "Active" : "Completed"}
                        </small>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Patient;