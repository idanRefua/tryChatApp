import { createSlice } from "@reduxjs/toolkit";

const authUserState = {
  isLoggedIn: localStorage.getItem("token") ? true : false,
  userInfo: {},
};

const userAuthSlice = createSlice({
  name: "auth",
  initialState: authUserState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const authUserActions = userAuthSlice.actions;
export default userAuthSlice.reducer;
