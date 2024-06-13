import { CameraIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarImage } from '@/components/ui/avatar';

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // File
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Name regex pattern
  const nameRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;

  const emailRegex =
    /^[a-zA-Z\d._%+-]+(?:[a-zA-Z\d._%+-]*[a-zA-Z\d])?@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{12,64}$/;

  const phoneNumberRegexConvert1 = /^\+6309\d{9}$/;
  const phoneNumberRegexConvert2 = /^\+639\d{9}$/;
  const phoneNumberRegexConvert3 = /^9\d{9}$/;

  const phoneRegex = /^09\d{9}$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if theres an image
    if (!fileInputRef.current?.files?.length) {
      alert('Please upload an image');
      return;
    }

    // Validate first name
    if (!nameRegex.test(firstName)) {
      alert('Invalid first name');
      return;
    }

    // Validate last name
    if (!nameRegex.test(lastName)) {
      alert('Invalid last name');
      return;
    }

    let convertPhone = phone;

    if (phoneNumberRegexConvert1.test(phone)) {
      // Convert +6309123456789 to 09123456789
      convertPhone = phone.replace(/^\+6309/, '09');
    } else if (phoneNumberRegexConvert2.test(phone)) {
      // Convert +639123456789 to 09123456789
      convertPhone = phone.replace(/^\+63/, '0');
    } else if (phoneNumberRegexConvert3.test(phone)) {
      // Convert 9123456789 to 09123456789
      convertPhone = '0' + phone;
    }

    // Validate phone number
    if (!phoneRegex.test(convertPhone)) {
      alert('Invalid phone number');
      return;
    }

    // Validate email
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      alert(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 12 to 64 characters long'
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone', convertPhone);
      if (fileInputRef.current?.files) {
        formData.append('photo_url', fileInputRef.current.files[0]);
      }

      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (response.status == 201) {
        navigate('/');
      } else if (response.status === 400) {
        const data = await response.json();
        console.error('Error: ', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validImageTypes.includes(file.type)) {
        alert(
          'Invalid file type. The image should be a jpeg, png, or webp file.'
        );
        return;
      }
      if (file.size > 5000000) {
        // 5MB
        alert('Invalid file size. The image should be less than 5MB.');
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <form className="flex w-full flex-col space-y-4" onSubmit={handleSubmit}>
      <UploadAvatar
        handleFileSelect={handleFileSelect}
        fileInputRef={fileInputRef}
        previewUrl={previewUrl}
      />

      <input
        type="text"
        placeholder="First Name"
        className="rounded border border-gray-200 p-2"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        name="firstName"
      />
      <input
        type="text"
        placeholder="Last Name"
        className="rounded border border-gray-200 p-2"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        name="lastName"
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="rounded border border-gray-200 p-2"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        name="phone"
      />
      <input
        type="email"
        placeholder="Email"
        className="rounded border border-gray-200 p-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
        name="email"
      />
      <input
        type="password"
        placeholder="Password"
        className="rounded border border-gray-200 p-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
        name="password"
      />
      <div className="text-xs text-muted-foreground">
        Phone number should be in the Philippine format, starting with +63 or
        09, followed by the 9-digit number.
      </div>
      <div className="text-xs text-muted-foreground">
        Passwords should be at least 16 characters, 1 uppercase, 1 lowercase, 1
        number, 1 special
      </div>
      <button
        type="submit"
        className="rounded bg-orange-400 p-2 text-white hover:bg-orange-500"
      >
        Register
      </button>
    </form>
  );
};

const UploadAvatar = ({
  handleFileSelect,
  fileInputRef,
  previewUrl,
}: {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  previewUrl: string | null;
}) => {
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
    <div className="flex grow flex-row">
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
      </div>
    </div>
  );
}

export default RegisterPage;
