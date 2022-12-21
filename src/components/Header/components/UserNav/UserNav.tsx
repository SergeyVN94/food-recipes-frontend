import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import classNames from 'classnames/bind';

import { authenticationStore, userStore } from 'store';
import Preloader from 'components/ui/Preloader';
import BlurEventListener from 'components/ui/BlurEventListener/BlurEventListener';

import userAvatar from './images/account_avatar.svg';
import styles from './user-nav.module.scss';

const cx = classNames.bind(styles);

const UserAvatar: FC<{ onClick: () => void; }> = observer(({ onClick }) => (
  <img
    onClick={ev => {
      ev.preventDefault();
      ev.stopPropagation();
      onClick();
    }}
    className={cx('user-avatar')}
    src={userAvatar}
    alt='Меню'
    title='Меню'
  />
));

const UserNav: FC = observer(() => {
  const [subMenuVisible, setSubMenuVisible] = useState(false);

  useEffect(() => {
    const disposer = autorun(() => {
      if (!authenticationStore.isLoading && authenticationStore.isAuthenticated) {
        userStore.fetch();
      }
    });

    return disposer;
  }, []);

  const userReady = (userStore.data && !userStore.loading);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('head')}>
        { userReady && <UserAvatar onClick={() => setSubMenuVisible(prev => !prev)} /> }
        <Preloader
          position='center'
          size='small'
          visible={userStore.loading || authenticationStore.isLoading}
        />
      </div>
      <BlurEventListener onBlur={() => setSubMenuVisible(false)}>
        <nav className={cx('submenu', { visible: subMenuVisible })}>
          <Link className={cx('submenu-link')} to='/profile'>Профиль</Link>
          <Link className={cx('submenu-link')} to='/favorites'>Избранное</Link>
        </nav>
      </BlurEventListener>
    </div>
  );
});

export default UserNav;
