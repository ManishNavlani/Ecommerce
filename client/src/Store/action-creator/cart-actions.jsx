import cartSlice from "../reducerSlices/cartSlice";

export const {
  createNewCart,
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  orderSuccess,
  updateCart,
  resetCart,
} = cartSlice.actions;
