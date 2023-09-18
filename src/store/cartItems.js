import { createSlice } from '@reduxjs/toolkit';
const initialState = { cartItems: [] };
const cartItems = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    addCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const cartItemsActions = cartItems.actions;
export default cartItems.reducer;
