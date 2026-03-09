'use client';

import { observer } from 'mobx-react-lite';
import NavLink from 'next-navlink';
import React, { useEffect } from 'react';

import Text from '@/components/Text';
import CartIcon from '@/components/icons/CartIcon';
import UserIcon from '@/components/icons/UserIcon';
import routes from '@/config/routes';
import { useStore } from '@/shared/providers/StoreProvider';

import styles from './Header.module.scss';

const navItems = [
  { to: routes.products.create(), label: 'Products' },
  { to: '/categories', label: 'Categories' },
  { to: routes.about.create(), label: 'About us' },
];

const Header: React.FC = observer(() => {
  const { cartStore } = useStore();
  const { totalQuantity: cartItemCount } = cartStore;

  useEffect(() => {
    cartStore.init();
    return () => cartStore.dispose();
  }, [cartStore]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="Lalasia logo" />
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
              {(isActive) => (
                <Text view="p-18" tag="span" color={isActive ? 'accent' : 'primary'}>
                  {item.label}
                </Text>
              )}
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
          <UserIcon />
        </div>
      </div>
    </header>
  );
});

export default Header;
