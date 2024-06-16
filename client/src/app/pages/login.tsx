import clsx from 'clsx';
import { RiAiGenerate } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import ReCaptcha from '@/components/recaptcha';

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
        <button
          disabled={!submitEnabled}
          type="submit"
          className={clsx('rounded bg-blue-500 p-2 text-white', {
            'cursor-not-allowed bg-gray-300': !submitEnabled,
          })}
        >
          Login
        </button>
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

      <Link to="/register" className="mt-4 text-sm hover:underline">
        Create an account?
      </Link>
    </div>
  );
}

export default LoginPage;
