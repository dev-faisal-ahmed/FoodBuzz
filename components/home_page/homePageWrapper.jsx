'use client';
import React from 'react';
import { Hero } from './hero';
import { TrendyFoods } from './trendyFoods';
import { getUserInfoLocal } from '@/helper/localStorage';
import { useClientSide } from '@/hooks/useClientSide';
import { AdminStats } from './adminStats';

export function HomePageWrapper() {
  const isClient = useClientSide();
  if (!isClient) return null;
  const { role } = getUserInfoLocal();
  return (
    <section className='py-5'>
      {role === 'admin' ? (
        <>
          <AdminStats />
        </>
      ) : (
        <>
          <Hero />
          <TrendyFoods />
        </>
      )}
    </section>
  );
}
