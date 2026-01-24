"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Plus,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  Edit,
} from "lucide-react";
import { labTests, type LabTest, type LabTestStatus } from "@/lib/database";
import clsx from "clsx";

const ITEMS_PER_PAGE = 5;

export default function LaboratoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LabTestStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter lab tests
  const filteredTests = useMemo(() => {
    let filtered = labTests;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (test) =>
          test.testName.toLowerCase().includes(query) ||
          test.encounterId.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((test) => test.status === statusFilter);
    }

    return filtered;
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE);
  const paginatedTests = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTests.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTests, currentPage]);

  const handleStatusFilter = (status: LabTestStatus | "all") => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleViewReport = (testId: string) => {
    console.log("View report:", testId);
    alert(`Viewing report for test ${testId}`);
  };

  const handleEditTest = (testId: string) => {
    console.log("Edit test:", testId);
    alert(`Editing test ${testId}`);
  };

  const handleExportData = () => {
    console.log("Exporting data...");
    alert("Exporting laboratory data...");
  };

  const handleNewEntry = () => {
    console.log("Creating new lab entry...");
    alert("Opening new lab entry form...");
  };

  const getStatusBadge = (status: LabTestStatus) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success-light text-success border-0">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-primary-light text-primary border-0">
            Pending
          </Badge>
        );
      case "critical":
        return (
          <Badge className="bg-warning-light text-warning border-0">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getResultColor = (status: LabTestStatus) => {
    if (status === "critical") return "text-warning font-medium";
    if (status === "pending") return "text-neutral-500 italic";
    return "text-neutral-900";
  };

  return (
    <div className="px-5 my-10 space-y-6">
      <Hero
        Title="Laboratory Results"
        Subtitle="Monitor patient diagnostic tests and clinical outcomes"
        className=""
      />

      <div className="bg-white rounded-lg p-6 shadow-md border-primary/15">
        {/* Top Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* All Results Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-neutral-900 hover:bg-neutral-700 text-white flex items-center gap-2">
                  {statusFilter === "all"
                    ? "All Results"
                    : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <button
                  onClick={() => handleStatusFilter("all")}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-primary-light cursor-pointer transition-colors"
                >
                  All Results
                </button>
                <button
                  onClick={() => handleStatusFilter("completed")}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-primary-light cursor-pointer transition-colors"
                >
                  Completed
                </button>
                <button
                  onClick={() => handleStatusFilter("pending")}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-primary-light cursor-pointer transition-colors"
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusFilter("critical")}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-primary-light cursor-pointer transition-colors"
                >
                  Critical
                </button>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Pills */}
            <Button
              variant="outline"
              onClick={() => handleStatusFilter("completed")}
              className={clsx(
                "flex items-center gap-2 border-neutral-200 hover:bg-white cursor-pointer",
                statusFilter === "completed" && "bg-success-light text-success border-success"
              )}
            >
              <div className="w-2 h-2 rounded-full bg-success"></div>
              Completed
            </Button>
            <Button
              variant="outline"
              onClick={() => handleStatusFilter("pending")}
              className={clsx(
                "flex items-center gap-2 border-neutral-200 hover:bg-white cursor-pointer",
                statusFilter === "pending" && "bg-primary-light text-primary border-primary"
              )}
            >
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              Pending
            </Button>
            <Button
              variant="outline"
              onClick={() => handleStatusFilter("critical")}
              className={clsx(
                "flex items-center gap-2 border-neutral-200 hover:bg-white cursor-pointer",
                statusFilter === "critical" && "bg-warning-light text-warning border-warning"
              )}
            >
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              Critical
            </Button>

            <Button variant="outline" className="flex items-center gap-2 border-neutral-200 hover:bg-white cursor-pointer">
              <SlidersHorizontal className="w-4 h-4" />
              More Filters
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="flex items-center gap-2 border-neutral-200 hover:bg-white cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button
              onClick={handleNewEntry}
              className="bg-primary hover:bg-primary-hover text-white flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Entry
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-primary-light">
                <TableHead className="font-semibold text-neutral-700">TEST NAME</TableHead>
                <TableHead className="font-semibold text-neutral-700">ENCOUNTER ID</TableHead>
                <TableHead className="font-semibold text-neutral-700">RESULT</TableHead>
                <TableHead className="font-semibold text-neutral-700">STATUS</TableHead>
                <TableHead className="font-semibold text-neutral-700">DATE</TableHead>
                <TableHead className="font-semibold text-neutral-700">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTests.length > 0 ? (
                paginatedTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.testName}</TableCell>
                    <TableCell className="text-primary">{test.encounterId}</TableCell>
                    <TableCell className={getResultColor(test.status)}>
                      {test.result}
                    </TableCell>
                    <TableCell>{getStatusBadge(test.status)}</TableCell>
                    <TableCell className="text-neutral-500">{test.date}</TableCell>
                    <TableCell>
                      {test.status === "pending" ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTest(test.id)}
                          className="text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200 cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                          <p>Edit Report</p>
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(test.id)}
                          className="text-primary hover:text-primary-light hover:bg-primary cursor-pointer"
                        >
                          View Report
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-neutral-500">
                    No laboratory tests found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-neutral-500">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredTests.length)} of{" "}
            {filteredTests.length} results
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="hover:bg-white"
            >
              <ChevronLeft className="w-4 h-4 hover:bg-primary hover:text-white" />
            </Button>

            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              let pageNumber: number;
              if (totalPages <= 3) {
                pageNumber = i + 1;
              } else if (currentPage <= 2) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 1) {
                pageNumber = totalPages - 2 + i;
              } else {
                pageNumber = currentPage - 1 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNumber)}
                  className={clsx("hover:bg-white",
                    currentPage === pageNumber
                      ? "bg-primary hover:bg-primary-hover text-white"
                      : "border-neutral-200"
                  )}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="hover:bg-white"
            >
              <ChevronRight className="w-4 h-4 hover:bg-primary hover:text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}