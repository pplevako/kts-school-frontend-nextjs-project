import cx from 'clsx';
import * as React from 'react';
import './Icon.scss';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number | string;
  height?: number | string;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  children,
  className,
  color,
  width = 24,
  height = 24,
  ...props
}) => {
  const getColorClass = () => {
    if (!color) {
      return '';
    }
    return `icon-${color}`;
  };

  return (
    <span className="icon-container">
      <svg
        className={cx('icon', getColorClass(), className)}
        width={width}
        height={height}
        {...props}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </span>
  );
};

export default Icon;
