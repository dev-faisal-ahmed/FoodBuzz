import { useQuery } from '@tanstack/react-query';

export function useGetUser(email) {
  const { data, refetch, isLoading } = useQuery([`userInfo-${email}`], () =>
    fetch(`/api/user-info/${email}`).then((res) => res.json())
  );

  return { userInfo: data?.data, refetch, isLoading };
}
