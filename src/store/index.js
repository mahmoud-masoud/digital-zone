import { configureStore } from '@reduxjs/toolkit';

import newProductFormData from './newProductFormData.js';
import favorites from './favorites.js';
import cartItems from './cartItems.js';
const store = configureStore({
  reducer: { newProductFormData, favorites, cartItems },
});

export default store;
