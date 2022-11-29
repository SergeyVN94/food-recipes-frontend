import React from 'react';
import { block } from 'bem-cn';
import _ from 'lodash';

import InputLabel from 'components/ui/InputLabel';
import HelperText from 'components/ui/HelperText/HelperText';
import Icon from 'components/ui/Icon';

const b = block('text-field');

export const LabelElement: React.FC<{
  label?: string;
  charLimit?: number;
  charLimitError?: boolean;
  required?: boolean;
  focus?: boolean;
  value: string;
}> = ({
  charLimit = null,
  label,
  charLimitError,
  value,
  focus = false,
  required = false,
}) => {
  if (!label) return null;

  const charLimitState = _.isNumber(charLimit) && (focus || value.length > 0)
    ? ({ maximum: charLimit, current: value.length })
    : undefined;

  return (
    <span className={b('label')}>
      <InputLabel
        text={label}
        charLimit={charLimitState}
        charLimitError={charLimitError}
        required={required}
        pressed={focus || value.length !== 0}
      />
    </span>
  );
};

export const HelperTextElement: React.FC<{ value: string }> = ({ value }) => (
  !value ? null : (
    <div className={b('indent')}>
      <HelperText text={value} />
    </div>
  )
);

export const VisiblePassButton: React.FC<{
  onClick: (nextState: boolean) => void,
  show: boolean; // показать/скрыть пароль
  visible?: boolean; // отображать кнопку
}> = ({
  onClick,
  show,
  visible = true,
}) => (
  <button
    className={b('input-button', { action: 'pass-visible', hidden: !visible })}
    onClick={ev => {
      ev.preventDefault();
      ev.stopPropagation();
      onClick(!visible);
    }}
    type='button'
  >
    <Icon color='interactive' icon={show ? 'eye' : 'eye-closed'} />
  </button>
);

export const ClearButton: React.FC<{
  onClick: () => void,
  visible?: boolean; // отображать кнопку
}> = ({ onClick, visible = true }) => (
  <button
    className={b('input-button', { action: 'clear', hidden: !visible })}
    onClick={onClick}
    type='button'
  >
    <Icon color='black' icon='close-circle' />
  </button>
);
