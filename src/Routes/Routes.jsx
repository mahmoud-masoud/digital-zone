import React, { useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";

import Root from "../components/Root";

import NotFoundPage from "../Pages/NotFoundPage";

import { AnimatePresence } from "framer-motion";
import adminRoutes from "./AdminRoutes";
import ClientRoutes from "./ClientRoutes";

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
      children: [...ClientRoutes, adminRoutes],
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
