import { createBrowserRouter } from 'react-router-dom';
import { UiKit } from '../pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>
  },
  {
    path: '/ui-kit',
    element: <UiKit />
  }
]);

export default router;
