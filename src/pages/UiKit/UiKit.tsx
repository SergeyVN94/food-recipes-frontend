import React from 'react';
import {
  Link,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { observer } from 'mobx-react';
import { block } from 'bem-cn';

import RootLayout from 'layouts/RootLayout';

import Colors from './components/Colors/Colors';
import Typography from './components/Typography/Typography';
import BaseComponents from './components/BaseComponents/BaseComponents';
import Dnd from './components/Dnd/Dnd';

import './ui-kit.scss';

const b = block('ui-kit');

const links = [
  { to: '/', label: 'Домашняя страница' },
  { to: 'colors', label: 'Цвета' },
  { to: 'typography', label: 'Шрифты' },
  { to: 'base-components', label: 'Базовые компоненты' },
  { to: 'dnd', label: 'React Dnd' },
];

const UiKit: React.FC = observer(() => {
  const location = useLocation();

  const navLinks = links.map(l => (
    <Link
      className={b('nav-link', { current: location.pathname.endsWith(l.to) })}
      to={l.to}
      key={l.to}
    >
      {l.label}
    </Link>
  ));

  return (
    <RootLayout>
      <div className={b()}>
        <nav className={b('nav')}>
          {navLinks}
        </nav>
        <div className={b('body')}>
          <Routes location={location}>
            <Route path='colors' element={<Colors />} />
            <Route path='typography' element={<Typography />} />
            <Route path='base-components' element={<BaseComponents />} />
            <Route path='dnd' element={<Dnd />} />
            <Route path='*' element={<Navigate to='colors' replace />} />
          </Routes>
        </div>
      </div>
    </RootLayout>
  );
});

export default UiKit;
