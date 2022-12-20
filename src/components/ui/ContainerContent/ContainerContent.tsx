import React, { FC } from 'react';

import { IContainerContentProps } from './types';
import styles from './container-content.module.scss';

export const ContainerContent: FC<IContainerContentProps> = ({ children }) => (
  <div className={styles['container-content']}>
    {children}
  </div>
);

export default ContainerContent;
