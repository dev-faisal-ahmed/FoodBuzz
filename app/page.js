import { Hero } from '@/components/home_page/hero';
import { TrendyFoods } from '@/components/home_page/trendyFoods';

export default function HomePage() {
  return (
    <section className='py-5'>
      <Hero />
      <TrendyFoods />
    </section>
  );
}
