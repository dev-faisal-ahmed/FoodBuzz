import { GoHomeFill } from 'react-icons/go';
import { MdFastfood } from 'react-icons/md';
import { HiMiniShoppingCart } from 'react-icons/hi2';
import { HiUser } from 'react-icons/hi2';

export const navLinks = [
  {
    title: 'Home',
    url: '/',
    icon: <GoHomeFill size={25} />,
    mobileOnly: false,
  },
  {
    title: 'Foods',
    url: '/foods',
    icon: <MdFastfood size={25} />,
    mobileOnly: false,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: <HiMiniShoppingCart size={25} />,
    mobileOnly: false,
  },
  {
    title: 'profile',
    url: '/profile',
    icon: <HiUser size={25} />,
    mobileOnly: true,
  },
];
