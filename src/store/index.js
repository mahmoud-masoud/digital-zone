import { configureStore } from '@reduxjs/toolkit';
import cartItems from './cartItems.js';
const store = configureStore({
  reducer: { cartItems },
});

export default store;
