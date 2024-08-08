import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { api } from '@/lib/api-client';
import { MutationConfig, QueryConfig, queryClient } from '@/lib/react-query';

import { Comment, Discussion } from '@/types/api';

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

// Read 1 discussion
export const getDiscussion = (id: number): Promise<Discussion> => {
  console.log("ID: ", id);
  return api.get(`/api/discussions/${id}`);
};

export const getDiscussionQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['discussion', id],
    queryFn: () => getDiscussion(id),
  });
};

type UseGetDiscussionOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getDiscussionQueryOptions>;
};

export const useGetDiscussion = ({ id, queryConfig }: UseGetDiscussionOptions) => {
  return useQuery({
    ...getDiscussionQueryOptions(id),
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

export const useAddDiscussion = ({
  mutationConfig,
}: UseAddDiscussionOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  const navigate = useNavigate();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getDicussionsQueryOptions().queryKey,
      });

      // validate the discussion not discussions 
      queryClient.invalidateQueries({
        queryKey: ['discussion', ...args],
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
    mutationFn: addDiscussion,
  });
};

// Update discussion
interface UpdateDiscussionParams {
  discussion_title: string;
  discussion_body: string;
  author_id: number;
}

export const updateDiscussion = (discussion: UpdateDiscussionParams) => {
  return api.patch(`/api/discussions/${discussion.author_id}`, discussion);
};

type UseUpdateDiscussionOptions = {
  mutationConfig?: MutationConfig<typeof updateDiscussion>;
};

export const useUpdateDiscussion = ({
  mutationConfig,
}: UseUpdateDiscussionOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  const navigate = useNavigate();

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getDicussionsQueryOptions().queryKey,
      });

      toast.success('Discussion updated sucessfully', {
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
    onError: error => {
      toast.error('Error updating discussion', {
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
    mutationFn: updateDiscussion,
  });
};

// Getting comments from a discussion id 
export const getComments = (id: number): Promise<Comment[]> => {
  return api.get(`/api/comments/${id}`);
};

export const getCommentsQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ['comments', id],
    queryFn: () => getComments(id),
  });
};

type UseGetCommentsOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getCommentsQueryOptions>;
};

export const useGetComments = ({ id, queryConfig }: UseGetCommentsOptions) => {
  return useQuery({
    ...getCommentsQueryOptions(id),
    ...queryConfig,
  });
};

// Add comment to a discussion
interface AddCommentParams {
  comment_body: string;
  author_id: number;
  discussion_id: number;
}

export const addComment = (comment: AddCommentParams) => {
  return api.post('/api/comments/add', comment);
};

type UseAddCommentOptions = {
  mutationConfig?: MutationConfig<typeof addComment>;
};

export const useAddComment = ({
  mutationConfig,
}: UseAddCommentOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // queryClient.invalidateQueries({
      //   queryKey: getCommentsQueryOptions().queryKey,
      // });

      toast.success('Comment added sucessfully', {
        dismissible: true,
        cancel: {
          label: 'Close',
          onClick: () => {},
        },
        duration: 3000,
        position: 'top-right',
      });

      onSuccess?.(...args);
    },
    onError: error => {
      toast.error('Error adding comment', {
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
    mutationFn: addComment,
  });
};

// Delete a comment
export const deleteComment = (id: number) => {
  return api.post(`/api/comments/${id}`);
};

type UseDeleteCommentOptions = {
  mutationConfig?: MutationConfig<typeof deleteComment>;
};

export const useDeleteComment = ({
  mutationConfig,
}: UseDeleteCommentOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // queryClient.invalidateQueries({
      //   queryKey: getCommentsQueryOptions().queryKey,
      // });

      toast.success('Comment deleted sucessfully', {
        dismissible: true,
        cancel: {
          label: 'Close',
          onClick: () => {},
        },
        duration: 3000,
        position: 'top-right',
      });

      onSuccess?.(...args);
    },
    onError: error => {
      toast.error('Error deleting comment', {
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
    mutationFn: deleteComment,
  });
};
