import React, { useState } from 'react';
import { block } from 'bem-cn';
import { useDrag, useDrop } from 'react-dnd';

import Icon from 'components/ui/Icon';

import './dnd.scss';

const b = block('dnd');

type ListItem = {
  label: string;
  order: number;
};

const DndType = 'UiKit_Dnd_Example';
const itemsInit: ListItem[] = [];
for (let i = 0; i < 4; i += 1) {
  itemsInit.push({ label: `card ${i + 1}`, order: i });
}

const CardElement: React.FC<{
  item: ListItem;
  replaceItems: (a: ListItem, b: ListItem) => void;
}> = ({ item, replaceItems }) => {
  const [{ isDragging }, dragRef, dragPreview] = useDrag(() => ({
    item,
    type: DndType,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      targetBox: monitor.getClientOffset(),
    }),
  }));

  const [, dropRef] = useDrop(() => ({
    accept: DndType,
    hover: (dragItem: ListItem) => {
      replaceItems(dragItem, item);
    },
  }));

  return (
    <div className={b('drop-wrap')} ref={dropRef}>
      <li
        className={b('item')}
        ref={dragPreview}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className={b('drag-btn')} ref={dragRef}>
          <Icon icon='dots-vertical' color='black' />
        </div>
        {item.label}
      </li>
    </div>
  );
};

const Dnd: React.FC = () => {
  const [items, setItems] = useState([...itemsInit]);

  const replaceItems = (a1: ListItem, a2: ListItem) => {
    setItems(prev => {
      const newArr = [...prev];
      const aIndex = prev.findIndex(i => i.label === a1.label);
      const bIndex = prev.findIndex(i => i.label === a2.label);

      if (aIndex !== -1 && bIndex !== -1) {
        const tmp = newArr[aIndex];
        newArr[aIndex] = newArr[bIndex];
        newArr[bIndex] = tmp;
        // eslint-disable-next-line no-param-reassign
        newArr.forEach((el, i) => { el.order = i; });
      }

      return newArr;
    });
  };

  const itemsElements = items.map(i => (
    <CardElement key={i.label} item={i} replaceItems={replaceItems} />
  ));

  return (
    <div className={b()}>
      <ul className={b('list')}>
        {itemsElements}
      </ul>
    </div>
  );
};

export default Dnd;
