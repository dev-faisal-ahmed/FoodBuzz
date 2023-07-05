export function textBox(key, value, bold = false) {
  return (
    <p className={`center-y justify-between gap-5 ${bold ? 'mt-3' : ''}`}>
      <span className={`${bold ? 'font-semibold' : 'text-gray-500'} text-lg`}>
        {key}
      </span>
      <span className={`${bold ? 'font-semibold' : 'text-gray-500'} text-lg`}>
        {value}
      </span>
    </p>
  );
}

export function iconBox({ icon, value, key }) {
  return (
    <div className='flex gap-3'>
      <div className='center-xy'>
        <div className='bg-white p-3 rounded-full text-primary-500'>{icon}</div>
      </div>
      <div>
        <p className='text-sm text-gray-600'>{key}</p>
        <h4 className='font-semibold'>{value.toLocaleString()}</h4>
      </div>
    </div>
  );
}
