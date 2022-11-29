import React from 'react';
import { createRoot } from 'react-dom/client';

import './i18n'; // ! нужно импортировать ДО импорта компонентов, что бы библиотека инициализировалась

import App from 'components/App';
import { initMobx } from 'store';
import 'api';

initMobx();

const rootNode = document.getElementById('root');

if (!rootNode) {
  // eslint-disable-next-line no-alert
  alert('Критическая ошибка!');
} else {
  const root = createRoot(rootNode);
  root.render(<App />);
}
