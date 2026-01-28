"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { APP_NAME, FACILITY_ID, HIE_BASE_URL, FACILITY_CODE, FACILITY_API_KEY } from "@/lib/config";

export default function FhrmsPage() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<unknown>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"error" | "info">("info");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const getFacilityToken = () => window.localStorage.getItem("fhrmsFacilityToken");

  const authenticateFacility = async () => {
    if (getFacilityToken()) {
      return;
    }
    setIsAuthLoading(true);
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

      const token = payload?.access_token ?? payload?.token ?? payload?.data?.access_token;
      if (!token) {
        throw new Error("Facility token not returned.");
      }

      window.localStorage.setItem("fhrmsFacilityToken", token);
    } catch (error) {
      setToastType("error");
      setToastMessage(error instanceof Error ? error.message : "Facility authentication failed.");
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsAuthLoading(false);
    }
  };

  useEffect(() => {
    authenticateFacility();
  }, []);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!keyword.trim()) {
      setToastType("error");
      setToastMessage("Please enter a search keyword.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    const token = getFacilityToken();
    if (!token) {
      setToastType("error");
      setToastMessage("Facility authentication missing. Please refresh this page.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const response = await fetch(`/api/hie/queries?keyword=${encodeURIComponent(keyword.trim())}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Unable to fetch records. Please try again.");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setToastType("error");
      setToastMessage(error instanceof Error ? error.message : "Search failed.");
      setTimeout(() => setToastMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 my-6 space-y-6 sm:px-5 sm:my-10">
      <Hero
        Title={`${APP_NAME} Search`}
        Subtitle={`Search for patient records by phone number, national ID, or full name to retrieve a complete clinical profile for ${FACILITY_ID}.`}
        className=""
      />

      <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Search Patient Records</h2>
          <p className="text-sm text-neutral-500">
            Enter a phone number or national ID to locate a patient record quickly.
          </p>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <Input
              type="text"
              placeholder="Search by phone number, national ID, or patient name"
              className="pl-10"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary-hover text-white w-full sm:w-auto"
            disabled={isLoading || isAuthLoading}
          >
            {isAuthLoading ? "Authenticating..." : isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Search Results</h3>
        {isLoading && <p className="text-sm text-neutral-500">Fetching records...</p>}
        {!isLoading && results && (
          <pre className="text-sm text-neutral-700 whitespace-pre-wrap break-words">
            {JSON.stringify(results, null, 2)}
          </pre>
        )}
        {!isLoading && !results && (
          <p className="text-sm text-neutral-500">No results yet. Run a search to view records.</p>
        )}
      </div>

      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toastType === "error"
              ? "bg-warning/90 text-warning-light"
              : "bg-primary/90 text-primary-light"
            }`}>
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
