'use client';

import { observer } from 'mobx-react-lite';

import Text from '@/components/Text';
import { useStore } from '@/providers/StoreProvider';

import ProductListItem from '../ProductListItem';

import styles from './ProductList.module.scss';

const ProductList = observer(() => {
  const { productListStore } = useStore();
  const { products } = productListStore;

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <Text view="p-32" color="secondary">
          No products found
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.productsGrid}>
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
});

export default ProductList;
