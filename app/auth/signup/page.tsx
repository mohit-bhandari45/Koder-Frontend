"use client";

import Social from "@/components/auth/social";
import MainLoader from "@/components/shared/main-loader";
import {
  FormData,
  FormErrors,
  getPasswordStrength,
  getPasswordStrengthText,
} from "@/components/signup/data";
import { useMainLoader } from "@/context/MainLoaderContext";
import api, { SIGNUP_ENDPOINT } from "@/lib/api.lib";
import { AxiosError } from "axios";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const { mainLoading } = useMainLoader();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms = "Please accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await api.post(SIGNUP_ENDPOINT, {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 201) {
        localStorage.setItem("email",formData.email);
        router.push(
          "/auth/verify-email"
        );
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const message =
        err?.response?.data?.message || "Signup failed. Please try again.";
      if (message.includes("User already exists")) {
        setErrors((prev) => ({
          ...prev,
          email: "Email already registered",
        }));
      } else {
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (mainLoading) {
    return <MainLoader text="Wait a min..." />;
  }

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getPasswordStrengthText(passwordStrength);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Signup Form Container */}
      <div className="relative z-10 w-2xl mx-auto p-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-400">
              Join thousands of developers worldwide
            </p>
          </div>

          {/* OAuth Buttons */}
          <Social />

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-3 text-gray-400 text-sm">
              or create with email
            </span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          {/* Email/Password Form */}
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

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
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="Create a strong password"
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
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-1 mb-1">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            level <= passwordStrength
                              ? passwordStrength <= 2
                                ? "bg-red-400"
                                : passwordStrength <= 3
                                ? "bg-yellow-400"
                                : passwordStrength <= 4
                                ? "bg-blue-400"
                                : "bg-green-400"
                              : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`text-xs ${strengthInfo.color}`}>
                      {strengthInfo.text}
                    </span>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Password Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">
                        Passwords match
                      </span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-sm">
                        Passwords don&apos;t match
                      </span>
                    </>
                  )}
                </div>
              )}
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 text-white bg-white/10 border-white/20 rounded focus:ring-white/30 focus:ring-2"
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm text-gray-300 leading-relaxed"
                >
                  I agree to the{" "}
                  <a href="#" className="text-white hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-white hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-400 text-sm mt-1">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r cursor-pointer from-white to-gray-300 text-black font-semibold py-3 rounded-lg hover:from-gray-100 hover:to-gray-400 transition-all duration-200 hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-white hover:underline font-medium"
              >
                Sign in
              </a>
            </p>
          </div>

          {/* Security Notice */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Your data is encrypted and protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
