import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { observer } from 'mobx-react';
import { HelmetProvider } from 'react-helmet-async';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Router } from 'components/Router';

import './app.scss';

declare global {
  const BASE_API_URL: string;
  const IS_PRODUCTION: boolean;
}

const ComponentWithError = () => (<p>Произошла ошибка.</p>); // TODO: Заменить

const App: React.FC = observer(() => (
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense fallback={(<p>Загрузка...</p>)}>
            <ErrorBoundary FallbackComponent={(ComponentWithError)}>
              <Router />
            </ErrorBoundary>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </DndProvider>
  </React.StrictMode>
));

export default App;
