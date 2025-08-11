"use client";
import { useState, useEffect } from "react";
import api, { RESEND_OTP_ENDPOINT } from "@/lib/api.lib";
import { AxiosError } from "axios";

interface ResendOtpProps {
  email: string;
  type?: "verify" | "reset-password";
  setError?: (msg: string) => void;
  setSuccess?: (msg: string) => void;
}

export default function ResendOtp({
  email,
  type = "reset-password",
  setError,
  setSuccess,
}: ResendOtpProps) {
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    try {
      setLoading(true);
      const res = await api.post(RESEND_OTP_ENDPOINT, { email, type });
      if (res.status == 200) {
        if (setSuccess) setSuccess(" New OTP sent successfully.");
        if (setError) setError("");
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      if (setError)
        setError(err.response?.data?.message || "Failed to resend OTP");
      if (setSuccess) setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-4 space-y-1 text-center text-sm">
      {timer > 0 ? (
        <p className="text-gray-400">You can resend OTP in {timer}s</p>
      ) : (
        <button
          onClick={handleResend}
          disabled={loading}
          className="text-white hover:underline cursor-pointer"
        >
          Resend OTP
        </button>
      )}
    </div>
  );
}
