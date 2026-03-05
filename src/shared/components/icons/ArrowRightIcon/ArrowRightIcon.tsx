import * as React from 'react';

import type { IconProps } from '../Icon';
import Icon from '../Icon';

const ArrowRightIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 35 35" fill="none" width="35" height="35" {...props}>
      <path
        d="M12.9938 29.05L22.5021 19.5416C23.625 18.4187 23.625 16.5812 22.5021 15.4583L12.9938 5.94995"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowRightIcon;
