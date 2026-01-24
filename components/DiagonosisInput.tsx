import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Search } from "lucide-react";
import type { Diagnosis } from "@/lib/mockEncounterData"

type DiagnosisInputProps = {
    diagnoses: Diagnosis[];
    onAdd: (diagnosis: Diagnosis) => void;
    onRemove: (diagnosisId: string) => void;
    availableDiagnoses: Diagnosis[];
};

const DiagnosisInput = ({
    diagnoses,
    onAdd,
    onRemove,
    availableDiagnoses,
}: DiagnosisInputProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const filteredSuggestions = availableDiagnoses.filter(
        (diagnosis) =>
            !diagnoses.some((d) => d.id === diagnosis.id) &&
            (diagnosis.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                diagnosis.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && filteredSuggestions.length > 0) {
            e.preventDefault();
            onAdd(filteredSuggestions[0]);
            setSearchQuery("");
            setShowSuggestions(false);
        }
    };

    const handleSelectDiagnosis = (diagnosis: Diagnosis) => {
        onAdd(diagnosis);
        setSearchQuery("");
        setShowSuggestions(false);
    };

    return (
        <div className="space-y-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <Input
                    type="text"
                    placeholder="Search ICD-10 code or diagnosis..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(e.target.value.length > 0);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="pl-10"
                />
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {filteredSuggestions.slice(0, 5).map((diagnosis) => (
                            <button
                                key={diagnosis.id}
                                type="button"
                                onClick={() => handleSelectDiagnosis(diagnosis)}
                                className="w-full text-left px-4 py-3 hover:bg-primary-light transition-colors border-b border-neutral-200 last:border-b-0"
                            >
                                <p className="text-sm font-medium text-primary">{diagnosis.code}</p>
                                <p className="text-xs text-neutral-500 mt-1">{diagnosis.description}</p>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {diagnoses.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {diagnoses.map((diagnosis) => (
                        <Badge
                            key={diagnosis.id}
                            variant="secondary"
                            className="bg-primary-light text-primary px-3 py-2 text-sm flex items-center gap-2"
                        >
                            <span className="font-medium">{diagnosis.code}</span>
                            <span className="text-neutral-500">-</span>
                            <span>{diagnosis.description}</span>
                            <button
                                type="button"
                                onClick={() => onRemove(diagnosis.id)}
                                className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DiagnosisInput;