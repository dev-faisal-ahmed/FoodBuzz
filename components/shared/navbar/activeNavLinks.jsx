'use client';
import Link from 'next/link';

export default function ActiveNavLinks({
  url,
  icon,
  currentLink,
  notification,
}) {
  return (
    <Link
      href={url}
      className={`relative w-fit ${
        currentLink === url ? 'text-orange-600 bg-orange-50' : 'text-gray-600'
      } p-3 flex flex-col items-center gap-1 rounded-xl animation hover:bg-gray-100`}
    >
      {icon}
      {notification && (
        <span className='block absolute right-[10px] top-2 h-2 w-2 rounded-full bg-red-600'></span>
      )}
    </Link>
  );
}
