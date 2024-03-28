import useSWR from 'swr';

export const useTestDetail = (testId: string) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/test/${testId}`, fetcher);

  return {
    test: 
    error,
    isLoading,
  };
};
