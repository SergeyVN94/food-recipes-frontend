import React from 'react';
import { useRoutes } from 'react-router-dom';
import { observer } from 'mobx-react';

import { routeMap } from './lib';

const Router: React.FC = observer(() => useRoutes(routeMap));

export default Router;
