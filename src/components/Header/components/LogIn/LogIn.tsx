import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Formik, Form, FormikProps } from 'formik';
import _ from 'lodash';
import classNames from 'classnames/bind';

import { UserAuth } from 'types/user';
import { authenticationStore } from 'store';
import Button from 'components/ui/Button';
import Popup, { PopupBtnClose } from 'components/Popup';
import TextField from 'components/ui/TextField';

import { authFormSchema } from './lib';
import styles from './login.module.scss';

const cx = classNames.bind(styles);

const AuthenticationFormInner: React.FC<FormikProps<UserAuth>> = observer(({
  errors,
  values,
  setFieldValue,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <h3 className={cx('auth-form-title')}>Войти</h3>
    {
      authenticationStore.error
      && <p className={cx('auth-form-error')}>{_.toString(authenticationStore.error)}</p>
    }
    <div className={cx('auth-form-field')}>
      <TextField
        actionClear
        label='Почта'
        value={values.email}
        onChange={v => setFieldValue('email', v)}
        error={errors.email}
        disabled={authenticationStore.isLoading}
      />
    </div>
    <div className={cx('auth-form-field')}>
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
    <div className={cx('auth-form-field')}>
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

const AuthenticationForm: FC = observer(() => (
  <Formik
    validateOnBlur
    initialValues={authFormInit}
    onSubmit={value => authenticationStore.login(value.email, value.password)}
    validationSchema={authFormSchema}
    component={AuthenticationFormInner}
  />
));

export const LogIn: FC = observer(() => {
  const [popupAction, setPopupAction] = useState<'' | 'login'>('');

  useEffect(() => {
    if (popupAction === 'login' && authenticationStore.isAuthenticated) {
      setPopupAction('');
    }
  }, [popupAction, setPopupAction]);

  return (
    <>
      <Button variant='32-sec__simple' text='Войти' onClick={() => setPopupAction('login')} />
      <Popup
        position='center'
        isOpen={popupAction === 'login'}
        onClose={() => setPopupAction('')}
      >
        <PopupBtnClose onClick={() => setPopupAction('')} />
        <AuthenticationForm />
      </Popup>
    </>
  );
});

export default LogIn;
