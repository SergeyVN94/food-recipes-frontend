import React, { FC } from 'react';
import classNames from 'classnames/bind';

import RootLayout from 'layouts/RootLayout';
import Header from 'components/Header';
import Footer from 'components/Footer';

import { AppLayoutProps } from './types';
import styles from './app-layout.module.scss';

const cx = classNames.bind(styles);

const AppLayout: FC<AppLayoutProps> = ({ children }) => (
  <RootLayout>
    <div className={styles.layout}>
      <Header />
      <div className={cx('main')}>
        { children }
      </div>
      <Footer />
    </div>
  </RootLayout>
);

export default AppLayout;
