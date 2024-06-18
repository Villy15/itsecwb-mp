import { RiAiGenerate } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';

import LoginForm from '@/features/auth/login/login-form';

function LoginPage() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="mb-4 flex flex-col items-center justify-center">
        <RiAiGenerate className="mb-4 h-10 w-10 text-orange-400" />
        <div className="mb-4 font-bold">
          Log into Inventory Management Software
        </div>
      </div>
      <div className="mb-4 flex w-full max-w-sm flex-col items-center justify-center">
        <LoginForm />
      </div>

      <Link
        to={`/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}
        className="mt-4 text-sm hover:underline"
      >
        Register
      </Link>
    </div>
  );
}

export default LoginPage;
