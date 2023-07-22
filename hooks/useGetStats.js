import { useQuery } from '@tanstack/react-query';

export function useGetStats() {
  const url = `api/get-stats`;
  const { data, refetch } = useQuery(['admin-stat'], () =>
    fetch(url).then((res) => res.json())
  );
  return { stat: data?.data || {}, refetch };
}
