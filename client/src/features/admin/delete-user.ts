import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '@/lib/api-client';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { getUsersQueryOptions } from './get-users';

/**
 * Delete User
 */

interface DeleteUserResponse {
  message: string;
}

interface DeleteUserParams {
  id: string;
}

export const deleteUser = ({
  id,
}: DeleteUserParams): Promise<DeleteUserResponse> => {
  return api.delete(`/api/users/${id}`);
};

type UseDeleteUserOptions = {
  mutationConfig?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({
  mutationConfig,
}: UseDeleteUserOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });

      const message = data.message || 'User deleted';

      toast.success(message, {
        dismissible: true,
        cancel: {
          label: 'Close',
          onClick: () => {},
        },
        duration: 1000,
        position: 'top-right',
      });

      onSuccess?.(data, ...args);
    },
    onError: error => {
      toast.error('Error deleting user', {
        dismissible: true,
        cancel: {
          label: 'Close',
          onClick: () => {},
        },
        duration: 3000,
        description: error.message,
        position: 'top-right',
      });
    },
    ...restConfig,
    mutationFn: deleteUser,
  });
};
