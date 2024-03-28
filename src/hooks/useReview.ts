import { Review } from '@/app/api/review/route';
import useSWR from 'swr';

export const useReview = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/review`, fetcher);

  return {
    review: data as Review | undefined,
    error,
    isLoading,
  };
};
