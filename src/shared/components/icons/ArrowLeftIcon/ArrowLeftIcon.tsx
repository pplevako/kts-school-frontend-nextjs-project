import * as React from 'react';

import type { IconProps } from '../Icon';
import Icon from '../Icon';

const ArrowLeftIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon viewBox="0 0 35 35" fill="none" width="35" height="35" {...props}>
      <path
        d="M22.0062 5.95005L12.4979 15.4584C11.375 16.5813 11.375 18.4188 12.4979 19.5417L22.0062 29.05"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowLeftIcon;
