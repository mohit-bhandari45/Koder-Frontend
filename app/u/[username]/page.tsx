"use client";

import Navbar from "@/components/user-profile/navbar";
import LeftSidebar from "@/components/user-profile/leftsidebar";
import MainContent from "@/components/user-profile/maincontent";
import { useEffect, useState } from "react";
import api, { GET_OWN_PROFILE_ENDPOINT } from "@/lib/api.lib";
import { AxiosError } from "axios";
import api2, {
  GET_LANGUAGE_STATS,
  GET_PROGRESS_SUMMARY,
  GET_RECENT_SUBMISSIONS,
  GET_SKILL_STATS,
} from "@/lib/api.lib";
import User from "@/types/user.types";
import MainLoader from "@/components/shared/main-loader";
import DashboardState from "@/types/dashboard.types";
import { useRouter,useParams } from "next/navigation";

export default function UserProfilePage() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [dashboard, setDashboard] = useState<DashboardState | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const router=useRouter();
  const params=useParams();

  useEffect(()=>{
    if(user?.username && params.username !== user.username){
      router.replace(`/u/${user.username}`);
    }
  },[user?.username,params.username])

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
    fetchUser();
    fetchDashboardDetails();
  }, []);

  return (
    <div className="min-h-screen bg-black scrollbar-track">
      {!loading && !error ? (
        <>{ user && dashboard && (
        <>
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
