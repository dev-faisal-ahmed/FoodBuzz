import React from 'react';

export function LoaderDashed({
  size = '50px',
  borderColor = 'border-blue-500',
}) {
  return (
    <div
      style={{ height: size, width: size }}
      className={`mx-auto mt-8 mb-5 rounded-full animate-spin border-2 border-dashed ${borderColor} border-t-transparent`}
    ></div>
  );
}
