import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import loginModalReducer from "./loginModal";

export default configureStore({
  reducer: {
    user: userReducer,
    loginModal: loginModalReducer,
  },
});

// redux/index.js에 가셔서 리듀서 추가해주시면 되겠습니다!
