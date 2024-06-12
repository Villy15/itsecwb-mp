import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { RiAiGenerate } from 'react-icons/ri';

import ReCaptcha from '@/components/recaptcha';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [submitEnabled, setSubmitEnabled] = useState(false);

  /**
   * Email validation regex
   * Assumption: The email format would use **prefix@domain**.
   * - The **prefix** may only contain alphanumeric and special characters (underscores, periods, and dashes only)
   *  where the special characters must be followed by one or more letter or numbers
   *
   * - The **domain** may only contain alphanumeric and hyphens where the hyphens must be followed
   *  by one or more letter or numbers
   *
   * Example:
   * - Valid:
   *   - abc-d@mail.com
   * - Invalid:
   *   - abc-@mail.c
   */
  const emailRegex =
    /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  /**
   * Password validation regex
   * - At least one uppercase letter
   * - At least one lowercase letter
   * - At least one number
   * - At least one special character
   * - Minimum length of 12 characters
   * - Maximum length of 64 character
   *
   * Example:
   * - Valid:
   *   - @n1M0La5A!I3
   * - Invalid:
   *   - DLSU1234!
   */
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,64}$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email address');
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 12 to 64 characters long'
      );
      return;
    }

    // Reset email error
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, recaptchaToken }),
      });

      if (response.status === 429) {
        console.error('Too many requests:', response.statusText);
        alert('Too many requests. Please try again later.');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        alert('Login successful');
      } else {
        console.error('Failed to login:', response.statusText);
        alert('Failed to login');
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleToken = (token: string) => {
    setRecaptchaToken(token);
  };

  useEffect(() => {
    if (recaptchaToken.length > 0) {
      setSubmitEnabled(true);
    }
  }, [recaptchaToken]);

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
        callback={handleToken}
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

      <a href="/register" className="mt-4 text-sm hover:underline">
        Create an account?
      </a>
    </div>
  );
}

export default LoginPage;
