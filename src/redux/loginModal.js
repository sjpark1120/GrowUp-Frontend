import { createSlice } from '@reduxjs/toolkit';

export const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState: { value: { showLoginModal: false }},
  reducers: {
    openLoginModal: (state) => {
      state.value = { showLoginModal: true };
    },
    closeLoginModal: (state) => {
      state.value = { showLoginModal: false };
    },
  },
});

export const { openLoginModal, closeLoginModal } = loginModalSlice.actions;

export default loginModalSlice.reducer;