"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, BadgeCheck } from "lucide-react";
import { doctors } from "@/lib/database";
import { APP_NAME, HOSPITAL_NAME } from "@/lib/config";

export default function LoginPage() {
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const doctor = doctors.find((item) => item.staffId.toLowerCase() === staffId.trim().toLowerCase());
    if (!doctor || password !== "1111") {
      setIsLoading(false);
      setToastType("error");
      setToastMessage("Invalid staff ID or password. Please try again.");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setToastType("success");
    setToastMessage(`Welcome back, ${doctor.name}.`);
    setTimeout(() => {
      setToastMessage(null);
      setIsLoading(false);
      router.push("/dashboard");
    }, 900);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo.svg"
              alt="FHRMS Logo"
              width={120}
              height={40}
              priority
            />
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
                Welcome Back to {APP_NAME}
              </h1>
              <p className="text-neutral-500 text-base">
                Sign in to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Staff ID Field */}
              <div className="space-y-2">
                <Label htmlFor="staffId">Staff ID</Label>
                <div className="relative">
                  <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <Input
                    id="staffId"
                    type="text"
                    placeholder="Enter your staff ID"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 rounded border-neutral-200 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <button
                  type="button"
                  onClick={() => console.log("Forgot password")}
                  className="text-sm text-primary hover:text-primary-hover font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
        <div className="hidden lg:flex flex-1 bg-primary-middle items-center justify-center p-12">
          <div className="max-w-md text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src="/images/doctor-icon.svg"
              alt="Healthcare illustration"
              width={200}
              height={200}
            />
          </div>
          <h2 className="text-3xl font-semibold text-neutral-900">
            {HOSPITAL_NAME}
          </h2>
          <p className="text-base text-neutral-500">
            Secure, efficient, and comprehensive healthcare record management
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${toastType === "success"
              ? "bg-primary/90 text-primary-light"
              : "bg-warning/90 text-warning-light"
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
