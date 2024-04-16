import useSWR from 'swr';

export const useActivate = ({ token }: {token: string | null}) => {
  const fetcher = (url: string) => fetch(url, { method: 'POST' }).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/user/activate?token=${token}`, fetcher);

  return {
    data: data as any,
    error,
    isLoading,
  };
};
