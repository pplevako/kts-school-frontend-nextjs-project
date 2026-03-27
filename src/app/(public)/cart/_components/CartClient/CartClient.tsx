'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { fetchProductsByIds } from '@/api/products';
import Text from '@/components/Text';
import ProductModel from '@/models/ProductModel';
import { useStore } from '@/providers/StoreProvider';
import { formatPrice } from '@/utils/format';

import CartItem from '../CartItem';
import CartSkeleton from '../CartSkeleton';

import styles from './CartClient.module.scss';

const CartView = observer(() => {
  const { cartStore } = useStore();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [softDeleted, setSoftDeleted] = useState<Set<number>>(new Set());

  useEffect(() => {
    setMounted(true);

    const ids = cartStore.itemIds;
    if (ids.length === 0) {
      setLoading(false);
      return;
    }

    fetchProductsByIds(ids)
      .then((response) => {
        setProducts(response.data.map((p) => new ProductModel(p)));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cartStore]);

  const handleRemove = (id: number) => {
    cartStore.removeItem(id);
    setSoftDeleted((prev) => new Set(prev).add(id));
  };

  const handleRestore = (id: number) => {
    cartStore.increment(id);
    setSoftDeleted((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const cartTotal = products.reduce((sum, product) => {
    const quantity = cartStore.getItem(product.id)?.quantity ?? 0;
    return sum + product.discountedPrice * quantity;
  }, 0);

  const visibleProducts = products.filter((p) => cartStore.getItem(p.id) || softDeleted.has(p.id));

  const isEmpty = mounted && !loading && cartStore.items.length === 0 && softDeleted.size === 0;

  return (
    <div className={styles.page}>
      <Text tag="h1" view="title" className={styles.title}>
        Cart
      </Text>
      {!mounted || loading ? (
        <CartSkeleton />
      ) : isEmpty ? (
        <div className={styles.empty}>
          <Text view="p-20" color="secondary">
            Your cart is empty
          </Text>
        </div>
      ) : (
        <>
          <div className={styles.list}>
            {visibleProducts.map((product) => {
              const cartItem = cartStore.getItem(product.id);
              return (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={cartItem?.quantity}
                  isDeleted={softDeleted.has(product.id)}
                  onRemove={() => handleRemove(product.id)}
                  onRestore={() => handleRestore(product.id)}
                />
              );
            })}
          </div>
          <div className={styles.summary}>
            <Text view="p-20" weight="bold">
              Total: {formatPrice(cartTotal)}
            </Text>
          </div>
        </>
      )}
    </div>
  );
});

function CartClient() {
  return <CartView />;
}

export default CartClient;
