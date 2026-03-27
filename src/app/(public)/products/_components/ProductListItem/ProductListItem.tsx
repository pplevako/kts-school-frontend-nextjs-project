'use client';

import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

import Card from '@/components/Card';
import CartControls from '@/components/CartControls';
import ProductPrice from '@/components/ProductPrice';
import routes from '@/config/routes';
import type ProductModel from '@/models/ProductModel';

import styles from './ProductListItem.module.scss';

type ProductListItemProps = {
  product: ProductModel;
};

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const router = useRouter();
  const cartControlsRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cartControlsRef.current?.contains(e.target as Node)) return;
    router.push(routes.product.create(product.documentId));
  };

  return (
    <Card
      className={styles.productListItem}
      key={product.id}
      image={product.getImageUrl()}
      title={product.title}
      subtitle={product.description}
      captionSlot={product.categoryTitle}
      contentSlot={<ProductPrice price={product.price} discountedPrice={product.discountedPrice} />}
      onClick={handleCardClick}
      actionSlot={<CartControls product={product} ref={cartControlsRef} />}
    />
  );
};

export default ProductListItem;
