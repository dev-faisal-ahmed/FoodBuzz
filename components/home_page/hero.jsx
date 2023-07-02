'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className='bg-primary-500 text-white px-12 lg:py-5 py-8 lg:flex justify-between items-center rounded-2xl mb-8'>
      <div className='flex-grow text-center lg:text-start'>
        <h1 className='text-3xl font-semibold'>
          Enjoy Our Service in 205 Areas.
        </h1>
        <p className='mt-3 text-gray-300'>
          We provide the best food and best delivery possible
        </p>
        <Link
          href={'/'}
          className='block w-fit lg:mx-0 mx-auto text-primary-600 bg-white px-5 py-3 rounded-full mt-5 font-semibold hover:bg-gray-300 animation'
        >
          Discover
        </Link>
      </div>
      <div className='lg:w-[60%] 2xl:w-[35%] hidden lg:block'>
        <Image
          className='w-full'
          src={'/image/hero.png'}
          height={200}
          width={300}
          alt='Hero'
        />
      </div>
    </section>
  );
}
