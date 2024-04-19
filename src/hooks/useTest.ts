import { TestWithCommentsAndVotes } from '@/app/api/test/[testId]/route';
import useSWR from 'swr';

export const useTestDetail = (testId?: string) => {
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (res.status === 404) {
        throw new Error('Test not found');
      }
      return res.json();
    });
  const { data, error, isLoading } = useSWR(`/api/test/${testId}`, fetcher);


  return {
    test: data as TestWithCommentsAndVotes | undefined,
    error,
    isLoading,
  };
};
