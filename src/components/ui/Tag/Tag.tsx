import React from 'react';
import { observer } from 'mobx-react';
import { block } from 'bem-cn';

import Icon from 'components/ui/Icon';

import './tag.scss';

const b = block('tag');

const Tag: React.FC<{
  onDelete: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  warning?: boolean;
}> = observer(({ label, onDelete, warning = false }) => (
  <div className={b({ warning })}>
    <p className={b('label')}>
      {label}
    </p>
    <button className={b('btn-close')} onClick={onDelete} type='button'>
      <Icon icon='close-small' color='black' />
    </button>
  </div>
));

export default Tag;
