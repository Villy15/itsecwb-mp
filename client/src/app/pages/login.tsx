import { RiAiGenerate } from 'react-icons/ri';

function LoginPage() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="mb-4 flex flex-col items-center justify-center">
        <RiAiGenerate className="mb-4 h-10 w-10 text-orange-400" />
        <div className="mb-4 font-bold">
          Log into Inventory Management Software
        </div>
      </div>
      <div className="flex w-full max-w-sm items-center justify-center">
        {/* <LoginForm /> */}
      </div>

      <a href="/forgot-password" className="mt-4 text-sm hover:underline">
        Forgot your password?
      </a>
      <div className="mt-8 max-w-sm text-xs font-light">
        Secure Login with reCAPTCHA subject to Google
      </div>
      <div className="text-xs font-light">
        <a
          href={'/terms-of-service'}
          className="underline hover:cursor-pointer"
        >
          Terms
        </a>{' '}
        &{' '}
        <a href={'/prviacy-policy'} className="underline hover:cursor-pointer">
          Privacy
        </a>
        .
      </div>
      <a href="/register" className="mt-8 text-sm hover:underline">
        Create an account?
      </a>
    </div>
  );
}

export default LoginPage;
