import useSWR from 'swr';

export const useUnsubscribe = ({ user }: { user: string | null }) => {
  const fetcher = (url: string) => fetch(url, { method: 'POST' }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/user/unsubscribe?user=${user}`, fetcher);

  return {
    data: data as any,
    error,
    isLoading,
  };
};
