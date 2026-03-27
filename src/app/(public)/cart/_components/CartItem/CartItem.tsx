import cx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/Button';
import CartControls from '@/components/CartControls';
import ProductPrice from '@/components/ProductPrice';
import Text from '@/components/Text';
import routes from '@/config/routes';
import type ProductModel from '@/models/ProductModel';
import { formatPrice } from '@/utils/format';

import styles from './CartItem.module.scss';

type CartItemProps = {
  product: ProductModel;
  quantity?: number;
  isDeleted: boolean;
  onRemove: () => void;
  onRestore: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
  product,
  quantity = 0,
  isDeleted,
  onRemove,
  onRestore,
}) => {
  const lineTotal = product.discountedPrice * quantity;

  return (
    <div className={styles.item}>
      <Link href={routes.product.create(product.documentId)}>
        <div className={cx(styles.itemMain, { [styles.itemDeleted]: isDeleted })}>
          <Image
            src={product.getImageUrl()}
            alt={product.title}
            width={80}
            height={80}
            className={styles.itemImage}
          />
          <div className={styles.itemInfo}>
            <Text view="p-20" weight="medium" className={styles.itemTitle}>
              {product.title}
            </Text>
            <ProductPrice
              price={product.price}
              discountedPrice={product.discountedPrice}
              weight="normal"
            />
          </div>
        </div>
      </Link>
      <div className={styles.itemActions}>
        {isDeleted ? (
          <Button onClick={onRestore}>Restore</Button>
        ) : (
          <>
            <Text view="p-18" className={styles.lineTotal}>
              {formatPrice(lineTotal)}
            </Text>
            <CartControls product={product} onRemove={onRemove} />
          </>
        )}
      </div>
    </div>
  );
};

export default CartItem;
