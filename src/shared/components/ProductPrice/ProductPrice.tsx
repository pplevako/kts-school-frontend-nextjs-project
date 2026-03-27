import cx from 'clsx';

import type { TextProps } from '@/components/Text';
import Text from '@/components/Text';
import { formatPrice } from '@/utils/format';

import styles from './ProductPrice.module.scss';

type ProductPriceProps = {
  price: number;
  discountedPrice?: number;
  view?: 'p-18' | 'title';
  weight?: TextProps['weight'];
  className?: string;
};

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  discountedPrice,
  view = 'p-18',
  weight = 'bold',
  className,
}) => {
  const containerClass = cx(
    styles.priceContainer,
    view === 'title' ? styles.viewTitle : styles.viewP18,
    className
  );

  if (!discountedPrice || price === discountedPrice) {
    return (
      <div className={containerClass}>
        <Text view={view} color="primary" weight={weight}>
          {formatPrice(price)}
        </Text>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <Text
        tag="span"
        view={view}
        color="secondary"
        weight={weight}
        className={styles.originalPrice}
      >
        {formatPrice(price)}
      </Text>
      <Text tag="span" view={view} color="primary" weight={weight}>
        {formatPrice(discountedPrice)}
      </Text>
    </div>
  );
};

export default ProductPrice;
