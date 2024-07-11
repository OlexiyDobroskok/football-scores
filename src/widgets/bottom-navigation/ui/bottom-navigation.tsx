'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { appRoutes, type Routes } from '@shared/config/routes';
import { Icon } from '@shared/ui/icon';
import { cn, useScrollDirection } from '@shared/utils';

export function NavItem({
  children,
  href,
}: {
  href: Routes;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <li
      className={cn('px-4 py-2 text-primary-foreground/40', {
        'text-accent': isActive,
      })}
    >
      <Link href={href}>{children}</Link>
    </li>
  );
}

export function BottomNavigation() {
  const [menuIsHide, setMenuIsHide] = React.useState(false);
  const { isScrollingDown } = useScrollDirection();

  React.useLayoutEffect(() => {
    setMenuIsHide(isScrollingDown ? true : false); 
  }, [isScrollingDown]);

  return (
    <nav
      className={cn('flex h-16 items-center justify-center transition-all', {
        'h-4': menuIsHide,
      })}
    >
      {!menuIsHide ? (
        <ul className="flex items-center justify-around">
          <NavItem href={appRoutes.HOME}>
            <Icon name="home" type={'common'} size="large" />
          </NavItem>
          <NavItem href={appRoutes.EXPLORE}>
            <Icon name="search" type={'common'} size="large" />
          </NavItem>
          <NavItem href={appRoutes.FAVORITE}>
            <Icon name="favorite" type={'common'} size="large" />
          </NavItem>
          <NavItem href={appRoutes.PROFILE}>
            <Icon name="user" type={'common'} size="large" />
          </NavItem>
        </ul>
      ) : (
        <div className="h-1 w-4/5 rounded-md bg-primary-foreground/40"></div>
      )}
    </nav>
  );
}
