import React, {
  FC,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';

import AppLayout from 'layouts/AppLayout';
import ContainerContent from 'components/ui/ContainerContent';
import TextField from 'components/ui/TextField';
import RecipeList from 'components/RecipeList';
import { useCallbackDelay } from 'utils/hooks/useCallbackDelay';
import { useSearchParams } from 'utils/hooks/urlSearchParams';
import { recipesStore } from 'store';
import { LOADED_STATUS } from 'store/lib';

import Filters from './components/Filters';
import { HomeProps } from './types';
import styles from './home.module.scss';

const cx = classNames.bind(styles);

export const Home: FC<HomeProps> = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQuery = useCallback((q: string) => (
    setSearchParams(prev => ({ ...prev, q }))
  ), [setSearchParams]);

  const [search, setSearch] = useCallbackDelay<string>(setQuery, 500, String(searchParams.q ?? ''));

  useEffect(() => { recipesStore.fetchItems(); }, []);
  useEffect(() => {
    recipesStore.fetchItems({ filter: { query: String(searchParams.q ?? '') } });
  }, [searchParams]);

  return (
    <AppLayout>
      <main className={cx('page')}>
        <ContainerContent>
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
        </ContainerContent>
      </main>
    </AppLayout>
  );
});

export default Home;
