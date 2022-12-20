import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';

import { authenticationStore } from 'store';
import ContainerContent from 'components/ui/ContainerContent';

import UserNav from './components/UserNav';
import LogIn from './components/LogIn';
import styles from './header.module.scss';
import logoImg from './logo.svg';

const cx = classNames.bind(styles);

const Header: FC = observer(() => (
  <header className={cx('header')}>
    <ContainerContent>
      <div className={cx('content')}>
        <Link to='/' className={cx('logo')}>
          <img className={cx('logo-img')} src={logoImg} alt='Сайт рецептов' />
        </Link>
        <div className={cx('user-panel')}>
          { authenticationStore.isAuthenticated ? <UserNav /> : <LogIn /> }
        </div>
      </div>
    </ContainerContent>
  </header>
));

export default Header;
