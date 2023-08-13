import { configureStore } from '@reduxjs/toolkit';
import cartItems from './cartItems.js';
import favorites from './favorites.js';
const store = configureStore({
  reducer: { cartItems, favorites },
});

export default store;
