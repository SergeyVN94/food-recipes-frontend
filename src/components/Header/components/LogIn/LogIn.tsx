import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import classNames from 'classnames/bind';

import { authenticationStore } from 'store';
import Button from 'components/ui/Button';
import AuthForm from 'components/AuthForm';
import Popup, { PopupBtnClose } from 'components/Popup';

import styles from './login.module.scss';

const cx = classNames.bind(styles);

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
        <AuthForm />
      </Popup>
    </>
  );
});

export default LogIn;
