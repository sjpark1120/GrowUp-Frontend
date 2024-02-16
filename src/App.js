import SignUpPage from "./pages/JoinPage/SignUpPage";
import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/MainPage/MainPage";
import GrowRoomPage from "./pages/GrowRoomPage/GrowRoomPage";
import GrowRoomWritePage from "./pages/GrowRoomPage/GrowRoomWritePage";
import GrowRoomPostPage from "./pages/GrowRoomPage/GrowRoomPostPage";
import LiveUpPage from "./pages/LiveUpPage/LiveUpPage";
import LiveUpJoinPage from "./pages/LiveUpPage/LiveUpJoinPage";
import FindPasswordPage from "./pages/JoinPage/FindPasswordPage";
import ChangePasswordPage from "./pages/JoinPage/ChangePasswordPage";

import MyPage from "./pages/MyPage/MyPage";
import EditProfile from './pages/MyPage/EditProfile';
import AuthApi from "./apis/Auth";
import AxiosInstance from "./apis/CustomAxios";
import { useDispatch } from "react-redux";
import { login } from "./redux/user";
import ProtectedRoute from "./pages/ProtectedRoute";
import EmailVerifyPage from "./pages/JoinPage/EmailVerifyPage";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  useEffect(() => {
    onSilentRefresh();
  }, []);

  const dispatch = useDispatch();
  const onSilentRefresh = async () => {
    try {
      const response = await AuthApi.silentRefresh();
      console.log('silentRefresh success:', response);
      AxiosInstance.defaults.headers.common["Authorization"] = `${response.result.newAccessToken}`;
      console.log("로그인 연장", AxiosInstance.defaults.headers.common)
      dispatch(login({ isLogin: true }));
    } catch (error) {
      //console.error('silentRefresh failed:', error);
      if (error.response?.status === 401) {
        // refresh token 만료 - 로그인 페이지 이동
      dispatch(login({ isLogin: false }));
        console.log('로그인 만료')
      }
    }
  };
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        <Route index element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/findpassword" element={<FindPasswordPage />} />
        <Route path="/changepassword" element={<ChangePasswordPage />} /> 
        <Route path="/emailverify" element={<EmailVerifyPage />} /> 
        <Route element={<ProtectedRoute />}>
          <Route path="/growroom/write" element={<GrowRoomWritePage />} />
          <Route path="/mypage/edit" element={<EditProfile/>} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/growroom" element={<GrowRoomPage />} />
          <Route path="/growroom/:postId" element={<GrowRoomPostPage />} />
          <Route path="/liveup" element={<LiveUpPage />} />
          <Route path="/liveup/:roomid" element={<LiveUpJoinPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
