import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user'
import loginModalReducer from './loginModal';

export default configureStore({
  reducer: {
    user: userReducer,
    loginModal: loginModalReducer,
  },
})