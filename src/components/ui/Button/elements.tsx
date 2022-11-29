import React, { useCallback, useMemo } from 'react';
import { block, BemMods } from 'bem-cn';
import _ from 'lodash';

import Icon, { IconColor, IconProps } from 'components/ui/Icon';

import { ButtonProps } from './types';

const b = block('button');

const InnerWrapper: React.FC<{
  bemMods: BemMods;
  children?: React.ReactNode;
}> = ({ bemMods = {}, children }) => (
  <span className={b('inner', bemMods)}>
    {children}
  </span>
);

const ButtonText: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <span className={b('text')}>{children}</span>
);

const IconPlus: React.FC<{ color: IconColor }> = ({ color }) => (
  <span className={b('icon-add')}>
    <Icon icon='add' color={color} />
  </span>
);

export const ButtonInner: React.FC<ButtonProps> = (props => {
  const { variant, disabled, text } = props;

  const handleClose: React.MouseEventHandler = useCallback(ev => {
    ev.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    if ('onClose' in props) props.onClose();
  }, [props]);

  const bemMods = useMemo(() => {
    const size = parseInt(variant.slice(0, 2), 10);

    let theme = 'primary';
    if (variant.includes('-sec')) theme = 'secondary';

    let color = 'interactive';
    if (variant.includes('-del')) color = 'danger';
    if (variant.includes('-cnfrm') || variant.includes('-confirm')) color = 'success';
    if (variant.includes('-block')) color = 'transparent';

    return ({
      theme,
      color,
      size: Number.isNaN(size) ? false : size,
    });
  }, [variant]);

  const iconColor = (variant.includes('-prim') || disabled) ? 'white' : 'gray';
  const elementIconPlus = variant.includes('__add') && (<IconPlus color={iconColor} />);
  const elementIconMove = variant.includes('__move') && (
    <span className={b('icon-move')}>
      <Icon icon='dots-vertical' color={iconColor} />
    </span>
  );
  const elementIconSelected = variant.includes('-selected') && (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span className={b('icon-selected')} onClick={handleClose}>
      <Icon icon='close' color={iconColor} />
    </span>
  );
  const elementIcon = variant.includes('-block') && (
    <span className={b('icon')}>
      <Icon icon={_.get(props, 'icon') as unknown as IconProps['icon']} color={iconColor} />
    </span>
  );

  return (
    <InnerWrapper {...props} bemMods={bemMods}>
      {elementIcon}
      {elementIconPlus}
      {elementIconMove}
      <ButtonText>{text}</ButtonText>
      {elementIconSelected}
    </InnerWrapper>
  );
});
