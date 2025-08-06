"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Check, X, ArrowRight } from "lucide-react";
import api, {
  FORGOT_PASSWORD,
  VERIFY_RESET_OTP_ENDPOINT,
} from "@/lib/api"; 
import { AxiosError } from "axios";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOTP = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post(FORGOT_PASSWORD, { email });
      if (res.status === 200) {
        setStep("otp");
        setSuccess("OTP sent to your email.");
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      setError(err?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post(VERIFY_RESET_OTP_ENDPOINT, { email, code });

      if (res.status === 200) {
        setSuccess("OTP verified. Redirecting...");
        router.push(`/auth/reset-password?email=${encodeURIComponent(email)}`);
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      setError(err?.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Forgot Password
            </h1>
            {step === "email" ? (
              <p className="text-gray-400">Enter your email to receive a reset code</p>
            ) : (
              <p className="text-gray-400">
                Enter the 6-digit code sent to{" "}
                <strong className="text-white">{email}</strong>
              </p>
            )}
          </div>

          {/* Email Input */}
          {step === "email" && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          {/* OTP Input */}
          {step === "otp" && (
            <div className="mb-4">
              <label htmlFor="code" className="block text-sm font-medium mb-2 text-gray-300">
                Verification Code
              </label>
              <div className="relative">
                <input
                  id="code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          {/* Feedback Messages */}
          {error && (
            <p className="text-red-400 text-sm mb-4 flex items-center gap-2">
              <X className="w-4 h-4" />
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-sm mb-4 flex items-center gap-2">
              <Check className="w-4 h-4" />
              {success}
            </p>
          )}

          {/* Submit Button */}
          <button
            onClick={step === "email" ? handleSendOTP : handleVerifyOTP}
            disabled={loading}
            className="w-full bg-gradient-to-r cursor-pointer from-white to-gray-300 text-black font-semibold py-3 rounded-lg hover:from-gray-100 hover:to-gray-400 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                {step === "email" ? "Sending OTP..." : "Verifying..."}
              </>
            ) : (
              <>
                {step === "email" ? "Send OTP" : "Verify Code"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Link to Login */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Remembered your password?{" "}
              <a href="/auth/login" className="text-white hover:underline font-medium">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
