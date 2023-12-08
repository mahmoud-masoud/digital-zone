import { createSlice } from "@reduxjs/toolkit";

const userShippingInfo = createSlice({
  name: "userShippingInfo",
  initialState: {
    creditCard: null,
    shippingInfo: null,
  },

  reducers: {
    addUserShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },

    addUserCreditCard: (state, action) => {
      state.creditCard = action.payload;
    },
  },
});

export const userShippingInfoActions = userShippingInfo.actions;

export default userShippingInfo.reducer;
