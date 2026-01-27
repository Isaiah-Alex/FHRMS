"use client";

import { useState, useMemo, useEffect } from "react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PatientRow from "@/components/PatientRow";
import { UserPlus, Search, SlidersHorizontal } from "lucide-react";
import { mockPatients } from "@/lib/mockData";
import { useDebouncer } from "@/hooks/useDebouncer";
import type { Patient } from "@/lib/mockData";
import { TableCell } from "@/components/ui/table";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10;
const STORAGE_KEY = "fhrmsPatients";
const TOAST_KEY = "fhrmsPatientToast";

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [sexFilter, setSexFilter] = useState<string>("all");
  const [ageRangeFilter, setAgeRangeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const debouncedSearch = useDebouncer(searchQuery, 300);

  // Filter and search logic
  const filteredPatients = useMemo(() => {
    let result = patients;

    // Search by name or patient ID
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(query) ||
          patient.lastName.toLowerCase().includes(query) ||
          patient.patientId.toLowerCase().includes(query)
      );
    }

    // Filter by sex
    if (sexFilter !== "all") {
      result = result.filter((patient) => patient.sex === sexFilter);
    }

    // Filter by age range
    if (ageRangeFilter !== "all") {
      result = result.filter((patient) => {
        switch (ageRangeFilter) {
          case "0-17":
            return patient.age >= 0 && patient.age <= 17;
          case "18-35":
            return patient.age >= 18 && patient.age <= 35;
          case "36-50":
            return patient.age >= 36 && patient.age <= 50;
          case "51+":
            return patient.age >= 51;
          default:
            return true;
        }
      });
    }

    return result;
  }, [debouncedSearch, sexFilter, ageRangeFilter, patients]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / PAGE_SIZE);
  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredPatients.slice(startIndex, endIndex);
  }, [filteredPatients, currentPage]);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterSetter: (value: string) => void, value: string) => {
    filterSetter(value);
    setCurrentPage(1);
  };

  const router = useRouter();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Patient[];
        setPatients(parsed);
      } catch {
        setPatients(mockPatients);
      }
    }

    const toast = window.sessionStorage.getItem(TOAST_KEY);
    if (toast) {
      setToastMessage(toast);
      window.sessionStorage.removeItem(TOAST_KEY);
      const timeout = window.setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => window.clearTimeout(timeout);
    }
    return undefined;
  }, []);
  const handleViewProfile = (patientId: string) => {
    router.push(`/patients/${patientId}`);
    
  };

  const handleRegisterPatient = () => {
    router.push("/patients/register");
  };

  return (
    <div className="px-4 my-6 space-y-8 sm:px-5 sm:my-10 sm:space-y-10">
      <Hero
        Title="Patients"
        Subtitle="Manage and view all registered patient records in the system"
        className=""
      />

      <div className="bg-white rounded-lg p-6 shadow-md space-y-6">
        {/* Top Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold">Patients List</h2>
          <Button
            onClick={handleRegisterPatient}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white w-full sm:w-auto"
          >
            <UserPlus className="w-5 h-5" />
            Register Patient
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <Input
              type="text"
              placeholder="Search by name or patient ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sexFilter} onValueChange={(value) => handleFilterChange(setSexFilter, value)}>
          <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="focus:bg-primary focus:text-white">All Sexes</SelectItem>
              <SelectItem value="Male" className="focus:bg-primary focus:text-white">Male</SelectItem>
              <SelectItem value="Female" className="focus:bg-primary focus:text-white">Female</SelectItem>
              <SelectItem value="Other" className="focus:bg-primary focus:text-white">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select value={ageRangeFilter} onValueChange={(value) => handleFilterChange(setAgeRangeFilter, value)}>
          <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Age Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="focus:bg-primary focus:text-white">All Ages</SelectItem>
              <SelectItem value="0-17" className="focus:bg-primary focus:text-white">0-17 years</SelectItem>
              <SelectItem value="18-35" className="focus:bg-primary focus:text-white">18-35 years</SelectItem>
              <SelectItem value="36-50" className="focus:bg-primary focus:text-white">36-50 years</SelectItem>
              <SelectItem value="51+" className="focus:bg-primary focus:text-white">51+ years</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2 bg-white hover:bg-primary text-neutral-500 hover:text-white w-full lg:w-auto">
            <SlidersHorizontal className="w-5 h-5" />
            More Filters
          </Button>
        </div>

        {/* Results count */}
        <div className="text-sm text-neutral-500">
          Showing {paginatedPatients.length} of {filteredPatients.length} patients
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-x-auto">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow className="bg-primary-light">
                <TableHead>Profile</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Sex</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Patient ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPatients.length > 0 ? (
                paginatedPatients.map((patient) => (
                  <PatientRow
                    key={patient.id}
                    patient={patient}
                    onViewProfile={handleViewProfile}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-neutral-500">
                    No patients found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent className="flex flex-wrap gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer bg-white hover:bg-primary text-neutral-500 hover:text-white"}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNumber: number;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNumber)}
                      isActive={currentPage === pageNumber}
                      className="cursor-pointer bg-white hover:bg-primary text-neutral-500 hover:text-white"
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer bg-white hover:bg-primary text-neutral-500 hover:text-white"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>

      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border bg-primary/90 text-primary-light">
            <span className="font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-primary-light"
              aria-label="Close notification"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
