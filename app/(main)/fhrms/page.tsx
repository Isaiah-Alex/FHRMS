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

  const renderValue = (
    value: unknown,
    options?: { fullWidth?: boolean; columns?: 1 | 2 | 3 }
  ) => {
    if (value === null || value === undefined) {
      return <span className="text-neutral-500">Not available</span>;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className="text-neutral-500">No items</span>;
      }
      return (
        <div className="space-y-3 w-full">
          {value.map((item, index) => (
            <div key={index} className="border border-neutral-200 rounded-lg p-3 w-full">
              {renderValue(item, options)}
            </div>
          ))}
        </div>
      );
    }
    if (typeof value === "object") {
      const columns = options?.columns ?? (options?.fullWidth ? 1 : 2);
      const gridClassName =
        columns === 1
          ? "grid w-full grid-cols-1 gap-3"
          : columns === 3
            ? "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            : "grid w-full grid-cols-1 gap-3 sm:grid-cols-2";
      return (
        <div className={gridClassName}>
          {Object.entries(value as Record<string, unknown>).map(([key, entry]) => (
            <div key={key} className="rounded-md bg-neutral-50 p-3">
              <p className="text-xs uppercase text-neutral-500">{key.replace(/_/g, " ")}</p>
              <div className="text-sm text-neutral-900">{renderValue(entry, options)}</div>
            </div>
          ))}
        </div>
      );
    }
    return <span className="text-neutral-900">{String(value)}</span>;
  };

  const renderResults = (payload: Record<string, unknown>) => {
    const status = payload.status;
    const mpi = payload.mpi as Record<string, unknown> | undefined;
    const linkedFacilities = payload.linked_facilities as Array<Record<string, unknown>> | undefined;
    const facilityResults = payload.facility_results as Array<Record<string, unknown>> | undefined;
    const facilityErrors = payload.facility_errors as Array<Record<string, unknown>> | undefined;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-sm uppercase text-neutral-500">Status</span>
          <span className="text-sm font-semibold text-neutral-900">{status ? String(status) : "Unknown"}</span>
        </div>

        {mpi && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">MPI Results</h4>
            {(() => {
              const { merged, redirect_federated_id, ...rest } = mpi;
              return renderValue(rest);
            })()}
          </div>
        )}

        {linkedFacilities && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Linked Facilities</h4>
            {renderValue(linkedFacilities, { columns: 2 })}
          </div>
        )}

        {facilityResults && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Facility Results</h4>
            {facilityResults.length === 0 ? (
              <p className="text-sm text-neutral-500">No facility results returned.</p>
            ) : (
              <div className="space-y-4">
                {facilityResults.map((facility, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4 space-y-3">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-neutral-900">{String(facility.name ?? "Facility")}</p>
                      {facility.facility_id && (
                        <p className="text-xs text-neutral-500">{String(facility.facility_id)}</p>
                      )}
                    </div>
                    <div className="w-full">{renderValue(facility.data ?? facility, { columns: 2 })}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {facilityErrors && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-warning">Facility Errors</h4>
            {facilityErrors.length === 0 ? (
              <p className="text-sm text-neutral-500">No facility errors reported.</p>
            ) : (
              <div className="space-y-3">
                {facilityErrors.map((error, index) => (
                  <div key={index} className="border border-warning-light bg-warning-light/20 rounded-lg p-3">
                    {renderValue(error)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
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
          <div className="space-y-4">
            {typeof results === "object" && results !== null
              ? renderResults(results as Record<string, unknown>)
              : renderValue(results)}
          </div>
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
