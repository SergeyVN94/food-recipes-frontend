import React, { useEffect } from 'react';
import { block } from 'bem-cn';

import './popup.scss';

const b = block('popup');

export type PopupProps = {
  maxWidth?: string;
  isOpen?: boolean;
  position?: 'center' | 'right' | 'left';
  mode?: 'error' | 'success';
  onShadowClick?: () => void;
  children?: React.ReactNode;
};

const Popup: React.FC<PopupProps> = ({
  children,
  onShadowClick,
  isOpen = false,
  position = 'right',
  mode = '',
  maxWidth = '',
}) => {
  useEffect(() => {
    if (isOpen) document.body.classList.add('no-scroll');
    else if (!isOpen) document.body.classList.remove('no-scroll');
  }, [isOpen]);

  const handleShadowClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    const { target } = ev;
    if (!(target instanceof HTMLElement)) return;
    if (
      !target.classList.contains(b().toString())
      && !target.classList.contains(b('wrapper').toString())
    ) return;
    if (onShadowClick) onShadowClick();
  };

  const styles: React.CSSProperties = {};

  if (maxWidth) styles.maxWidth = maxWidth;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={b({ open: isOpen, position, mode })} onMouseDown={handleShadowClick}>
      <div className={b('content')} style={styles}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
