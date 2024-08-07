import { getDicussionsQueryOptions } from '../api/discussions';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { api } from '@/lib/api-client';
import { MutationConfig, queryClient } from '@/lib/react-query';

/**
 * Delete User
 */

interface DeleteDiscussionResponse {
  message: string;
}

interface DeleteDiscussionParams {
  id: string;
}

export const deleteDiscussion = ({
  id,
}: DeleteDiscussionParams): Promise<DeleteDiscussionResponse> => {
  return api.post(`/api/discussions/${id}`);
};

type UseDeleteDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof deleteDiscussion>;
};

export const useDeleteDiscussion = ({
  mutationConfig,
}: UseDeleteDiscussionOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getDicussionsQueryOptions().queryKey,
      });

      const message = data.message || 'Discussion deleted';

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
      toast.error('Error deleting discussion', {
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
    mutationFn: deleteDiscussion,
  });
};
