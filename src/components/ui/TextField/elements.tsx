import React from 'react';
import { block } from 'bem-cn';
import _ from 'lodash';

import InputLabel from 'components/ui/InputLabel';
import HelperText from 'components/ui/HelperText/HelperText';
import Icon, { IconsType } from 'components/ui/Icon';

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

type InputButtonProps = {
  onClick: (ev: React.MouseEvent) => void,
  type: 'password' | 'clear';
  show: boolean; // показать/скрыть пароль
  visible?: boolean; // отображать кнопку
};
export const InputButton: React.FC<InputButtonProps> = ({
  onClick,
  type,
  show,
  visible = true,
}) => {
  let icon: IconsType = 'eye';
  if (type === 'password') icon = show ? 'eye' : 'eye-closed';

  return (
    <button
      className={b('input-button', { visible: type === 'clear' && visible })}
      onClick={onClick}
      type='button'
    >
      <Icon color='interactive' icon={icon} />
    </button>
  );
};
