import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { apiReducer, productApi } from "./ApiCalls/api-calls";
import { cartReducer } from "./reducerSlices/cartSlice";
import { userReducer } from "./reducerSlices/userSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  [productApi.reducerPath]: apiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productApi.middleware),

  devTools: false,
});

export let persistor = persistStore(store);

export default store;
