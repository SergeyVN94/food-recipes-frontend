import React, { FC, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';

import AppLayout from 'layouts/AppLayout';
import Grid from 'components/ui/Grid';
import TextField from 'components/ui/TextField';
import RecipeList from 'components/RecipeList';
import { useCallbackDelay } from 'utils/hooks/useCallbackDelay';
import { recipesStore } from 'store';
import { LOADED_STATUS } from 'store/lib';

import Filters from './components/Filters';
import { HomeProps } from './types';
import styles from './home.module.scss';

const cx = classNames.bind(styles);

export const Home: FC<HomeProps> = observer(() => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useCallbackDelay<string>(setQuery, 500, query);

  useEffect(() => {
    if (recipesStore.status === LOADED_STATUS.NOT_LOADED) {
      recipesStore.fetchItems();
    }
  }, []);

  return (
    <AppLayout>
      <main className={cx('page')}>
        <Grid>
          <div className={cx('search')}>
            <TextField
              actionClear
              value={search}
              label='Поиск'
              autoComplete='off'
              onChange={value => setSearch(value)}
            />
          </div>
          {/* <div className={cx('filters')}>
            <Filters />
          </div> */}
          <div className={cx('recipes-list')}>
            <RecipeList />
          </div>
        </Grid>
      </main>
    </AppLayout>
  );
});

export default Home;
