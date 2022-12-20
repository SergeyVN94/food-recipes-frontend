import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from 'components/ui/Button';
import Popup from 'components/Popup';

type AuthFormState = {
  email: string;
  password: string;
};

const authFormInit: AuthFormState = { email: '', password: '' };

const AuthenticationForm: FC<{
  onSubmit: (formState: AuthFormState) => void;
}> = (({ onSubmit }) => {

  return (
    <Formik
      initialValues={authFormInit}
      onSubmit={onSubmit}
    >

    </Formik>
  );
});

export const LogIn: FC = observer(() => {

  return (
    <>
      <Button variant='32-sec__simple' text='Войти' />
      <Popup position='center'>

      </Popup>
    </>
  );
});

export default LogIn;
