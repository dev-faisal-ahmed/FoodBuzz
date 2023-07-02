import { Foods } from '@/components/shared/all_foods/foods';

export default function FoodPage() {
  return (
    <section>
      <h1 className='my-5 text-2xl font-semibold'>All Foods</h1>
      <Foods />
    </section>
  );
}
