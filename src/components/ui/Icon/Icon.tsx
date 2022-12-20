import React from 'react';
import { observer } from 'mobx-react';

import sprite from 'assets/images/icons/sprite.svg';

import { IIconProps } from './types';
import './icon.scss';

export const Icon: React.FC<IIconProps> = observer(({
  color,
  icon,
  size = 16,
  colorSecondary = '',
  customColor = '',
}) => {
  const w = (typeof size === 'number') ? size : size.w;
  const h = (typeof size === 'number') ? size : size.h;
  const classes = ['icon', `icon_name_${icon}`];
  if (color) classes.push(`icon_color_${color}`);
  if (colorSecondary) classes.push(`icon_color-secondary_${colorSecondary}`);

  const props: React.SVGProps<SVGUseElement> = {};
  if (customColor) props.fill = customColor;

  return (
    <svg className={classes.join(' ')} width={w} height={h}>
      <use href={`${sprite}#sprite-icon-${icon}`} width={w} height={h} {...props} />
    </svg>
  );
});

export default Icon;
