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
import LazyLoadComponent from './Utils/LazyLoadComponent';
import Favorites from './pages/Favorites';
import { useEffect } from 'react';

function App() {
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
            <LazyLoadComponent
              url={'../pages/ProductPage'}
              fallback={<Loading />}
            />
          ),
        },
        {
          path: 'favorites',
          element: (
            <LazyLoadComponent
              url={'../pages/Favorites'}
              fallback={<Loading />}
            />
          ),
        },
        {
          path: 'laptops/:productId',
          element: (
            <LazyLoadComponent
              url={'../pages/ProductPage'}
              fallback={<Loading />}
            />
          ),
        },
        {
          path: 'headphones/:productId',
          element: (
            <LazyLoadComponent
              url={'../pages/ProductPage'}
              fallback={<Loading />}
            />
          ),
        },
        {
          path: 'mobile-phones/:productId',
          element: (
            <LazyLoadComponent
              url={'../pages/ProductPage'}
              fallback={<Loading />}
            />
          ),
        },
        {
          path: 'smart-watches/:productId',
          element: (
            <LazyLoadComponent
              url={'../pages/ProductPage'}
              fallback={<Loading />}
            />
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
