import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { closeLoginModal, openLoginModal } from '../redux/loginModal';

function ProtectedRoute() {
  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem('isLogin');
  useEffect(() => {
    if (isLogin) {
      dispatch(closeLoginModal());
    } else {
      dispatch(openLoginModal());
    }
  }, [isLogin, dispatch]);
  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
    
  )
}

export default ProtectedRoute