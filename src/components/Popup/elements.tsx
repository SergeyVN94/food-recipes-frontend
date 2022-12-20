import React from 'react';
import { block } from 'bem-cn';
import _ from 'lodash';
import Icon from 'components/ui/Icon';

const b = block('popup');

export const PopupBtnBack: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <button className={b('button-go-back')} onClick={() => onClick && onClick()} type='button'>
    <span className={b('button-go-back-inner')}>
      <span className={b('button-go-back-icon')} />
      Назад
    </span>
  </button>
);

export const PopupBtnClose: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    type='button'
    className={b('button-close')}
    aria-label='close button'
    onClick={() => onClick && onClick()}
  >
    <Icon icon='close' />
  </button>
);

export const PopupHead: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className={b('head')}>{children}</div>
);
export const PopupTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h3 className={b('title')}>{children}</h3>
);
export const PopupDescription: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className={b('description')}>{children}</div>
);
export const PopupControl: React.FC<{ children?: React.ReactNode }> = ({ children = [] }) => {
  const childElements = _.castArray(children).map(c => (
    <div className={b('control-item')} key={c?.toString()}>{c}</div>
  ));

  return (<div className={b('control')}>{childElements}</div>);
};
export const PopupIcon: React.FC<{ icon: string }> = ({ icon }) => (
  <div className={b('icon')} data-icon={icon} />
);
