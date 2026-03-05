import cx from 'clsx';
import React from 'react';

import Icon from '../icons/Icon';
import './Loader.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
};

const iconDimensions = {
  s: { width: '16', height: '16' },
  m: { width: '32', height: '32' },
  l: { width: '40', height: '40' },
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className, ...props }) => {
  const sizeClass = `loader-size-${size}`;
  return (
    <div className={cx('loader', sizeClass, className)}>
      <Icon
        viewBox="0 0 32 32"
        fill="currentColor"
        className="loader-icon"
        {...iconDimensions[size]}
        {...props}
      >
        <path d="M18.703 27.696C12.2454 29.1868 5.80199 25.1605 4.31115 18.7029C2.82031 12.2454 6.84662 5.80193 13.3042 4.31108C19.7617 2.82024 26.2052 6.84655 27.696 13.3041L31.5935 12.4043C29.6057 3.79423 21.0144 -1.57419 12.4044 0.4136C3.7943 2.40139 -1.57412 10.9927 0.41367 19.6027C2.40146 28.2128 10.9927 33.5812 19.6028 31.5934L18.703 27.696Z" />
      </Icon>
    </div>
  );
};

export default Loader;
