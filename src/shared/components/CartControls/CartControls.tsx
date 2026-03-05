import cx from 'clsx';
import { observer } from 'mobx-react-lite';
import React from 'react';

import Button from '@components/Button';
import Text from '@components/Text';
import { useStore } from '@stores/StoreProvider';
import type ProductModel from '@stores/models/ProductModel';

import styles from './CartControls.module.scss';

type CartControlsProps = React.HTMLAttributes<HTMLDivElement> & {
  product: ProductModel;
  buttonClassName?: string;
};

const CartControls = observer(
  React.forwardRef<HTMLDivElement, CartControlsProps>(
    ({ product, className, buttonClassName, ...props }, ref) => {
      const { cartStore } = useStore();
      const cartItem = cartStore.getItem(product.id);

      return (
        <div className={cx(styles.cartControls, className)} ref={ref} {...props}>
          {!cartItem ? (
            <Button
              className={cx(styles.btnAdd, buttonClassName)}
              onClick={() => cartStore.addItem(product)}
            >
              Add to Cart
            </Button>
          ) : (
            <>
              <Button
                className={styles.btnQuantity}
                onClick={() => cartStore.decrement(product.id)}
              >
                <Text tag="span" view="p-32">
                  –
                </Text>
              </Button>
              <Text tag="span" view="p-18">
                {cartItem.quantity}
              </Text>
              <Button
                className={styles.btnQuantity}
                onClick={() => cartStore.increment(product.id)}
              >
                <Text tag="span" view="p-32">
                  +
                </Text>
              </Button>
            </>
          )}
        </div>
      );
    }
  )
);

export default CartControls;
