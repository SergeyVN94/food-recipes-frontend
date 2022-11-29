import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Grid from 'components/ui/Grid';

import styles from './header.module.scss';
import logoImg from './logo.svg';

const cx = classNames.bind(styles);

const Header: FC = () => (
  <header className={cx('header')}>
    <Grid>
      <Link to='/' className={cx('logo')}>
        <img className={cx('logo-img')} src={logoImg} alt='Сайт рецептов' />
      </Link>
    </Grid>
  </header>
);

export default Header;
