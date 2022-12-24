import React, { FC } from 'react';

import Button from 'components/ui/Button';
import styles from './404.module.scss';

const Page404: FC = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>404 Страница не найдена!</h1>
    <Button variant='40-prim__simple' text='Вернуться на главную' href='/' />
  </div>
);

export default Page404;
