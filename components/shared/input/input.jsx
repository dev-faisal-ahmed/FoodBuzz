'use client';

export function Input({ title, placeholder, type, name, onChange, required }) {
  return (
    <div className='w-full'>
      <label className='text-gray-500 font-semibold' htmlFor={name}>
        {title}
      </label>
      {onChange ? (
        <input
          className='block mt-1 border outline-primary-300 w-full py-2 px-3 rounded-md'
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        />
      ) : (
        <input
          className='block mt-1 border outline-primary-300 w-full py-2 px-3 rounded-md'
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
