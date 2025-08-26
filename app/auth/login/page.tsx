"use client";

import LoginComponent from "@/components/auth/login";
import MainLoader from "@/components/shared/main-loader";
import { Suspense } from "react";

export default function LoginPage() {

  return (
    <Suspense fallback={<MainLoader />}>
      <LoginComponent />
    </Suspense>
  )
}
