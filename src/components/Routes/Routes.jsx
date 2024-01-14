// src/routes.js
import React, { useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Home from "../../pages/Home";
import HomeRoot from "../../components/HomeRoot";
import Root from "../../components/Root";

import PaymentSuccess from "../../pages/PaymentSuccess";
import ErrorPage from "../../UI/ErrorPage";
import MainSpinner from "../../UI/MainSpinner";
import AdminRoot from "../Admin/Root";
import { AnimatePresence } from "framer-motion";
import AuthRoot from "../auth/AuthRoot";

const LazyProductPage = lazy(() => import("../../pages/ProductPage"));
const LazyFavoritesPage = lazy(() => import("../../pages/FavoritesPage"));
const LazyCartPage = lazy(() => import("../../pages/CartPage"));
const LazyCheckoutPage = lazy(() => import("../../pages/CheckoutPage"));
const LazyUserOrdersPage = lazy(() => import("../../pages/UserOrdersPage"));
const LazyCategoryPage = lazy(() => import("../../pages/CategoryPage"));
const LazySignInPage = lazy(() => import("../../pages/SignIn"));
const LazySignupPage = lazy(() => import("../../pages/SignupPage"));

// Admin pages

const LazyAdminHomePage = lazy(() => import("../../pages/Admin/Home"));
const LazyAdminProductsPage = lazy(() => import("../../pages/Admin/Products"));
const LazyAdminProductPage = lazy(() =>
  import("../../pages/Admin/ProductPage"),
);
const LazyAdminNewProductPage = lazy(() =>
  import("../../pages/Admin/NewProduct"),
);
const LazyAdminUsersPage = lazy(() => import("../../pages/Admin/Users"));
const LazyAdminNewUserPage = lazy(() => import("../../pages/Admin/NewUser"));
const LazyAdminOrdersPage = lazy(() => import("../../pages/Admin/Orders"));
const LazyAdminOrderDetailsPage = lazy(() =>
  import("../../pages/Admin/OrderDetails"),
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
                <Suspense fallback={<MainSpinner />}>
                  <LazyCartPage />
                </Suspense>
              ),
            },
            {
              path: "favorites",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyFavoritesPage />
                </Suspense>
              ),
            },
            {
              path: "orders",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyUserOrdersPage />
                </Suspense>
              ),
            },

            {
              path: "ct/:category",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyCategoryPage />
                </Suspense>
              ),
            },

            {
              path: "ip/:productId",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyProductPage />
                </Suspense>
              ),
            },

            {
              path: "ct/:category/ip/:productId",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyProductPage />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "checkout",
          element: (
            <Suspense fallback={<MainSpinner />}>
              <LazyCheckoutPage />
            </Suspense>
          ),
        },
        { path: "checkout/success", element: <PaymentSuccess /> },
        {
          path: "/",
          element: <AuthRoot />,
          children: [
            {
              path: "signin",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazySignInPage />
                </Suspense>
              ),
            },
            {
              path: "signup",
              element: (
                <Suspense fallback={<MainSpinner />}>
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
                <Suspense fallback={<MainSpinner />}>
                  <LazyAdminHomePage />
                </Suspense>
              ),
            },

            {
              path: "orders",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyAdminOrdersPage />
                </Suspense>
              ),
            },
            {
              path: "orders/:orderId",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyAdminOrderDetailsPage />
                </Suspense>
              ),
            },
            {
              path: "products",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyAdminProductsPage />
                </Suspense>
              ),
            },
            {
              path: "products/new",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyAdminNewProductPage />
                </Suspense>
              ),
            },
            {
              path: "products/:productId",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyAdminProductPage />
                </Suspense>
              ),
            },
            {
              path: "users",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyAdminUsersPage />
                </Suspense>
              ),
            },
            {
              path: "users/new",
              element: (
                <Suspense fallback={<MainSpinner />}>
                  <LazyAdminNewUserPage />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <AnimatePresence mode="wait">
      {React.cloneElement(router, { key: location.pathname })}
    </AnimatePresence>
  );
};
export default Routes;
