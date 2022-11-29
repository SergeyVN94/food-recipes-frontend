import React from 'react';

export type SelectItem<D, I> = {
  id: I;
  label: string;
  data?: D;
};

export type SelectProps<D, I, T extends SelectItem<D, I>> = {
  items: T[];
  name?: string;
  label?: string;
  disabled?: boolean;
  search?: boolean;
  required?: boolean;
  error?: string;
  open?: boolean;
  focus?: boolean;
  actionClear?: boolean;
} & ({
  multiSelect: true;
  value: T['id'][] | null;
  onChange: (currentId: T['id'][] | null) => void;
} | {
  multiSelect?: false;
  value: T['id'] | null;
  onChange: (currentId: T['id'] | null) => void;
});

export type SelectItemProps<I> = {
  id: I;
  label: string;
  selected: boolean;
  onClick: (id: I) => void;
};

export type LabelElementProps = {
  label?: string;
  required?: boolean;
  focus?: boolean;
};

export type SelectedItemsContainerProps<D, I> = {
  items: SelectItem<D, I>[];
  multiSelect: boolean;
  onDelete: (id: I) => void;
};

export type ItemsListProps<D, I> = {
  items: SelectItem<D, I>[];
  selectedIds: I[];
  multiSelect: boolean;
  onSelect: (id: I) => void;
};

export type OriginalSelectProps<D, I> = {
  items: SelectItem<D, I>[];
  selectedIds: I[];
  multiSelect: boolean;
  name: string;
  disabled?: boolean;
};

export type SearchInputProps = {
  value: string;
  visible: boolean;
  onChange: (v: string) => void;
};
