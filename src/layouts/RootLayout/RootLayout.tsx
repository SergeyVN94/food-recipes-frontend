import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { observer } from 'mobx-react';

import favicon from 'assets/images/favicon/favicon.png';

import { RootLayoutProps } from './types';
import styles from './root-layout.module.scss';

const RootLayout: FC<RootLayoutProps> = observer(({ children }) => (
  <div className={styles.layout}>
    <Helmet>
      <link rel='icon' href={favicon} />
    </Helmet>
    {children}
  </div>
));

export default RootLayout;
