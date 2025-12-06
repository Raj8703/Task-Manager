import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("tm_auth") || "null") || {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: savedAuth,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      localStorage.setItem("tm_auth", JSON.stringify(state));
    },
    logout(state) {
      state.user = null;
      localStorage.setItem("tm_auth", JSON.stringify(state));
    },
    registerSuccess(state, action) {
      state.user = action.payload;
      localStorage.setItem("tm_auth", JSON.stringify(state));
    },
  },
});

export const { loginSuccess, logout, registerSuccess } = authSlice.actions;
export default authSlice.reducer;
