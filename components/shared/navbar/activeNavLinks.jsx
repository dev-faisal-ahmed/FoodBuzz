'use client';
import Link from 'next/link';

export function ActiveNavLinks({
  url,
  icon,
  currentLink,
  notification,
  title,
}) {
  return (
    <Link
      href={url}
      className={`${
        currentLink === url ? 'text-white bg-primary-500' : 'text-gray-600'
      } p-3 flex items-center gap-1 rounded-xl animation hover:bg-gray-100 hover:text-gray-600`}
    >
      <span className='relative'>
        {icon}
        {notification && (
          <span className='block absolute right-1 top-0 h-2 w-2 rounded-full bg-red-600'></span>
        )}
      </span>
      {title && <span>{title}</span>}
    </Link>
  );
}
