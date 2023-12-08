import { createSlice } from "@reduxjs/toolkit";
const initialState = { cartItems: [], cartTotalAmount: 0 };
const cartItems = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addCartItems(state, action) {
      const cartItems = action.payload;
      state.cartItems = cartItems;
      state.cartTotalAmount += cartItems.reduce((prev, curr) => {
        return (prev += curr);
      }, 0);
    },
  },
});

export const cartItemsActions = cartItems.actions;
export default cartItems.reducer;
