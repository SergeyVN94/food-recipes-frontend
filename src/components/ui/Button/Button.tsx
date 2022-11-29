import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { block, BemMods } from 'bem-cn';

import { ButtonProps } from './types';
import { ButtonInner } from './elements';
import './button.scss';

const b = block('button');

const Button: React.FC<ButtonProps> = observer(props => {
  const {
    href,
    onClick,
    type = 'button',
    variant,
    disabled,
    fullWidth,
  } = props;
  const bemMods: BemMods = {
    variant,
    disabled,
    'full-width': fullWidth,
    loading: ('loading' in props) && props.loading,
  };

  const handleClick = useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(ev);
  }, [onClick]);

  const inner = <ButtonInner {...props} />;

  const buttonElement = href
    ? <Link className={b(bemMods)} to={href}>{inner}</Link>
    : (
      <button
        className={b(bemMods)}
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={props.disabled}
        onClick={handleClick}
      >
        {inner}
      </button>
    );

  return buttonElement;
});

export default Button;
