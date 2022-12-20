import { icons } from './lib';

export type IconsType = typeof icons[number];
export type IconColor = 'interactive' | 'black' | 'white' | 'gray' | 'danger' | 'light';

export interface IIconProps {
  icon: IconsType;
  color?: IconColor;
  customColor?: string;
  colorSecondary?: string;
  size?: { w: number, h: number } | number;
}
