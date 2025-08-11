"use client";

import React, { useEffect, useState } from "react";
import { api, GET_OWN_PROFILE_ENDPOINT } from "@/lib/api.lib";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Loader2,
  User,
  Lock,
  Trash2,
  Camera,
} from "lucide-react";

interface RightSidebarProps {
  content: string;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ content }) => {
  // Form states
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [hasPassword, setHasPassword] = useState<boolean>(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Simple loading and message states
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const router = useRouter();

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(GET_OWN_PROFILE_ENDPOINT);
        if (res.status === 200) {
          const user = res.data.data;
          setUsername(user.username);
          setFullName(user.fullName);
          setProfilePicture(user.profilepicture ?? "");
          setHasPassword(!!user.password);
        }
      } catch (error: unknown) {
        const err = error as AxiosError<{ message: string }>;
        const errorMessage =
          err?.response?.data?.message ||
          "Failed to load profile. Please refresh the page.";
        setMessage(errorMessage);
        setMessageType("error");
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = async ( event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Validate image
    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      setMessageType("error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image size must be less than 2MB.");
      setMessageType("error");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=2fe8ec49801ba50d1cbc6ffbaee0f524`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.success) {
        setProfilePicture(data.data.url);
      } else {
        setMessage("Image upload failed.");
        setMessageType("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error uploading image.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async <T,>(
    e: React.FormEvent,
    apiCall: () => Promise<T>,
    successMessage: string,
    resetFields?: () => void
  ) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      await apiCall();
      setMessage(successMessage);
      setMessageType("success");
      if (resetFields) resetFields();
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // API handlers
  const handleUpdateUsername = (e: React.FormEvent) => {
    handleSubmit(
      e,
      () => api.patch("/api/user/username", { username }),
      "Username updated successfully!"
    );
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    handleSubmit(
      e,
      () =>
        api.patch("/api/user/me", { fullName, profilepicture: profilePicture }),
      "Profile updated successfully!"
    );
  };

  const handleChangePassword = (e: React.FormEvent) => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      setMessageType("error");
      return;
    }
    handleSubmit(
      e,
      () =>
        api.post("/api/user/change-password", { currentPassword, newPassword }),
      "Password changed successfully!",
      () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    );
  };

  const handleSetPassword = (e: React.FormEvent) => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      setMessageType("error");
      return;
    }

    handleSubmit(
      e,
      () => api.post("/api/user/add-password", { newPassword }),
      "Password set successfully!",
      () => {
        setNewPassword("");
        setConfirmPassword("");
        setHasPassword(true);
      }
    );
  };

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you absolutely sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    const finalConfirm = prompt("Type 'DELETE' to confirm account deletion:");
    if (finalConfirm !== "DELETE") {
      setMessage("Account deletion cancelled");
      setMessageType("error");
      return;
    }
    setLoading(true);
    try {
      await api.delete("/api/user/me");
      setMessage("Account deleted successfully. Redirecting...");
      setMessageType("success");
      router.push("/auth/signup");
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      const errorMessage =
        err.response?.data?.message || "Error deleting account";
      setMessage(errorMessage);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="w-full bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          {content === "Profile Details" && <User className="w-5 h-5" />}
          {content === "Security Settings" && <Lock className="w-5 h-5" />}
          {content}
        </h2>

        {/* Message Display */}
        {message && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg text-sm mb-6 ${
              messageType === "success"
                ? "bg-green-900/30 border border-green-700/30 text-green-300"
                : "bg-red-900/30 border border-red-700/30 text-red-300"
            }`}
          >
            {messageType === "success" ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{message}</span>
          </div>
        )}

        {/* Profile Details */}
        {content === "Profile Details" && (
          <div className="space-y-8">
            {/* Update Username */}
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">
                Update Username
              </h3>
              <form onSubmit={handleUpdateUsername} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Username <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Enter new username"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                >
                  Update Username
                </button>
              </form>
            </div>
            {/* Update Profile */}
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">
                Update Profile
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                {/* Profile Picture with overlay icon */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {profilePicture?.trim() ? (
                      <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border border-gray-700 object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}

                    {/* Add icon */}
                    <label
                      htmlFor="profile-upload"
                      className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full cursor-pointer hover:bg-gray-700 transition"
                    >
                      <Camera className="w-5 h-5 text-white" />
                    </label>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                >
                  {loading ? "Uploading..." : "Update Profile"}
                </button>
              </form>
            </div>
            );
          </div>
        )}

        {/* Security Settings */}
        {content === "Security Settings" && (
          <div className="space-y-8">
            {!hasPassword ? (
              <div className="bg-gray-800/50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-white mb-4">
                  Set Password
                </h3>
                <form onSubmit={handleSetPassword} className="space-y-4">
                  {/* New Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      New Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Confirm Password <span className="text-red-400">*</span>
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                      placeholder="Confirm password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white"
                  >
                    Set Password
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-gray-800/50 p-6 rounded-lg">
                {/* Change Password */}
                <h3 className="text-lg font-medium text-white mb-4">
                  Change Password
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Current Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full pl-10 pr-10 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter current password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      New Password <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-10 pr-10 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Enter new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Confirm New Password{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-10 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            )}

            {/* Delete Account */}
            <div className="bg-red-900/20 border border-red-700/30 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-red-300 mb-4">
                Danger Zone
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                {loading ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        )}

        {/* General Settings - Placeholder */}
        {content === "General Settings" && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Coming Soon</div>
            <p className="text-gray-500">
              General settings will be available in a future update.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
