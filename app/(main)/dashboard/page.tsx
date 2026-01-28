"use client";

import { useEffect, useMemo, useState } from "react";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import { FlaskConical, CalendarFold, UserRound, Stethoscope, UserPlus, Activity } from "lucide-react";
import QuickActions from "@/components/QuickActions";
import History from "@/components/History";
import { patients, encounters, labTests } from "@/lib/database";
import { HIE_BASE_URL, FACILITY_CODE, FACILITY_API_KEY } from "@/lib/config";

const Home = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = window.localStorage.getItem("fhrmsFacilityToken");
    if (token) {
      return;
    }
    const authenticateFacility = async () => {
      try {
        const response = await fetch(`${HIE_BASE_URL}/api/auth/facility/token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            facility_code: FACILITY_CODE,
            api_key: FACILITY_API_KEY,
          }),
        });

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload?.error ?? "Facility authentication failed.");
        }

        const accessToken = payload?.access_token ?? payload?.token ?? payload?.data?.access_token;
        if (!accessToken) {
          throw new Error("Facility token not returned.");
        }

        window.localStorage.setItem("fhrmsFacilityToken", accessToken);
      } catch (error) {
        setToastMessage(error instanceof Error ? error.message : "Facility authentication failed.");
        setTimeout(() => setToastMessage(null), 3000);
      }
    };

    authenticateFacility();
  }, []);

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    // Total patients
    const totalPatients = patients.length;

    // Today's visits (encounters from today)
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const todaysVisits = encounters.filter(enc => enc.date === today).length;

    // Pending lab results
    const pendingLabResults = labTests.filter(test => test.status === "pending").length;

    // Active encounters
    const activeEncounters = encounters.filter(enc => enc.status === "active").length;

    // Calculate percentage change for total patients (mock calculation)
    // In a real scenario, you'd compare with last month's data
    const lastMonthPatients = Math.floor(totalPatients * 0.9); // Simulating 10% growth
    const patientGrowthPercentage = Math.round(((totalPatients - lastMonthPatients) / lastMonthPatients) * 100);

    return {
      totalPatients,
      todaysVisits,
      pendingLabResults,
      activeEncounters,
      patientGrowthPercentage
    };
  }, []);

  return (
    <div className="px-4 my-6 space-y-8 sm:px-5 sm:my-10 sm:space-y-10">
      <Hero
        Title="Patients List Directory"
        Subtitle="Overview of hospital operation and recent activity"
        className=""
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          amount={stats.totalPatients} 
          description="Total Patients" 
          percentage={stats.patientGrowthPercentage} 
          notice="from last month" 
          icon={<UserRound className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" strokeWidth={2.5} />} 
          color="blue"
          requiresAttention="success"
        />
        <Card 
          amount={stats.todaysVisits} 
          description="Today's Visits" 
          notice="updated minutes ago" 
          icon={<CalendarFold className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" strokeWidth={2.5} />} 
          color="green"
        />
        <Card 
          amount={stats.pendingLabResults} 
          description="Pending Lab Results" 
          notice={stats.pendingLabResults > 0 ? "Requires attention" : "All clear"} 
          icon={<FlaskConical className="w-16 h-16" strokeWidth={2.5} />} 
          color="yellow" 
          requiresAttention={stats.pendingLabResults > 0 ? "warning" : undefined}
        />
        <Card 
          amount={stats.activeEncounters} 
          description="Active Encounters" 
          notice="Current active" 
          icon={<Stethoscope className="w-16 h-16" strokeWidth={2.5} />} 
          color="purple"
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActions 
            text="Register New Patient" 
            icon={<UserPlus className="w-5 h-5" />} 
            href="/patients/register"
          />
          <QuickActions 
            text="Create Encounter" 
            icon={<Stethoscope className="w-5 h-5" />} 
            href="/encounters/new"
          />
          <QuickActions 
            text="View Vitals" 
            icon={<Activity className="w-5 h-5" />} 
            href="/vitals"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
          <History isEncounters={false} />
          <History isEncounters={true} />
        </div>
      </section>
      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border bg-warning/90 text-warning-light">
            <span className="font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-warning-light"
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
 
export default Home;
