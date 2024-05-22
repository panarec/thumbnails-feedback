import useSWR from 'swr';

export const useLeaderboard = () => {
  const fetcher = (url: string) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.status === 404) {
        throw new Error('Leaderboard not found');
      }
      return res.json();
    });
  };
  const { data, error, isLoading } = useSWR(`/api/leaderboard`, fetcher);

  const newData = data?.map((item: any) => {
    return {
      ...item,
      points: item._count.comments * 3 + item._count.votes,
    };
  });

  if (newData) newData.sort((a: any, b: any) => b.points - a.points);

  return {
    data: newData as any | undefined,
    error,
    isLoading,
  };
};
