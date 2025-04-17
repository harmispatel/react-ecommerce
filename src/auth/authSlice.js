import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("authUser"));
const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

const initialState = {
  user: userData || null,
  users: storedUsers,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const users = [...state.users, action.payload];
      state.users = users;
      localStorage.setItem("users", JSON.stringify(users));
    },
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("authUser", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authUser");
      localStorage.removeItem("cart");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
