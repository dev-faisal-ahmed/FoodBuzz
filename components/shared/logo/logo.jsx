'use client';
import { Changa } from 'next/font/google';
import { IoFastFoodSharp } from 'react-icons/io5';

const font = Changa({ subsets: ['latin'], weight: ['600'] });
export function Logo() {
  return (
    <div
      className={`${font.className} text-2xl flex items-center gap-2 font-semibold`}
    >
      <IoFastFoodSharp size={25} /> <span>FoodBuzz</span>
    </div>
  );
}
