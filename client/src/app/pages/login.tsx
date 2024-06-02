import { useState } from 'react';
import { RiAiGenerate } from 'react-icons/ri';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
      } else {
        console.error('Failed to login:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <form className="flex w-full flex-col space-y-4" onSubmit={handleSubmit}>
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
        type="submit"
        className="rounded bg-orange-400 p-2 text-white hover:bg-orange-500"
      >
        Login
      </button>
    </form>
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
      <div className="flex w-full max-w-sm items-center justify-center">
        <LoginForm />
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
        <a href={'/privacy-policy'} className="underline hover:cursor-pointer">
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
