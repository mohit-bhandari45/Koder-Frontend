"use client";

import VerifyEmailForm from "@/components/auth/verifyemailform";
import { Suspense } from "react";
import MainLoader from "@/components/shared/main-loader";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<MainLoader/>}>
      <VerifyEmailForm />
    </Suspense>
  )

}
