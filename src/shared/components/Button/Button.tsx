import cx from 'clsx';
import React from 'react';

import './Button.scss';
import Loader from '../Loader';
import Text from '../Text';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  disabled?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ className, disabled, loading, children, ...props }) => {
  const classNames = cx('btn', { 'btn-disabled': disabled }, { 'btn-loading': loading }, className);

  return (
    <button type="button" className={classNames} disabled={disabled || loading} {...props}>
      {loading && <Loader size="s" />}
      <Text tag="span" view="button">
        {children}
      </Text>
    </button>
  );
};

export default Button;
