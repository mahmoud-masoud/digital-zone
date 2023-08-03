import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Root from './components/Root';
import Laptops from './components/Laptops/Laptops';
import Headphones from './components/Headphones/Headphones';
import MobilePhones from './components/MobilePhones/MobilePhones';
import SmartWatches from './components/SmartWatches/SmartWatches';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import ErrorPage from './UI/ErrorPage';

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
        { path: ':productId', element: <ProductPage /> },
        { path: 'laptops/:productId', element: <ProductPage /> },
        { path: 'headphones/:productId', element: <ProductPage /> },
        { path: 'mobile-phones/:productId', element: <ProductPage /> },
        { path: 'smart-watches/:productId', element: <ProductPage /> },
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
