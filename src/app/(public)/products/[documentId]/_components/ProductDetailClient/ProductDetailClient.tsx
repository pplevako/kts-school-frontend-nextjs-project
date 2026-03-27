'use client';

import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect } from 'react';

import Button from '@/components/Button';
import CartControls from '@/components/CartControls';
import ImageGallery from '@/components/ImageGallery';
import ProductPrice from '@/components/ProductPrice';
import Text from '@/components/Text/Text';
import routes from '@/config/routes';
import { useStore } from '@/providers/StoreProvider';
import type { ProductHydration } from '@/stores/ProductStore';

import styles from './ProductDetailClient.module.scss';

type ProductDetailClientProps = {
  initialProduct: ProductHydration;
};

const ProductDetailView = observer(function ProductDetailView() {
  const { productStore } = useStore();
  const { product } = productStore;

  if (!product) return null;

  return (
    <div className={styles.productPage}>
      <nav className={styles.breadcrumbs}>
        <Link href={routes.products.create()}>
          <Text view="p-18" tag="span">
            Products
          </Text>
        </Link>
        <Text view="p-18" tag="span">
          /
        </Text>
        <Text view="p-18" tag="span">
          {product.title}
        </Text>
      </nav>
      <div className={styles.productContent}>
        <ImageGallery images={product.images} className={styles.productImage} />
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
            <ProductPrice
              price={product.price}
              discountedPrice={product.discountedPrice}
              view="title"
            />
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

function ProductDetailClient({ initialProduct }: ProductDetailClientProps) {
  const { productStore } = useStore();

  useEffect(() => {
    productStore.hydrate(initialProduct);
    return () => productStore.reset();
  }, [initialProduct, productStore]);

  return <ProductDetailView />;
}

export default ProductDetailClient;
