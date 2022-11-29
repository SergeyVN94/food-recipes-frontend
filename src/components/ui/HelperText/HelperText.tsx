import React from 'react';
import { observer } from 'mobx-react';

import Icon from 'components/ui/Icon';

import './helper-text.scss';

const HelperText: React.FC<{ text: string }> = observer(({ text }) => (
  <p className='helper-text'>
    <span className='helper-text__icon'>
      <Icon icon='error-small' color='danger' />
    </span>
    <span className='helper-text__text'>{text}</span>
  </p>
));

export default HelperText;
