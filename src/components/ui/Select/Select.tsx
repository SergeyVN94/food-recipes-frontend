/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { observer } from 'mobx-react';

import _ from 'lodash';

import {
  ItemsList,
  SearchInput,
  IconExpend,
  LabelElement,
  OriginalSelect,
  HelperTextElement,
  SelectedItemsContainer,
  ButtonClear,
} from './elements';
import { SelectItem, SelectProps } from './types';
import { b } from './lib';
import './select.scss';
import BlurEventListener from '../BlurEventListener/BlurEventListener';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const Select = observer(<D extends unknown, I, T extends SelectItem<D, I>>({
  items: itemsInit,
  multiSelect = false,
  onChange,
  value,
  disabled,
  label,
  search = false,
  required = false,
  name = '',
  error = '',
  focus: focusInit = false,
  actionClear = false,
}: SelectProps<D, I, T>): JSX.Element => {
  const [filter, setFilter] = useState('');
  const [focus, setFocus] = useState(focusInit);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const selectedItemsIds: T['id'][] = useMemo(() => (
    _.isNull(value) ? [] : _.castArray(value)
  ), [value]);

  const items = useMemo(() => ((!search || filter.length === 0)
    ? itemsInit
    : itemsInit.filter(i => i.label.toLowerCase().includes(filter.toLowerCase()))
  ), [search, filter, itemsInit]);

  const selectedItems = selectedItemsIds
    .map(id => items.find(i => i.id === id))
    .filter(Boolean) as T[];

  const handleBlur = useCallback(() => {
    setFocus(false);
  }, [setFocus]);

  useEffect(() => {
    if (!focus) setFilter('');
    if (searchInputRef.current && focus) searchInputRef.current.focus();
  }, [focus, searchInputRef.current, setFilter]);

  const handleChange = useCallback((id: I) => {
    if (!multiSelect) setFocus(false);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange(multiSelect ? _.concat(selectedItemsIds, id) : id);
  }, [multiSelect, onChange, selectedItemsIds]);

  const handleHeadClick = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    setFocus(prev => !prev);
  }, [setFocus]);

  const handleItemDelete = useCallback((id: I) => {
    if (!multiSelect) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange(value.filter(i => i !== id));
  }, [items, multiSelect, onChange]);

  const handleClear = useCallback((ev: React.MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    onChange(null);
  }, [multiSelect, onChange]);

  useEffect(() => {
    setFocus(focusInit);
    if (searchInputRef.current) searchInputRef.current.focus();
  }, [focusInit, setFocus, searchInputRef.current]);

  const bemMods = {
    focus,
    disabled,
    empty: selectedItemsIds.length === 0,
    'with-label': Boolean(label),
    'with-error': Boolean(error),
  };

  return (
    <BlurEventListener onBlur={handleBlur}>
      <div className={b(bemMods)}>
        <div className={b('head')} onClick={handleHeadClick}>
          <div className={b('inner-wrap')}>
            <div className={b('main')}>
              <OriginalSelect
                disabled={disabled}
                name={name}
                items={items}
                multiSelect={multiSelect}
                selectedIds={selectedItemsIds}
              />
              <LabelElement
                label={label}
                required={required}
                focus={focus || selectedItems.length > 0}
              />
              <SelectedItemsContainer
                items={selectedItems}
                onDelete={handleItemDelete}
                multiSelect={multiSelect}
              />
              <SearchInput
                value={filter}
                onChange={setFilter}
                visible={focus && search}
                ref={searchInputRef}
              />
            </div>
            <ButtonClear
              hidden={_.isNull(value) || (_.isArray(value) && value.length === 0)}
              onClick={handleClear}
            />
            <IconExpend expanded={focus} />
          </div>
          <HelperTextElement value={error} />
        </div>
        <CSSTransition
          in={focus}
          nodeRef={bodyRef}
          timeout={200}
          classNames={b('body').toString()}
          unmountOnExit
        >
          <div className={b('body')} ref={bodyRef}>
            <ItemsList
              items={items}
              selectedIds={selectedItemsIds}
              onSelect={handleChange}
              multiSelect={multiSelect}
            />
          </div>
        </CSSTransition>
      </div>
    </BlurEventListener>
  );
});

export default Select;
