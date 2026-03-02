import { createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import { CartsListPage } from './pages/carts-list-page';
import { CartDetailsPage } from './pages/cart-details-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <CartsListPage />,
      },
      {
        path: '/carts/:id',
        element: <CartDetailsPage />,
      },
    ],
  },
]);
