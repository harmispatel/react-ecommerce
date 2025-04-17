import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import cartReducer from "../auth/cartSlice";
import productReducer from "../auth/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
  },
});
