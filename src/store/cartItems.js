import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [], quantity: 0, cartTotalPrice: 0 };

const cartItems = createSlice({
  name: 'cartItems',
  initialState: initialState,
  reducers: {
    addItem(state, action) {
      state.quantity++;
      const newItem = action.payload;

      state.cartTotalPrice += newItem.price;

      const existingItem = state.items.find((item) => item.id == newItem.id);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          totalPrice: newItem.price,
          quantity: 1,
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
      state.cartTotalPrice -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    removeItemPermanently(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      state.cartTotalPrice -= existingItem.totalPrice;

      state.quantity -= existingItem.quantity;
      state.items = state.items.filter((item) => item.id !== itemId);
    },

    addAllFavoritesItems(state, action) {
      const { favoritesItems, favoritesTotalPrice } = action.payload;
      state.cartTotalPrice += favoritesTotalPrice;

      favoritesItems.forEach((favItem) => {
        const existingItem = state.items.find((item) => item.id === favItem.id);
        state.quantity += +favItem.quantity;
        if (existingItem) {
          existingItem.totalPrice += favItem.totalPrice;
          existingItem.quantity += +favItem.quantity;
        } else {
          state.items.push(favItem);
        }
      });
    },
  },
});

export default cartItems.reducer;

export const cartActions = cartItems.actions;
