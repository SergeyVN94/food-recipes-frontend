import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import imagePlaceholder from 'assets/images/no-image.png';

import { RecipeCardProps } from './types';
import styles from './recipe-card.module.scss';

const cx = classNames.bind(styles);

const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
  const { images = [] } = recipe;
  const firsImage = images[0];

  return (
    <div className={cx('card')}>
      <Link to={`/recipe/${recipe.slug}`} className={cx('link')}>
        <div className={cx('img-wrapper')}>
          <img
            src={firsImage ? firsImage.src : imagePlaceholder}
            alt={recipe.title}
            className={cx('image')}
          />
        </div>
        <div className={cx('text-content')}>
          <h3 className={cx('title')}>{recipe.title}</h3>
          <p className={cx('description')}>{recipe.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
