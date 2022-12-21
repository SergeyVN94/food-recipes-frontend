import React, { FC } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import { FormikProps, Formik, Form } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import { UserAuth } from 'types/user';
import { authenticationStore } from 'store';
import Button from 'components/ui/Button';
import TextField from 'components/ui/TextField';

import styles from './auth-form.module.scss';

const cx = classNames.bind(styles);
export const authFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невалидная почта')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(5, 'Минимум 5 символа')
    .max(40, 'Не больше 40 символов')
    .required('Обязательное поле'),
});

const AuthenticationFormInner: React.FC<FormikProps<UserAuth>> = observer(({
  errors,
  values,
  setFieldValue,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <h3 className={cx('form-title')}>Войти</h3>
    {
      authenticationStore.error
      && <p className={cx('form-error')}>{_.toString(authenticationStore.error)}</p>
    }
    <div className={cx('form-field')}>
      <TextField
        actionClear
        label='Почта'
        value={values.email}
        onChange={v => setFieldValue('email', v)}
        error={errors.email}
        disabled={authenticationStore.isLoading}
      />
    </div>
    <div className={cx('form-field')}>
      <TextField
        actionClear
        label='Пароль'
        type='password'
        value={values.password}
        onChange={v => setFieldValue('password', v)}
        error={errors.password}
        disabled={authenticationStore.isLoading}
      />
    </div>
    <div className={cx('form-field')}>
      <Button
        type='submit'
        text='Войти'
        variant='32-confirm'
        disabled={authenticationStore.isLoading}
      />
    </div>
  </Form>
));

const authFormInit: UserAuth = { email: '', password: '' };

const AuthForm: FC = observer(() => (
  <Formik
    validateOnBlur
    initialValues={authFormInit}
    onSubmit={value => authenticationStore.login(value.email, value.password)}
    validationSchema={authFormSchema}
    component={AuthenticationFormInner}
  />
));

export default AuthForm;
