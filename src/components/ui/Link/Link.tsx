import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import './link.scss';

const Link: React.FC<{
  href: string;
  children?: React.ReactNode;
}> = ({ href, children }) => (
  <RouterLink className='link' to={href}>{children}</RouterLink>
);

export default Link;
