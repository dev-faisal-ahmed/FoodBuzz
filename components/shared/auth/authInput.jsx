'use client';

export default function AuthInput({ title, placeholder, type, name }) {
  return (
    <div>
      <label className='text-gray-500 font-semibold' htmlFor={name}>
        {title}
      </label>
      <input
        className='block mt-1 border outline-primary-300 w-full py-2 px-3 rounded-md'
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
