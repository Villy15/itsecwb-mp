import { Link, useSearchParams } from 'react-router-dom';

import RegisterForm from '@/features/auth/register/register-form';

function RegisterPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className="flex grow flex-row">
      <div className="flex grow flex-col items-center justify-center">
        <div className="mb-4 flex flex-col items-center justify-center">
          <div className="mb-4 text-2xl font-bold">Create Your Account</div>
        </div>
        <div className="flex w-full max-w-sm items-center justify-center">
          <RegisterForm />
        </div>
        <Link
          to={`/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
          className="mt-4 text-sm hover:underline"
        >
          Go back to Login
        </Link>
      </div>
    </div>
  );
}

export default RegisterPage;
