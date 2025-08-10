"use client";

import Navbar from "@/components/user-profile/navbar";
import LeftSidebar from "@/components/user-profile/leftsidebar";
import MainContent from "@/components/user-profile/maincontent";
import { useState } from "react";
import api, { GET_OWN_PROFILE_ENDPOINT } from "@/lib/api";
import { AxiosError } from "axios";
import api2, { GET_LANGUAGE_STATS, GET_PROGRESS_SUMMARY, GET_RECENT_SUBMISSIONS, GET_SKILL_STATS } from "@/lib/dashboardAPI";
import User from "@/types/userTypes";

type DashboardState = {
  progress: any;
  languages: any;
  skills: any;
  submissions: any;
};

export default function UserProfilePage() {


  const [dashboard, setDashboard] = useState<DashboardState | null>(null);

  const [user,setUser] = useState<User | null>(null);

  const getUserDetails=async()=>{
    try{
      const res=await api.get(GET_OWN_PROFILE_ENDPOINT);
      setUser(res.data.data);
    }catch(error:unknown){
        const err = error as AxiosError<{ message: string }>;
        const message =  err?.response?.data?.message || "Something went wrong. Please try again.";
    }
  } 

  const getDashboardDetails=async()=>{
    try{
        const [progressRes,languageRes,skillRes,submissionRes]=await Promise.all([
          api2.get(GET_PROGRESS_SUMMARY),
          api2.get(GET_LANGUAGE_STATS),
          api2.get(GET_SKILL_STATS),
          api2.get(GET_RECENT_SUBMISSIONS)
        ]);
         setDashboard({
          progress: progressRes.data.data,
          languages: languageRes.data.data,
          skills: skillRes.data.data,
          submissions: submissionRes.data.data
        });
    }catch(error: unknown){
      const err=error as AxiosError<{message:string}>;
      const message=err?.response?.data?.message || "something went wrong.Please try again";
    }
  }



  return (
    <div className="min-h-screen bg-black scrollbar-track">
      <Navbar user={user} />
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <LeftSidebar user={user} dashboard={dashboard} />
          <MainContent user={user} dashboard={dashboard} />
        </div>
      </div>
    </div>
  );
}