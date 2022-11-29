export interface IBaseCheckInputProps {
  onChange: (name?: string) => void;
  checked: boolean;
  disabled?: boolean;
  name?: string;
  label?: string;
}

export interface ICheckboxProps extends IBaseCheckInputProps {
  view?: 'checkbox' | 'switch';
}

export interface IRadioProps extends Omit<IBaseCheckInputProps, 'onChange'> {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}
