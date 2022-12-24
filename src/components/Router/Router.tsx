import React from 'react';
import { useRoutes } from 'react-router-dom';

import { routeMap } from './lib';

const Router: React.FC = () => useRoutes(routeMap);

export default Router;
