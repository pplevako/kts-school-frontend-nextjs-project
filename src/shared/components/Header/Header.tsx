'use client';

import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import Link from 'next/link';
import NavLink from 'next-navlink';
import React, { useEffect } from 'react';

import Text from '@/components/Text';
import CartIcon from '@/components/icons/CartIcon';
import UserIcon from '@/components/icons/UserIcon';
import routes from '@/config/routes';
import { useStore } from '@/providers/StoreProvider';

import styles from './Header.module.scss';

const navItems = [
  { to: routes.products.create(), label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: routes.about.create(), label: 'About us' },
];

const Header: React.FC = observer(() => {
  const { cartStore, authStore } = useStore();
  const { totalQuantity: cartItemCount } = cartStore;
  const { isAuthenticated, username } = authStore;

  useEffect(() => {
    cartStore.init();
    return () => cartStore.dispose();
  }, [cartStore]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image src="/logo.svg" alt="Lalasia logo" width={32} height={32} />
          <Text className={styles.logoBrand} view="p-20" tag="span" color="primary" weight="bold">
            Lalasia
          </Text>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={styles.navLink}
              activeClassName={styles.active}
            >
              <Text view="p-18" tag="span">
                {item.label}
              </Text>
            </NavLink>
          ))}
        </nav>
        <div className={styles.userActions}>
          <div className={styles.cartIconContainer}>
            <CartIcon />
            {cartItemCount > 0 && (
              <span className={styles.cartBadge}>
                <Text view="p-14" tag="span" weight="bold">
                  {cartItemCount}
                </Text>
              </span>
            )}
          </div>
          <Link
            href={isAuthenticated ? routes.profile.create() : routes.login.create()}
            title={isAuthenticated ? username : 'Login'}
          >
            <UserIcon />
          </Link>
        </div>
      </div>
    </header>
  );
});

export default Header;
