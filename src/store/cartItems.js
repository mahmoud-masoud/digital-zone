import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], quantity: 0 };

const cartItems = createSlice({
  name: 'cartItems',
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      state.quantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id == newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
      }
    },
    removeItem(state, action) {
      state.quantity--;
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export default cartItems.reducer;

export const cartActions = cartItems.actions;
