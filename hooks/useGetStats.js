import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function useGetStats() {
  const [loading, setLoading] = useState(true);
  const url = `api/get-stats`;
  const { data, refetch } = useQuery(['admin-stat'], () =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        return res;
      })
  );
  return { stat: data?.data || {}, refetch, loading };
}
