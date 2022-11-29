import React, { FC } from 'react';
import classNames from 'classnames/bind';

import AppLayout from 'layouts/AppLayout';
import Grid from 'components/ui/Grid';
import TextField from 'components/ui/TextField';

import { HomeProps } from './types';
import styles from './home.module.scss';

const cx = classNames.bind(styles);

export const Home: FC<HomeProps> = () => (
  <AppLayout>
    <main className={cx('page')}>
      <Grid>
        <div>
          <TextField
            value=''
            label='Поиск'
            autoComplete='off'
          />
        </div>
        <div>Home</div>
      </Grid>
    </main>
  </AppLayout>
);

export default Home;
