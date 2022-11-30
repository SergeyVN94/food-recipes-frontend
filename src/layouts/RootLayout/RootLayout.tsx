import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { observer } from 'mobx-react';

import favicon from 'assets/images/favicon/favicon.png';

import { RootLayoutProps } from './types';
import styles from './root-layout.module.scss';

const RootLayout: FC<RootLayoutProps> = observer(({ children, title = 'Поиск рецептов' }) => (
  <div className={styles.layout}>
    <Helmet>
      <link rel='icon' href={favicon} />
      <title>{title}</title>
    </Helmet>
    {children}
  </div>
));

export default RootLayout;
