import React, { FC } from 'react';
import classNames from 'classnames/bind';

import RootLayout from 'layouts/RootLayout';
import Header from 'components/Header';

import { AppLayoutProps } from './types';
import styles from './app-layout.module.scss';

const cx = classNames.bind(styles);

const AppLayout: FC<AppLayoutProps> = ({ children, title }) => (
  <RootLayout title={title}>
    <div className={cx('layout')}>
      <Header />
      <div className={cx('main')}>
        { children }
      </div>
    </div>
  </RootLayout>
);

export default AppLayout;
