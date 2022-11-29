import React from 'react';
import { block } from 'bem-cn';

import Icon from 'components/ui/Icon';

import { AccordionProps } from './types';
import './accordion.scss';

const b = block('accordion');

const Accordion: React.FC<AccordionProps> = ({
  label,
  expanded,
  onClick,
}) => (
  <div className={b({ expanded })}>
    <p className={b('label')} onClick={onClick}>{label}</p>
    <div className={b('icon')} onClick={onClick}>
      <Icon icon='plus-small' color='black' />
    </div>
  </div>
);

export default Accordion;
