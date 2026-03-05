'use client';

import { observer } from 'mobx-react-lite';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

import Button from '@components/Button';
import CartControls from '@components/CartControls';
import Text from '@components/Text/Text';
import ArrowLeftIcon from '@components/icons/ArrowLeftIcon';
import { useStore } from '@stores/StoreProvider';

import styles from './page.module.scss';

const ProductPage: React.FC = observer(() => {
  const params = useParams();
  const documentId = params.documentId as string;
  const router = useRouter();
  const { productStore } = useStore();
  const { product } = productStore;

  useEffect(() => {
    if (documentId) {
      productStore.fetchProduct(documentId);
    }
    return () => productStore.reset();
  }, [documentId, productStore]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  if (productStore.loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className={styles.productPage}>
      <nav className={styles.pageNav}>
        <button onClick={handleGoBack} className={styles.backButton}>
          <ArrowLeftIcon />
          <Text view="p-20">Back</Text>
        </button>
      </nav>
      <div className={styles.productContent}>
        <div className={styles.productImage}>
          <img src={product.getImageUrl({ format: 'medium' })} alt={product.title} />
        </div>
        <div className={styles.productDetail}>
          <div>
            <Text className={styles.productTitle} view="title" color="primary" weight="bold">
              {product.title}
            </Text>
            <Text view="p-20" color="secondary">
              {product.description}
            </Text>
          </div>
          <div className={styles.productFooter}>
            <Text view="title" color="primary" weight="bold">
              {`$${product.price}`}
            </Text>
            <div className={styles.productActions}>
              <Button>Buy Now</Button>
              <CartControls product={product} buttonClassName={styles.btnAddToCard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductPage;
