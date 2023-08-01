import { useGetStats } from '@/hooks/useGetStats';
import colors from 'tailwindcss/colors';

export function AdminStats() {
  const { stat } = useGetStats();
  console.log(stat);
  return (
    <section className='grid grid-cols-3 gap-8'>
      {iconBox({
        first: true,
        title: 'Total Revenue',
        value: '$ ' + stat.totalRevenue,
        color: colors.white,
        ratio: (
          (stat.currentMonthRevenue /
            (stat.previousMonthRevenue || stat.currentMonthRevenue)) *
          100
        ).toFixed(2),
      })}
      {iconBox({
        title: 'Total Orders',
        value: stat.totalOrders,
        color: colors.blue[500],
        ratio: (
          (stat.currentMonthOrders /
            (stat.previousMonthOrders + stat.currentMonthOrders)) *
          100
        ).toFixed(2),
      })}
      {iconBox({
        title: 'Completed Orders',
        value: stat.completedOrders,
        color: colors.green[500],
        ratio: ((stat.completedOrders / stat.totalOrders) * 100).toFixed(2),
      })}
    </section>
  );
}

function iconBox({ title, value, ratio, color, first }) {
  return (
    <div
      className={`shadow-md p-5 rounded-xl center-y gap-2 justify-between ${
        first ? 'bg-primary-500 text-white' : 'bg-white'
      }`}
    >
      <div className='space-y-1'>
        <p className={`${first ? '' : 'text-gray-500'}`}>{title}</p>
        <p className='text-2xl font-semibold'>{value}</p>
      </div>
      <div className='w-fit'>
        <div
          style={{
            borderColor: color,
            height: '100px',
            width: '120px',
            borderRadius: '50%',
          }}
          className='border-t-8 center-xy text-lg font-semibold'
        >
          {ratio}%
        </div>
      </div>
    </div>
  );
}
