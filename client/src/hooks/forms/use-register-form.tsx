import { useRef, useState } from 'react';

import { useRegister } from '@/hooks/auth';

const useRegisterForm = () => {
  const registerMutation = useRegister();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nameRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
  const emailRegex =
    /^[a-zA-Z\d._%+-]+(?:[a-zA-Z\d._%+-]*[a-zA-Z\d])?@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{12,64}$/;

  let convertPhone: string;
  const phoneNumberRegexConvert1 = /^\+6309\d{9}$/;
  const phoneNumberRegexConvert2 = /^\+639\d{9}$/;
  const phoneNumberRegexConvert3 = /^9\d{9}$/;
  const phoneRegex = /^09\d{9}$/;

  // File
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateForm = () => {
    if (!nameRegex.test(firstName)) {
      alert('Invalid first name');
      return false;
    }
    if (!nameRegex.test(lastName)) {
      alert('Invalid last name');
      return false;
    }

    convertPhone = phone;

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

    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return false;
    }

    if (!passwordRegex.test(password)) {
      alert(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 12 to 64 characters long'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone', convertPhone);
      if (fileInputRef.current?.files) {
        formData.append('photo_url', fileInputRef.current.files[0]);
      }

      registerMutation.mutate(formData);
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

  return {
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
  };
};

export default useRegisterForm;
