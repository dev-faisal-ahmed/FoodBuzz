import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export function useGetFood(foodId) {
  const [loading, setLoading] = useState(true);
  const url = `api/get-food/${foodId}`;
  const { data, refetch } = useQuery([`food-info-${foodId}`], () =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        return res;
      })
  );
  return { foodInfo: data?.data || {}, refetch, loading };
}
