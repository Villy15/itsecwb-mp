import clsx from 'clsx';
import { RiAiGenerate } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';

import ReCaptcha from '@/components/recaptcha';
import { Button } from '@/components/ui/button';

import useLoginForm from '@/hooks/forms/use-login-form';

const LoginForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    handleSubmit,
    submitEnabled,
    setRecaptchaToken,
    loginMutation,
  } = useLoginForm();

  return (
    <>
      <form
        className="mb-4 flex w-full flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="rounded border border-gray-200 p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email" // Add name attribute for FormData
        />
        <input
          type="password"
          placeholder="Password"
          className="rounded border border-gray-200 p-2"
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password" // Add name attribute for FormData
        />
        <Button
          type="submit"
          disabled={!submitEnabled}
          className={clsx(
            'inline-flex rounded bg-orange-400 p-2 text-white hover:bg-orange-500',
            {
              'cursor-not-allowed bg-gray-300': !submitEnabled,
            }
          )}
          isLoading={loginMutation.isPending}
        >
          Log in
        </Button>

        {errorMessage && (
          <p className="text-center text-red-500">{errorMessage}</p>
        )}
      </form>
      <ReCaptcha
        siteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY_V2}
        callback={setRecaptchaToken}
      />
    </>
  );
};

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
