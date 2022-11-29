import React, { useEffect, useRef, useState } from 'react';
import { block } from 'bem-cn';

import { colors } from './resource';
import './colors.scss';

const b = block('ui-kit-colors');

const ColorItem: React.FC<{ color: string }> = ({ color }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [colorRes, setColor] = useState('');

  useEffect(() => {
    if (ref.current) {
      setColor(
        window.getComputedStyle(ref.current, null).getPropertyValue('background-color'),
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return (
    <li key={color} className={b('item')} data-color={color}>
      <div className={b('color-round')} ref={ref} />
      <p className={b('color-var')}>{`$color_${color} ${colorRes}`}</p>
    </li>
  );
};

const Colors: React.FC = () => {
  const elements = colors.map(c => <ColorItem color={c} key={c} />);

  return (
    <div className={b()}>
      <ul className={b('list')}>
        {elements}
      </ul>
    </div>
  );
};

export default Colors;
