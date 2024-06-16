import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

/**
 * Get api data
 */
export const getApi = (): Promise<{ message: string }> => {
  return api.get('/api/');
};

export const getApiQueryOptions = () => {
  return queryOptions({
    queryKey: ['api'],
    queryFn: () => getApi(),
  });
};

type UseGetApiOptions = {
  queryConfig?: QueryConfig<typeof getApiQueryOptions>;
};

export const useGetApi = ({ queryConfig }: UseGetApiOptions = {}) => {
  return useQuery({
    ...getApiQueryOptions(),
    ...queryConfig,
  });
};
