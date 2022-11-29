/* eslint-disable max-len */
import React from 'react';
import { block } from 'bem-cn';

import './preloader.scss';

const b = block('preloader');

const SpinnerLarge = () => (
  <svg width='84' height='84' viewBox='0 0 84 84' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path fillRule='evenodd' clipRule='evenodd' d='M10.2017 69.4394L14.7426 65.5177C21.5423 73.3911 31.3939 78 42 78C61.8823 78 78 61.8823 78 42C78 22.1177 61.8823 6 42 6C22.1177 6 6 22.1177 6 42H0C0 18.804 18.804 0 42 0C65.196 0 84 18.804 84 42C84 65.196 65.196 84 42 84C29.6315 84 18.1294 78.6189 10.2017 69.4394Z' fill='#EEEEEE' />
  </svg>
);

const SpinnerSmall = () => (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M2.55573 13.8618L3.91709 12.3966C5.01999 13.4214 6.46341 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8H0C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C5.95335 16 4.02507 15.227 2.55573 13.8618Z' fill='#005AFF' />
  </svg>
);

const SpinnerLargeElement = <SpinnerLarge />;
const SpinnerSmallElement = <SpinnerSmall />;

const Preloader: React.FC<{
  visible?: boolean,
  size?: 'large' | 'small',
  bgBlur?: boolean,
  position?: 'center' | 'default',
  containerPosition?: 'static' | 'fixed' | 'absolute';
}> = ({
  visible,
  size = 'large',
  bgBlur,
  position = 'center',
  containerPosition = 'static',
}) => (
  <div
    className={b({
      visible,
      size,
      'bg-blur': bgBlur,
      position,
      'container-pos': containerPosition,
    })}
  >
    <div className='preloader__image'>
      {size === 'large' ? SpinnerLargeElement : SpinnerSmallElement}
    </div>
  </div>
);

export default Preloader;
