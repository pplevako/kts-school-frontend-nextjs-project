import cx from 'clsx';
import React from 'react';

import Text from '@/components/Text';
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

import styles from './Pagination.module.scss';

export type PaginationProps = React.HTMLAttributes<HTMLDivElement> & {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  className,
  page,
  pageCount,
  onPageChange,
  disabled = false,
  ...props
}) => {
  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < pageCount) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className={cx(styles.pagination, className)} {...props}>
      <button
        className={styles.pageChangeBtn}
        onClick={handlePrev}
        disabled={disabled || page <= 1}
      >
        <ArrowLeftIcon />
      </button>
      <Text view="p-18" tag="span">
        {page} / {pageCount}
      </Text>
      <button
        className={styles.pageChangeBtn}
        onClick={handleNext}
        disabled={disabled || page >= pageCount}
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
