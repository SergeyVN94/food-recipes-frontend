import React, { FC, useState } from 'react';
import classNames from 'classnames/bind';

import Checkbox from 'components/ui/CheckInput/CheckInput';

import { FiltersProps } from './types';
import styles from './filters.module.scss';

const cx = classNames.bind(styles);

const Filters: FC<FiltersProps> = () => {
  const [bodyVisible, setBodyVisible] = useState(false);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        <Checkbox
          checked={bodyVisible}
          onChange={() => setBodyVisible(prev => !prev)}
          label='Показать фильтры'
          name='body-visible'
          view='switch'
        />
      </div>
      <div className={cx('body', { visible: bodyVisible })} />
    </div>
  );
};

export default Filters;
