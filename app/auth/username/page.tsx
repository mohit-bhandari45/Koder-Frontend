"use client";

import api, { ADD_USERNAME_ENDPOINT } from "@/lib/api";
import MainLoader from "@/components/shared/main-loader";
import { useMainLoader } from "@/context/MainLoaderContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UsernameSelection = () => {
  const [username, setUsername] = useState("");
  const [submitted] = useState(false);
  const router = useRouter();
  const { mainLoading, setMainLoading } = useMainLoader();
  const [submitLoading, setSubmitLoading] = useState(false);
  const { user, loading, error } = useUser();

  useEffect(() => {
    setMainLoading(true);
    if (!loading && user && user.username) {
      router.replace(`/u/${user.username}`);
    }
    if (!loading && error) {
      setMainLoading(false);
    }
  }, [error, loading, router, setMainLoading, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const res = await api.post(ADD_USERNAME_ENDPOINT, { username });
      if (res.status === 200) {
        router.replace(`/u/${res.data.data.username}`);
        setMainLoading(true);
      }
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      {loading || mainLoading ? (
        <MainLoader
          text={loading ? "Fetching details..." : "Navigating to profile..."}
        />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-black mb-4">
            Choose a Username
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="p-3 rounded bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-black border border-gray-300"
              required
            />
            <button
              type="submit"
              className="bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded transition-colors flex items-center justify-center gap-2"
              disabled={submitLoading}
            >
              {submitLoading && (
                <span className="w-5 h-5 border-2 border-white border-t-black rounded-full animate-spin mr-2"></span>
              )}
              {submitLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
          {submitted && (
            <p className="mt-4 text-black">
              Username submitted:{" "}
              <span className="font-semibold">{username}</span>
            </p>
          )}
        </div>
      )}
    </main>
  );
};

export default UsernameSelection;
