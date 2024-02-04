import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from 'src/routes';

const router = createBrowserRouter(Object.values(routes));

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
