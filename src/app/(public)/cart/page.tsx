import type { Metadata } from 'next';

import CartClient from './_components/CartClient';

export const metadata: Metadata = {
  title: 'Cart - Lalasia',
};

export default function CartPage() {
  return <CartClient />;
}
