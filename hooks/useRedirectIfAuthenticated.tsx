"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import MainLoader from "@/components/shared/main-loader";

export function useRedirectIfAuthenticated(redirectTo: string = "/username") {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const path =
        redirectTo.includes(":username") && user.username
          ? redirectTo.replace(":username", user.username)
          : redirectTo;
      router.replace(path);
    }
  }, [user, loading, router, redirectTo]);

  if (loading || user) {
    // Render loader directly if used at the top of a page component
    return <MainLoader text="Wait A Min...." />;
  }
  return null;
}
