// src/routes.js
import React, { useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Home from "../pages/Home";
import HomeRoot from "../components/HomeRoot";
import Root from "../components/Root";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import AdminRoot from "../components/Admin/Root";
import AuthRoot from "../components/auth/AuthRoot";
import ErrorPage from "../Pages/ErrorPage";
import NotFoundPage from "../Pages/NotFoundPage";
import PageSpinner from "../UI/PageSpinner";
import { AnimatePresence } from "framer-motion";
import NotLoggedIn from "../components/Checkout/NotLoggedIn";

const LazyProductPage = lazy(() => import("../pages/ProductPage"));
const LazyFavoritesPage = lazy(() => import("../pages/FavoritesPage"));
const LazyCartPage = lazy(() => import("../pages/CartPage"));
const LazyCheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const LazyUserOrdersPage = lazy(() => import("../pages/UserOrdersPage"));
const LazyUserProfilePage = lazy(() => import("../pages/UserProfilePage"));
const LazyCategoryPage = lazy(() => import("../pages/CategoryPage"));
const LazySignInPage = lazy(() => import("../pages/SignIn"));
const LazySignupPage = lazy(() => import("../pages/SignupPage"));

// Admin pages
const LazyAdminHomePage = lazy(() => import("../pages/Admin/Home"));
const LazyAdminProductsPage = lazy(() => import("../pages/Admin/Products"));
const LazyAdminProductPage = lazy(() => import("../pages/Admin/ProductPage"));
const LazyAdminNewProductPage = lazy(() => import("../pages/Admin/NewProduct"));
const LazyAdminUsersPage = lazy(() => import("../pages/Admin/Users"));
const LazyAdminNewUserPage = lazy(() => import("../pages/Admin/NewUserPage"));
const LazyAdminOrdersPage = lazy(() => import("../pages/Admin/Orders"));
const LazyAdminOrderDetailsPage = lazy(() =>
  import("../pages/Admin/OrderDetails"),
);

const Routes = () => {
  const location = useLocation();

  // Scroll to top whenever the route change
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  // routes
  const router = useRoutes([
    { path: "*", element: <NotFoundPage /> },

    {
      path: "/",
      element: <Root />,
      errorElement: <p>Error happens</p>,
      children: [
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
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazySignInPage />
                </Suspense>
              ),
            },
            {
              path: "signup",
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazySignupPage />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "admin",
          element: <AdminRoot />,
          children: [
            {
              index: true,
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazyAdminHomePage />
                </Suspense>
              ),
            },

            {
              path: "orders",
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazyAdminOrdersPage />
                </Suspense>
              ),
            },
            {
              path: "orders/:orderId",
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazyAdminOrderDetailsPage />
                </Suspense>
              ),
            },
            {
              path: "products",
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazyAdminProductsPage />
                </Suspense>
              ),
            },
            {
              path: "products/new",
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazyAdminNewProductPage />
                </Suspense>
              ),
            },
            {
              path: "products/:productId",
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazyAdminProductPage />
                </Suspense>
              ),
            },
            {
              path: "users",
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazyAdminUsersPage />
                </Suspense>
              ),
            },
            {
              path: "users/new",
              element: (
                <Suspense fallback={<PageSpinner />}>
                  <LazyAdminNewUserPage />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  if (!router) return <NotFoundPage />;
  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(router, { key: location.pathname })}
    </AnimatePresence>
  );
};
export default Routes;
