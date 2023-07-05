'use client';
import Image from 'next/image';
import { FaUserSecret } from 'react-icons/fa6';

export function ProfileIcon({ image, size = 50, margin, big, bgColor }) {
  return (
    <div
      className='center-xy'
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: bgColor || '#F7F5FF',
        margin: margin || 0,
      }}
    >
      {image ? (
        <Image
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
          }}
          src={image}
          alt={`image of user`}
          width={size}
          height={size}
        />
      ) : (
        <FaUserSecret className='text-primary-600' size={big ? 90 : 25} />
      )}
    </div>
  );
}
