import { createSlice, current } from "@reduxjs/toolkit";

const cartInitialState = {
  products: [],
  cartQuantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    //when register
    createNewCart: (state, action) => {
      state.products = cartInitialState.products;
      state.cartQuantity = cartInitialState.cartQuantity;
      state.total = cartInitialState.total;
    },

    //when login
    updateCart: (state, action) => {
      state.products = action.payload.products;
      state.cartQuantity = action.payload.cartQuantity;
      state.total = action.payload.total;
    },

    addProduct: (state, action) => {
      const product = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (product && product.size === action.payload.size) {
        const productIndex = state.products.findIndex(
          (product) => action.payload._id === product._id
        );
        const product = state.products[productIndex];
        product.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.cartQuantity += 1;
        state.total += action.payload.price * action.payload.quantity;
      }
    },

    increaseQuantity: (state, action) => {
      const proIndex = state.products.findIndex(
        (pro) => pro._id === action.payload.id
      );
      const product = state.products[proIndex];
      product.quantity += 1;
      state.total += product.price;
    },

    decreaseQuantity: (state, action) => {
      const product = state.products.find(
        (pro) => pro._id === action.payload.id
      );

      if (product.quantity > 0) {
        product.quantity--;
        state.total -= product.price;
      }
      if (product.quantity === 0) {
        const proIndex = state.products.findIndex(
          (pro) => pro._id === action.payload.id
        );

        state.products.splice(proIndex, 1);
        state.cartQuantity--;
      }
    },
    // resetting cart when  checkout
    orderSuccess: (state) => {
      state.products = cartInitialState.products;
      state.cartQuantity = cartInitialState.cartQuantity;
      state.total = cartInitialState.total;
    },

    // resetting cart when logout or checkout
    resetCart: (state) => {
      state.products = cartInitialState.products;
      state.cartQuantity = cartInitialState.cartQuantity;
      state.total = cartInitialState.total;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export default cartSlice;
