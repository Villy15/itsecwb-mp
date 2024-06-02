import { CameraIcon } from 'lucide-react';
import { useRef, useState } from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
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
      <UploadAvatar />

      <input
        type="text"
        placeholder="First Name"
        className="rounded border border-gray-200 p-2"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        name="firstName" // Add name attribute for FormData
      />
      <input
        type="text"
        placeholder="Last Name"
        className="rounded border border-gray-200 p-2"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        name="lastName" // Add name attribute for FormData
      />
      <input
        type="text"
        placeholder="Phone"
        className="rounded border border-gray-200 p-2"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        name="phone" // Add name attribute for FormData
      />
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

const UploadAvatar = () => {
  // Add this to your component
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-dashed border-gray-300 p-4 hover:cursor-pointer"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        {previewUrl ? (
          <Avatar className="h-48 w-48">
            <AvatarImage src={previewUrl} alt="uploaded-image" />
          </Avatar>
        ) : (
          <CameraIcon className="h-6 w-6 text-gray-300" />
        )}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
      </div>
      <div className="mt-4 text-sm text-muted-foreground">Add photo</div>
      <div className="mb-4 text-xs text-muted-foreground">
        Max file size 5MB
      </div>
    </div>
  );
};

function RegisterPage() {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="mb-4 flex flex-col items-center justify-center">
        <div className="mb-4 text-2xl font-bold">Create Your Account</div>
      </div>
      <div className="flex w-full max-w-sm items-center justify-center">
        <RegisterForm />
      </div>

      <a href="/login" className="mt-8 text-sm hover:underline">
        Go back to Login
      </a>
      <div className="mt-8 max-w-sm text-center text-xs font-light">
        By creating an account, you agree to our Terms of Service and have read
        and understood the Privacy Policy
      </div>
    </div>
  );
}

export default RegisterPage;
