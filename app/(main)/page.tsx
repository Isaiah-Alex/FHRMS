"use client";

import Hero from "@/components/Hero";
import Card from "@/components/Card";
import { FlaskConical, CalendarFold, UserRound, Stethoscope, UserPlus, Pill, Activity } from "lucide-react";
import QuickActions from "@/components/QuickActions";
import History from "@/components/History";

const Home = () => {
  return (
    <div className="px-4 my-6 space-y-8 sm:px-5 sm:my-10 sm:space-y-10">
      <Hero
        Title="Patients List Directory"
        Subtitle="Overview of hospital operation and recent activity"
        className=""
      />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          amount={1247} 
          description="Total Patients" 
          percentage={12} 
          notice="from last month" 
          icon={<UserRound className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" strokeWidth={2.5} />} 
          color="blue"
          requiresAttention="success"
        />
        <Card 
          amount={1247} 
          description="Today's Visit" 
          notice="updated minutes ago" 
          icon={<CalendarFold className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" strokeWidth={2.5} />} 
          color="green"
        />
        <Card 
          amount={1247} 
          description="Pending Lab Result" 
          notice="Requires attention" 
          icon={<FlaskConical className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" strokeWidth={2.5} />} 
          color="yellow" 
          requiresAttention="warning"
        />
        <Card 
          amount={1247} 
          description="Active Encounters" 
          notice="Current week" 
          icon={<Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16" strokeWidth={2.5} />} 
          color="purple"
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold sm:text-2xl lg:text-3xl">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActions 
            text="Register New Patient" 
            icon={<UserPlus className="w-5 h-5" />} 
            href="/patients"
          />
          <QuickActions 
            text="Create Encounter" 
            icon={<Stethoscope className="w-5 h-5" />} 
            href="/encounters"
          />
          <QuickActions 
            text="View Activity" 
            icon={<Activity className="w-5 h-5" />} 
            href="/vitals"
          />
          <QuickActions 
            text="Manage Medications" 
            icon={<Pill className="w-5 h-5" />} 
            href="/pharmacy"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 mt-6 lg:grid-cols-2">
          <History isEncounters={false} />
          <History isEncounters={true} />
        </div>
      </section>
    </div>
  );
}
 
export default Home;
