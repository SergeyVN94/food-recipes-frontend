import React, { FC } from 'react';

import { GridProps } from './types';
import styles from './grid.module.scss';

export const Grid: FC<GridProps> = ({ children }) => (
  <div className={styles['container-content']}>
    {children}
  </div>
);

export default Grid;
