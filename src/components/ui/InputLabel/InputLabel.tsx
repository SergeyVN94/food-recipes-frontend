import React from 'react';
import { observer } from 'mobx-react';
import { block } from 'bem-cn';

import './input-label.scss';

const b = block('input-label');

const InputLabel: React.FC<{
  text: string;
  required?: boolean;
  pressed?: boolean;
  charLimitError?: boolean;
  charLimit?: {
    current: number;
    maximum: number;
  };
}> = observer(({
  text,
  charLimit,
  pressed,
  required,
  charLimitError,
}) => {
  const charLimitElement = charLimit
    ? (
      <span className={b('char-limit')}>
        {`(${charLimit.current}/${charLimit.maximum})`}
      </span>
    ) : null;

  return (
    <p className={b({ required, pressed, 'char-limit-error': Boolean(charLimitError) })}>
      <span className={b('text')}>{text}</span>
      {charLimitElement}
    </p>
  );
});

export default InputLabel;
