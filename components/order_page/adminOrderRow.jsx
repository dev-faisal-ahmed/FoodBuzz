import { postReq } from '@/helper/apiReq';
import { getUserInfoLocal } from '@/helper/localStorage';
import { toastConfig } from '@/helper/toastConfig';
import { useGetUser } from '@/hooks/useGetUser';
import { toast } from 'react-hot-toast';

export function AdminOrderRow({
  orderId,
  orderTitle,
  status,
  date,
  pickUpAddress,
  price,
  index,
}) {
  const { email } = getUserInfoLocal();
  const { refetch } = useGetUser(email);

  function handleUpdateStatus() {
    const toastId = toast.loading('Updating order info');
    const url = '/api/update-order-status';
    fetch(url, postReq({ orderId }))
      .then((res) => res.json())
      .then((res) => {
        if (res.okay) {
          toast.success(res.msg, toastConfig);
          refetch();
        } else toast.error(res.msg, toastConfig);
        toast.dismiss(toastId);
      });
  }

  return (
    <tr className={`${index % 2 !== 0 && 'bg-gray-200'}`}>
      <td className='py-4 px-3'>
        {status === 'pending' && (
          <input
            onClick={handleUpdateStatus}
            type='checkbox'
            className='rounded-md mx-auto block cursor-pointer'
          />
        )}
      </td>
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
          } py-1 px-3 rounded-md capitalize font-semibold`}
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
