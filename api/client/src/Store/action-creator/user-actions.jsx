import userSlice from "../reducerSlices/userSlice";

export const {
  currentUser,
  addUserAddress,
  addPaymentIntent,
  logout,
  addUserToken,
} = userSlice.actions;
