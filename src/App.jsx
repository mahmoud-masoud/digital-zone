import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './pages/Home';
// import Root from './components/Root';
// import Cart from './pages/Cart';
// import ErrorPage from './UI/ErrorPage';
// import Loading from './UI/Loading';
// import { lazy, Suspense } from 'react';
// import ProductPageSkeleton from './components/ProductPageComponents/ProductPageSkeleton';
// import CategoryPage from './pages/CategoryPage';

import { router } from './components/Routes/Routes';

function App() {
  // const LazyProductPage = lazy(() => import('./pages/ProductPage'));
  // const LazyFavoritesPage = lazy(() => import('./pages/Favorites'));
  // const LazyLoginPage = lazy(() => import('./pages/Login'));
  // const LazySignupPage = lazy(() => import('./pages/Signup'));
  // const LazyAdminPage = lazy(() => import('./pages/Admin'));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;
