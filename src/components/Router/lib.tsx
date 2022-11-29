import React from 'react';
import { RouteObject } from 'react-router-dom';

import Home from 'pages/Home';
import { UiKit } from 'pages';

export const routeMap: RouteObject[] = [
  { path: '/', element: <Home /> },
  // { path: '/material-editor/:id', element: <MaterialEditor /> },
  // { path: '/24hours', element: <Hours24 /> },
  // { path: '/materials', element: <MaterialsList /> },
  // { path: '/publications-marks/:markType', element: <Directory /> },
  // { path: '/page-constructor/:pageKey', element: <PageConstructor /> },
  // {
  //   path: '/team',
  //   element: <Team />,
  //   children: [{ path: '/team/:accountType', element: <Team /> }],
  // },
  // { path: '/menu/*', element: <SiteMenu /> },
  { path: '/ui-kit/*', element: <UiKit /> },
  // { path: '*', element: <Navigate to='/24hours' /> },
];
