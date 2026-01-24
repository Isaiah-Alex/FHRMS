"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import NameProfile from "@/components/NameProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CirclePlus,
  RotateCcw,
  Heart,
  Thermometer,
  Calendar,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle,
  TrendingUp,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  AlertCircle,
} from "lucide-react";
import {
  mockPatientVitals,
  mockVitalsHistory,
  mockVitalsSummary,
  type VitalRecord,
} from "@/lib/vitalsData";

// Vitals form validation schema
const vitalsFormSchema = z.object({
  systolic: z.string()
    .min(1, "Systolic BP is required")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 60 && num <= 250;
    }, "Systolic BP must be between 60-250 mmHg"),
  diastolic: z.string()
    .min(1, "Diastolic BP is required")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 40 && num <= 150;
    }, "Diastolic BP must be between 40-150 mmHg"),
  temperature: z.string()
    .min(1, "Temperature is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 30 && num <= 45;
    }, "Temperature must be between 30-45°C"),
  pulse: z.string()
    .min(1, "Pulse rate is required")
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 30 && num <= 200;
    }, "Pulse rate must be between 30-200 BPM"),
  weight: z.string()
    .min(1, "Weight is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 2 && num <= 300;
    }, "Weight must be between 2-300 kg"),
  height: z.string()
    .min(1, "Height is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 30 && num <= 250;
    }, "Height must be between 30-250 cm"),
});

type VitalsFormSchema = z.infer<typeof vitalsFormSchema>;

export default function VitalsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showGeneralFilter, setShowGeneralFilter] = useState(false);
  const [dateSortOrder, setDateSortOrder] = useState<'asc' | 'desc'>('desc');
  const [generalFilterType, setGeneralFilterType] = useState<string>('date');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean } | null>(null);
  const itemsPerPage = 4;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<VitalsFormSchema>({
    resolver: zodResolver(vitalsFormSchema),
    defaultValues: {
      systolic: "",
      diastolic: "",
      temperature: "",
      pulse: "",
      weight: "",
      height: "",
    },
  });

  // Sort vitals history based on selected filters
  const sortedVitalsHistory = [...mockVitalsHistory].sort((a, b) => {
    // First apply date sorting if it's the primary sort
    if (generalFilterType === 'date') {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateSortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }

    // Apply general filter sorting (ascending only)
    switch (generalFilterType) {
      case 'bloodPressure':
        const bpA = a.bloodPressureSystolic;
        const bpB = b.bloodPressureSystolic;
        return bpA - bpB;
      case 'temperature':
        return a.temperature - b.temperature;
      case 'pulse':
        return a.pulse - b.pulse;
      case 'weight':
        return a.weight - b.weight;
      case 'bmi':
        return a.bmi - b.bmi;
      case 'staff':
        return a.staffId.localeCompare(b.staffId);
      default:
        // Default to date sorting
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateSortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
  });

  const totalPages = Math.ceil(sortedVitalsHistory.length / itemsPerPage);

  const paginatedHistory = sortedVitalsHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const calculateBMI = () => {
    const weight = parseFloat(watch("weight") || "0");
    const height = parseFloat(watch("height") || "0") / 100; // convert cm to m
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return "23.8";
  };

  const getBMIStatus = (bmi: string) => {
    const bmiValue = parseFloat(bmi);
    if (bmiValue < 18.5) return { text: "UNDERWEIGHT", color: "text-warning", barColor: "bg-warning" };
    if (bmiValue < 25) return { text: "NORMAL RANGE", color: "text-success", barColor: "bg-success" };
    if (bmiValue < 30) return { text: "OVERWEIGHT", color: "text-warning", barColor: "bg-warning" };
    return { text: "OBESE", color: "text-warning", barColor: "bg-warning" };
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(null);
    }, 3000); // Auto-dismiss after 3 seconds
  };

  const handleSaveVitals = (data: VitalsFormSchema) => {
    console.log("Saving vitals:", data);
    showToast("Vitals saved successfully!");
    reset(); // Reset form after successful save
  };

  const bmi = calculateBMI();
  const bmiStatus = getBMIStatus(bmi);

  // Calculate dynamic summary statistics
  const calculateSummaryStats = () => {
    if (mockVitalsHistory.length === 0) {
      return mockVitalsSummary; // fallback to static data
    }

    // Average Blood Pressure
    const avgSystolic = Math.round(
      mockVitalsHistory.reduce((sum, record) => sum + record.bloodPressureSystolic, 0) / mockVitalsHistory.length
    );
    const avgDiastolic = Math.round(
      mockVitalsHistory.reduce((sum, record) => sum + record.bloodPressureDiastolic, 0) / mockVitalsHistory.length
    );
    const bpStatus = avgSystolic < 120 && avgDiastolic < 80 ? "Normal" :
      avgSystolic < 130 && avgDiastolic < 80 ? "Elevated" :
        avgSystolic >= 130 || avgDiastolic >= 80 ? "High" : "Normal";

    // Weight Trend - compare first (oldest) vs last (newest) record
    const sortedByDate = [...mockVitalsHistory].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const oldestWeight = sortedByDate[0]?.weight || 0;
    const newestWeight = sortedByDate[sortedByDate.length - 1]?.weight || 0;
    const weightChange = newestWeight - oldestWeight;
    const weightStatus = weightChange > 0 ? "Gaining" :
      weightChange < 0 ? "Losing" : "Stable";

    // Average Resting Pulse
    const avgPulse = Math.round(
      mockVitalsHistory.reduce((sum, record) => sum + record.pulse, 0) / mockVitalsHistory.length
    );
    const pulseStatus = avgPulse < 60 ? "Low" :
      avgPulse <= 100 ? "Normal" : "High";

    return {
      avgBloodPressure: {
        systolic: avgSystolic,
        diastolic: avgDiastolic,
        status: bpStatus
      },
      weightTrend: {
        change: weightChange,
        status: weightStatus
      },
      restingPulse: {
        value: avgPulse,
        status: pulseStatus
      }
    };
  };

  const dynamicSummary = calculateSummaryStats();

  return (
    <div className="px-5 my-10 space-y-6">
      {/* Patient Name Display Section */}
      <Card className="shadow-md border-primary/15">
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <NameProfile
                profileDisplay={mockPatientVitals.name
                  .split(" ")
                  .map((n) => n.charAt(0))
                  .join("")}
                color={mockPatientVitals.profileColor}
                rounded={true}
                className="w-16 h-16"
              />
              <div>
                <h1 className="text-3xl font-semibold">{mockPatientVitals.name}</h1>
                <div className="flex items-center gap-4 mt-1 text-neutral-500">
                  <span>ID: <strong className="text-neutral-900">{mockPatientVitals.patientId}</strong></span>
                  <span>Age: <strong className="text-neutral-900">{mockPatientVitals.age}</strong></span>
                  <span>Gender: <strong className="text-neutral-900">{mockPatientVitals.gender}</strong></span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-neutral-200 bg-white cursor-pointer text-neutral-500 hover:bg-primary hover:text-white">
                Edit Profile
              </Button>
              <Button className="bg-primary hover:bg-primary-hover text-white cursor-pointer">
                Print Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Vitals Entry Section */}
        <Card className="shadow-md border-primary/15">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CirclePlus className="w-5 h-5 text-primary" />
              New Vitals Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(handleSaveVitals)} className="space-y-4">
            {/* Blood Pressure */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Systolic (mmHg) *</Label>
                <Input
                  type="number"
                  placeholder="120"
                  {...register("systolic")}
                  className={errors.systolic ? "border-warning" : ""}
                />
                {errors.systolic && (
                  <p className="text-sm text-warning flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.systolic.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Diastolic (mmHg) *</Label>
                <Input
                  type="number"
                  placeholder="80"
                  {...register("diastolic")}
                  className={errors.diastolic ? "border-warning" : ""}
                />
                {errors.diastolic && (
                  <p className="text-sm text-warning flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.diastolic.message}
                  </p>
                )}
              </div>
            </div>

            {/* Body Temperature */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Body Temp (°C) *</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  placeholder="36.5"
                  {...register("temperature")}
                  className={errors.temperature ? "border-warning" : ""}
                />
                <Thermometer className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
              </div>
              {errors.temperature && (
                <p className="text-sm text-warning flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.temperature.message}
                </p>
              )}
            </div>

            {/* Pulse Rate */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Pulse Rate (BPM) *</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="72"
                  {...register("pulse")}
                  className={errors.pulse ? "border-warning" : ""}
                />
                <Heart className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-warning" />
              </div>
              {errors.pulse && (
                <p className="text-sm text-warning flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.pulse.message}
                </p>
              )}
            </div>

            {/* Weight & Height */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Weight (kg) *</Label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="75.5"
                  {...register("weight")}
                  className={errors.weight ? "border-warning" : ""}
                />
                {errors.weight && (
                  <p className="text-sm text-warning flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.weight.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Height (cm) *</Label>
                <Input
                  type="number"
                  placeholder="178"
                  {...register("height")}
                  className={errors.height ? "border-warning" : ""}
                />
                {errors.height && (
                  <p className="text-sm text-warning flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.height.message}
                  </p>
                )}
              </div>
            </div>

            {/* BMI Display */}
            <div className="bg-primary-light rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">Estimated BMI</span>
                <span className="text-2xl font-semibold">{bmi}</span>
              </div>
              <div className={`w-full h-2 rounded-full ${bmiStatus.barColor}`}></div>
              <span className={`text-xs font-medium ${bmiStatus.color}`}>
                {bmiStatus.text}
              </span>
            </div>

              {/* Save Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {isSubmitting ? "Saving..." : "Save Vitals Entry"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Vitals History Section */}
        <Card className="shadow-md border-primary/15 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <RotateCcw className="w-5 h-5 text-primary" />
                Vitals History
              </CardTitle>
              <div className="flex items-center gap-2">
                {/* Sort Order Button */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-neutral-500 bg-white hover:bg-primary hover:text-white"
                    onClick={() => setShowDateFilter(!showDateFilter)}
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    Sort Order
                  </Button>

                  {showDateFilter && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-200 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 flex items-center gap-2 ${dateSortOrder === 'asc' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setDateSortOrder('asc');
                            setShowDateFilter(false);
                          }}
                        >
                          <ArrowUp className="w-4 h-4" />
                          Ascending
                        </button>
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 flex items-center gap-2 ${dateSortOrder === 'desc' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setDateSortOrder('desc');
                            setShowDateFilter(false);
                          }}
                        >
                          <ArrowDown className="w-4 h-4" />
                          Descending
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Filter by Date Button */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-neutral-500 bg-white hover:bg-primary hover:text-white"
                    onClick={() => setShowGeneralFilter(!showGeneralFilter)}
                  >
                    <Calendar className="w-4 h-4" />
                    Filter by date
                  </Button>

                  {showGeneralFilter && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-neutral-200 rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 ${generalFilterType === 'date' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setGeneralFilterType('date');
                            setShowGeneralFilter(false);
                            setCurrentPage(1);
                          }}
                        >
                          Date & Time
                        </button>
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 ${generalFilterType === 'bloodPressure' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setGeneralFilterType('bloodPressure');
                            setShowGeneralFilter(false);
                            setCurrentPage(1);
                          }}
                        >
                          Blood Pressure
                        </button>
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 ${generalFilterType === 'temperature' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setGeneralFilterType('temperature');
                            setShowGeneralFilter(false);
                            setCurrentPage(1);
                          }}
                        >
                          Temperature
                        </button>
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 ${generalFilterType === 'pulse' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setGeneralFilterType('pulse');
                            setShowGeneralFilter(false);
                            setCurrentPage(1);
                          }}
                        >
                          Pulse Rate
                        </button>
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 ${generalFilterType === 'weight' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setGeneralFilterType('weight');
                            setShowGeneralFilter(false);
                            setCurrentPage(1);
                          }}
                        >
                          Weight
                        </button>
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 ${generalFilterType === 'bmi' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setGeneralFilterType('bmi');
                            setShowGeneralFilter(false);
                            setCurrentPage(1);
                          }}
                        >
                          BMI
                        </button>
                        <button
                          className={`w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition-colors duration-200 ${generalFilterType === 'staff' ? 'bg-primary text-white' : 'text-neutral-700'
                            }`}
                          onClick={() => {
                            setGeneralFilterType('staff');
                            setShowGeneralFilter(false);
                            setCurrentPage(1);
                          }}
                        >
                          Staff
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary-light">
                    <TableHead className="font-semibold">DATE & TIME</TableHead>
                    <TableHead className="font-semibold">BP (MMHG)</TableHead>
                    <TableHead className="font-semibold">TEMP</TableHead>
                    <TableHead className="font-semibold">PULSE</TableHead>
                    <TableHead className="font-semibold">WEIGHT</TableHead>
                    <TableHead className="font-semibold">BMI</TableHead>
                    <TableHead className="font-semibold">STAFF</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="font-medium">{record.date}</div>
                        <div className="text-xs text-neutral-500">{record.time}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {record.bloodPressureSystolic}/{record.bloodPressureDiastolic}
                          </span>
                          {record.status === "normal" ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-warning" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={record.temperature > 37.5 ? "text-warning" : ""}>
                        {record.temperature}°C
                      </TableCell>
                      <TableCell>{record.pulse} bpm</TableCell>
                      <TableCell>{record.weight} kg</TableCell>
                      <TableCell>
                        <span className="inline-block bg-success-light text-success px-2 py-1 rounded text-sm font-medium">
                          {record.bmi}
                        </span>
                      </TableCell>
                      <TableCell className="text-neutral-500">{record.staffId}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-neutral-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, mockVitalsHistory.length)} of{" "}
                {mockVitalsHistory.length} recorded entries
              </span>
              <div className="flex items-center gap-2">
                <Button
                  className="bg-neutral-100 border-neutral-200 text-neutral-500 hover:bg-primary hover:text-white"
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  className="bg-neutral-100 border-neutral-200 text-neutral-500 hover:bg-primary hover:text-white"
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md border-primary/15">
          <CardContent className="py-6">
            <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">
              Avg. Blood Pressure
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">
                {dynamicSummary.avgBloodPressure.systolic}/
                {dynamicSummary.avgBloodPressure.diastolic}
              </span>
              <span className={`text-sm font-medium ${dynamicSummary.avgBloodPressure.status === 'Normal' ? 'text-success' :
                dynamicSummary.avgBloodPressure.status === 'Elevated' ? 'text-warning' : 'text-warning'
                }`}>
                {dynamicSummary.avgBloodPressure.status}
              </span>
            </div>
            <div className={`w-full h-1 rounded-full mt-4 ${dynamicSummary.avgBloodPressure.status === 'Normal' ? 'bg-success' :
              dynamicSummary.avgBloodPressure.status === 'Elevated' ? 'bg-warning' : 'bg-warning'
              }`}></div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-primary/15">
          <CardContent className="py-6">
            <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">
              Weight Trend
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">
                {dynamicSummary.weightTrend.change > 0 ? "+" : ""}
                {dynamicSummary.weightTrend.change.toFixed(1)}kg
              </span>
              <span className={`text-sm font-medium ${dynamicSummary.weightTrend.status === 'Stable' ? 'text-success' :
                dynamicSummary.weightTrend.status === 'Losing' ? 'text-success' : 'text-warning'
                }`}>
                {dynamicSummary.weightTrend.status}
              </span>
            </div>
            <div className={`w-full h-1 rounded-full mt-4 ${dynamicSummary.weightTrend.status === 'Stable' ? 'bg-success' :
              dynamicSummary.weightTrend.status === 'Losing' ? 'bg-success' : 'bg-warning'
              }`}></div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-primary/15">
          <CardContent className="py-6">
            <h3 className="text-sm font-medium text-neutral-500 uppercase mb-2">
              Resting Pulse
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">
                {dynamicSummary.restingPulse.value} bpm
              </span>
              <span className={`text-sm font-medium ${dynamicSummary.restingPulse.status === 'Normal' ? 'text-success' : 'text-warning'
                }`}>
                {dynamicSummary.restingPulse.status}
              </span>
            </div>
            <div className={`w-full h-1 rounded-full mt-4 ${dynamicSummary.restingPulse.status === 'Normal' ? 'bg-success' : 'bg-warning'
              }`}></div>
          </CardContent>
        </Card>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toast.type === 'success'
              ? 'bg-primary/90  text-primary-light'
              : 'bg-warning/90  text-warning-light'
            }`}>
            <CheckCircle className={`w-5 h-5 ${toast.type === 'success' ? 'text-primary' : 'text-red-600'
              }`} />
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}