import React from 'react';
import { block } from 'bem-cn';
import _ from 'lodash';

const b = block('ui-kit-base-components');

export const ComponentsGroup: React.FC<{
  title: string;
  children?: React.ReactNode;
}> = ({ title, children }) => {
  const childrenArr = _.concat(children);

  if (childrenArr.length === 0) return null;

  const body = (childrenArr.length === 1)
    ? (<div className={b('group-body')}>{childrenArr}</div>)
    : (
      <div className={b('group-body')}>
        <ul className={b('group-list')}>
          { childrenArr.map(c => (<li className={b('group-item')} key={c?.toString()}>{c}</li>)) }
        </ul>
      </div>
    );

  return (
    <div className={b('group')}>
      <h3 className={b('group-title')}>{title}</h3>
      {body}
    </div>
  );
};

export const Row: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className={b('row')}>{children}</div>
);

export const Column: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className={b('column')}>{children}</div>
);

export const ColumnItem: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className={b('column-item')}>{children}</div>
);
