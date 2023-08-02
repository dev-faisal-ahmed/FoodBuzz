import { foodsCollection, categoriesCollection } from '@/lib/mongoClient';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const foodsCursor = foodsCollection.find({});
    const foods = await foodsCursor.toArray();
    const categoriesCursor = categoriesCollection.find({});
    const categories = await categoriesCursor.toArray();

    return NextResponse.json({
      okay: true,
      data: { categories: categories || [], foods: foods || [] },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ okay: false, msg: 'Something went wrong' });
  }
}
