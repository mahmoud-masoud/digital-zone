import { Suspense, lazy } from "react";
import Home from "../pages/Home";
import HomeRoot from "../components/HomeRoot";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import AuthRoot from "../components/auth/AuthRoot";
import ErrorPage from "../Pages/ErrorPage";
import PageSpinner from "../UI/PageSpinner";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/Signup";

const LazyProductPage = lazy(() => import("../pages/ProductPage"));
const LazyFavoritesPage = lazy(() => import("../pages/FavoritesPage"));
const LazyCartPage = lazy(() => import("../pages/CartPage"));
const LazyCheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const LazyUserOrdersPage = lazy(() => import("../pages/UserOrdersPage"));
const LazyUserProfilePage = lazy(() => import("../pages/UserProfilePage"));
const LazyCategoryPage = lazy(() => import("../pages/CategoryPage"));

const ClientRoutes = [
  {
    path: "/",
    element: <HomeRoot />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "cart",
        element: (
          <Suspense fallback={<PageSpinner />}>
            <LazyCartPage />
          </Suspense>
        ),
      },
      {
        path: "favorites",
        element: (
          <Suspense fallback={<PageSpinner />}>
            <LazyFavoritesPage />
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<PageSpinner />}>
            <LazyUserOrdersPage />
          </Suspense>
        ),
      },

      {
        path: "profile",
        element: (
          <Suspense fallback={<PageSpinner />}>
            <LazyUserProfilePage />
          </Suspense>
        ),
      },

      {
        path: "ct/:category",
        element: (
          <Suspense fallback={<PageSpinner />}>
            <LazyCategoryPage />
          </Suspense>
        ),
      },

      {
        path: "ip/:productId",
        element: (
          <Suspense fallback={<PageSpinner />}>
            <LazyProductPage />
          </Suspense>
        ),
      },

      {
        path: "ct/:category/ip/:productId",
        element: (
          <Suspense fallback={<PageSpinner />}>
            <LazyProductPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "checkout",
    element: (
      <Suspense fallback={<PageSpinner />}>
        <LazyCheckoutPage />
      </Suspense>
    ),
  },
  { path: "checkout/success", element: <PaymentSuccessPage /> },
  {
    path: "/",
    element: <AuthRoot />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
];

export default ClientRoutes;
