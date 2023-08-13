import { foodsCollection, categoriesCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function GET(_, context) {
  try {
    const foodId = context.params.foodId;
    const foodInfo = await foodsCollection.findOne({ foodId });
    if (!foodInfo)
      return NextResponse.json({ okay: false, msg: 'No Food Found!' });
    return NextResponse.json({ okay: true, data: foodInfo });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ okay: false, msg: 'Something went wrong' });
  }
}
