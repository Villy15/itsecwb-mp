import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

import { User } from '@/types/api';

/**
 * Get users
 */
export const getUsers = (): Promise<User[]> => {
  return api.get('/api/users');
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};

type UseGetUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useGetUsers = ({ queryConfig }: UseGetUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  });
};
