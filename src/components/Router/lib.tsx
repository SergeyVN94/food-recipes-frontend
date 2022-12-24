import React from 'react';
import { RouteObject } from 'react-router-dom';

import Home from 'pages/Home';
import Recipe from 'pages/Recipe';
import RecipeEditor from 'pages/RecipeEditor';
import Page404 from 'pages/404';
import { UiKit } from 'pages';

export const routeMap: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/recipe/:slug', element: <Recipe /> },
  { path: '/recipe-editor/:id', element: <RecipeEditor /> },
  { path: '/recipe-editor', element: <RecipeEditor /> },
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
  { path: '*', element: <Page404 /> },
];
