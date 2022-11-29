import React from 'react';
import { observer } from 'mobx-react';
import { block } from 'bem-cn';

import './date-time-picker.scss';

const b = block('date-time-picker');

const DateTimePicker: React.FC = observer(() => (
  <div className={b()} />
));

export default DateTimePicker;
