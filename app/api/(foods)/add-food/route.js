import { foodsCollection, categoriesCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const foodData = await request.json();
    const { category } = foodData;

    // checking if category already exist or not
    const categoryDb = await categoriesCollection.findOne({ category });
    if (!categoryDb) await categoriesCollection.insertOne({ category });

    const insertResponse = await foodsCollection.insertOne(foodData);
    if (!insertResponse.acknowledged)
      return NextResponse.json({ okay: false, msg: 'Could not add food' });

    return NextResponse.json({ okay: true, msg: 'Food added' });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ okay: false, msg: 'Something went wrong' });
  }
}
