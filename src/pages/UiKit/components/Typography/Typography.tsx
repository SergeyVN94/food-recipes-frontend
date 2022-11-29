import React from 'react';
import { block } from 'bem-cn';

import { groups } from './resource';
import './typography.scss';

const b = block('ui-kit-typography');

const Typography: React.FC = () => {
  const elements = groups.map(group => {
    const items = group.items.map(item => (
      <li className={b('text-group-item')} data-template={item.template} key={item.name}>
        <h4 className={b('text-group-item-title')}>{item.name}</h4>
        <p className={b('text-group-item-template')}>{`%${item.template}`}</p>
        <p className={b('text-group-item-example')} data-template={item.template}>{group.example}</p>
      </li>
    ));

    return (
      <div className={b('text-group')} key={group.title}>
        <h3 className={b('text-group-title')}>{group.title}</h3>
        <ul className={b('text-group-list')}>{items}</ul>
      </div>
    );
  });

  return (<div className={b()}>{elements}</div>);
};

export default Typography;
