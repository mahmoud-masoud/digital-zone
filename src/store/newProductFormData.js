import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  description: '',
  highlights: '',
  images: [],
  price: 0,
  category: '',
};

const newProductFormData = createSlice({
  name: 'newProductFormData',
  initialState,
  reducers: {
    addTitle(state, action) {
      state.title = action.payload;
    },
    addDescription(state, action) {
      state.description = action.payload;
    },
    addHighlights(state, action) {
      state.highlights = action.payload;
    },
    addImages(state, action) {
      state.images = action.payload;
    },
    addPrice(state, action) {
      state.price = action.payload;
    },
    addCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export default newProductFormData.reducer;

export const newProductFormDataActions = newProductFormData.actions;
