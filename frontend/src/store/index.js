import { configureStore } from "@reduxjs/toolkit";

import authUserReducer from "./authUser";

const store = configureStore({
  reducer: {
    auth: authUserReducer,
  },
});

export default store;
