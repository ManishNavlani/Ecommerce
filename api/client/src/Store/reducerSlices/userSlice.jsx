import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  currentUser: null,
  userToken: null,
  isLoggedIn: false,
  userAddress: {},
  paymentIntent: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    currentUser: (state, action) => {
      state.currentUser = action.payload.user;
      state.isLoggedIn = true;
    },

    addPaymentIntent: (state, action) => {
      state.paymentIntent = action.payload;
    },

    addUserAddress: (state, action) => {
      state.userAddress = action.payload;
    },

    addUserToken: (state, action) => {
      state.userToken = action.payload.token;
    },

    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
      state.paymentIntent = null;
      state.userToken = null;
    },
  },
});

export const userReducer = userSlice.reducer;

export default userSlice;
