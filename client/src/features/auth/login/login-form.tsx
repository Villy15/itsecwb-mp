import clsx from 'clsx';

import ReCaptcha from '@/components/recaptcha';
import { Button } from '@/components/ui/button';

import useLoginForm from '@/features/auth/login/use-login-form';

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

export default LoginForm;
