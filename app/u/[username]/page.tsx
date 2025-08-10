"use client";

import Navbar from "@/components/user-profile/navbar";
import LeftSidebar from "@/components/user-profile/leftsidebar";
import MainContent from "@/components/user-profile/maincontent";
import { useEffect, useState } from "react";
import api, { GET_OWN_PROFILE_ENDPOINT } from "@/lib/api";
import { AxiosError } from "axios";
import api2, {
  GET_LANGUAGE_STATS,
  GET_PROGRESS_SUMMARY,
  GET_RECENT_SUBMISSIONS,
  GET_SKILL_STATS,
} from "@/lib/dashboardAPI";
import User from "@/types/userTypes";
import { useMainLoader } from "@/context/MainLoaderContext";
import MainLoader from "@/components/shared/main-loader";

type DashboardState = {
  progress: any;
  languages: any;
  skills: any;
  submissions: any;
};

export default function UserProfilePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const { mainLoading, setMainLoading } = useMainLoader();
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await api.get(GET_OWN_PROFILE_ENDPOINT);
      setUser(res.data.data);
      setError(null);
    } catch (error: unknown) {
      setUser(null);
      setError(error as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardDetails = async () => {
    setLoading(true);
    try {
      const [progressRes, languageRes, skillRes, submissionRes] =
        await Promise.all([
          api2.get(GET_PROGRESS_SUMMARY),
          api2.get(GET_LANGUAGE_STATS),
          api2.get(GET_SKILL_STATS),
          api2.get(GET_RECENT_SUBMISSIONS),
        ]);
      setDashboard({
        progress: progressRes.data.data,
        languages: languageRes.data.data,
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
    fetchUser();
    fetchDashboardDetails();
  }, []);

  return (
    <div className="min-h-screen bg-black scrollbar-track">
      {!loading && !error ? (
        <>{ user && dashboard && (<>
          <Navbar user={user} />
          <div className="max-w-7xl mx-auto py-8 px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <LeftSidebar user={user} dashboard={dashboard} />
              <MainContent dashboard={dashboard} />
            </div>
          </div>
        </>)}
        </>
      ): <MainLoader/>}
    </div>
  );
}
