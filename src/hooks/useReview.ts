import { Review } from '@/app/api/review/[testId]/route';
import useSWR, { preload } from 'swr';

export const useReview = (testId?: string) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  preload(`/api/review/${testId}`, fetcher);

  const { data, error, isLoading } = useSWR(`/api/review/${testId}`, fetcher);

  return {
    review: data as Review | undefined,
    error,
    isLoading,
  };
};
