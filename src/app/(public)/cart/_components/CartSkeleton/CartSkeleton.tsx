import styles from './CartSkeleton.module.scss';

const SKELETON_COUNT = 3;

const CartSkeleton: React.FC = () => (
  <div className={styles.list}>
    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
      <div key={i} className={styles.item}>
        <div className={styles.main}>
          <div className={styles.image} />
          <div className={styles.info}>
            <div className={styles.title} />
            <div className={styles.price} />
          </div>
        </div>
        <div className={styles.controls} />
      </div>
    ))}
  </div>
);

export default CartSkeleton;
