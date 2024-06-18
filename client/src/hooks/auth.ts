import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { api } from '@/lib/api-client';
import { MutationConfig, QueryConfig, queryClient } from '@/lib/react-query';

/**
 * Login
 */

interface LoginResponse {
  message: string;
  status: number;
  statusText: string;
}

interface LoginParams {
  email: string;
  password: string;
  recaptchaToken: string;
}

export const login = ({
  email,
  password,
  recaptchaToken,
}: LoginParams): Promise<LoginResponse> => {
  return api.post('/api/auth/login', {
    email,
    password,
    recaptchaToken,
  });
};

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = ({ mutationConfig }: UseLoginOptions = {}) => {
  // const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: checkAuthQueryOptions().queryKey,
      });
      navigate(`${redirectTo ? `${redirectTo}` : '/'}`, {
        replace: true,
      });

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: login,
  });
};

/**
 * Register
 */

interface RegisterResponse {
  message: string;
  status: number;
  statusText: string;
}

export const register = (formData: FormData): Promise<RegisterResponse> => {
  return api.post('/api/auth/register', formData);
};

type UseRegisterOptions = {
  mutationConfig?: MutationConfig<typeof register>;
};

export const useRegister = ({ mutationConfig }: UseRegisterOptions = {}) => {
  // const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  const navigate = useNavigate();

  return useMutation({
    onSuccess: (...args) => {
      // queryClient.invalidateQueries({
      //   queryKey: checkAuthQueryOptions().queryKey,
      // });
      navigate('/');

      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: register,
  });
};

/**
 * checkAuth
 */

interface AuthResponse {
  authorized: boolean;
  isAdmin: boolean;
}

export const checkAuth = (): Promise<AuthResponse> => {
  return api.post('/api/auth/checkAuth');
};

export const checkAuthQueryOptions = () => {
  return queryOptions({
    queryKey: ['auth'],
    queryFn: checkAuth,
  });
};

type UseCheckAuthOptions = {
  queryConfig?: QueryConfig<typeof checkAuthQueryOptions>;
};

export const useCheckAuth = ({ queryConfig }: UseCheckAuthOptions = {}) => {
  return useQuery({
    ...checkAuthQueryOptions(),
    ...queryConfig,
  });
};
