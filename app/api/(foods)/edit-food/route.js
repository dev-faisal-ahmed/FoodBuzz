import { foodsCollection, categoriesCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const foodInfo = await request.json();
    const { foodId, foodName, price, imageUrl } = foodInfo;
    console.log(foodInfo);

    const updateInfo = await foodsCollection.updateOne(
      { foodId },
      { $set: { foodName, price, imageUrl } },
      { upsert: true }
    );
    if (!updateInfo.acknowledged) {
      return NextResponse.json({ okay: false, msg: 'Could not update food' });
    }

    return NextResponse.json({ okay: true, msg: 'Food Updated' });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ okay: false, msg: 'Something went wrong' });
  }
}
