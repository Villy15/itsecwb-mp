import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { MutationConfig, queryClient, QueryConfig } from '@/lib/react-query';

import { Discussion, Comment } from '@/types/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

/**
 * Get api data
 */
export const getDicussions = (): Promise<Discussion[]> => {
  return api.get('/api/discussions');
};

export const getDicussionsQueryOptions = () => {
  return queryOptions({
    queryKey: ['discussions'],
    queryFn: () => getDicussions(),
  });
};

type UseGetDiscussionsOptions = {
  queryConfig?: QueryConfig<typeof getDicussionsQueryOptions>;
};

export const useGetDiscussions = ({
  queryConfig,
}: UseGetDiscussionsOptions = {}) => {
  return useQuery({
    ...getDicussionsQueryOptions(),
    ...queryConfig,
  });
};

// Adding a disc
interface AddDiscussionParams {
  discussion_title: string;
  discussion_body: string;
  author_id: number;
}

export const addDiscussion = (discussion: AddDiscussionParams) => {
  return api.post('/api/discussions/add', discussion);
};

type UseAddDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof addDiscussion>;
};

export const useAddDiscussion = ({mutationConfig} : UseAddDiscussionOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  const navigate = useNavigate();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getDicussionsQueryOptions().queryKey,
      });

      toast.success('Discussion added sucessfully', {
        dismissible: true,
        cancel: {
          label: 'Close',
          onClick: () => {},
        },
        duration: 3000,
        position: 'top-right',
      });
      
      navigate('/discussions');

      onSuccess?.(...args);
    },
    onError: (error) => {
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
    mutationFn:  addDiscussion,
  });
}

// Getting comments
export const getComments = (): Promise<Comment[]> => {
  return api.get('/api/discussions/:id');
};

export const getCommentsQueryOptions = () => {
  return queryOptions({
    queryKey: ['comments'],
    queryFn: () => getComments(),
  });
};

type UseGetCommentsOptions = {
  queryConfig?: QueryConfig<typeof getCommentsQueryOptions>;
};

export const useGetComments = ({
  queryConfig,
}: UseGetCommentsOptions = {}) => {
  return useQuery({
    ...getCommentsQueryOptions(),
    ...queryConfig,
  });
};
