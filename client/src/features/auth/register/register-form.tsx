import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { CameraIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import useRegisterForm from '@/features/auth/register/use-register-form';

const RegisterForm = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    fileInputRef,
    handleFileSelect,
    previewUrl,
    registerMutation,
  } = useRegisterForm();

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
      <Button
        type="submit"
        className={
          'inline-flex rounded bg-orange-400 p-2 text-white hover:bg-orange-500'
        }
        isLoading={registerMutation.isPending}
      >
        Register
      </Button>
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

export default RegisterForm;
