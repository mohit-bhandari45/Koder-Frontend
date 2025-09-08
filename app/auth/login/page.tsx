"use client";

import Social from "@/components/auth/social";
import { useMainLoader } from "@/context/MainLoaderContext";
import api, { LOGIN_ENDPOINT } from "@/lib/api.lib";
import { AxiosError } from "axios";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import MainLoader from "@/components/shared/main-loader";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { useUser } from "@/context/UserContext";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { mainLoading, setMainLoading } = useMainLoader();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    setMainLoading(true);
  }, []);

  const [nextParam, setNextParam] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const next = searchParams.get("next");
    setNextParam(next);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof LoginErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const res = await api.post(LOGIN_ENDPOINT, {
        email: formData.email,
        password: formData.password,
      });
      if (res.status === 200) {
        setLogin(true);
        setMainLoading(true);
        localStorage.setItem("accessToken", res.data.data.accessToken);
        localStorage.setItem("refreshToken", res.data.data.refreshToken);
        if (nextParam && nextParam.startsWith("/")) {
          router.replace(nextParam);
        } else {
          router.replace(`/u/${res.data.data.username}`);
        }
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";

      if (message.includes("Invalid email or password")) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email or password",
          password: "Invalid email or password",
        }));
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (mainLoading || user || login) {
    return <MainLoader text={login ? "Logging In" : "Wait a min..."} />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <BsChevronDoubleLeft className="w-6 h-6 text-white" />
      </button>

      {/* Login Form Container */}
      <div className="relative z-10 w-2xl mx-auto p-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          {/* OAuth Buttons */}
          <Social />

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-3 text-gray-400 text-sm">
              or continue with email
            </span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <a
                  className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
                  onClick={() => router.push("/auth/forgot-password")}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-white bg-white/10 border-white/20 rounded focus:ring-white/30 focus:ring-2"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-300"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-gradient-to-r from-white to-gray-300 text-black font-semibold py-3 rounded-lg hover:from-gray-100 hover:to-gray-400 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/signup"
                className="text-white hover:underline font-medium"
              >
                Create one now
              </a>
            </p>
          </div>

          {/* Security Notice */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Your data is protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
