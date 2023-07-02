import { Hero } from '@/components/home_page/hero';
import { Foods } from '@/components/shared/all_foods/foods';

export default function Home() {
  return (
    <section className='py-5'>
      <Hero />
      <Foods />
    </section>
  );
}
