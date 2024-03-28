import { Test } from '@prisma/client';
import useSWR from 'swr';

export const useTests = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/test/all', fetcher);

  return {
    tests: data as Test[] | undefined,
    error,
    isLoading,
  };
};
