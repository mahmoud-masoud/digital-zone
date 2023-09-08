import { configureStore } from '@reduxjs/toolkit';
import cartItems from './cartItems.js';
import favorites from './favorites.js';
import newProductFormData from './newProductFormData.js';

const store = configureStore({
  reducer: { cartItems, favorites, newProductFormData },
});

export default store;
