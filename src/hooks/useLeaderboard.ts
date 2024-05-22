import useSWR from 'swr';

export const useLeaderboard = () => {
  const fetcher = (url: string) => {
    console.log('fetching');
    return fetch(url).then((res) => {
      if (res.status === 404) {
        throw new Error('Leaderboard not found');
      }
      return res.json();
    });
  };
  const { data, error, isLoading } = useSWR(`/api/leaderboard`, fetcher);

  return {
    data: data as any | undefined,
    error,
    isLoading,
  };
};
