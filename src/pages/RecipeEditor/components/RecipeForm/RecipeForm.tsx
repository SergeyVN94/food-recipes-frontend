import React, { FC, useMemo, useRef } from 'react';
import { FormikProps, Formik, Form } from 'formik';
import classNames from 'classnames/bind';

import { RecipePayload } from 'types/recipe';
import TextField from 'components/ui/TextField';
import TextAreaAutoHeight from 'components/ui/TextAreaAutoHeight';

import { IRecipeFormProps } from './types';

import styles from './recipe-form.module.scss';

const cx = classNames.bind(styles);
const defaultFormState: RecipePayload = {
  title: '',
  description: '',
  images: [],
  ingredients: [],
  steps: [{
    content: '',
    order: 0,
  }],
  files: [],
};

const RecipeFormInner: FC<FormikProps<RecipePayload>> = ({
  values,
  handleSubmit,
  setFieldValue,
}) => {
  const descriptionRef = useRef(null);

  return (
    <Form onSubmit={handleSubmit} className={cx('form')}>
      <TextField
        required
        label='Название'
        value={values.title}
        onChange={v => setFieldValue('title', v)}
      />
      <TextAreaAutoHeight maxRows={10} inputRef={descriptionRef}>
        <TextField
          required
          textarea
          label='Описание'
          value={values.description}
          onChange={v => setFieldValue('description', v)}
          inputRef={descriptionRef}
        />
      </TextAreaAutoHeight>
    </Form>
  );
};

const RecipeForm: FC<IRecipeFormProps> = ({ onSubmit, recipe }) => {
  const initialValues = useMemo(() => (
    recipe ? { ...defaultFormState, recipe } : defaultFormState
  ), [recipe]);

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      component={RecipeFormInner}
    />
  );
};

export default RecipeForm;
