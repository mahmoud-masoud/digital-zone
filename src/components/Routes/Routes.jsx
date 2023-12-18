// src/routes.js
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";

import Home from "../../pages/Home";
import Root from "../../components/Root";
import Cart from "../../pages/Cart";
import ErrorPage from "../../UI/ErrorPage";
import Loading from "../../UI/Loading";
import { lazy, Suspense } from "react";
import CategoryPage from "../../pages/CategoryPage";
import AdminRoot from "../Admin/Root";
import AdminHome from "../../pages/Admin/Home";
import Products from "../../pages/Admin/Products";
import ProductFrom from "../Admin/ProductFormComponents/ProductForm";
import NewProductForm from "../Admin/NewProduct/NewProductForm";
import Users from "../../pages/Admin/Users";
import NewUser from "../../pages/Admin/NewUser";
import Checkout from "../../pages/Checkout";
import PaymentSuccess from "../../pages/PaymentSuccess";
import Orders from "../../pages/Admin/Orders";
import OrderDetails from "../../pages/Admin/OrderDetails";

const LazyProductPage = lazy(() => import("../../pages/ProductPage"));
const LazyFavoritesPage = lazy(() => import("../../pages/Favorites"));
const LazyLoginPage = lazy(() => import("../../pages/Login"));
const LazySignupPage = lazy(() => import("../../pages/SignupPage"));
// const LazyAdminPage = lazy(() => import('../../pages/Admin'));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },

      { path: "ct/:category", element: <CategoryPage /> },

      {
        path: "ip/:productId",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyProductPage />
          </Suspense>
        ),
      },
      {
        path: "favorites",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyFavoritesPage />
          </Suspense>
        ),
      },
      {
        path: "ct/:category/ip/:productId",
        element: (
          <Suspense fallback={<Loading />}>
            <LazyProductPage />
          </Suspense>
        ),
      },
    ],
  },
  { path: "checkout", element: <Checkout /> },
  { path: "checkout/success", element: <PaymentSuccess /> },
  {
    path: "login",
    element: (
      <Suspense fallback={<Loading />}>
        <LazyLoginPage />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<Loading />}>
        <LazySignupPage />
      </Suspense>
    ),
  },
  {
    path: "admin",
    element: <AdminRoot />,
    children: [
      { index: true, element: <AdminHome /> },

      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "products",
        element: <Products />,
      },
      { path: "products/new", element: <NewProductForm /> },
      { path: "products/:productId", element: <ProductFrom /> },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/new",
        element: <NewUser />,
      },
    ],
  },
]);
