import { useEffect, useState } from 'react';

import { useLogin } from '@/hooks/auth';

const useLoginForm = () => {
  const loginMutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState('');

  const emailRegex =
    /^[a-zA-Z\d._%+-]+(?:[a-zA-Z\d._%+-]*[a-zA-Z\d])?@[a-zA-Z\d-]+(\.[a-zA-Z\d-]+)*\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{12,64}$/;

  const validateForm = () => {
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email address');
      return false;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 12 to 64 characters long'
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (validateForm()) {
      loginMutation.mutate({ email, password, recaptchaToken });
    }
  };

  useEffect(() => {
    setSubmitEnabled(recaptchaToken.length > 0);
  }, [recaptchaToken]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    handleSubmit,
    submitEnabled,
    setRecaptchaToken,
  };
};

export default useLoginForm;
