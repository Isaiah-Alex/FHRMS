"use client";

import Hero from "@/components/Hero";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function FhrmsPage() {
  return (
    <div className="px-4 my-6 space-y-6 sm:px-5 sm:my-10">
      <Hero
        Title="Fhrms Search"
        Subtitle="Search for patient records by phone number, national ID, or full name to retrieve a complete clinical profile."
        className=""
      />

      <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Search Patient Records</h2>
          <p className="text-sm text-neutral-500">
            Enter a phone number or national ID to locate a patient record quickly.
          </p>
        </div>
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
          <Input
            type="text"
            placeholder="Search by phone number, national ID, or patient name"
            className="pl-10"
          />
        </div>
      </div>
    </div>
  );
}
