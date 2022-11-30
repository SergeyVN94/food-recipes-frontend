import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';

import Tag from 'components/ui/Tag';
import Preloader from 'components/ui/Preloader';
import { recipeIngredientsStore } from 'store';

import { RecipeFullCardProps } from './types';
import styles from './recipe-full-card.module.scss';

const cx = classNames.bind(styles);

const RecipeFullCard: FC<RecipeFullCardProps> = observer(({ recipe }) => {
  useEffect(() => {
    const noLoadedIngredients = recipe.ingredients.filter(id => (
      (recipeIngredientsStore.data ?? []).some(i => i.id === id)
    ));

    if (noLoadedIngredients.length > 0) {
      recipeIngredientsStore.fetchItems({
        filter: { ids: noLoadedIngredients },
        appendToData: true,
      });
    }
  }, [recipe]);

  const image = (recipe.images ?? [])[0];

  return (
    <div className={cx('card')}>
      <h1 className={cx('title')}>{recipe.title}</h1>
      { image && <img src={image.src} alt={recipe.title} className={cx('top-image')} /> }
      { recipe.description && <p className={cx('description')}>{recipe.description}</p> }
      <h3 className={cx('ingredients-title')}>Список ингридиентов</h3>
      <Preloader visible={recipeIngredientsStore.loading} />
      <ul className={cx('ingredients-list')}>
        {recipeIngredientsStore.data && recipeIngredientsStore.data.map(i => (
          <li key={i.id}>
            <Tag label={i.name} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default RecipeFullCard;
