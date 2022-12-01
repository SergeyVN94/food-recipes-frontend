import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import _ from 'lodash';

import Preloader from 'components/ui/Preloader';
import AppLayout from 'layouts/AppLayout';
import Grid from 'components/ui/Grid';
import { recipesStore } from 'store';

import RecipeFullCard from './components/RecipeFullCard';
import { RecipeProps } from './types';
import styles from './recipe.module.scss';

const cx = classNames.bind(styles);

const Recipe: FC<RecipeProps> = observer(() => {
  const { slug = '' } = useParams<{ slug: string }>();
  const normalizedSlug = slug.trim();
  const recipe = (recipesStore.data ?? []).find(r => r.slug === normalizedSlug);
  const navigate = useNavigate();

  useEffect(() => {
    if (normalizedSlug.length > 0) {
      recipesStore.fetchItems({ filter: { slug: normalizedSlug } });
    } else {
      navigate('/');
    }
  }, [normalizedSlug, navigate]);

  return (
    <AppLayout title={recipe ? recipe.title : 'Страница рецепта'}>
      <Grid>
        <div className={cx('page-wrap')}>
          <Preloader size='large' position='center' visible={recipesStore.loading} />
          { recipe && <RecipeFullCard recipe={recipe} /> }
        </div>
      </Grid>
    </AppLayout>
  );
});

export default Recipe;
