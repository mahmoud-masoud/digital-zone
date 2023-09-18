import { createSlice } from '@reduxjs/toolkit';
const initialState = { favoritesItems: [] };
const favorites = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorites(state, action) {
      state.favoritesItems = action.payload;
    },
  },
});

export const favoritesActions = favorites.actions;
export default favorites.reducer;
