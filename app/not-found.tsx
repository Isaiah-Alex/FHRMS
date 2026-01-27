import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div
        className="
          bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center
          opacity-0 translate-y-3
          animate-[fadeUp_1s_ease-in-out_forwards]
        "
      >
        <p className="text-sm text-neutral-500 mb-2">404 Error</p>

        <h1 className="text-2xl font-semibold text-neutral-900 mb-3">
          Page not found
        </h1>

        <p className="text-neutral-500 mb-6">
          The page you are trying to access doesn't exist or may have been moved.
        </p>

        <Link href="/">
          <Button className="bg-primary hover:bg-primary-hover text-white transition-colors duration-200">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
