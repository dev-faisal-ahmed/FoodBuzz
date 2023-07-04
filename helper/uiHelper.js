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
