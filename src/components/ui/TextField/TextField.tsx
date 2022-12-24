/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useRef,
  useEffect,
  useState,
  Ref,
} from 'react';
import { block } from 'bem-cn';
import _ from 'lodash';

import {
  HelperTextElement,
  LabelElement,
  VisiblePassButton,
  ClearButton,
} from './elements';
import { ITextFieldProps } from './types';
import './text-field.scss';

const b = block('text-field');

const TextField: React.FC<ITextFieldProps> = ({
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
  textarea,
  inputRef,
  actionClear = false,
  rows = 1,
}) => {
  const [focus, setFocus] = useState(focusInit);
  const [passVisible, setPassVisible] = useState(false);
  const inputRefCurrent = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  if (inputRef) _.set(inputRef, 'current', inputRefCurrent.current);

  useEffect(() => setFocus(focusInit), [focusInit]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ev => {
    ev.preventDefault();
    if (onChange) onChange(ev.target.value, ev.target.name);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = ev => {
    ev.preventDefault();
    setFocus(true);
    if (onFocus) onFocus(ev.target.name);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = ev => {
    ev.preventDefault();
    setFocus(false);
    if (onBlur) onBlur(ev.target.name);
  };

  const handleClear = () => {
    onChange('', name);
    setFocus(true);
    if (inputRefCurrent.current) inputRefCurrent.current.focus();
  };

  let inputType = type;
  if (type === 'password') inputType = passVisible ? 'text' : 'password';

  return (
    <div
      className={b({
        type,
        focus,
        disabled,
        textarea,
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
            {
              textarea
                ? (
                  <textarea
                    readOnly={!onChange}
                    autoComplete={autoComplete}
                    name={name}
                    className={b('input')}
                    disabled={disabled}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={inputRefCurrent as Ref<HTMLTextAreaElement>}
                    rows={rows}
                  />
                ) : (
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
                    ref={inputRefCurrent as Ref<HTMLInputElement>}
                  />
                )
            }
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
