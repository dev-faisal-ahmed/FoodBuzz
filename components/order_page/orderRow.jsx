export function OrderRow({
  orderId,
  orderTitle,
  status,
  date,
  time,
  pickUpAddress,
  price,
  className,
}) {
  return (
    <div className={`${className} text-sm py-4 items-center`}>
      <div className='font-semibold truncate'>#{orderId}</div>
      <div className='truncate text-center bigger:col-span-2'>{orderTitle}</div>
      <div className='text-center'>
        <span
          className={`${
            status === 'delivered'
              ? 'bg-green-100 text-green-600'
              : 'bg-orange-100 text-orange-600'
          } p-2 rounded-md capitalize font-semibold`}
        >
          {status}
        </span>
      </div>
      <div className='hidden sm:block text-center truncate'>
        {pickUpAddress}
      </div>
      <div className='hidden text-center xl:block'>{price}</div>
      <div className='hidden text-center 2xl:block'>
        <p>{date}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}
