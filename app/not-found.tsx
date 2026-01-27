"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div
        className={clsx(
          "bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center",
          "transition-all duration-300 ease-in-out",
          "animate-in fade-in slide-in-from-bottom-2"
        )}
      >
        {/* Status */}
        <p className="text-sm text-neutral-500 mb-2">404 Error</p>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-neutral-900 mb-3">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-neutral-500 mb-6">
          The page you are trying to access doesn’t exist or may have been moved.
        </p>

        {/* Action */}
        <Button
          onClick={() => router.push("/")}
          className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200 cursor-pointer"
        >
          Go back home
        </Button>
      </div>
    </div>
  );
}
