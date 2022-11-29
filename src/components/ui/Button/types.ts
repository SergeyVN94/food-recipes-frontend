import React from 'react';

import { IconsType } from 'components/ui/Icon/types';

type Button48Props = {
  disabled?: boolean;
} & ({
  variant: '48-del' | '48-sec';
} | {
  variant: '48-cnfrm' | '48-prim';
  loading?: boolean;
});

type Button40Props = {
  disabled?: boolean;
} & ({
  variant: '40-prim__add' | '40-prim__simple' | '40-sec__simple' | '40-confirm_sec' | '40-del';
} | {
  variant: '40-prim__move' | '40-sec__move';
  onDndStart: () => void;
} | {
  variant: '40-prim__move-selected' | '40-sec__move-selected';
  onDndStart: () => void;
  onClose: () => void;
} | {
  variant: '40-prim__icon';
  icon: IconsType;
} | {
  variant: '40-confirm';
  loading?: boolean;
});

type Button32Props = {
  disabled?: boolean;
} & ({
  variant: '32-prim__add' | '32-prim__simple' | '32-sec__simple' | '32-confirm' | '32-del' | '32-ghost' | '32-ghost_post' | '32-ghost_stat' | '32-ghost_del' | '32-ghost-icon__ui-background__edit' | '32-ghost-icon__ui-background__delete' | '32_inverse' | '32-wysiwyg__text';
} | {
  variant: '32-prim__move' | '32-sec__move';
  onDndStart: () => void;
} | {
  variant: '32-prim__move-selected' | '32-sec__move-selected';
  onDndStart: () => void;
  onClose: () => void;
} | {
  variant: '32-wysiwyg__icon' | '32-transp__dark' | '32-transp__light' | '32-block',
  icon: IconsType;
} | {
  variant: '32-pagination',
  selected: boolean;
});

export type ButtonProps = {
  text?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
} & (Button48Props | Button40Props | Button32Props);
