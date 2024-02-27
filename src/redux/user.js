import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { value: { isLogin: false } },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = { isLogin: false }; // 초기 상태로 되돌립니다.
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
