import { Suspense, lazy } from "react";
import PageSpinner from "../UI/PageSpinner";
import AdminRoot from "../components/Admin/Root";
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

const AdminRoutes = {
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
};

export default AdminRoutes;
