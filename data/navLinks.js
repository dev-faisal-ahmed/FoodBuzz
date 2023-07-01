import { GoHomeFill } from 'react-icons/go';
import { MdFastfood } from 'react-icons/md';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { HiBell } from 'react-icons/hi2';

export const navLinks = [
  { title: 'Home', url: '/', icon: <GoHomeFill size={25} /> },
  { title: 'Foods', url: '/foods', icon: <MdFastfood size={25} /> },
  { title: 'Orders', url: '/orders', icon: <HiMiniShoppingCart size={25} /> },
  {
    title: 'Notifications',
    url: '/notifications',
    icon: <HiBell size={25} />,
    notification: true,
  },
];
