'use client';
export function ProfileIcon({ image, size, margin }) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        width: size || '50px',
        height: size || '50px',
        borderRadius: '50%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        margin: margin || 0,
      }}
    >
      &nbsp;
    </div>
  );
}
