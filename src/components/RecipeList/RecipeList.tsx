import React, { FC } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';

import { RecipeCard } from 'components/RecipeCard';
import { recipesStore } from 'store';

import { RecipeListProps } from './types';
import styles from './recipe-list.module.scss';

const cx = classNames.bind(styles);

const emptyItemsListPlaceholder = (
  <p className={cx('empty-list-placeholder')}>Рецептов не найдено.</p>
);

const RecipeList: FC<RecipeListProps> = observer(() => (
  <ul className={cx('list')}>
    { recipesStore.data
      ? recipesStore.data?.map(i => (
        <li key={i.id} className={cx('card-wrapper')}>
          <RecipeCard recipe={i} />
        </li>
      )) : emptyItemsListPlaceholder }
  </ul>
));

export default RecipeList;
