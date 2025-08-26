"use client";

import MainLoader from "@/components/shared/main-loader";
import LeftSidebar from "@/components/user-profile/leftsidebar";
import MainContent from "@/components/user-profile/maincontent";
import Navbar from "@/components/user-profile/navbar";
import { useMainLoader } from "@/context/MainLoaderContext";
import { useUser } from "@/context/UserContext";
import dashboardAPI, {
  GET_LANGUAGE_STATS,
  GET_PROGRESS_SUMMARY,
  GET_RECENT_SUBMISSIONS,
  GET_SKILL_STATS,
} from "@/lib/dashboardApi.lib";
import DashboardState from "@/types/dashboard.types";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const {user} = useUser();
  const { mainLoading, setMainLoading } = useMainLoader();

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    setMainLoading(true);
  }, []);

  useEffect(() => {
    if (user?.username && params.username !== user.username) {
      router.replace(`/u/${user.username}`);
    }
  }, [user?.username, params.username, router]);

  const fetchDashboardDetails = async () => {
    try {
      const [progressRes, languageRes, skillRes, submissionRes] =
        await Promise.all([
          dashboardAPI.get(GET_PROGRESS_SUMMARY),
          dashboardAPI.get(GET_LANGUAGE_STATS),
          dashboardAPI.get(GET_SKILL_STATS),
          dashboardAPI.get(GET_RECENT_SUBMISSIONS),
        ]);
      setDashboard({
        progress: progressRes.data.data,
        languages: languageRes.data.data.languages,
        skills: skillRes.data.data,
        submissions: submissionRes.data.data,
      });
      setError(null);
    } catch (error: unknown) {
      setDashboard(null);
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardDetails();
  }, []);

  if (mainLoading || loading) {
    return <MainLoader text="Wait a min...." />;
  }

  return (
    <div className="min-h-screen bg-gray-950 scrollbar-track">
      {!loading && !error ? (
        <>
          {user && dashboard && (
            <>
              <Navbar />
              <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                  <LeftSidebar user={user} dashboard={dashboard} />
                  <MainContent dashboard={dashboard} />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <MainLoader text="Fetching details..." />
      )}
    </div>
  );
}
