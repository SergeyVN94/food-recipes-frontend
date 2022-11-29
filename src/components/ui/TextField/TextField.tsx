/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import { block } from 'bem-cn';

import { HelperTextElement, LabelElement, InputButton } from './elements';
import { TextFieldProps } from './types';
import './text-field.scss';

const b = block('text-field');

/**
 * @param indent подпись под инпутом
 * @param error сообщение об ошибке
 * @param charLimit добавляет надпись к лейблу "(текущие кол символов/charLimit)"
 * @param charLimitError выделяет красным цветом текст с количеством символов у лейбла
 */
const TextField: React.FC<TextFieldProps> = ({
  value,
  onChange,
  onBlur,
  onFocus,
  required,
  disabled,
  focus: focusInit = false,
  type = 'text',
  name,
  error,
  label,
  indent,
  charLimit,
  charLimitError,
  autoComplete,
  elementBefore,
  elementAfter,
}) => {
  const [focus, setFocus] = useState(focusInit);
  const [passShow, setPassShow] = useState(false);

  const handleInputIconClick = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (type === 'password') setPassShow(prev => !prev);
  }, [type]);

  useEffect(() => setFocus(focusInit), [focusInit]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(ev => {
    ev.preventDefault();
    if (onChange) onChange(ev, ev.target.value, name);
  }, [onChange, name]);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(ev => {
    ev.preventDefault();
    setFocus(true);
    if (onFocus) onFocus(ev, ev.target.value, name);
  }, [onFocus, name]);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(ev => {
    ev.preventDefault();
    setFocus(false);
    if (onBlur) onBlur(ev, ev.target.value, name);
  }, [onBlur, name]);

  const InputIconElem = value.length > 0 && type === 'password'
    ? (<InputButton type='password' show={passShow} onClick={handleInputIconClick} />)
    : null;

  let inputType = type;
  if (type === 'password') inputType = passShow ? 'text' : 'password';

  return (
    <div
      className={b({
        type,
        focus,
        disabled,
        empty: value.length === 0,
        'with-error': Boolean(error),
        'with-label': Boolean(label),
      })}
    >
      <div className={b('container')}>
        <label className={b('input-layout')}>
          <LabelElement
            focus={focus}
            value={value}
            charLimit={charLimit}
            charLimitError={charLimitError}
            label={label}
            required={required}
          />
          <div className={b('input-wrapper')}>
            <input
              readOnly={!onChange}
              autoComplete={autoComplete}
              name={name}
              className={b('input')}
              type={inputType}
              disabled={disabled}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {InputIconElem}
          </div>
        </label>
      </div>
      <HelperTextElement value={error || indent || ''} />
    </div>
  );
};

export default TextField;
