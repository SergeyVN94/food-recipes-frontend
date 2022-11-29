import React, { useCallback } from 'react';
import { block } from 'bem-cn';

import Icon from 'components/ui/Icon';

import {
  IBaseCheckInputProps,
  ICheckboxProps,
  IRadioProps,
} from './types';
import './check-input.scss';

const b = block('check-input');

interface IFullBaseInputProps extends IBaseCheckInputProps {
  type: 'checkbox' | 'radio';
  newInput: React.ReactElement;
  view: 'checkbox' | 'switch' | 'radio';
  value?: string;
}

const BaseCheckInput: React.FC<IFullBaseInputProps> = ({
  checked,
  onChange,
  label,
  name,
  disabled = false,
  type,
  newInput,
  value,
  view,
}) => {
  const handleChange: React.ChangeEventHandler = ev => {
    if (disabled) ev.preventDefault();
    else onChange(name);
  };

  return (
    <div
      className={b({
        disabled,
        checked,
        view,
        'with-label': Boolean(label),
      })}
    >
      <label className={b('label')}>
        <input
          className={b('input')}
          type={type}
          checked={checked}
          onChange={handleChange}
          name={name}
          disabled={disabled}
          value={value}
        />
        {newInput}
        {label && <span className={b('label-text')}>{label}</span>}
      </label>
    </div>
  );
};

export const Checkbox: React.FC<ICheckboxProps> = ({
  view = 'checkbox',
  ...otherProps
}) => {
  const newInput = view === 'checkbox'
    ? (
      <div className={b('checkbox')}>
        <div className={b('checkbox-icon')}>
          <Icon icon='check-small' color='white' size={{ w: 12, h: 9.83 }} />
        </div>
      </div>
    ) : (<div className={b('switch')} />);

  return (
    <BaseCheckInput
      {...otherProps}
      newInput={newInput}
      type='checkbox'
      view={view}
    />
  );
};

export const RadioButton: React.FC<IRadioProps> = ({
  name,
  value,
  onChange,
  ...otherProps
}) => {
  const newInput = (<div className={b('radio')} />);

  const handleChange = useCallback(() => {
    onChange(name, value);
  }, [name, value, onChange]);

  return (
    <BaseCheckInput
      {...otherProps}
      newInput={newInput}
      type='radio'
      view='radio'
      value={value}
      onChange={handleChange}
    />
  );
};

export default Checkbox;
