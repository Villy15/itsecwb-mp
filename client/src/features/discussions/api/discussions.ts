import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

import { Discussion } from '@/types/api';

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
