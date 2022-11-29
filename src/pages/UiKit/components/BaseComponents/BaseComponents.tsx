import React, { useState } from 'react';
import { block } from 'bem-cn';

import Accordion from 'components/ui/Accordion';
import Button from 'components/ui/Button/Button';
import Checkbox, { RadioButton } from 'components/ui/CheckInput/CheckInput';
import HelperText from 'components/ui/HelperText/HelperText';
import InputLabel from 'components/ui/InputLabel/InputLabel';
import Preloader from 'components/ui/Preloader/Preloader';
import Select from 'components/ui/Select/Select';
import Tag from 'components/ui/Tag/Tag';
import TextField from 'components/ui/TextField';
import Link from 'components/ui/Link/Link';

import {
  ComponentsGroup,
  Row,
  Column,
  ColumnItem,
} from './elements';
import './base-components.scss';

const b = block('ui-kit-base-components');

const BaseComponents: React.FC = () => {
  const [state, setState] = useState({
    accordion: false,
    checkbox: false,
    checkboxDisabled: false,
    switchState: false,
    radio: '1',
    input1: '',
    password: '',
    select1: {
      items: [
        { id: 1, label: '1', data: 1 },
        { id: 3, label: '3', data: 3 },
        { id: 5, label: '5', data: 5 },
        { id: 6, label: '6', data: 6 },
        { id: 22, label: '22', data: 22 },
        { id: 45, label: '45', data: 45 },
        { id: 71, label: '71', data: 71 },
      ],
      selected: null as number[] | null,
    },
    select2: {
      items: [
        { id: Symbol('1'), label: '1', data: '1' },
        { id: Symbol('3'), label: '3', data: '3' },
        { id: Symbol('5'), label: '5', data: '5' },
        { id: Symbol('6'), label: '6', data: '6' },
        { id: Symbol('33'), label: '22', data: '22' },
        { id: Symbol('45'), label: '45', data: '45' },
        { id: Symbol('71'), label: '71', data: '71' },
      ],
      selected: null as symbol | null,
    },
  });

  type StateKeys = keyof (typeof state);

  const updateState = (key: StateKeys, value: boolean | number | string) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={b()}>
      <Row>
        <Column>
          <ColumnItem>
            <ComponentsGroup title='Общие компоненты'>
              <Accordion
                label='Аккардион'
                expanded={state.accordion}
                onClick={() => updateState('accordion', !state.accordion)}
              />
              <Preloader visible size='small' />
              <Preloader visible size='large' bgBlur />
              <Link href='/'>Ссылка на домашнюю страницу</Link>
              <Tag label='тег обычный' onDelete={console.log} />
              <Tag label='тег с варнингом' warning onDelete={console.log} />
            </ComponentsGroup>
          </ColumnItem>
          <ColumnItem>
            <ComponentsGroup title='Элементы инпута'>
              <HelperText text='Helper text' />
              <InputLabel text='InputLabel' />
              <InputLabel text='InputLabel | Обязательный' required />
              <InputLabel
                text='InputLabel | Обязательный | С лимитом символов'
                required
                charLimit={{ current: 10, maximum: 150 }}
              />
              <InputLabel
                text='InputLabel | Обязательный | С лимитом символов | С ошибкой'
                required
                charLimitError
                charLimit={{ current: 0, maximum: 150 }}
              />
              <InputLabel
                text='InputLabel | Обязательный | Инпут в фокусе'
                required
                pressed
              />
            </ComponentsGroup>
          </ColumnItem>
          <ColumnItem>
            <ComponentsGroup title='Булевый инпут'>
              <Checkbox
                label='Чекбокс'
                checked={state.checkbox}
                onChange={() => updateState('checkbox', !state.checkbox)}
              />
              <Checkbox
                disabled
                label='Чекбокс задизейбленный'
                checked={state.checkboxDisabled}
                onChange={() => updateState('checkbox', !state.checkbox)}
              />
              <Checkbox
                label='Свитч'
                checked={state.switchState}
                onChange={() => updateState('switchState', !state.switchState)}
                view='switch'
              />
              <RadioButton
                label='RadioButton 1'
                name='radio'
                value='1'
                checked={state.radio === '1'}
                onChange={(_, val) => updateState('radio', val)}
              />
              <RadioButton
                label='RadioButton 2'
                name='radio'
                value='2'
                checked={state.radio === '2'}
                onChange={(_, val) => updateState('radio', val)}
              />
            </ComponentsGroup>
          </ColumnItem>
        </Column>
        <Column>
          <ColumnItem>
            <ComponentsGroup title='Кнопки'>
              <Button variant='48-cnfrm' text='Кнопка 48-cnfrm' />
              <Button variant='48-cnfrm' disabled text='Кнопка 48-cnfrm disabled' />
              <Button variant='48-cnfrm' loading text='Кнопка 48-cnfrm loading' />
              <Button variant='48-del' text='Кнопка 48-del' />
              <Button variant='48-prim' text='Кнопка 48-prim' />
              <Button variant='48-prim' loading text='Кнопка 48-prim loading' />
              <Button variant='48-sec' text='Кнопка 48-sec' />
              <Button variant='40-prim__add' text='Кнопка 40-prim__add' />
              <Button variant='40-prim__add' disabled text='Кнопка 40-prim__add disabled' />
              <Button variant='40-prim__simple' text='Кнопка 40-prim__simple' />
              <Button
                variant='40-prim__move'
                onDndStart={() => (undefined)}
                text='Кнопка 40-prim__move'
              />
              <Button
                variant='40-prim__move-selected'
                onDndStart={() => (undefined)}
                onClose={() => (undefined)}
                text='Кнопка 40-prim__move-selected'
              />
              <Button variant='40-sec__simple' text='Кнопка 40-sec__simple' />
              <Button
                variant='40-sec__move'
                onDndStart={() => (undefined)}
                text='Кнопка 40-sec__move'
              />
              <Button
                variant='40-sec__move-selected'
                onDndStart={() => (undefined)}
                onClose={() => (undefined)}
                text='Кнопка 40-sec__move-selected'
              />
              <Button
                variant='40-sec__move-selected'
                onDndStart={() => (undefined)}
                onClose={() => (undefined)}
                disabled
                text='Кнопка 40-sec__move-selected disabled'
              />
            </ComponentsGroup>
          </ColumnItem>
        </Column>
        <Column>
          <ColumnItem>
            <ComponentsGroup title='Инпуты'>
              <TextField
                value={state.input1}
                onChange={value => updateState('input1', value)}
                label='TextField'
                charLimit={50}
                charLimitError={state.input1.length === 0}
                required
                error={state.input1.length === 0 ? 'Заполните поле' : ''}
                autoComplete='off'
              />
              <TextField
                value={state.password}
                onChange={value => updateState('password', value)}
                label='TextField Password'
                type='password'
                charLimit={50}
                charLimitError={state.password.length === 0}
                required
                error={state.password.length === 0 ? 'Заполните поле' : ''}
                autoComplete='off'
              />
            </ComponentsGroup>
          </ColumnItem>
          <ColumnItem>
            <ComponentsGroup title='Дропдаун'>
              <Select
                label='Много элементов'
                items={state.select1.items}
                value={state.select1.selected}
                multiSelect
                search
                onChange={ids => setState(prev => ({
                  ...prev,
                  select1: { ...prev.select1, selected: ids },
                }))}
              />
              <Select
                label='Одиночный элемент'
                items={state.select2.items}
                value={state.select2.selected}
                search
                actionClear
                onChange={id => setState(prev => ({
                  ...prev,
                  select2: { ...prev.select2, selected: id },
                }))}
              />
            </ComponentsGroup>
          </ColumnItem>
        </Column>
      </Row>
    </div>
  );
};

export default BaseComponents;
