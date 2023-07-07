'use client';
import { Profile } from '@/components/shared/profile/profile';
import { useScreen } from '@/hooks/useScreen';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const route = useRouter();
  const isMobile = useScreen('(max-width:767px)');

  if (!isMobile) {
    return route.push('/');
  }

  return (
    <section className='h-full p-5'>
      <Profile mobileDevice={true} />
    </section>
  );
}
