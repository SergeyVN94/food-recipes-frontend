import React from 'react';

export interface TextFieldProps {
  value: string;
  onChange: (value: string, name?: string) => void;
  onBlur?: (name?: string) => void;
  onFocus?: (name?: string) => void;
  focus?: boolean;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'tel' | 'url';
  name?: string;
  error?: string;
  label?: string;
  indent?: string;
  charLimit?: number;
  actionClear?: boolean;
  charLimitError?: boolean;
  elementBefore?: 'dnd' | 'emailIcon';
  elementAfter?: 'cancel-btn' | 'delete-btn' | 'search' | 'search-with-btn';
  autoComplete?: 'on' | 'off' | 'email' | 'password' | 'new-password' | 'date';
}
