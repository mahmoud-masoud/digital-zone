import { createSlice } from "@reduxjs/toolkit";
const initialState = { cartItems: [], cartTotalAmount: 0, cartQuantity: 0 };
const cartItems = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addCartItems(state, action) {
      console.log(action.payload);
      state.cartItems = action.payload;
    },
  },
});

export const cartItemsActions = cartItems.actions;
export default cartItems.reducer;
