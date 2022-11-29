import React, { FC } from 'react';
import classNames from 'classnames/bind';

import styles from './footer.module.scss';

const cx = classNames.bind(styles);

const Footer: FC = () => (
  <footer className={cx('footer')}>
    Подвал
  </footer>
);

export default Footer;
