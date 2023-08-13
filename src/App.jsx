import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './components/Root';
import Laptops from './components/Laptops/Laptops';
import Headphones from './components/Headphones/Headphones';
import MobilePhones from './components/MobilePhones/MobilePhones';
import SmartWatches from './components/SmartWatches/SmartWatches';

import Cart from './pages/Cart';
import ErrorPage from './UI/ErrorPage';
import Loading from './UI/Loading';

import { lazy, Suspense } from 'react';

function App() {
  const LazyProductPage = lazy(() => import('./pages/ProductPage'));
  const LazyFavoritesPage = lazy(() => import('./pages/Favorites'));
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        { path: 'cart', element: <Cart /> },
        { path: 'laptops', element: <Laptops /> },
        { path: 'headphones', element: <Headphones /> },
        { path: 'mobile-phones', element: <MobilePhones /> },
        { path: 'smart-watches', element: <SmartWatches /> },
        {
          path: ':productId',
          element: (
            <Suspense fallback={<Loading />}>
              <LazyProductPage />
            </Suspense>
          ),
        },
        {
          path: 'favorites',
          element: (
            <Suspense fallback={<Loading />}>
              <LazyFavoritesPage />
            </Suspense>
          ),
        },
        {
          path: 'laptops/:productId',
          element: (
            <Suspense fallback={<Loading />}>
              <LazyProductPage />
            </Suspense>
          ),
        },
        {
          path: 'headphones/:productId',
          element: (
            <Suspense fallback={<Loading />}>
              <LazyProductPage />
            </Suspense>
          ),
        },
        {
          path: 'mobile-phones/:productId',
          element: (
            <Suspense fallback={<Loading />}>
              <LazyProductPage />
            </Suspense>
          ),
        },
        {
          path: 'smart-watches/:productId',
          element: (
            <Suspense fallback={<Loading />}>
              <LazyProductPage />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
