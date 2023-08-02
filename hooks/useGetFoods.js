import { useQuery } from '@tanstack/react-query';

export function useGetFoods() {
  const url = `api/get-foods`;
  const { data, refetch } = useQuery(['all-foods'], () =>
    fetch(url).then((res) => res.json())
  );
  return { foodsData: data?.data || {}, foodRefetch: refetch };
}
