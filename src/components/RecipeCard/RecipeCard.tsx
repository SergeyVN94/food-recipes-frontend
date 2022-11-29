import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import { RecipeCardProps } from './types';
import styles from './recipe-card.module.scss';

const cx = classNames.bind(styles);

const emptyImage = '/no-image.png';

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const { images = [] } = recipe;
  const firsImage = images[0];

  return (
    <div className={cx('card')}>
      <Link to={`/recipe/${recipe.id}`} className={cx('link')}>
        <img
          src={firsImage ? firsImage.src : emptyImage}
          alt={recipe.title}
          className={cx('image')}
          width={Infinity}
          height={Infinity}
        />
        <div className={cx('text-content')}>
          <h3 className={cx('title')}>{recipe.title}</h3>
          <p className={cx('description')}>{recipe.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
