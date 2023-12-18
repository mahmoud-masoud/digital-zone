import { configureStore } from "@reduxjs/toolkit";

import newProductFormData from "./newProductFormData.js";
import favorites from "./favorites.js";
import cartItems from "./cartItems.js";
import userShippingInfo from "./userShippingInfo.js";

// const reHydrateStore = () => {
//   if (localStorage.getItem("cartItems") !== null) {
//     return JSON.parse(localStorage.getItem("cartItems")); // re-hydrate the store
//   }
// };

// const localStorageMiddleware =
//   ({ getState }) =>
//   (next) =>
//   (action) => {
//     const result = next(action);
//     localStorage.setItem("cartItems", JSON.stringify(getState().cartItems));

//     return result;
//   };

const store = configureStore({
  reducer: { newProductFormData, favorites, cartItems, userShippingInfo },
  // preloadedState: reHydrateStore(),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
