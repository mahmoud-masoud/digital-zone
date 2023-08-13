import { createSlice } from '@reduxjs/toolkit';

const initialState = { favoritesItems: [], numberOfItems: 0, totalPrice: 0 };

const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.favoritesItems.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.favoritesItems.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          image: newItem.image,
          totalPrice: newItem.price,
          quantity: 1,
        });
        state.totalPrice += newItem.price;
        state.numberOfItems++;
      } else {
        state.favoritesItems = state.favoritesItems.filter((item) => {
          return item.id !== newItem.id;
        });
        state.totalPrice -= existingItem.totalPrice;
        state.numberOfItems--;
      }
    },

    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.favoritesItems.find(
        (item) => item.id === itemId
      );

      state.totalPrice -= existingItem.totalPrice;
      state.numberOfItems--;
      state.favoritesItems = state.favoritesItems.filter(
        (item) => item.id !== itemId
      );
    },
    increaseItemQuantity(state, action) {
      const newItem = action.payload;

      const existingItem = state.favoritesItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem.quantity < newItem.quantity) {
        const newItemTotalPrice = newItem.quantity * existingItem.price;
        state.totalPrice += newItemTotalPrice - existingItem.totalPrice;
        existingItem.totalPrice = newItemTotalPrice;

        existingItem.quantity = newItem.quantity;
      }
      if (existingItem.quantity > newItem.quantity) {
        const diff = existingItem.quantity - newItem.quantity;
        existingItem.totalPrice -= diff * existingItem.price;
        state.totalPrice -= diff * existingItem.price;

        existingItem.quantity = newItem.quantity;
      }
    },
  },
});

export default favorites.reducer;

export const favoritesActions = favorites.actions;
