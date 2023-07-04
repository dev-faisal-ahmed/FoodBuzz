'use client';
export function ProfileIcon({ image, size, margin, name, big, bgColor }) {
  return (
    <div
      className='center-xy'
      style={{
        backgroundImage: `url(${image})`,
        width: size || '50px',
        height: size || '50px',
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        margin: margin || 0,
        backgroundColor: bgColor || '#F7F5FF',
      }}
    >
      {name ? (
        <span
          className={`font-semibold text-primary-700 ${
            big ? 'text-6xl' : 'text-2xl'
          }`}
        >
          {name[0]}
        </span>
      ) : (
        <>{big && <span className='text-2xl font-semibold'>^ _ ^</span>}</>
      )}
    </div>
  );
}
