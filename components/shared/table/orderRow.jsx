export function OrderRow({
  orderId,
  orderTitle,
  status,
  date,
  pickUpAddress,
  price,
  index,
}) {
  return (
    <tr className={`${index % 2 !== 0 && 'bg-gray-200'}`}>
      <td className='py-4 px-3 text-blue-500 font-semibold whitespace-nowrap'>
        #{orderId}
      </td>
      <td className='py-4 px-3 whitespace-nowrap'>{orderTitle}</td>
      <td className='py-4 px-3 text-center whitespace-nowrap'>
        <span
          className={`${
            status === 'delivered'
              ? 'bg-green-100 text-green-600'
              : 'bg-orange-100 text-orange-600'
          } py-1 px-3 rounded-md capitalize font-semibold text-xs`}
        >
          {status}
        </span>
      </td>
      <td className='py-4 px-3 whitespace-nowrap'>{pickUpAddress}</td>
      <td className='py-4 px-3 whitespace-nowrap'>$ {price}</td>
      <td className='py-4 px-3 whitespace-nowrap text-center'>
        <p>{date}</p>
      </td>
    </tr>
  );
}
