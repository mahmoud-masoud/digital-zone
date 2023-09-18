// src/routes.js
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { motion } from 'framer-motion';

import Home from '../../pages/Home';
import Root from '../../components/Root';
import Cart from '../../pages/Cart';
import ErrorPage from '../../UI/ErrorPage';
import Loading from '../../UI/Loading';
import { lazy, Suspense } from 'react';
// import ProductPageSkeleton from './components/ProductPageComponents/ProductPageSkeleton';
import CategoryPage from '../../pages/CategoryPage';

const LazyProductPage = lazy(() => import('../../pages/ProductPage'));
const LazyFavoritesPage = lazy(() => import('../../pages/Favorites'));
const LazyLoginPage = lazy(() => import('../../pages/Login'));
const LazySignupPage = lazy(() => import('../../pages/SignupPage'));
const LazyAdminPage = lazy(() => import('../../pages/Admin'));
const AnimatedRoute = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0, width: '100%' }}
      exit={{ opacity: 0, x: -100, width: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'cart', element: <Cart /> },
      { path: 'ct/:category', element: <CategoryPage /> },

      {
        path: 'ip/:productId',
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
        path: 'ct/:category/:productId',
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
        <AnimatedRoute>
          <LazyLoginPage />
        </AnimatedRoute>
      </Suspense>
    ),
  },
  {
    path: 'signup',
    element: (
      <Suspense fallback={<Loading />}>
        <AnimatedRoute>
          <LazySignupPage />
        </AnimatedRoute>
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
