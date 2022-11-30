import React from 'react';

import Button from 'components/ui/Button';

import Popup from './Popup';
import {
  PopupBtnClose,
  PopupIcon,
  PopupTitle,
  PopupControl,
  PopupDescription,
} from './elements';

export const PopupDelete: React.FC<{
  title: string;
  description?: string;
  onDelete: () => void;
  onCancel: () => void;
  isOpen?: boolean;
}> = ({
  title,
  description,
  onDelete,
  onCancel,
  isOpen = true,
}) => (
  <Popup position='center' isOpen={isOpen} onShadowClick={onCancel} mode='error'>
    <PopupBtnClose onClick={onCancel} />
    <PopupIcon icon='trash' />
    <PopupTitle>{title}</PopupTitle>
    {description && <PopupDescription>{description}</PopupDescription>}
    <PopupControl>
      <Button
        type='button'
        onClick={onCancel}
        variant='40-prim__simple'
      >
        Нет, оставить
      </Button>
      <Button
        type='button'
        onClick={onDelete}
        variant='40-prim__simple'
      >
        Да, удалить
      </Button>
    </PopupControl>
  </Popup>
);

export const PopupInfo: React.FC<{
  title: string;
  onClose: () => void;
  isOpen?: boolean;
}> = ({ title, onClose, isOpen = true }) => (
  <Popup position='center' isOpen={isOpen} onShadowClick={onClose} mode='success'>
    <PopupBtnClose onClick={onClose} />
    <PopupIcon icon='trash_success' />
    <PopupTitle>{title}</PopupTitle>
    <PopupControl>
      <Button
        type='button'
        onClick={onClose}
        variant='40-confirm'
      >
        ОК
      </Button>
    </PopupControl>
  </Popup>
);
