import { Reviews } from '@/app/api/reviews/route';
import useSWR from 'swr';

export const useReviews = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/reviews`, fetcher);

  return {
    reviewsCount: data as Reviews | undefined,
    error,
    isLoading,
  };
};
