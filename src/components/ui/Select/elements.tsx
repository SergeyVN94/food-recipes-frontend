import React, { useCallback } from 'react';
import _ from 'lodash';

import InputLabel from 'components/ui/InputLabel';
import HelperText from 'components/ui/HelperText/HelperText';
import Icon from 'components/ui/Icon/Icon';
import Tag from 'components/ui/Tag/Tag';

import {
  SelectItemProps,
  ItemsListProps,
  LabelElementProps,
  OriginalSelectProps,
  SelectedItemsContainerProps,
  SearchInputProps,
} from './types';
import { b } from './lib';

export function SelectItem<I>({
  id,
  label,
  onClick,
  selected,
}: SelectItemProps<I>): JSX.Element {
  const handleClick = useCallback(() => onClick(id), [id, onClick]);

  return (
    <li className={b('dropdown-item', { selected })} onClick={handleClick}>
      {label}
    </li>
  );
}

export const LabelElement: React.FC<LabelElementProps> = ({
  label,
  focus = false,
  required = false,
}) => (label ? (
  <div className={b('label', { focus })}>
    <InputLabel
      text={label}
      required={required}
      pressed={focus}
    />
  </div>
) : null);

export const HelperTextElement: React.FC<{ value: string }> = ({ value }) => (value ? (
  <div className={b('indent')}>
    <HelperText text={value} />
  </div>
) : null);

export const SelectedItemsContainer = (<D, I>(
  { items, multiSelect, onDelete }: SelectedItemsContainerProps<D, I>,
) => {
  const handleItemClick = useCallback((ev: React.MouseEvent, id: I) => {
    ev.preventDefault();
    ev.stopPropagation();
    onDelete(id);
  }, [onDelete]);

  return (
    <ul className={b('selected-items')}>
      {items.map(i => (
        <li className={b('selected-item')} key={i.label}>
          { multiSelect
            ? <Tag label={i.label} onDelete={ev => handleItemClick(ev, i.id)} />
            : <p className={b('selected-item-single')}>{i.label}</p> }
        </li>
      ))}
    </ul>
  );
});

// eslint-disable-next-line react/display-name
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(({
  value,
  visible = false,
  onChange,
}, ref) => {
  const handleChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => (
    onChange(ev.target.value)
  ), [onChange]);

  const handleClick = useCallback((ev: React.MouseEvent) => {
    if (visible) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }, [visible]);

  return (
    <div className={b('search-wrapper')}>
      <input
        className={b('search-input', { visible })}
        value={value}
        onChange={handleChange}
        autoComplete='off'
        name='select-search'
        ref={ref}
        onClick={handleClick}
      />
    </div>
  );
});

const EmptyItemsListPlaceholder: React.FC = () => (
  <p className={b('items-list-placeholder')}>Значения отсутствуют</p>
);

export const ItemsList = (<D, I>({
  items,
  selectedIds,
  multiSelect,
  onSelect,
}: ItemsListProps<D, I>) => {
  const handleListClick = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
  }, []);

  let itemsRes = items;
  if (multiSelect) itemsRes = itemsRes.filter(i => !selectedIds.includes(i.id));

  const itemsElements = itemsRes.map(i => (
    <SelectItem
      id={i.id}
      label={i.label}
      onClick={onSelect}
      selected={!multiSelect && selectedIds.includes(i.id)}
      key={i.label}
    />
  ));

  return (
    <ul className={b('items-list')} onClick={handleListClick}>
      {itemsElements.length ? itemsElements : <EmptyItemsListPlaceholder />}
    </ul>
  );
});

export const OriginalSelect = (<D, I>({
  items,
  selectedIds,
  multiSelect,
  name,
  disabled = false,
}: OriginalSelectProps<D, I>) => {
  const optionElements = items.map(i => (
    <option className={b('option')} key={i.label}>
      {i.label}
    </option>
  ));

  const value = items.filter(i => selectedIds.includes(i.id)).map(i => i.label);
  const handleChange = useCallback(() => {}, []);

  return (
    <select
      className={b('select')}
      multiple={multiSelect}
      name={name}
      value={multiSelect ? value : (value.pop() || '')}
      onChange={handleChange}
      disabled={disabled}
    >
      {optionElements}
    </select>
  );
});

export const IconExpend: React.FC<{ expanded: boolean }> = (({ expanded }) => (
  <div className={b('icon', { type: 'expand', expanded })}>
    <Icon icon='arrow-down' color='gray' />
  </div>
));

export const ButtonClear: React.FC<{
  hidden: boolean;
  onClick: (ev: React.MouseEvent) => void;
}> = (({ hidden, onClick }) => (
  <button
    className={b('button-icon', { action: 'clear', hidden })}
    onClick={onClick}
    type='button'
  >
    <Icon icon='close-circle' />
  </button>
));
