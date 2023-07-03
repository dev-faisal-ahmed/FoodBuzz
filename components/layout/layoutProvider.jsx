'use client';
import { usePathname } from 'next/navigation';
import { DesktopLayout } from './desktopLayout';
import { MobileLayout } from './mobileLayout';

export function LayoutProvider({ children, font }) {
  const pathName = usePathname();

  if (pathName === '/sign-up')
    return <main className={font.className}>{children}</main>;

  return (
    <>
      <DesktopLayout font={font}>{children}</DesktopLayout>
      <MobileLayout font={font}>{children}</MobileLayout>
    </>
  );
}
