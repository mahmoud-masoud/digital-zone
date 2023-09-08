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
import ProductPageSkeleton from './components/ProductPageComponents/ProductPageSkeleton';

function App() {
  const LazyProductPage = lazy(() => import('./pages/ProductPage'));
  const LazyFavoritesPage = lazy(() => import('./pages/Favorites'));
  const LazyLoginPage = lazy(() => import('./pages/Login'));
  const LazySignupPage = lazy(() => import('./pages/Signup'));
  const LazyAdminPage = lazy(() => import('./pages/Admin'));
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
    {
      path: 'login',
      element: (
        <Suspense fallback={<Loading />}>
          <LazyLoginPage />
        </Suspense>
      ),
    },
    {
      path: 'signup',
      element: (
        <Suspense fallback={<Loading />}>
          <LazySignupPage />
        </Suspense>
      ),
    },
    {
      path: 'admin',
      element: (
        <Suspense fallback={<Loading />}>
          <LazyAdminPage />
        </Suspense>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      {/* <ProductPageSkeleton /> */}
    </>
  );
}
export default App;
