/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { block } from 'bem-cn';
import _ from 'lodash';

import {
  HelperTextElement,
  LabelElement,
  VisiblePassButton,
  ClearButton,
} from './elements';
import { TextFieldProps } from './types';
import './text-field.scss';

const b = block('text-field');

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
  actionClear = false,
}) => {
  const [focus, setFocus] = useState(focusInit);
  const [passVisible, setPassVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setFocus(focusInit), [focusInit]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(ev => {
    ev.preventDefault();
    if (onChange) onChange(ev.target.value, ev.target.name);
  }, [onChange]);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(ev => {
    ev.preventDefault();
    setFocus(true);
    if (onFocus) onFocus(ev.target.name);
  }, [onFocus]);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(ev => {
    ev.preventDefault();
    setFocus(false);
    if (onBlur) onBlur(ev.target.name);
  }, [onBlur]);

  const handleClear = useCallback(() => {
    onChange('', name);
    setFocus(true);
    if (inputRef.current) inputRef.current.focus();
  }, [onChange, setFocus, name]);

  let inputType = type;
  if (type === 'password') inputType = passVisible ? 'text' : 'password';

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
              ref={inputRef}
            />
            <VisiblePassButton
              visible={type === 'password' && value.length > 0}
              show={passVisible}
              onClick={setPassVisible}
            />
            <ClearButton visible={actionClear && value.length > 0} onClick={handleClear} />
          </div>
        </label>
      </div>
      <HelperTextElement value={error || indent || ''} />
    </div>
  );
};

export default TextField;
