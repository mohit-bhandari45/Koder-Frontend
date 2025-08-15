import { Suspense } from 'react';
import LoginComponent from '@/components/auth/login';
import MainLoader from '@/components/shared/main-loader';

export default function Page() {
  return (
    <Suspense fallback={<MainLoader/>}>
      <LoginComponent />
    </Suspense>
  );
}
