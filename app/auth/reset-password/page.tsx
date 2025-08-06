import { Suspense } from 'react';
import ResetPasswordForm from '@/components/auth/resetpassword';
import MainLoader from '@/components/shared/main-loader';

export default function Page() {
  return (
    <Suspense fallback={<MainLoader/>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
