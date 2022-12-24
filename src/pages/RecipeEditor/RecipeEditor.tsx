import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { RecipePayload } from 'types/recipe';
import AppLayout from 'layouts/AppLayout';

import styles from './recipe-editor.module.scss';
import RecipeForm from './components/RecipeForm';

const cx = classNames.bind(styles);

const RecipeEditor: FC = () => {
  const { id } = useParams();

  const pageTitle = id ? 'Редактировать рецепт' : 'Новый рецепт';

  return (
    <AppLayout title='Редактор рецептов'>
      <h1 className={cx('page-title')}>{pageTitle}</h1>
      <RecipeForm onSubmit={console.log} />
    </AppLayout>
  );
};

export default RecipeEditor;
